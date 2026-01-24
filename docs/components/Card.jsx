export function Card({ title, icon, children, className = '' }) {
  return (
    <div className={`p-6 bg-matte-dark border border-matte-border rounded-lg ${className}`}>
      {title && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <span className="text-2xl">{icon}</span>}
          <h3 className="text-xl font-bold text-white">{title}</h3>
        </div>
      )}
      {children}
    </div>
  )
}
