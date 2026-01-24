import { useState } from 'react'

export function CodeBlock({ children, language = 'bash', title, filename }) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(children)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-matte-border">
      {(title || filename) && (
        <div className="bg-matte-dark px-4 py-2 border-b border-matte-border flex items-center justify-between">
          <span className="text-gray-400 text-sm font-medium">
            {filename || title}
          </span>
          <button
            onClick={copyToClipboard}
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
        </div>
      )}
      <pre className="bg-matte-dark p-4 overflow-x-auto">
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  )
}
