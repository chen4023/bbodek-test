'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import FormField from '@/components/ui/form-field/FormField'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useFormStore } from '@/hooks/use-form-store'
import { getPackages } from '@/api/package.actions'

const schema = z.object({
  packageUUID: z.string().min(1, '식기를 선택해주세요'),
})

type FormData = z.infer<typeof schema>

interface SelectOption {
  label: string
  value: string
}

export function StepThree() {
  const { formData, updateFormData, nextStep } = useFormStore()
  const [packages, setPackages] = useState<SelectOption[]>([])

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      packageUUID: formData.packageUUID || '',
    }
  })

  const selectedPackage = watch('packageUUID')

  useEffect(() => {
    async function fetchPackages() {
      try {
        const data = await getPackages()
        setPackages(
          data.map((p) => ({
            label: p.displayValue,
            value: p.UUID,
          }))
        )
      } catch (error) {
        console.error('Failed to fetch packages:', error)
      }
    }
    fetchPackages()
  }, [])

  const onSubmit = (data: FormData) => {
    const selectedPackageData = packages.find((p) => p.value === data.packageUUID)

    updateFormData({
      ...data,
      packageName: selectedPackageData?.label,
    })
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-lg font-bold">어떤 식기를 이용할까요?</h1>
      <Select
        options={packages}
        value={selectedPackage}
        onChange={(value: string) => setValue('packageUUID', value, { shouldValidate: true })}
      />

      <Button type="submit" variant="primary" disabled={!isValid}>
        다음
      </Button>
    </form>
  )
}