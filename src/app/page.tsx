import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12">
        {/* 로고 아이콘 */}
        <div className="mb-12">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-300 to-primary-300/20 rounded-3xl blur-xl opacity-60" />
            <div className="relative w-28 h-28 bg-white rounded-3xl shadow-lg flex items-center justify-center">
              <Image
                src="/icons/logo-color-symbol.svg"
                alt="뽀득 로고"
                width={70}
                height={70}
              />
            </div>
          </div>
        </div>

        {/* 타이틀 */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-3">뽀득</h1>
          <p className="text-base text-gray-400 leading-relaxed">
            우리 아이 식판 관리 서비스
            <br />
            지금 바로 시작해보세요
          </p>
        </div>

        {/* 설명 카드 */}
        <div className="w-full max-w-md bg-gray-50 rounded-2xl p-6 mb-8">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">간편한 신청</p>
                <p className="text-xs text-gray-400 mt-1">
                  아이와 기관 정보만 입력하세요
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">2</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">식기 선택</p>
                <p className="text-xs text-gray-400 mt-1">
                  다양한 식판 옵션 중 선택 가능
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-sm font-bold">3</span>
              </div>
              <div>
                <p className="text-sm font-medium text-black">서비스 시작</p>
                <p className="text-xs text-gray-400 mt-1">
                  신청 완료 후 빠른 연락 드립니다
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 시작 버튼 */}
        <div className="w-full max-w-md">
          <Link href="/submit">
            <Button variant="primary" className="w-full">
              신청 시작하기
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}