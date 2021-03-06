import { FetchedZing } from 'EditZing/Types/Student'
const axios = require('axios')

export async function getZingGroups(docId: String): Promise<FetchedZing> {
  return fetch(
    `https://us-central1-zing-backend.cloudfunctions.net/api/course/${docId}`
  ).then(function (response: any) {
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data = response.json()
    return data
  })
}

interface SwapPostData {
  studentId: string
  baseGroupId: number
  destGroupId: number
}

export async function saveSwapStudent(
  zingId: string | null,
  studentId: string,
  baseGroupId: number,
  destGroupId: number
) {
  if (!zingId) {
    throw new Error('zingId cannot be null or undefined')
  }
  const data: SwapPostData = {
    studentId: studentId,
    baseGroupId: baseGroupId,
    destGroupId: destGroupId,
  }
  axios
    .post(
      `https://us-central1-zing-backend.cloudfunctions.net/api/course/${zingId}/group`,
      data
    )
    .then(
      (response: any) => {
        console.log(response)
      },
      (error: any) => {
        console.log(error)
      }
    )
}
