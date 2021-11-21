import { Student } from './Student'
import React from 'react'

export interface GroupGridProps {
  studentList: Student[]
  /** for naming the group and maybe key?*/
  groupIndex: number
  moveStudentBetweenGrids: (
    studentToMove: Student,
    startingIndex: number,
    destinationIndex: number
  ) => void
  moveStudentWithinGrid: (
    studentToMove: Student,
    currentGroupIndex: number,
    destinationStudentIndex: number
  ) => void
}

export interface StudentGridProps {
  student: Student
  /** index of the group/grid in the outermost array */
  groupIndex: number
  /** index of the student in the inner array */
  studentIndex: number
  moveStudentWithinGrid: (
    studentToMove: Student,
    currentGroupIndex: number,
    destinationStudentIndex: number
  ) => void
}

export interface ExportFileIconButtonType {
  type: string
  data: Student[][]
  downloadData: string
}

export interface ExportButtonInformationType {
  type: string
  downloadData: string
}

export interface ExportButtonListType {
  title: string
  buttons: ExportButtonInformationType[]
}

export interface ExportProps {
  label: string
  options: ExportButtonListType[]
  data: Student[][]
}

// export interface ExportGroupsType extends Student {
//   group: number
// }
