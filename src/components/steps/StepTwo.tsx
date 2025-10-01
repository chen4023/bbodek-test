'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import FormField from '@/components/ui/form-field/FormField'
import { SelectBox } from '@/components/ui/select/SelectBox'
import { Button } from '@/components/ui/button'
import { useFormStore } from '@/hooks/use-form-store'
import { getKindergartens, getRoomsByKindergarten } from '@/api/kindergarten.actions'

const schema = z.object({
  kindergartenUUID: z.string().min(1, '기관을 선택해주세요'),
  roomUUID: z.string().min(1, '반을 선택해주세요'),
})

type FormData = z.infer<typeof schema>

interface SelectOption {
  label: string
  value: string
}

export function StepTwo() {
  const { formData, updateFormData, nextStep } = useFormStore()
  const [kindergartens, setKindergartens] = useState<SelectOption[]>([])
  const [rooms, setRooms] = useState<SelectOption[]>([])
  const [isLoadingRooms, setIsLoadingRooms] = useState(false)

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      kindergartenUUID: formData.kindergartenUUID || '',
      roomUUID: formData.roomUUID || '',
    }
  })

  const watchedFields = watch()
  const selectedKindergarten = watchedFields.kindergartenUUID
  const selectedRoom = watchedFields.roomUUID

  // 기관 목록 로드
  useEffect(() => {
    async function fetchKindergartens() {
      try {
        const data = await getKindergartens()
        setKindergartens(
          data.map((k) => ({
            label: k.displayValue,
            value: k.UUID,
          }))
        )
      } catch (error) {
        console.error('Failed to fetch kindergartens:', error)
      }
    }
    fetchKindergartens()
  }, [])

  // 반 목록 로드
  useEffect(() => {
    if (!selectedKindergarten) {
      setRooms([])
      return
    }

    async function fetchRooms() {
      setIsLoadingRooms(true)
      try {
        const data = await getRoomsByKindergarten(selectedKindergarten)
        setRooms(
          data.map((r) => ({
            label: r.displayValue,
            value: r.UUID,
          }))
        )
      } catch (error) {
        console.error('Failed to fetch rooms:', error)
      } finally {
        setIsLoadingRooms(false)
      }
    }
    fetchRooms()
  }, [selectedKindergarten])

  const onSubmit = (data: FormData) => {
    const selectedKindergartenData = kindergartens.find((k) => k.value === data.kindergartenUUID)
    const selectedRoomData = rooms.find((r) => r.value === data.roomUUID)

    updateFormData({
      ...data,
      kindergartenName: selectedKindergartenData?.label,
      roomName: selectedRoomData?.label,
    })
    nextStep()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h1 className="text-lg font-bold">아이가 다니는 기관을 알려주세요</h1>

      <FormField label="기관명" required error={errors.kindergartenUUID?.message}>
        <SelectBox
          placeholder="아이가 다니는 기관을 알려주세요"
          options={kindergartens}
          value={selectedKindergarten}
          onChange={(value) => {
            setValue('kindergartenUUID', value, { shouldValidate: true })
            setValue('roomUUID', '', { shouldValidate: true })
          }}
        />
      </FormField>

      <FormField label="반이름" required error={errors.roomUUID?.message}>
        <SelectBox
          placeholder="반이름을 선택해주세요"
          options={rooms}
          value={selectedRoom}
          onChange={(value) => setValue('roomUUID', value, { shouldValidate: true })}
          disabled={!selectedKindergarten || isLoadingRooms}
        />
      </FormField>

      <Button
        type="submit"
        variant="primary"
        disabled={!isValid}
      >
        다음
      </Button>
    </form>
  )
}