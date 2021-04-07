export interface StepTemplateProps {
  gotoPrevStep: () => void
  gotoNextStep: () => void
  stepNumber: number
  totalSteps: number
}

export interface StepProps {
  questionList?: string[] // for radio button screen
  setAnswer: (arg: string) => void
  key?: string
  currentAnswer: string
}
