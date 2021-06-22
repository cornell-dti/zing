import React from 'react'
const axios = require('axios')

export interface PostData {
  name: string
  minGroupSize: number
  dueDate: string
  userEmail: string
}

export function createZing(data: PostData) {
  axios
    .post('https://us-central1-zing-backend.cloudfunctions.net/newCourse', data)
    .then(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.log(error)
      }
    )
}
