'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import FormField from '@/components/ui/form-field/FormField'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormStore } from '@/hooks/use-form-store'
import { formatPhoneNumber } from '@/lib/formatters'

const nameRegex = /^[가-힣a-zA-Z\s]+$/

const schema = z.object({
  kidName: z
    .string()
    .min(1, '아이 이름을 입력해주세요')
    .regex(nameRegex, '한글, 영어, 띄어쓰기만 입력 가능합니다'),
  parentName: z
    .string()
    .min(1, '학부모 이름을 입력해주세요')
    .regex(nameRegex, '한글, 영어, 띄어쓰기만 입력 가능합니다'),
  parentPhoneNumber: z.string().regex(/^\d{3}-\d{4}-\d{4}$/, '000-0000-0000 형식으로 입력해주세요'),
})

type FormData = z.infer<typeof schema>

export function StepOne() {
  const { formData, updateFormData, nextStep } = useFormStore()

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      kidName: formData.kidName || '',
      parentName: formData.parentName || '',
      parentPhoneNumber: formData.parentPhoneNumber || '',
    }
  })

  const watchedFields = watch()
  const allFieldsFilled = watchedFields.kidName && watchedFields.parentName && watchedFields.parentPhoneNumber

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value)
    setValue('parentPhoneNumber', formatted, { shouldValidate: true })
  }

  const handleNameInput = (e: React.ChangeEvent<HTMLInputElement>, field: 'kidName' | 'parentName') => {
    const value = e.target.value
    // 한글, 영어, 띄어쓰기만 허용
    const filtered = value.replace(/[^가-힣a-zA-Z\s]/g, '')
    setValue(field, filtered, { shouldValidate: true })
  }

  const onSubmit = (data: FormData) => {
    updateFormData(data)
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-lg font-bold">아이 정보를 입력해주세요</h1>

      <FormField label="아이 이름" required error={errors.kidName?.message}>
        <Input
          placeholder="김뽀득"
          error={!!errors.kidName}
          {...register('kidName')}
          onChange={(e) => handleNameInput(e, 'kidName')}
        />
      </FormField>

      <FormField label="학부모 이름" required error={errors.parentName?.message}>
        <Input
          placeholder="홍길동"
          error={!!errors.parentName}
          {...register('parentName')}
          onChange={(e) => handleNameInput(e, 'parentName')}
        />
      </FormField>

      <FormField label="전화번호" required error={errors.parentPhoneNumber?.message}>
        <Input
          type="tel"
          placeholder="010-1234-5678"
          error={!!errors.parentPhoneNumber}
          {...register('parentPhoneNumber')}
          onChange={handlePhoneChange}
          maxLength={13}
        />
      </FormField>

      <Button type="submit" variant="primary" disabled={!allFieldsFilled || !isValid}>
        다음
      </Button>
    </form>
  )
}