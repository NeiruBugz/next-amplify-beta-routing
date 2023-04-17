import { create } from "zustand";

interface FormStore {
  step: number;
  values: {
    [key: string]: string;
  };
  increaseStep: () => void;
  decreaseStep: () => void;
  setValues: (values: any) => void;
}

const useFormStore = create<FormStore>((set) => ({
  step: 0,
  increaseStep: () => set((state) => ({ step: state.step + 1 })),
  decreaseStep: () => set((state) => ({ step: state.step !== 0 ? state.step - 1 : 0 })),
  values: {},
  setValues: (payload: any) =>
    set((state) => ({ values: { ...state.values, ...payload } })),
}));

export { useFormStore };
