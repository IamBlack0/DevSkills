import pc from 'picocolors';

export function renderSkillCard(title: string, description: string, tags: string[]): void {
  const line = '─'.repeat(Math.min(Math.max(title.length + 4, 40), 64));
  console.log('');
  console.log(pc.cyan(`  ┌${line}┐`));
  console.log(pc.cyan(`  │  `) + pc.bold(title.padEnd(line.length - 2)) + pc.cyan(' │'));
  console.log(pc.cyan(`  └${line}┘`));
  if (description) {
    const words = description.split(' ');
    const maxWidth = 60;
    let line2 = '';
    for (const word of words) {
      if ((line2 + word).length > maxWidth) {
        console.log(`  ${pc.dim(line2.trim())}`);
        line2 = word + ' ';
      } else {
        line2 += word + ' ';
      }
    }
    if (line2.trim()) console.log(`  ${pc.dim(line2.trim())}`);
  }
  if (tags.length > 0) {
    console.log(`  ${pc.dim(tags.map(t => `[${t}]`).join(' '))}`);
  }
  console.log('');
}

export function renderMCPCard(mcp: {
  title: string;
  description: string;
  repo: string;
  author: string;
  stars: number;
  clients: string[];
  install: string;
}): void {
  console.log('');
  console.log(`  ${pc.bold(pc.cyan(mcp.title))}`);
  if (mcp.description) {
    const short = mcp.description.length > 70 ? mcp.description.slice(0, 70) + '...' : mcp.description;
    console.log(`  ${pc.dim(short)}`);
  }
  console.log('');
  if (mcp.repo) console.log(`  ${pc.dim('Repo:')}     ${pc.blue(mcp.repo)}`);
  if (mcp.author) console.log(`  ${pc.dim('Autor:')}    ${mcp.author}  ${mcp.stars > 0 ? pc.dim(`(${mcp.stars.toLocaleString()} stars)`) : ''}`);
  if (mcp.clients.length > 0) console.log(`  ${pc.dim('Clientes:')} ${mcp.clients.join(', ')}`);
  console.log('');
  if (mcp.install) {
    console.log(`  ${pc.dim('Instalacion:')}`);
    console.log(`  ${pc.green(mcp.install)}`);
  }
  console.log('');
}
