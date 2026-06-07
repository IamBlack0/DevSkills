import { UNIVERSAL_AGENTS } from './installer.js';

export type Lang = 'es' | 'en';

export function detectLang(): Lang {
  const env = [
    process.env.LANG,
    process.env.LANGUAGE,
    process.env.LC_ALL,
    process.env.LC_MESSAGES,
  ].filter(Boolean).join(' ').toLowerCase();

  if (env.includes('es_') || env.startsWith('es')) return 'es';

  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase();
    if (locale.startsWith('es')) return 'es';
  } catch {}

  return 'en';
}

function agentList(max = 6): string {
  const shown = UNIVERSAL_AGENTS.slice(0, max).join(', ');
  const rest  = UNIVERSAL_AGENTS.length - max;
  return rest > 0 ? `${shown} +${rest}` : shown;
}

const STRINGS = {
  es: {
    langDetected:        'Idioma detectado: Español',
    skills:              'Skills',
    mcps:                'MCPs',
    skills_hint:         (n: number) => `Instala skills de agente en tu proyecto (${n} disponibles)`,
    mcps_hint:           (n: number) => `Descubre herramientas para agentes IA (${n} disponibles)`,
    what_do:             '¿Qué quieres hacer?',
    explore_skills:      'Explorar Skills',
    explore_mcps:        'Explorar MCPs',
    exit:                'Salir',
    goodbye:             'Hasta la próxima.',
    select_tech:         'Selecciona una tecnología:',
    back_main:           '<- Volver al menú principal',
    back_techs:          '<- Volver a tecnologías',
    select_skill:        'Selecciona un skill:',
    install_title:       'Instalar skill',

    // Universal section
    universal_title:     'Universal',
    universal_note:      (folder: string) => `${folder}   (siempre incluido)`,
    universal_agents:    () => `Leen esta carpeta: ${agentList()}`,
    install_none:        'Ninguno  (solo universal)',

    // Controls legend — shown line by line via p.log.info
    ctrl_navigate:       '  ↑ ↓    navegar',
    ctrl_space:          '  Space  seleccionar / deseleccionar',
    ctrl_a:              '  A      seleccionar / deseleccionar todos',
    ctrl_enter:          '  Enter  confirmar   (sin seleccion = solo universal)',

    clients_note:        'Selecciona clientes adicionales (opcional)',
    install_also:        'Instalar tambien en:',
    install_hint:        'Space para seleccionar · Enter para confirmar · ninguno = solo universal',

    scope_q:             'Alcance de instalacion:',
    scope_project:       'Proyecto actual',
    scope_project_hint:  'instala en el directorio actual',
    scope_global:        'Global (usuario)',
    scope_global_hint:   'instala en tu directorio home (~)',

    summary_title:       'Resumen de instalacion',
    security_title:      'Nota de seguridad',
    security_msg:        'Los skills se ejecutan con permisos completos del agente.\n' +
                         'Revisa el contenido antes de proceder.',
    proceed:             '¿Proceder con la instalacion?',
    cancelled:           'Cancelado.',
    installing:          'Instalando...',
    done_installing:     'Listo',
    install_summary:     (n: number) => `${n} skill${n !== 1 ? 's' : ''} instalado${n !== 1 ? 's' : ''}`,
    what_next:           '¿Que quieres hacer?',
    another_skill:       'Ver otro skill',
    back_techs2:         'Volver a tecnologias',

    open_repo:                   'Abrir repositorio en el navegador',
    show_config:                 'Ver configuracion JSON',
    install_mcp:                 'Instalar MCP',
    install_mcp_client:          '¿En qué cliente instalas?',
    install_mcp_claude_proj:     'Claude Code  (proyecto)  →  .mcp.json',
    install_mcp_claude_glob:     'Claude Code  (global)    →  ~/.claude/settings.json',
    install_mcp_cursor:          'Cursor  →  .cursor/mcp.json',
    install_mcp_windsurf:        'Windsurf  →  ~/.codeium/windsurf/mcp_config.json',
    install_mcp_print:           'Solo mostrar JSON',
    install_mcp_ok:              'Instalado en',
    install_mcp_updated:         'Actualizado en',
    install_mcp_restart_claude:  '↻  Reinicia Claude Code (o escribe /mcp en el chat)',
    install_mcp_restart_cursor:  '↻  Reinicia Cursor para cargar el MCP',
    install_mcp_restart_windsurf:'↻  Reinicia Windsurf para cargar el MCP',
    another_mcp:         'Ver otro MCP',
    back_main2:          'Volver al menu principal',
    no_repo:             'Este MCP no tiene repositorio configurado.',
    add_config:          'Agrega esto a tu archivo de configuracion MCP:',

    no_techs:            'No se encontraron tecnologias en el catalogo.',
    no_mcps:             'No se encontraron MCPs en el catalogo.',
    err_install:         'Error al instalar',

    add_usage:           'Uso: npx devskills-cli add <github-url> --skill <nombre>',
    add_example:         'Ejemplo: npx devskills-cli add https://github.com/anthropics/claude-code --skill frontend-design',
    add_specify:         'Especifica el nombre con --skill <nombre>',
    add_searching:       (skill: string, url: string) => `Buscando ${skill} en ${url.replace('https://', '')}...`,
    add_fetching:        (url: string) => `Descargando desde ${url}...`,
    add_not_found:       (skill: string) => `No se encontro SKILL.md para "${skill}" en el repositorio.`,
    add_try_direct:      'Intenta proporcionar la URL directa al archivo SKILL.md.',
    add_installed:       'Instalado:',
    summary_copy_to:     (clients: string[]) =>
      clients.length > 0
        ? `copy -> ${clients.slice(0, 4).join(', ')}${clients.length > 4 ? ` +${clients.length - 4}` : ''}`
        : '',
  },
  en: {
    langDetected:        'Language detected: English',
    skills:              'Skills',
    mcps:                'MCPs',
    skills_hint:         (n: number) => `Install agent skills into your project (${n} available)`,
    mcps_hint:           (n: number) => `Discover AI agent tools (${n} available)`,
    what_do:             'What would you like to do?',
    explore_skills:      'Browse Skills',
    explore_mcps:        'Browse MCPs',
    exit:                'Exit',
    goodbye:             'Goodbye.',
    select_tech:         'Select a technology:',
    back_main:           '<- Back to main menu',
    back_techs:          '<- Back to technologies',
    select_skill:        'Select a skill:',
    install_title:       'Install skill',

    // Universal section
    universal_title:     'Universal',
    universal_note:      (folder: string) => `${folder}   (always included)`,
    universal_agents:    () => `Read by: ${agentList()}`,
    install_none:        'None  (universal only)',

    // Controls legend
    ctrl_navigate:       '  up/down  navigate',
    ctrl_space:          '  Space    select / deselect',
    ctrl_a:              '  A        select / deselect all',
    ctrl_enter:          '  Enter    confirm   (nothing selected = universal only)',

    clients_note:        'Select additional clients (optional)',
    install_also:        'Also install to:',
    install_hint:        'Space to select · Enter to confirm · none = universal only',

    scope_q:             'Installation scope:',
    scope_project:       'Current project',
    scope_project_hint:  'installs in the current directory',
    scope_global:        'Global (user)',
    scope_global_hint:   'installs in your home directory (~)',

    summary_title:       'Installation Summary',
    security_title:      'Security Note',
    security_msg:        'Skills run with full agent permissions.\n' +
                         'Review the content before proceeding.',
    proceed:             'Proceed with installation?',
    cancelled:           'Cancelled.',
    installing:          'Installing...',
    done_installing:     'Done',
    install_summary:     (n: number) => `${n} skill${n !== 1 ? 's' : ''} installed`,
    what_next:           'What would you like to do?',
    another_skill:       'View another skill',
    back_techs2:         'Back to technologies',

    open_repo:                   'Open repository in browser',
    show_config:                 'View JSON configuration',
    install_mcp:                 'Install MCP',
    install_mcp_client:          'Which client are you installing for?',
    install_mcp_claude_proj:     'Claude Code  (project)  →  .mcp.json',
    install_mcp_claude_glob:     'Claude Code  (global)   →  ~/.claude/settings.json',
    install_mcp_cursor:          'Cursor  →  .cursor/mcp.json',
    install_mcp_windsurf:        'Windsurf  →  ~/.codeium/windsurf/mcp_config.json',
    install_mcp_print:           'Show JSON only',
    install_mcp_ok:              'Installed to',
    install_mcp_updated:         'Updated in',
    install_mcp_restart_claude:  '↻  Restart Claude Code (or type /mcp in the chat)',
    install_mcp_restart_cursor:  '↻  Restart Cursor to load the MCP',
    install_mcp_restart_windsurf:'↻  Restart Windsurf to load the MCP',
    another_mcp:         'View another MCP',
    back_main2:          'Back to main menu',
    no_repo:             'This MCP has no repository configured.',
    add_config:          'Add this to your MCP configuration file:',

    no_techs:            'No technologies found in the catalog.',
    no_mcps:             'No MCPs found in the catalog.',
    err_install:         'Installation error',

    add_usage:           'Usage: npx devskills-cli add <github-url> --skill <name>',
    add_example:         'Example: npx devskills-cli add https://github.com/anthropics/claude-code --skill frontend-design',
    add_specify:         'Specify the skill name with --skill <name>',
    add_searching:       (skill: string, url: string) => `Searching for ${skill} in ${url.replace('https://', '')}...`,
    add_fetching:        (url: string) => `Fetching from ${url}...`,
    add_not_found:       (skill: string) => `Could not find SKILL.md for "${skill}" in the repository.`,
    add_try_direct:      'Try providing a direct URL to the SKILL.md file.',
    add_installed:       'Installed:',
    summary_copy_to:     (clients: string[]) =>
      clients.length > 0
        ? `copy -> ${clients.slice(0, 4).join(', ')}${clients.length > 4 ? ` +${clients.length - 4}` : ''}`
        : '',
  },
} as const;

export type T = typeof STRINGS['es'];

export function t(lang: Lang): T {
  return STRINGS[lang] as T;
}
