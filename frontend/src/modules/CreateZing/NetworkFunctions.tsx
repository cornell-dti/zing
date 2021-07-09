import { API_ROOT, CREATE_COURSE_API } from '@core/Constants'

const axios = require('axios')

export interface PostData {
  name: string
  minGroupSize: number
  dueDate: string
  email: string
}

export async function createZing(data: PostData) {
  axios.post(`${API_ROOT}${CREATE_COURSE_API}`, data).then(
    (response: any) => {
      console.log(response)
    },
    (error: any) => {
      console.log(error)
    }
  )
}
