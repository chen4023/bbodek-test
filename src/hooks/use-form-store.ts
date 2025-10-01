import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface FormData {
  kidName: string;
  parentName: string;
  parentPhoneNumber: string;
  kindergartenUUID: string;
  kindergartenName?: string;
  roomUUID: string;
  roomName?: string;
  packageUUID: string;
  packageName?: string;
  serviceStartDate: string;
}

interface FormStore {
  currentStep: number;
  formData: Partial<FormData>;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

export const useFormStore = create<FormStore>()(
  persist(
    (set) => ({
      currentStep: 1,
      formData: {},

      setStep: (step) => set({ currentStep: step }),
      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, 5),
        })),
      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),
      updateFormData: (data) =>
        set((state) => ({
          formData: { ...state.formData, ...data },
        })),
      resetForm: () =>
        set({
          currentStep: 1,
          formData: {},
        }),
    }),
    {
      name: "form-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
