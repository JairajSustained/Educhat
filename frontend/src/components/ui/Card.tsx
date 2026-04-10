import { clsx } from 'clsx'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export function Card({ children, className, hover = false, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'bg-white rounded-xl shadow-sm border border-gray-200 p-6',
        hover && 'hover:shadow-md hover:border-primary-200 transition-all cursor-pointer',
        className
      )}
    >
      {children}
    </div>
  )
}

Card.Header = function CardHeader({ 
  children, 
  className,
  action 
}: { 
  children: React.ReactNode
  className?: string
  action?: React.ReactNode
}) {
  return (
    <div className={clsx('flex items-center justify-between mb-4', className)}>
      <div className="flex-1">{children}</div>
      {action && <div>{action}</div>}
    </div>
  )
}

Card.Title = function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h3 className={clsx('text-lg font-semibold text-gray-900', className)}>
      {children}
    </h3>
  )
}

Card.Description = function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={clsx('text-sm text-gray-500 mt-1', className)}>
      {children}
    </p>
  )
}

Card.Content = function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>
}

Card.Footer = function CardFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx('mt-4 pt-4 border-t border-gray-100 flex items-center gap-3', className)}>
      {children}
    </div>
  )
}
