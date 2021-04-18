import React from 'react'

export interface QuestionProps {
  setAnswer: (arg: string) => void // sets answer state in parent component
  isNumber: boolean // true if the question is asking for a numerical answer
  placeholder: string // placeholder
  value: string //state value
}
