import { domainToASCII } from 'node:url'
import React from 'react'
const axios = require('axios')

export type surveyData = {
  courseId: string
  fullName: string
  studentId: string
  identity: string
  pronoun: string
  graduation: string
  college: string
  remote: string
  mode: string
  time: string
  start: string
}

export function getLetter(ans: string, isDate: boolean) {
  if (!isDate) {
    return String.fromCharCode(Number(ans) + 64).toLowerCase()
  }
  switch (ans.slice(0, 4)) {
    case '2021':
      return 'a'
    case '2022':
      return 'b'
    case '2023':
      return 'c'
    case '2024':
      return 'd'
    default:
      alert('Form validation is broken; somehow, user is entering a weird date')
      return ''
  }
}

export async function sendSurveyData(data: surveyData) {
  axios
    .post('https://us-central1-zing-backend.cloudfunctions.net/newSurvey', data)
    .then(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.log(error)
      }
    )
}
