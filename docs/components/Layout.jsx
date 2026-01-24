import { useState } from 'react'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-matte-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-matte-black/90 backdrop-blur-md border-b border-matte-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center">
              <a href="/" className="flex items-center">
                <img 
                  src="/Opendeck/opendeck final.png" 
                  alt="Opendeck Logo" 
                  className="h-8 w-auto"
                />
              </a>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="/" className="text-gray-300 hover:text-white">Docs</a>
              <a href="/api" className="text-gray-300 hover:text-white">API</a>
              <a href="/guides" className="text-gray-300 hover:text-white">Guides</a>
              <a 
                href="https://opendeck.co.uk" 
                className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-matte-black transition"
              >
                Home
              </a>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-white"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="flex pt-20">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 ml-0 md:ml-64">
          {children}
        </main>
      </div>
    </div>
  )
}
