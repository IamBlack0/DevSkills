import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

const CONTENT_DIR = join(process.cwd(), '../../content');

export interface TechMeta {
  id: string;
  label: string;
  icon: string;
  svgUrl?: string;
  description: string;
  descriptionEn?: string;
  descriptionEs?: string;
}

export interface Skill {
  id: string;
  tech: string;
  title: string;
  description: string;
  descriptionEs?: string;
  tags: string[];
  source?: string;
  content: string;
}

export interface MCP {
  id: string;
  title: string;
  description: string;
  descriptionEn?: string;
  repo: string;
  url: string;
  clients: string[];
  category: string;
  install: string;
  author: string;
  stars: number;
  content: string;
  contentEn?: string;
}

export function getTechnologies(): (TechMeta & { skillCount: number })[] {
  const skillsDir = join(CONTENT_DIR, 'skills');
  return readdirSync(skillsDir, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => {
      const metaPath = join(skillsDir, d.name, '_meta.json');
      const meta = existsSync(metaPath)
        ? JSON.parse(readFileSync(metaPath, 'utf8'))
        : { label: d.name, icon: '?', description: '' };
      const skills = getSkillsForTech(d.name);
      return {
        id: d.name,
        ...meta,
        descriptionEn: meta.description_en ?? meta.descriptionEn ?? undefined,
        descriptionEs: meta.description_es ?? meta.descriptionEs ?? undefined,
        skillCount: skills.length,
      };
    });
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
        title: data.title ?? file,
        description: data.description ?? '',
        descriptionEs: data.description_es ?? undefined,
        tags: data.tags ?? [],
        source: data.source ?? undefined,
        content,
      };
    });
}

export function getMCPs(): MCP[] {
  const mcpsDir = join(CONTENT_DIR, 'mcps');
  if (!existsSync(mcpsDir)) return [];
  return readdirSync(mcpsDir)
    .filter(f => f.endsWith('.md'))
    .map(file => {
      const raw = readFileSync(join(mcpsDir, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        id: file.replace('.md', ''),
        title: data.title ?? file,
        description: data.description ?? '',
        descriptionEn: data.description_en ?? undefined,
        repo: data.repo ?? '',
        url: data.url ?? '',
        clients: data.clients ?? [],
        category: data.category ?? '',
        install: data.install ?? '',
        author: data.author ?? '',
        stars: data.stars ?? 0,
        hidden: data.hidden ?? false,
        content: (() => {
          const parts = content.split(/\n?<!-- EN -->\n?/);
          return parts[0].trim();
        })(),
        contentEn: (() => {
          const parts = content.split(/\n?<!-- EN -->\n?/);
          return parts[1]?.trim() ?? undefined;
        })(),
      };
    })
    .filter(mcp => !mcp.hidden);
}
