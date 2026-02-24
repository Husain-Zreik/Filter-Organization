/**
 * @param {{
 *   variant?: 'primary' | 'secondary' | 'ghost',
 *   size?: 'sm' | 'md' | 'lg',
 *   as?: 'button' | 'a',
 *   className?: string,
 *   children: React.ReactNode,
 *   [key: string]: any
 * }} props
 */
export default function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className = '',
  children,
  ...rest
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 cursor-pointer'

  const variants = {
    primary: 'bg-primary text-white hover:bg-accent',
    secondary: 'border border-primary/30 text-primary hover:bg-primary hover:text-white',
    ghost: 'text-accent hover:text-primary underline-offset-2 hover:underline',
  }

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-sm px-6 py-3',
  }

  return (
    <Tag className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}
