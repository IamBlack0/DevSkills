import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';

export interface InstallTarget {
  id: string;
  label: string;
  folder: string;
}

// Agents that benefit from .agents/skills/ automatically (universal folder)
export const UNIVERSAL_AGENTS = [
  'OpenAI Codex', 'Gemini CLI', 'Cursor', 'Amp', 'OpenCode',
  'Roo Code', 'Goose', 'Windsurf', 'Factory', 'Workshop',
  'Autohand', 'OpenHands', 'Mux', 'Piebald', 'nanobot',
];

// Agents with their own dedicated skills folder (beyond universal)
export const INSTALL_TARGETS: InstallTarget[] = [
  { id: 'claude-code', label: 'Claude Code    (.claude/skills)',    folder: '.claude/skills' },
  { id: 'cursor',      label: 'Cursor         (.cursor/skills)',    folder: '.cursor/skills' },
  { id: 'gemini-cli',  label: 'Gemini CLI     (.gemini/skills)',    folder: '.gemini/skills' },
  { id: 'roo-code',    label: 'Roo Code       (.roo/skills)',       folder: '.roo/skills' },
  { id: 'opencode',    label: 'OpenCode       (.opencode/skills)',  folder: '.opencode/skills' },
  { id: 'cline',       label: 'Cline          (.cline/skills)',     folder: '.cline/skills' },
  { id: 'continue',    label: 'Continue       (.continue/skills)',  folder: '.continue/skills' },
  { id: 'junie',       label: 'Junie          (.junie/skills)',     folder: '.junie/skills' },
  { id: 'kiro',        label: 'Kiro           (.kiro/skills)',      folder: '.kiro/skills' },
  { id: 'copilot',     label: 'GitHub Copilot (.github/skills)',    folder: '.github/skills' },
];

export const UNIVERSAL_FOLDER = '.agents/skills';

export type Scope = 'project' | 'global';

export function resolveBase(scope: Scope): string {
  return scope === 'global' ? homedir() : process.cwd();
}

// Skills install as directories: <folder>/<skill-id>/SKILL.md  (agentskills spec)
export function getSkillDir(base: string, folder: string, skillId: string): string {
  return join(base, folder, skillId);
}

export function getSkillFile(base: string, folder: string, skillId: string): string {
  return join(base, folder, skillId, 'SKILL.md');
}

export function getTargetPaths(
  skillId: string,
  clientIds: string[],
  base: string
): string[] {
  const paths: string[] = [getSkillFile(base, UNIVERSAL_FOLDER, skillId)];
  for (const id of clientIds) {
    const target = INSTALL_TARGETS.find(t => t.id === id);
    if (target) paths.push(getSkillFile(base, target.folder, skillId));
  }
  return paths;
}

export function relativePath(abs: string): string {
  const cwd = process.cwd().replace(/\\/g, '/');
  const home = homedir().replace(/\\/g, '/');
  const norm = abs.replace(/\\/g, '/');
  if (norm.startsWith(cwd)) return '.' + norm.slice(cwd.length);
  if (norm.startsWith(home)) return '~' + norm.slice(home.length);
  return abs;
}

export async function installSkill(
  skillId: string,
  content: string,
  clientIds: string[],
  scope: Scope = 'project'
): Promise<string[]> {
  const base = resolveBase(scope);
  const paths = getTargetPaths(skillId, clientIds, base);

  for (const p of paths) {
    await mkdir(dirname(p), { recursive: true });
    await writeFile(p, content, 'utf-8');
  }

  await updateLockFile(skillId, paths, scope);
  return paths;
}

// ── Lock file ────────────────────────────────────────────────

interface LockFile {
  version: number;
  skills: Record<string, {
    source: string;
    installedAt: string;
    scope: string;
    paths: string[];
  }>;
}

async function updateLockFile(skillId: string, paths: string[], scope: Scope): Promise<void> {
  const base = resolveBase(scope);
  const lockPath = join(base, 'skills-lock.json');

  let lock: LockFile = { version: 1, skills: {} };
  if (existsSync(lockPath)) {
    try {
      const raw = JSON.parse(await readFile(lockPath, 'utf-8'));
      if (raw?.skills) lock = raw;
    } catch {}
  }

  lock.skills[skillId] = {
    source: 'devskills-catalog',
    installedAt: new Date().toISOString(),
    scope,
    paths: paths.map(relativePath),
  };

  const sorted: LockFile['skills'] = {};
  for (const k of Object.keys(lock.skills).sort()) sorted[k] = lock.skills[k];
  lock.skills = sorted;

  await writeFile(lockPath, JSON.stringify(lock, null, 2) + '\n', 'utf-8');
}
