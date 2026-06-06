#!/usr/bin/env node
import * as p from '@clack/prompts';
import pc from 'picocolors';
import { showSkillsMenu } from './menus/skills.js';
import { showMcpsMenu } from './menus/mcps.js';
import { runAddCommand } from './commands/add.js';
import { getTechnologies, getMCPs } from './utils/catalog.js';
import { detectLang, t } from './utils/i18n.js';

const BANNER = `
 ██████╗ ███████╗██╗   ██╗███████╗██╗  ██╗██╗██╗     ██╗     ███████╗
 ██╔══██╗██╔════╝██║   ██║██╔════╝██║ ██╔╝██║██║     ██║     ██╔════╝
 ██║  ██║█████╗  ██║   ██║███████╗█████╔╝ ██║██║     ██║     ███████╗
 ██║  ██║██╔══╝  ╚██╗ ██╔╝╚════██║██╔═██╗ ██║██║     ██║     ╚════██║
 ██████╔╝███████╗ ╚████╔╝ ███████║██║  ██╗██║███████╗███████╗███████║
 ╚═════╝ ╚══════╝  ╚═══╝  ╚══════╝╚═╝  ╚═╝╚═╝╚══════╝╚══════╝╚══════╝`;

async function main() {
  const argv = process.argv.slice(2);
  const lang = detectLang();
  const i18n = t(lang);

  if (argv[0] === 'add') {
    console.log('');
    await runAddCommand(argv.slice(1), lang);
    return;
  }

  console.clear();
  console.log(pc.cyan(BANNER));
  console.log('');
  console.log(pc.dim('  Skills & MCPs para desarrolladores de agentes IA'));
  console.log(pc.dim('  github.com/IamBlack0/devskills'));
  console.log('');
  console.log(pc.dim(`  ${i18n.langDetected}`));
  console.log('');

  const techs = getTechnologies();
  const mcps = getMCPs();
  const totalSkills = techs.reduce((a, t) => a + t.skillCount, 0);

  p.intro(pc.dim(`${totalSkills} skills  ·  ${mcps.length} MCPs`));

  while (true) {
    const section = await p.select({
      message: i18n.what_do,
      options: [
        {
          value: 'skills',
          label: i18n.explore_skills,
          hint: i18n.skills_hint(totalSkills),
        },
        {
          value: 'mcps',
          label: i18n.explore_mcps,
          hint: i18n.mcps_hint(mcps.length),
        },
        {
          value: 'exit',
          label: i18n.exit,
        },
      ],
    });

    if (p.isCancel(section) || section === 'exit') break;

    if (section === 'skills') {
      await showSkillsMenu(lang);
    } else {
      await showMcpsMenu(lang);
    }
  }

  p.outro(pc.dim(i18n.goodbye));
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
