/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ide: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          tabs: '#2d2d2d',
          tabActive: '#1e1e1e',
          border: '#3d3d3d',
          text: '#d4d4d4',
          textDim: '#858585',
          textMuted: '#6a6a6a',
          accent: '#4fc1ff',
          accentSecondary: '#c586c0',
          string: '#ce9178',
          keyword: '#569cd6',
          comment: '#6a9955',
          number: '#b5cea8',
          statusBg: '#007acc',
          statusText: '#ffffff',
        },
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
      },
    },
  },
  plugins: [],
};
