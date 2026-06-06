import * as p from '@clack/prompts';
import pc from 'picocolors';
import matter from 'gray-matter';
import {
  installSkill,
  getTargetPaths,
  relativePath,
  INSTALL_TARGETS,
  UNIVERSAL_FOLDER,
  resolveBase,
  type Scope,
} from '../utils/installer.js';
import { type Lang, t } from '../utils/i18n.js';

const NONE_ID = '__none__';

function githubToRaw(url: string): string {
  return url
    .replace('github.com', 'raw.githubusercontent.com')
    .replace('/blob/', '/');
}

function buildCandidates(baseUrl: string, skillName: string): string[] {
  try {
    const u = new URL(baseUrl);
    const parts = u.pathname.split('/').filter(Boolean);
    const [owner, repo] = parts;
    if (!owner || !repo) return [];
    const raw = `https://raw.githubusercontent.com/${owner}/${repo}/main`;
    return [
      `${raw}/skills/${skillName}/SKILL.md`,
      `${raw}/plugins/${skillName}/skills/${skillName}/SKILL.md`,
      `${raw}/packages/autoskills/skills-registry/${skillName}/SKILL.md`,
      `${raw}/${skillName}/SKILL.md`,
      `${raw}/${skillName}.md`,
    ];
  } catch {
    return [];
  }
}

async function fetchUrl(url: string): Promise<string | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return await res.text();
  } catch {
    return null;
  }
}

function buildSummaryNote(skillId: string, clientIds: string[], scope: Scope, lang: Lang): string {
  const i18n = t(lang);
  const base = resolveBase(scope);
  const paths = getTargetPaths(skillId, clientIds, base);
  const lines: string[] = [relativePath(paths[0])];
  if (clientIds.length > 0) {
    const labels = clientIds.map(id => INSTALL_TARGETS.find(x => x.id === id)?.id ?? id);
    const copyLine = i18n.summary_copy_to(labels);
    if (copyLine) lines.push(`  ${copyLine}`);
    for (const path of paths.slice(1)) lines.push(`  ${relativePath(path)}`);
  }
  return lines.join('\n');
}

function showUniversalInfo(lang: Lang): void {
  const i18n = t(lang);
  p.note(
    `${pc.bold(i18n.universal_note(UNIVERSAL_FOLDER))}\n${pc.dim(i18n.universal_agents())}`,
    i18n.universal_title
  );
  p.log.info(i18n.ctrl_navigate);
  p.log.info(i18n.ctrl_space);
  p.log.info(i18n.ctrl_a);
  p.log.info(i18n.ctrl_enter);
}

export async function runAddCommand(args: string[], lang: Lang): Promise<void> {
  const i18n = t(lang);

  const urlArg = args.find(a => !a.startsWith('--') && a !== 'add');
  const skillIdx = args.indexOf('--skill');
  const skillArg = skillIdx !== -1 ? args[skillIdx + 1] : undefined;

  if (!urlArg) {
    p.log.error(i18n.add_usage);
    p.log.info(i18n.add_example);
    process.exit(1);
  }

  if (!skillArg) {
    p.log.error(i18n.add_specify);
    process.exit(1);
  }

  let content: string | null = null;

  if (urlArg.includes('raw.githubusercontent.com') || urlArg.endsWith('SKILL.md')) {
    const rawUrl = githubToRaw(urlArg);
    p.log.step(i18n.add_fetching(rawUrl));
    content = await fetchUrl(rawUrl);
  } else {
    const candidates = buildCandidates(urlArg, skillArg);
    p.log.step(i18n.add_searching(skillArg, urlArg));
    for (const url of candidates) {
      content = await fetchUrl(url);
      if (content) break;
    }
  }

  if (!content) {
    p.log.error(i18n.add_not_found(skillArg));
    p.log.info(i18n.add_try_direct);
    process.exit(1);
  }

  const { data } = matter(content);
  const title = data.title ?? data.name ?? skillArg;
  const description = data.description ?? '';

  console.log('');
  console.log(`  ${pc.bold(title)}`);
  if (description) {
    const short = description.length > 80 ? description.slice(0, 80) + '...' : description;
    console.log(`  ${pc.dim(short)}`);
  }
  console.log('');

  // Step 1 — Universal info + controls
  showUniversalInfo(lang);

  // Step 2 — Select additional clients
  const clients = await p.multiselect({
    message: i18n.install_also,
    options: [
      { value: NONE_ID, label: i18n.install_none },
      ...INSTALL_TARGETS.map(tgt => ({ value: tgt.id, label: tgt.label })),
    ],
    required: false,
  });

  if (p.isCancel(clients)) {
    p.cancel(i18n.cancelled);
    process.exit(0);
  }

  const selectedClients = (clients as string[]).filter(c => c !== NONE_ID);

  // Step 3 — Select scope
  const scope = await p.select({
    message: i18n.scope_q,
    options: [
      { value: 'project' as Scope, label: i18n.scope_project, hint: i18n.scope_project_hint },
      { value: 'global' as Scope,  label: i18n.scope_global,  hint: i18n.scope_global_hint },
    ],
  });

  if (p.isCancel(scope)) {
    p.cancel(i18n.cancelled);
    process.exit(0);
  }

  const selectedScope = scope as Scope;

  // Step 4 — Summary
  const summaryText = buildSummaryNote(skillArg, selectedClients, selectedScope, lang);
  p.note(summaryText, i18n.summary_title);

  // Step 5 — Security note
  const sourceNote = data.source ? `\nSource: ${data.source}` : '';
  p.note(i18n.security_msg + sourceNote, i18n.security_title);

  // Step 6 — Confirm
  const proceed = await p.confirm({
    message: i18n.proceed,
    initialValue: true,
  });

  if (p.isCancel(proceed) || !proceed) {
    p.cancel(i18n.cancelled);
    process.exit(0);
  }

  // Step 7 — Install
  const spin = p.spinner();
  spin.start(i18n.installing);

  try {
    const installed = await installSkill(skillArg, content, selectedClients, selectedScope);
    spin.stop(i18n.done_installing);

    const finalSummary = installed.map(f => `  ${relativePath(f)}`).join('\n');
    p.note(finalSummary, i18n.install_summary(1));
  } catch (err) {
    spin.stop(i18n.err_install);
    p.log.error(String(err));
    process.exit(1);
  }
}
