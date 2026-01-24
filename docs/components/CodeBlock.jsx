import { useState } from 'react'

export function CodeBlock({ children, className = '', ...props }) {
  const [copied, setCopied] = useState(false)
  
  // Extract language from className (e.g., "language-bash")
  const languageMatch = className.match(/language-(\w+)/)
  const language = languageMatch ? languageMatch[1] : 'bash'
  
  // Get code text from children
  const codeText = typeof children === 'string' 
    ? children 
    : children?.props?.children || String(children)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(codeText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-matte-border">
      <div className="bg-matte-dark px-4 py-2 border-b border-matte-border flex items-center justify-between">
        <span className="text-gray-400 text-sm font-medium uppercase">
          {language}
        </span>
        <button
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          {copied ? '✓ Copied' : 'Copy'}
        </button>
      </div>
      <pre className="bg-matte-dark p-4 overflow-x-auto">
        <code className={className}>{children}</code>
      </pre>
    </div>
  )
}

// Also export as default for MDX
export default CodeBlock
