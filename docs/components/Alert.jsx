export function Alert({ type = 'info', title, children }) {
  const styles = {
    info: 'border-blue-500/30 bg-blue-500/10',
    warning: 'border-yellow-500/30 bg-yellow-500/10',
    success: 'border-green-500/30 bg-green-500/10',
    error: 'border-red-500/30 bg-red-500/10',
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
