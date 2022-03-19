import { FetchedZing, StringJSON, Student } from 'EditZing/Types/Student'
import {
  genderSvg,
  collegeSvg,
  modalitySvg,
  raceSvg,
  timeSvg,
  workHabitsSvg,
  yearSvg,
  otherSvg,
} from 'EditZing/Styles/InlineSVGs'
import { CategoriesShown } from 'EditZing/Types/ComponentProps'
import { SvgIcon } from '@mui/material'
const axios = require('axios')
const shortenedSurveyResponse: StringJSON = require('EditZing/shortenedSurveyResponse.json')

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
      {svg} {shortenedSurveyResponse[text] || text}
    </div>
  )
}

export function getChipIcon(category: string): JSX.Element {
  let svg = otherSvg(14)
  switch (category) {
    case 'graduation':
      svg = yearSvg(14)
      break
    case 'college':
      svg = collegeSvg(14)
      break
    case 'identity':
      svg = raceSvg(14)
      break
    case 'mode':
      svg = modalitySvg(14)
      break
    case 'pronoun':
      svg = genderSvg(14)
      break
    case 'location':
      // i thought we got rid of if they're not on campus?
      break
    case 'start':
      svg = timeSvg(14)
      break
    case 'time':
      svg = workHabitsSvg(14)
      break
  }
  return (
    <div style={{ marginTop: '17px', marginLeft: '8px' }}>
      <SvgIcon>{svg}</SvgIcon>
    </div>
  )
}

export function makeItems(student: Student, categoriesShown: CategoriesShown) {
  let arrItems: JSX.Element[] = []
  Object.keys(categoriesShown)
    .sort() // sort bc keys return in random order
    .forEach((key) => {
      // guard for not student response attributes properties or not shown
      if (
        !['email', 'fullName', 'courseId'].includes(key) &&
        categoriesShown[key]
      ) {
        switch (key) {
          case 'graduation':
            arrItems.push(makeItem(yearSvg(11), student[key]))
            break
          case 'college':
            arrItems.push(makeItem(collegeSvg(11), student[key]))
            break
          case 'identity':
            arrItems.push(makeItem(raceSvg(11), student[key]))
            break
          case 'mode':
            arrItems.push(makeItem(modalitySvg(11), student[key]))
            break
          case 'pronoun':
            arrItems.push(makeItem(genderSvg(11), student[key]))
            break
          case 'location':
            // i thought we got rid of if they're not on campus?
            break
          case 'start':
            arrItems.push(makeItem(timeSvg(11), student[key]))
            break
          case 'time':
            arrItems.push(makeItem(workHabitsSvg(11), student[key]))
            break
          default:
            arrItems.push(makeItem(otherSvg(11), student[key]))
        }
      }
    })
  return arrItems
}
