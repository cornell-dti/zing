// outermost object, survey form
export interface SurveyForm {
  questions: Question[]
  dueDate: string
}

export interface Question {
  hash: string
  description: string
  options: Option[]
}

export interface Option {
  description: string
  hash: string
}
