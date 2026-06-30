export type Lang = 'es' | 'en';

export function detectLang(): Lang {
  try {
    const stored = localStorage.getItem('devskills-lang') as Lang | null;
    if (stored === 'es' || stored === 'en') return stored;
    const nav = navigator.language.toLowerCase();
    if (nav.startsWith('es')) return 'es';
  } catch {}
  return 'en';
}

const STRINGS = {
  es: {
    welcome: 'Bienvenido a',
    tagline: 'Skills y MCPs curados para developers. Navega el explorador',
    or_use: 'o usa',
    to_search: 'para buscar.',
    skills: 'Skills',
    mcps: 'MCPs',
    disponibles: 'disponibles',
    curados: 'curados',
    tecnologias: 'Tecnologías',
    copiar: 'Copiar',
    copiado: 'Copiado',
    buscando: 'Buscando...',
    home: 'Inicio',
    explorer: 'Explorer',
    ver_todos: 'ver todos...',
    status_path: (p: string) => p || 'inicio',
    search_placeholder: 'Buscar skills y MCPs...',
    no_results: 'Sin resultados',
    skills_available: (n: number) => `${n} skills`,
    herramientas: (n: number) => `${n} herramientas`,
    cliente: 'Cliente:',
    todos: 'todos',
    repositorio: 'Repositorio',
    autor: 'Autor',
    clientes: 'Clientes',
    instalacion: 'Instalación:',
    estrellas: (n: number) => `${n.toLocaleString()} estrellas`,
    cerrar: 'Cerrar',
    repo_link: 'repo',
    welcome_tab: 'Inicio',
    ok: 'OK',
    sidebar_skills: 'skills',
    sidebar_mcps: 'mcps',
    lang_es: 'ES',
    lang_en: 'EN',
    lang_tooltip: 'Cambiar idioma',
    skills_dir: 'skills/',
    mcps_dir: 'mcps/',
    title_suffix: '— DevSkills',
    desc_home: 'Skills y MCPs curados para developers. Explora React, Next.js, TypeScript, Node.js, Python, Claude Code y más herramientas para agentes IA.',
    desc_skills: 'Explora skills por tecnología — React, Next.js, TypeScript, Node.js, Python y Claude Code.',
    desc_mcps: 'Herramientas MCP (Model Context Protocol) para agentes IA — Context7, Fetch, Filesystem, Memory, GitHub, Playwright y más.',
    mcps_subtitle: 'Herramientas para agentes IA — verificadas y con repositorio',
    npx_cmd: 'npx devskills-cli',
  },
  en: {
    welcome: 'Welcome to',
    tagline: 'Curated skills & MCPs for developers. Browse the explorer',
    or_use: 'or use',
    to_search: 'to search.',
    skills: 'Skills',
    mcps: 'MCPs',
    disponibles: 'available',
    curados: 'curated',
    tecnologias: 'Technologies',
    copiar: 'Copy',
    copiado: 'Copied',
    buscando: 'Searching...',
    home: 'Home',
    explorer: 'Explorer',
    ver_todos: 'view all...',
    status_path: (p: string) => p || 'home',
    search_placeholder: 'Search skills and MCPs...',
    no_results: 'No results',
    skills_available: (n: number) => `${n} skills`,
    herramientas: (n: number) => `${n} tools`,
    cliente: 'Client:',
    todos: 'all',
    repositorio: 'Repository',
    autor: 'Author',
    clientes: 'Clients',
    instalacion: 'Installation:',
    estrellas: (n: number) => `${n.toLocaleString()} stars`,
    cerrar: 'Close',
    repo_link: 'repo',
    welcome_tab: 'Welcome',
    ok: 'OK',
    sidebar_skills: 'skills',
    sidebar_mcps: 'mcps',
    lang_es: 'ES',
    lang_en: 'EN',
    lang_tooltip: 'Change language',
    skills_dir: 'skills/',
    mcps_dir: 'mcps/',
    title_suffix: '— DevSkills',
    desc_home: 'Curated skills & MCPs for developers. Explore React, Next.js, TypeScript, Node.js, Python, Claude Code and more AI agent tools.',
    desc_skills: 'Browse skills by technology — React, Next.js, TypeScript, Node.js, Python and Claude Code.',
    desc_mcps: 'MCP (Model Context Protocol) tools for AI agents — Context7, Fetch, Filesystem, Memory, GitHub, Playwright and more.',
    mcps_subtitle: 'AI agent tools — verified with repositories',
    npx_cmd: 'npx devskills-cli',
  },
} as const;

export type I18nStrings = typeof STRINGS['es'];

export function t(lang: Lang): I18nStrings {
  return STRINGS[lang] as I18nStrings;
}

export function currentLang(): Lang {
  return detectLang();
}

export function setLang(lang: Lang): void {
  try {
    localStorage.setItem('devskills-lang', lang);
  } catch {}
}
