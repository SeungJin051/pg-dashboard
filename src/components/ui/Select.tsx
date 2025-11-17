interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
}

/**
 * Select 드롭다운 컴포넌트
 * 공통 스타일의 드롭다운을 제공합니다.
 */
export const Select = ({ value, onChange, options, placeholder, className = '' }: SelectProps) => {
  return (
    <select
      className={`cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  )
}
