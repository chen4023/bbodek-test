# 뽀득 서비스 신청 폼

**뽀득 서비스 학부모 신청을 위한 Next.js 기반 멀티스텝 폼** 프로젝트입니다.  
직관적인 UI, 일관된 디자인 시스템, 견고한 유효성 검증을 목표로 합니다.

## 설치 및 실행

```bash
# 1) 의존성 설치
npm install

# 2) 개발 서버 실행
npm run dev
# http://localhost:3000

# 3) 빌드 / 프로덕션 실행
npm run build
npm start
```

## 📁 프로젝트 구조

```
src/
├─ app/
│  ├─ (form)/
│  │  └─ submit/
│  │     ├─ page.tsx               # 메인 폼 페이지
│  │     └─ success/
│  │        └─ page.tsx            # 제출 완료 페이지
│  ├─ api/                          # Mock API Routes
│  │  ├─ kindergartens/
│  │  │  └─ [id]/rooms/
│  │  ├─ packages/
│  │  └─ kid/
│  ├─ layout.tsx
│  ├─ page.tsx
│  └─ globals.css                   # Tailwind v4 @theme
│
├─ components/
│  ├─ ui/                           # 공통 UI 컴포넌트
│  │  ├─ button/
│  │  ├─ input/
│  │  ├─ select/
│  │  ├─ select-box/
│  │  └─ form-field/
│  ├─ steps/                        # 각 단계 컴포넌트
│  │  ├─ step-one.tsx               # 기관 정보
│  │  ├─ step-two.tsx               # 식기 선택
│  │  ├─ step-three.tsx             # 아이/학부모 정보
│  │  └─ step-four.tsx              # 서비스 시작일
│  └─ form/
│     └─ form-progress.tsx          # 진행 상태 바
│
├─ hooks/
│  └─ use-form-store.ts             # Zustand 스토어
│
├─ lib/
│  ├─ utils.ts                      # cn 유틸리티
│  └─ formatters.ts                 # 포맷팅 함수 (전화번호 등)
│
└─ types/
   └─ *.types.ts                    # TypeScript 타입 정의
```

## 🎨 디자인 시스템

### 색상 (`globals.css`)

```css
@theme {
  --color-black: #101828;
  --color-gray-100: #e7eaf2;
  --color-gray-200: #d4dae8;
  --color-gray-300: #a4adb8;
  --color-primary: #3b8aff;
  --color-primary-100: #f4f8ff;
  --color-primary-200: #ebf3ff;
  --color-primary-300: #3b8aff;
  --color-red: #ea2432;
}
```

### 폰트

- **Family**: Pretendard
- **Sizes**: `xs 13px`, `base 18px`, `lg 22px`
- **Weights**: `500 (medium)`, `700 (bold)`

### 반응형

- **최소 너비**: 360px
- **최대 너비**: 480px

## 🔧 주요 컴포넌트

### Button

```tsx
import { Button } from "@/components/ui/button";

<Button variant="primary" size="md" isLoading={false}>
  다음
</Button>;
```

- **Variants**: `primary`, `secondary`
- **Sizes**: `md`, `lg`

---

### Input (FormField + Floating Label)

```tsx
import { Input } from "@/components/ui/input";
import FormField from "@/components/ui/form-field/form-field";

<FormField label="아이 이름" required error={errors.name?.message}>
  <Input placeholder="김뽀득" {...register("name")} />
</FormField>;
```

---

### Select (버튼 선택 방식)

```tsx
import { Select } from "@/components/ui/select";

<Select
  options={[
    { label: "키즈 식판", value: "pkg1" },
    { label: "키즈 식판 세트 (포크)", value: "pkg2" },
  ]}
  value={selected}
  onChange={setSelected}
/>;
```

---

### SelectBox (드롭다운 + 바텀시트)

```tsx
import { SelectBox } from "@/components/ui/select-box";

<SelectBox
  placeholder="기관을 선택하세요"
  options={kindergartens} // { label, value, disabled? }[]
  value={selected}
  onChange={setSelected}
/>;
```

## 상태 관리 (Zustand)

```ts
// hooks/use-form-store.ts (개념)
const { currentStep, formData, nextStep, prevStep, updateFormData, resetForm } =
  useFormStore();

/**
 * currentStep: 현재 단계 (1-4)
 * formData: 폼 데이터 (전 단계 통합)
 * nextStep(): 다음 단계로
 * prevStep(): 이전 단계로
 * updateFormData(data): 데이터 업데이트
 * resetForm(): 폼 초기화
 *
 * persist: 로컬스토리지 자동 저장 (key: "bbodeuk-form-storage")
 */
```

## Mock API

### GET `/api/kindergartens` — 교육기관 목록

```json
{
  "kindergartens": [
    {
      "UUID": "bed577ab-c011-43e4-8a36-866b807e48d9",
      "displayValue": "삼성동뽀득어린이집"
    }
  ]
}
```

### GET `/api/kindergartens/[id]/rooms` — 특정 기관의 반 목록

```json
{
  "rooms": [
    { "UUID": "bed573ab-c011-43e4-8a36-866b807e48d9", "displayValue": "달님반" }
  ]
}
```

### GET `/api/packages` — 식기 패키지 목록

```json
{
  "packages": [
    {
      "UUID": "d22535c5-2a65-4603-bd1a-d84f2333b2e1",
      "displayValue": "키즈 식판"
    }
  ]
}
```

### POST `/api/kid` — 서비스 신청

**Request Body**

```json
{
  "kidName": "김뽀득",
  "parentName": "홍길동",
  "parentPhoneNumber": "010-1234-5678",
  "kindergartenUUID": "uuid",
  "roomUUID": "uuid",
  "packageUUID": "uuid",
  "serviceStartDate": "2025-10-10"
}
```

**Response**

```
201 Created
```

## 개발 시 유의사항

- **Tailwind v4 사용**: `@theme` 디렉티브로 CSS 변수 정의
- **CVA 사용**: 모든 컴포넌트 variants는 **CVA**로 관리
- **FormField 재사용**: label, error는 **FormField**에서 관리
