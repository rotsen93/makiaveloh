export interface SiteConfig {
  name: string
  version: string
  navLinks: { label: string; href: string }[]
  socials: Partial<Record<'github' | 'instagram' | 'email', string>>
  sections: { id: string; heading: string; description: string; ctaLink: string; ctaText: string }[]
}

const config: SiteConfig = {
  name: 'MAKIAVELOH',
  version: '5.0.0',
  navLinks: [
    { label: 'Home', href: '/home' },
    { label: 'Projects', href: '/projects' },
    { label: 'Playground', href: '/playground' },
    { label: 'Blog', href: '/blog' },
  ],
  socials: {
    github: 'https://github.com/makiaveloh',
    email: 'hello@makiaveloh.com',
  },
  sections: [
    {
      id: 'code',
      heading: 'Code',
      description:
        'Full-stack systems. React, Node.js, PostgreSQL. Arquitectura limpia, hexagonal, screaming.',
      ctaLink: '/projects',
      ctaText: 'View Projects',
    },
    {
      id: 'music',
      heading: 'Music',
      description:
        'Produccion musical, sound design, audio engineering. Creatividad como disciplina.',
      ctaLink: '/playground',
      ctaText: 'Explore',
    },
    {
      id: 'philosophy',
      heading: 'Philosophy',
      description:
        'Pensamiento critico, estoicismo practico, epistemologia. Herramientas mentales para crear mejor.',
      ctaLink: '/blog',
      ctaText: 'Read Thoughts',
    },
    {
      id: 'tools',
      heading: 'Tools',
      description:
        'Linux, Neovim, Tmux, Docker. El entorno como extension de la mente.',
      ctaLink: '/playground',
      ctaText: 'Toolchain',
    },
  ],
}

export default config
