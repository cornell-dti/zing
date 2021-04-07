export interface StepTemplateProps {
  gotoPrevStep: () => void
  gotoNextStep: () => void
  stepNumber: number
  totalSteps: number
}

export interface StepProps {
  question?: string // for radio button screen
  questionList?: string[] // for radio button screen
  setAnswer: (arg: string) => void
}
