import {
  FetchedZing,
  ShortenedSurveyAns,
  Student,
} from 'EditZing/Types/Student'
const axios = require('axios')

// makes a div that contains a Gender: Female type beat thing for student grid
export function makeItem(
  svg: JSX.Element,
  text: string,
  shortenedSurveyAns: ShortenedSurveyAns
) {
  // case for where the text is a graduation year, since those fluctuate year by year, we don't want to access the json
  if (String(Number(text)) === text) {
    return (
      <div>
        {svg} {text}
      </div>
    )
  }

  return (
    <div>
      {svg} {shortenedSurveyAns[text]}
    </div>
  )
}

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

export function moveStudentBetweenGrids(
  studentToMove: Student,
  startingIndex: number,
  destinationIndex: number,
  setStudentGroups: Function,
  zingId: string | null
): void {
  // only set new groups if actually changing index
  if (startingIndex !== destinationIndex) {
    setStudentGroups((studentGroups: Student[][]) =>
      studentGroups.map((studentList, index) => {
        // case where the current iterated group is the starting index
        if (index === startingIndex) {
          // filter for only students with IDs that are not the studentToMove's
          return studentGroups[startingIndex].filter(
            (student) => student.email !== studentToMove.email
          )
        }
        // case where the current iterated group is the destination index
        else if (index === destinationIndex) {
          /* based on how drop functions work, we need to first check if the 
        destination group has the studentToMove in it first and skip it 
        if it already contains it */
          if (!studentGroups[destinationIndex].includes(studentToMove)) {
            return studentGroups[destinationIndex].concat(studentToMove)
          } else {
            return studentList
          }
        }
        // case where it is neither starting nor destination
        else {
          return studentList
        }
      })
    )
    saveSwapStudent(
      zingId,
      studentToMove.email,
      startingIndex + 1,
      destinationIndex + 1
    )
  }
}

/** This function rearranges a student within the grid it is currently in */
export function moveStudentWithinGrid(
  studentToMove: Student,
  currentGroupIndex: number,
  destinationStudentIndex: number,
  studentGroups: Student[][],
  setStudentGroups: Function
): void {
  let groups = [...studentGroups]
  if (groups[currentGroupIndex].includes(studentToMove)) {
    groups[currentGroupIndex] = groups[currentGroupIndex].filter(
      (student) => student.email !== studentToMove.email
    )
  }
  groups[currentGroupIndex].splice(destinationStudentIndex, 0, studentToMove)
  setStudentGroups(groups)
}

interface SwapPostData {
  email: string
  baseGroupId: number
  destGroupId: number
}

export async function saveSwapStudent(
  zingId: string | null,
  email: string,
  baseGroupId: number,
  destGroupId: number
) {
  if (!zingId) {
    throw new Error('zingId cannot be null or undefined')
  }
  const data: SwapPostData = {
    email,
    baseGroupId,
    destGroupId,
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
