import config from '../../lib/config'

const SOCIAL_LABELS: Record<string, string> = {
  github: 'GitHub',
  instagram: 'Instagram',
  email: 'Email',
}

export function Footer() {
  const socials = Object.entries(config.socials).filter(
    ([, value]) => value,
  )

  return (
    <footer className="border-t border-surface/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted font-mono">
            &copy; {new Date().getFullYear()} {config.name}
          </p>
          {socials.length > 0 && (
            <div className="flex items-center gap-4">
              {socials.map(([key, href]) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] tracking-[0.3em] uppercase text-text-muted hover:text-accent transition-colors font-mono"
                >
                  {SOCIAL_LABELS[key] ?? key}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    </footer>
  )
}
