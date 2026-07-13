export function Footer() {
  return (
    <footer className="border-t border-surface/40 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] tracking-[0.3em] uppercase text-text-muted font-mono">
            &copy; {new Date().getFullYear()} MAKIAVELOH
          </p>
          <div className="flex items-center gap-4">
            {[
              { label: 'GitHub', href: 'https://github.com/makiaveloh' },
              { label: 'Instagram', href: 'https://instagram.com/makiaveloh' },
              { label: 'Email', href: 'mailto:hello@makiaveloh.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[9px] tracking-[0.3em] uppercase text-text-muted hover:text-accent transition-colors font-mono"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
