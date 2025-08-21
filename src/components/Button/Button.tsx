type ButtonProps = {
  text: string
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export default function Button({
    text,
    onClick,
    className = '',
    disabled = false
}: ButtonProps) {
  const baseClasses =
    'border border-white rounded-full text-white font-neueMontreal font-medium cursor-pointer px-5 py-2 transition duration-500 ease-in-out hover:scale-110 hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed'

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
      type="button">
      {text}
    </button>
  )
}
