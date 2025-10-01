'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FormData } from '@/hooks/use-form-store'
import Image from 'next/image'

export default function SuccessPage() {
  const router = useRouter()
  const [displayData, setDisplayData] = useState<FormData | null>(null)

  useEffect(() => {
    // sessionStorage에서 제출된 데이터 가져오기
    const stored = sessionStorage.getItem('submittedData')
    if (stored) {
      setDisplayData(JSON.parse(stored))
    }
  }, [])

  const handleConfirm = () => {
    sessionStorage.removeItem('submittedFormData')
    router.push('/')
  }

  if (!displayData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-300">로딩 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* 메인 컨텐츠 */}
      <div className="px-6 pt-20 pb-6">
        {/* 로고 아이콘 */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-300/20 rounded-3xl blur-xl opacity-60" />
            <div className="relative w-24 h-24 bg-white rounded-3xl shadow-lg flex items-center justify-center">
              <Image src="/icons/logo-color-symbol.svg" alt="뽀득 로고" width={60} height={60} />
            </div>
          </div>
        </div>

        {/* 제목 */}
        <div className="text-center mb-12">
          <h1 className="text-2xl font-bold mb-2">뽀득 신청을 완료했어요!</h1>
          <p className="text-base text-gray-400">신청한 정보가 맞는지 확인해 주세요</p>
        </div>

        {/* 신청 정보 카드 */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="space-y-4">
            <InfoRow label="아이 이름" value={displayData.kidName} />
            <InfoRow label="보호자 이름" value={displayData.parentName} />
            <InfoRow label="보호자 연락처" value={displayData.parentPhoneNumber} />
            <InfoRow label="기관명" value={displayData.kindergartenName || '뽀득나라 유치원'} />
            <InfoRow label="반이름" value={displayData.roomName || '늘푸른하늘반'} />
            <InfoRow label="사용식기" value={displayData.packageName || '키즈 식판 세트 (포크)'} />
            <InfoRow label="서비스 시작일" value={displayData.serviceStartDate} />
          </div>
        </div>

        {/* 확인 버튼 */}
        <Button
          variant="primary"
          onClick={handleConfirm}
          className="w-full"
        >
          확인
        </Button>
      </div>
    </div>
  )
}

// 정보 행 컴포넌트
function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-sm text-gray-400">{label}</span>
      <span className="text-base font-medium text-black">{value}</span>
    </div>
  )
}