import * as p from '@clack/prompts';
import pc from 'picocolors';
import { getTechnologies, getSkillsForTech } from '../utils/catalog.js';
import { renderSkillCard } from '../utils/render.js';
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

function buildSummaryNote(
  skillId: string,
  clientIds: string[],
  scope: Scope,
  lang: Lang
): string {
  const base = resolveBase(scope);
  const paths = getTargetPaths(skillId, clientIds, base);
  const i18n = t(lang);

  const lines: string[] = [];
  lines.push(relativePath(paths[0]));

  if (clientIds.length > 0) {
    const labels = clientIds.map(id => INSTALL_TARGETS.find(x => x.id === id)?.id ?? id);
    const copyLine = i18n.summary_copy_to(labels);
    if (copyLine) lines.push(`  ${copyLine}`);
    for (const path of paths.slice(1)) {
      lines.push(`  ${relativePath(path)}`);
    }
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

export async function showSkillsMenu(lang: Lang): Promise<void> {
  const i18n = t(lang);
  const techs = getTechnologies();

  if (techs.length === 0) {
    p.log.error(i18n.no_techs);
    return;
  }

  while (true) {
    const techChoice = await p.select({
      message: i18n.select_tech,
      options: [
        ...techs.map(tech => ({
          value: tech.id,
          label: `${tech.icon}  ${tech.label}`,
          hint: `${tech.skillCount} skill${tech.skillCount !== 1 ? 's' : ''}`,
        })),
        { value: '__back__', label: i18n.back_main },
      ],
    });

    if (p.isCancel(techChoice) || techChoice === '__back__') return;

    const skills = getSkillsForTech(techChoice as string);

    while (true) {
      const skillChoice = await p.select({
        message: i18n.select_skill,
        options: [
          ...skills.map(s => ({
            value: s.id,
            label: s.title,
            hint: s.description.length > 55 ? s.description.slice(0, 55) + '...' : s.description,
          })),
          { value: '__back__', label: i18n.back_techs },
        ],
      });

      if (p.isCancel(skillChoice) || skillChoice === '__back__') break;

      const skill = skills.find(s => s.id === skillChoice)!;

      renderSkillCard(skill.title, skill.description, skill.tags);

      // Step 1 — Show universal note + controls legend
      showUniversalInfo(lang);

      // Step 2 — Select additional clients (None is first option)
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

      // Filter out the sentinel "None" value
      const selectedClients = (clients as string[]).filter(c => c !== NONE_ID);

      // Step 3 — Select scope
      const scope = await p.select({
        message: i18n.scope_q,
        options: [
          {
            value: 'project' as Scope,
            label: i18n.scope_project,
            hint: i18n.scope_project_hint,
          },
          {
            value: 'global' as Scope,
            label: i18n.scope_global,
            hint: i18n.scope_global_hint,
          },
        ],
      });

      if (p.isCancel(scope)) {
        p.cancel(i18n.cancelled);
        process.exit(0);
      }

      const selectedScope = scope as Scope;

      // Step 4 — Installation Summary
      const summaryText = buildSummaryNote(skill.id, selectedClients, selectedScope, lang);
      p.note(summaryText, i18n.summary_title);

      // Step 5 — Security note
      const sourceInfo = (skill as any).source
        ? `\nSource: ${(skill as any).source}`
        : '';
      p.note(i18n.security_msg + sourceInfo, i18n.security_title);

      // Step 6 — Confirm
      const proceed = await p.confirm({
        message: i18n.proceed,
        initialValue: true,
      });

      if (p.isCancel(proceed) || !proceed) {
        if (p.isCancel(proceed)) {
          p.cancel(i18n.cancelled);
          process.exit(0);
        }
        continue;
      }

      // Step 7 — Install
      const spin = p.spinner();
      spin.start(i18n.installing);

      let installed: string[] = [];
      try {
        installed = await installSkill(skill.id, skill.content, selectedClients, selectedScope);
        spin.stop(i18n.done_installing);
      } catch (err) {
        spin.stop(i18n.err_install);
        p.log.error(String(err));
      }

      // Step 8 — Final summary
      if (installed.length > 0) {
        const finalSummary = installed.map(f => `  ${relativePath(f)}`).join('\n');
        p.note(finalSummary, i18n.install_summary(1));
      }

      // Step 9 — Next action
      const next = await p.select({
        message: i18n.what_next,
        options: [
          { value: 'another', label: i18n.another_skill },
          { value: 'back',    label: i18n.back_techs2 },
          { value: 'exit',    label: i18n.exit },
        ],
      });

      if (p.isCancel(next) || next === 'exit') {
        p.cancel(i18n.goodbye);
        process.exit(0);
      }

      if (next === 'back') break;
    }
  }
}
