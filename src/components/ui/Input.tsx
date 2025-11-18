import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errorMessage?: string
  containerClassName?: string
}

export const Input = ({
  label,
  errorMessage,
  id,
  containerClassName = '',
  className = '',
  ...rest
}: InputProps) => {
  return (
    <div className={`space-y-1 ${containerClassName}`}>
      {label && (
        <label className="block text-slate-600" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-md border border-slate-200 px-2 py-1.5 text-xs outline-none focus:border-slate-400 ${className}`}
        {...rest}
      />
      {errorMessage && <p className="text-[11px] text-red-500">{errorMessage}</p>}
    </div>
  )
}
