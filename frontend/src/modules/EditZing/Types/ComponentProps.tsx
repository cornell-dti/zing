import React from 'react'
import { Student } from './Student'

export interface GroupGridProps {
  studentList: Student[]
  /** for naming the group and maybe key?*/
  groupIndex: number
  moveStudent: (
    studentToMove: Student,
    startingIndex: number,
    destinationIndex: number
  ) => void
}

export interface StudentGridProps {
  student: Student
  /** index of the group/grid in the outermost array */
  groupIndex: number
  /** index of the student in the inner array */
  studentIndex: number
  moveStudent: (
    studentToMove: Student,
    startingIndex: number,
    destinationIndex: number
  ) => void
}
