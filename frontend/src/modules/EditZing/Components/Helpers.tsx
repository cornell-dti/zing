import {
  FetchedZing,
  ShortenedSurveyResponse,
  Student,
} from 'EditZing/Types/Student'
import {
  genderSVG,
  collegeSVG,
  modalitySVG,
  raceSVG,
  timeSVG,
  workHabitsSVG,
  yearSVG,
  otherSVG,
} from 'EditZing/Styles/InlineSVGs'
const axios = require('axios')
const shortenedSurveyResponse: ShortenedSurveyResponse = require('EditZing/shortenedSurveyResponse.json')

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

// makes a div that contains a Gender: Female type beat thing for student grid
export function makeItem(svg: JSX.Element, text: string) {
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
      {svg} {shortenedSurveyResponse[text]}
    </div>
  )
}

export function makeItems(student: Student, categoriesShown: string[]) {
  let arrItems: JSX.Element[] = []
  Object.keys(student)
    .sort() // sort bc keys return in random order
    .forEach((key) => {
      // guard for not student response attributes properties or not shown
      if (
        ['email', 'fullName', 'courseId'].includes(key) ||
        !categoriesShown.includes(key)
      ) {
        return
      }

      switch (key) {
        case 'graduation':
          arrItems.push(makeItem(yearSVG, student[key]))
          break
        case 'college':
          arrItems.push(makeItem(collegeSVG, student[key]))
          break
        case 'identity':
          arrItems.push(makeItem(raceSVG, student[key]))
          break
        case 'mode':
          arrItems.push(makeItem(modalitySVG, student[key]))
          break
        case 'pronoun':
          arrItems.push(makeItem(genderSVG, student[key]))
          break
        case 'location':
          // i thought we got rid of if they're not on campus?
          break
        case 'start':
          arrItems.push(makeItem(timeSVG, student[key]))
          break
        case 'time':
          arrItems.push(makeItem(workHabitsSVG, student[key]))
          break
        default:
          arrItems.push(makeItem(otherSVG, student[key]))
      }
    })
  return arrItems
}
