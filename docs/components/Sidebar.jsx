import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Sidebar({ open, onClose }) {
  const router = useRouter()

  const links = [
    {
      section: 'Getting Started',
      items: [
        { href: '/', label: 'Introduction' },
        { href: '/quick-start', label: 'Quick Start' },
        { href: '/authentication', label: 'Authentication' },
      ],
    },
    {
      section: 'API Reference',
      items: [
        { href: '/api/categories', label: 'API Categories' },
        { href: '/api/request-response', label: 'Request & Response' },
        { href: '/api/examples', label: 'Code Examples' },
      ],
    },
    {
      section: 'Integration Guides',
      items: [
        { href: '/guides/operator-setup', label: 'Operator Setup' },
        { href: '/guides/gaming-operators', label: 'Gaming Operators' },
        { href: '/guides/pension-providers', label: 'Pension Providers' },
        { href: '/guides/utility-providers', label: 'Utility Providers' },
        { href: '/guides/events', label: 'Events & Entertainment' },
      ],
    },
  ]

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`
          fixed top-20 left-0 h-[calc(100vh-5rem)] w-64 bg-matte-dark border-r border-matte-border
          transform transition-transform duration-300 z-50 overflow-y-auto
          ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        <div className="p-4 space-y-6">
          {links.map((section) => (
            <div key={section.section}>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-3">
                {section.section}
              </h3>
              <nav className="space-y-1">
                {section.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`
                      block px-3 py-2 rounded text-sm transition-colors
                      ${
                        router.pathname === item.href
                          ? 'bg-matte-black text-white border-l-2 border-white'
                          : 'text-gray-400 hover:text-white hover:bg-matte-black'
                      }
                    `}
                    onClick={onClose}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>
      </aside>
    </>
  )
}
