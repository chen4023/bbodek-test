'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import type { SelectBoxProps } from './select.type'
import { selectVariants } from './select.variants'
import { Select } from './Select'

export function SelectBox({
  options,
  value,
  onChange,
  placeholder = '선택하세요',
  disabled = false,
  className,
  name,
  required = false,
  id,
}: SelectBoxProps) {

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getState = () => {
    if (disabled) return 'disabled'
    if (value) return 'filled'
    return 'default'
  }

  const selectedOption = options.find(opt => opt.value === value)

  const handleSelect = (optionValue: string) => {
    onChange?.(optionValue)
    setIsOpen(false)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  // 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden input for form submission */}
      {name && <input type="hidden" name={name} value={value || ''} />}

      {/* Select 버튼 */}
      <button
        type="button"
        id={id}
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={cn(
          selectVariants({ state: getState() }),
          className
        )}
      >
        <span className={cn('block pt-4', !selectedOption && 'text-gray-300')}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>


        {/* 드롭다운 화살표 */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2">
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              'text-gray-300 transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          >
            <path
              d="M1 1.5L6 6.5L11 1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>


      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <>
          {/* 오버레이 */}
          <div
            className="fixed inset-0 bg-black/20 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* 바텀시트 */}
          <div className="fixed bottom-0 left-0 right-0 z-50 max-w-[460px] mx-auto animate-slide-up">
            <div className="bg-white rounded-t-3xl shadow-lg min-h-[90vh] max-h-[100vh] overflow-hidden">
              {/* 헤더 */}
              <div className="sticky top-0 bg-white px-6 py-4 border-gray-100">
                <h3 className="text-lg font-bold text-black text-center">
                  {placeholder}
                </h3>
              </div>

              {/* 옵션 리스트 */}
              <div className="overflow-y-auto  px-4 py-2 flex flex-col gap-4">
                {options.map((opt) => {
                  const selected = value === opt.value;
                  const isDisabled = !!opt.disabled;

                  return (
                    <li key={opt.value}>
                      <button
                        type="button"
                        disabled={isDisabled}
                        onClick={() => { if (!isDisabled) { onChange(opt.value); onClose(); } }}
                        className={cn(selectVariants({ selected, disabled: isDisabled }))}
                        aria-pressed={selected}
                      >
                        {opt.label}
                      </button>
                    </li>
                  )
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}