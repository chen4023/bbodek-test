'use client'

import { useFormStore } from '@/hooks/use-form-store'
import FormProgress from '@/components/form/FormProgress'
import { StepOne } from '@/components/steps/StepOne'
import { StepTwo } from '@/components/steps/StepTwo'
import { StepThree } from '@/components/steps/StepThree'
import { StepFour } from '@/components/steps/StepFour'

export default function SubmitPage() {
  const { currentStep } = useFormStore()

  return (
    <div className="min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white px-4 py-4 border-b border-gray-100">
        <FormProgress currentStep={currentStep} totalSteps={4} />
      </div>

      <main className="px-4 py-6">
        {currentStep === 1 && <StepOne />}
        {currentStep === 2 && <StepTwo />}
        {currentStep === 3 && <StepThree />}
        {currentStep === 4 && <StepFour />}
      </main>
    </div>
  )
}