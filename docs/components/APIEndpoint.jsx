export function APIEndpoint({ method, path, description, children }) {
  const methodColors = {
    GET: 'text-green-400',
    POST: 'text-blue-400',
    PUT: 'text-yellow-400',
    PATCH: 'text-orange-400',
    DELETE: 'text-red-400',
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
      {children}
    </div>
  )
}
