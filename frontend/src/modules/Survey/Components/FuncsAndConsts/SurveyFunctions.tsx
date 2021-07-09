import React from 'react'
const axios = require('axios')

export type SurveyData = {
  courseId: string
  fullName: string
  [key: string]: string
}

export async function sendSurveyData(data: SurveyData) {
  axios
    .post('https://us-central1-zing-backend.cloudfunctions.net/survey', data)
    .then(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.log(error)
      }
    )
}

export function getYoungestGradYear() {
  const now: Date = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  if (month > 4) {
    return year + 5
  } else {
    return year + 4
  }
}

export function getOldestGradYear() {
  const now: Date = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()
  if (month > 4) {
    return year + 1
  } else {
    return year
  }
}
