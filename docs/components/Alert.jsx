export function Alert({ type = 'info', title, children }) {
  const styles = {
    info: 'border-matte-border bg-matte-dark',
    warning: 'border-matte-border bg-matte-dark',
    success: 'border-matte-border bg-matte-dark',
    error: 'border-matte-border bg-matte-dark',
  }

  return (
    <div className={`my-6 p-4 border rounded-lg ${styles[type]}`}>
      {title && (
        <h4 className="font-semibold text-white mb-2">{title}</h4>
      )}
      <div className="text-gray-300">{children}</div>
    </div>
  )
}

// Also export as default for MDX
export default Alert
