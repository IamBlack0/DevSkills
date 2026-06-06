export interface GitHubStats {
  stars: number;
  pushedAt: string; // ISO date del último push
}

function extractOwnerRepo(repoUrl: string): string | null {
  // Maneja: github.com/owner/repo  y  github.com/owner/repo/tree/main/src/...
  const match = repoUrl.match(/github\.com\/([^/]+\/[^/]+)/);
  return match ? match[1] : null;
}

export async function fetchGitHubStats(repoUrl: string): Promise<GitHubStats | null> {
  const ownerRepo = extractOwnerRepo(repoUrl);
  if (!ownerRepo) return null;

  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'devskills-build',
  };

  // GitHub Actions provee GITHUB_TOKEN automáticamente; en local es opcional
  const token = process.env.GITHUB_TOKEN;
  if (token) headers['Authorization'] = `Bearer ${token}`;

  try {
    const res = await fetch(`https://api.github.com/repos/${ownerRepo}`, { headers });
    if (!res.ok) return null;

    const data = await res.json() as { stargazers_count: number; pushed_at: string };
    return {
      stars: data.stargazers_count,
      pushedAt: data.pushed_at,
    };
  } catch {
    return null;
  }
}

export function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  const now  = new Date();
  const days = Math.floor((now.getTime() - date.getTime()) / 86_400_000);

  if (days === 0) return 'hoy';
  if (days === 1) return 'ayer';
  if (days  < 30) return `hace ${days} días`;
  if (days < 365) {
    const m = Math.floor(days / 30);
    return `hace ${m} mes${m > 1 ? 'es' : ''}`;
  }
  const y = Math.floor(days / 365);
  return `hace ${y} año${y > 1 ? 's' : ''}`;
}
