'use client'

import { forwardRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { inputVariants } from './input.variants'
import type { InputProps } from './input.type'

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, value, onChange, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)

    const getState = () => {
      if (disabled) return 'disabled'
      if (error) return 'error'
      if (value || isFocused) return 'filled'
      return 'default'
    }

    return (
      <input
        ref={ref}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(inputVariants({ state: getState() }), className)}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'