import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import matter from 'gray-matter';

// Find content/ relative to the running binary, works in both bundle and dev
const _bin = dirname(process.argv[1] ?? process.cwd());
const CONTENT_DIR = (['content', '../dist/content', '../../content', '../../../content']
  .map(r => join(_bin, r))
  .find(p => existsSync(p))) ?? join(_bin, 'content');

export interface TechMeta {
  id: string;
  label: string;
  icon: string;
  description: string;
  skillCount: number;
}

export interface Skill {
  id: string;
  tech: string;
  title: string;
  description: string;
  tags: string[];
  content: string;
}

export interface MCP {
  id: string;
  title: string;
  description: string;
  repo: string;
  url: string;
  clients: string[];
  category: string;
  install: string;
  author: string;
  stars: number;
  content: string;
}

export function getTechnologies(): TechMeta[] {
  const skillsDir = join(CONTENT_DIR, 'skills');
  const techs = readdirSync(skillsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const metaPath = join(skillsDir, d.name, '_meta.json');
      const meta = existsSync(metaPath)
        ? JSON.parse(readFileSync(metaPath, 'utf8'))
        : { label: d.name, icon: '📄', description: '' };
      const skills = getSkillsForTech(d.name);
      return { id: d.name, ...meta, skillCount: skills.length } as TechMeta;
    });
  return techs;
}

export function getSkillsForTech(techId: string): Skill[] {
  const techDir = join(CONTENT_DIR, 'skills', techId);
  if (!existsSync(techDir)) return [];

  return readdirSync(techDir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const raw = readFileSync(join(techDir, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        id: file.replace('.md', ''),
        tech: techId,
        title: data.title ?? data.name ?? file,
        description: data.description ?? '',
        tags: data.tags ?? [],
        content,
      } as Skill;
    });
}

export function getMCPs(): MCP[] {
  const mcpsDir = join(CONTENT_DIR, 'mcps');
  if (!existsSync(mcpsDir)) return [];

  return readdirSync(mcpsDir)
    .filter(f => f.endsWith('.md'))
    .flatMap(file => {
      const raw = readFileSync(join(mcpsDir, file), 'utf8');
      const { data, content } = matter(raw);
      if (data.hidden) return [];
      return [{
        id: file.replace('.md', ''),
        title: data.title ?? file,
        description: data.description ?? '',
        repo: data.repo ?? '',
        url: data.url ?? '',
        clients: data.clients ?? [],
        category: data.category ?? '',
        install: data.install ?? '',
        author: data.author ?? '',
        stars: data.stars ?? 0,
        content,
      } as MCP];
    });
}
