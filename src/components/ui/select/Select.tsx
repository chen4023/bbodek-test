'use client'

import { cn } from '@/lib/utils'
import { selectVariants } from './select.variants'
import type { SelectProps } from './select.type'

export function Select({
  options,
  value,
  onChange,
  disabled = false,
  className,
  name,
  id,
}: SelectProps) {
  const handleSelect = (optionValue: string, optionDisabled?: boolean) => {
    if (disabled || optionDisabled) return
    onChange?.(optionValue)
  }

  return (
    <div className={cn('space-y-3', className)} role="radiogroup" id={id}>
      {options.map((option) => {
        const isSelected = value === option.value
        const isDisabled = disabled || option.disabled

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            aria-disabled={isDisabled}
            disabled={isDisabled}
            onClick={() => handleSelect(option.value, option.disabled)}
            className={cn(
              selectVariants({
                selected: isSelected,
                disabled: isDisabled,
              })
            )}
          >
            {isSelected && name && (
              <input type="hidden" name={name} value={option.value} />
            )}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}