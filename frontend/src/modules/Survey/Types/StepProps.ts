export interface StepTemplateProps {
  gotoPrevStep: () => void
  gotoNextStep: () => void
  stepNumber: number
  totalSteps: number
  currentAnswer: string
  setShowError: () => void
}

export interface StepProps {
  questionList?: string[] // for radio button screen
  setAnswer: (arg: string) => void
  key?: string
  currentAnswer: string
  showError: boolean
  setShowError: () => void
}

export interface Step0Props {
  setName: (arg: string) => void
  setEmail: (arg: string) => void
  name: string
  email: string
  gotoNextStep: () => void
}
