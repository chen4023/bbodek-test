'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import FormField from '@/components/ui/form-field/FormField'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormStore } from '@/hooks/use-form-store'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { registerKid } from '@/api/kid.actions'

const schema = z.object({
  serviceStartDate: z.string().min(1, '서비스 시작일을 입력해주세요'),
})

type FormData = z.infer<typeof schema>

export function StepFour() {
  const router = useRouter()
  const { formData, updateFormData, prevStep, resetForm } = useFormStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      serviceStartDate: formData.serviceStartDate || '',
    }
  })

  const serviceStartDate = watch('serviceStartDate')

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    const finalData = {
      kidName: formData.kidName || '',
      parentName: formData.parentName || '',
      parentPhoneNumber: formData.parentPhoneNumber || '',
      kindergartenUUID: formData.kindergartenUUID || '',
      roomUUID: formData.roomUUID || '',
      packageUUID: formData.packageUUID || '',
      serviceStartDate: data.serviceStartDate,
    }

    try {
      await registerKid(finalData)

      // 성공 페이지에서 보여줄 데이터 저장 (displayName 포함)
      const displayData = {
        kidName: formData.kidName || '',
        parentName: formData.parentName || '',
        parentPhoneNumber: formData.parentPhoneNumber || '',
        kindergartenName: formData.kindergartenName || '',
        roomName: formData.roomName || '',
        packageName: formData.packageName || '',
        serviceStartDate: data.serviceStartDate,
      }
      sessionStorage.setItem('submittedData', JSON.stringify(displayData))

      resetForm()
      router.push('/submit/success')
    } catch (error) {
      console.error('Submit error:', error)
      alert('제출 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <button type="button" onClick={prevStep} className="text-gray-300 text-sm">
        ← 이전
      </button>

      <h1 className="text-lg font-bold">언제부터 뽀득을 이용할까요?</h1>

      <FormField label="서비스 시작일" required error={errors.serviceStartDate?.message}>
        <Input
          type="date"
          placeholder="2025-10-10"
          error={!!errors.serviceStartDate}
          {...register('serviceStartDate')}
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        isLoading={isSubmitting}
        disabled={!serviceStartDate || !isValid}
      >
        신청 완료
      </Button>
    </form>
  )
}