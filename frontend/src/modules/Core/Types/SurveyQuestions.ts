// export interface Question {
//   question: string
//   questionId: string
//   answers: {
//     [key: string]: string
//   }
// }

// outermost object, survey form
export interface SurveyForm {
  questions: Question[]
  dueDate: string
}

export interface Question {
  description: string
  question: QuestionMeta
}

export interface QuestionMeta {
  description: string
  hash: string
}

export interface Option {
  description: string
  hash: string
}
