// export interface Question {
//   question: string
//   questionId: string
//   answers: {
//     [key: string]: string
//   }
// }

// outermost object, survey form
export interface SurveyForm {
  // woosang sunday update: attr will change to survey after woosang updates
  questions: Question[]
  dueDate: string
}

export interface Question {
  // woosang sunday update: question will be deprecated and updated to just exposed desc + hash for the question
  description: string
  hash: string
  options: Option[]
}

export interface Option {
  description: string
  hash: string
}
