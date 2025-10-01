'use client'

import { useRouter } from 'next/navigation'
import { useFormStore } from '@/hooks/use-form-store'

interface FormProgressProps {
  currentStep: number
  totalSteps: number
}

export default function FormProgress({ currentStep, totalSteps }: FormProgressProps) {
  const router = useRouter()
  const { prevStep, resetForm } = useFormStore()
  const progress = (currentStep / totalSteps) * 100

  const handleBackClick = () => {
    if (currentStep === 1) {
      // 첫 번째 스텝: 메인으로 이동
      if (window.confirm('작성을 취소하고 이동할까요?')) {
        resetForm()
        router.push('/')
      }
    } else {
      // 그 외: 이전 스텝으로
      prevStep()
    }
  }

  const handleHomeClick = () => {
    if (window.confirm('작성을 취소하고 이동할까요?')) {
      resetForm()
      router.push('/')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <button type="button" onClick={handleBackClick} className="text-gray-300 text-lg">
          ←
        </button>
        <button type="button" onClick={handleHomeClick} className="text-gray-300 text-sm">
          메인으로
        </button>
      </div>
      <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary-300 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}