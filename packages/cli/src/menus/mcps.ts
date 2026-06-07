import * as p from '@clack/prompts';
import pc from 'picocolors';
import { spawn } from 'node:child_process';
import { writeFileSync, readFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { homedir } from 'node:os';
import { getMCPs, type MCP } from '../utils/catalog.js';
import { renderMCPCard } from '../utils/render.js';
import { type Lang, type T, t } from '../utils/i18n.js';

function buildMCPEntry(mcp: MCP): { command: string; args: string[] } {
  const parts = mcp.install.trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);
  if (command === 'npx' && !args.includes('-y')) args.unshift('-y');
  return { command, args };
}

function writeMCPToFile(filePath: string, mcp: MCP): 'created' | 'updated' {
  let config: { mcpServers: Record<string, unknown> } = { mcpServers: {} };
  const existed = existsSync(filePath);
  if (existed) {
    try { config = JSON.parse(readFileSync(filePath, 'utf8')); } catch {}
    if (!config.mcpServers) config.mcpServers = {};
  }
  const wasPresent = existed && !!config.mcpServers[mcp.id];
  config.mcpServers[mcp.id] = buildMCPEntry(mcp);
  const dir = dirname(filePath);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(filePath, JSON.stringify(config, null, 2) + '\n', 'utf8');
  return wasPresent ? 'updated' : 'created';
}

function getClients(i18n: T) {
  return [
    {
      value:   'claude-project',
      label:   i18n.install_mcp_claude_proj,
      path:    () => join(process.cwd(), '.mcp.json'),
      restart: i18n.install_mcp_restart_claude,
    },
    {
      value:   'claude-global',
      label:   i18n.install_mcp_claude_glob,
      path:    () => join(homedir(), '.claude', 'settings.json'),
      restart: i18n.install_mcp_restart_claude,
    },
    {
      value:   'cursor',
      label:   i18n.install_mcp_cursor,
      path:    () => join(process.cwd(), '.cursor', 'mcp.json'),
      restart: i18n.install_mcp_restart_cursor,
    },
    {
      value:   'windsurf',
      label:   i18n.install_mcp_windsurf,
      path:    () => join(homedir(), '.codeium', 'windsurf', 'mcp_config.json'),
      restart: i18n.install_mcp_restart_windsurf,
    },
    {
      value:   'print',
      label:   i18n.install_mcp_print,
      path:    () => '',
      restart: '',
    },
  ] as const;
}

async function handleInstall(mcp: MCP, lang: Lang): Promise<void> {
  const i18n = t(lang);
  const clients = getClients(i18n);

  const chosen = await p.select({
    message: i18n.install_mcp_client,
    options: clients.map(c => ({ value: c.value, label: c.label })),
  });

  if (p.isCancel(chosen)) return;

  const client = clients.find(c => c.value === chosen)!;

  if (chosen === 'print') {
    const cfg = { mcpServers: { [mcp.id]: buildMCPEntry(mcp) } };
    console.log('');
    console.log(pc.dim(`  ${i18n.add_config}`));
    console.log('');
    console.log(JSON.stringify(cfg, null, 2).split('\n').map(l => '  ' + l).join('\n'));
    console.log('');
    return;
  }

  const configPath = client.path();
  const result = writeMCPToFile(configPath, mcp);
  const label = result === 'updated' ? i18n.install_mcp_updated : i18n.install_mcp_ok;
  p.log.success(`${label}: ${pc.dim(configPath)}`);
  p.log.info(client.restart);
}

export async function showMcpsMenu(lang: Lang): Promise<void> {
  const i18n = t(lang);
  const mcps = getMCPs();

  if (mcps.length === 0) {
    p.log.error(i18n.no_mcps);
    return;
  }

  while (true) {
    const mcpChoice = await p.select({
      message: `${i18n.explore_mcps}:`,
      options: [
        ...mcps.map(m => ({
          value: m.id,
          label: m.title,
          hint: m.description.length > 55 ? m.description.slice(0, 55) + '...' : m.description,
        })),
        { value: '__back__', label: i18n.back_main },
      ],
    });

    if (p.isCancel(mcpChoice) || mcpChoice === '__back__') return;

    const mcp = mcps.find(m => m.id === mcpChoice)!;
    renderMCPCard(mcp);

    const action = await p.select({
      message: i18n.what_do,
      options: [
        { value: 'install',     label: i18n.install_mcp },
        { value: 'open-repo',   label: i18n.open_repo },
        { value: 'show-config', label: i18n.show_config },
        { value: 'another',     label: i18n.another_mcp },
        { value: 'back',        label: i18n.back_main2 },
        { value: 'exit',        label: i18n.exit },
      ],
    });

    if (p.isCancel(action) || action === 'exit') {
      p.cancel(i18n.goodbye);
      process.exit(0);
    }

    if (action === 'install') await handleInstall(mcp, lang);

    if (action === 'open-repo') {
      if (mcp.repo) {
        p.log.info(mcp.repo);
        const cmd = process.platform === 'win32' ? 'start' : process.platform === 'darwin' ? 'open' : 'xdg-open';
        spawn(cmd, [mcp.repo], { detached: true, stdio: 'ignore', shell: process.platform === 'win32' }).unref();
      } else {
        p.log.warn(i18n.no_repo);
      }
    }

    if (action === 'show-config') {
      const cfg = { mcpServers: { [mcp.id]: buildMCPEntry(mcp) } };
      console.log('');
      console.log(pc.dim(`  ${i18n.add_config}`));
      console.log('');
      console.log(JSON.stringify(cfg, null, 2).split('\n').map(l => '  ' + l).join('\n'));
      console.log('');
    }

    if (action === 'back') return;
  }
}
