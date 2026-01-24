export function APIEndpoint({ method, path, description, children }) {
  const methodColors = {
    GET: 'text-white',
    POST: 'text-white',
    PUT: 'text-white',
    PATCH: 'text-white',
    DELETE: 'text-white',
  }

  return (
    <div className="my-6 p-6 bg-matte-dark border border-matte-border rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <span className={`font-mono font-bold ${methodColors[method] || 'text-white'}`}>
          {method}
        </span>
        <code className="text-white font-mono">{path}</code>
      </div>
      {description && (
        <p className="text-gray-300 mb-4">{description}</p>
      )}
      <div className="text-gray-300">{children}</div>
    </div>
  )
}

// Also export as default for MDX
export default APIEndpoint
