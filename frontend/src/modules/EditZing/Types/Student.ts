export type FetchedZing = {
  name: string
  creator: string
  dueDateStr: string
  minGroupSize: string
  courseId: string
  survey: any // bad but lazy
  group: Group
}

export type Group = {
  [key: string]: SingleGroup
}

export type SingleGroup = {
  groupData: GroupData
  members: Student[]
}

export type GroupData = {
  failed: string[]
}

export type Student = {
  college: string
  courseId: string
  fullName: string
  graduation: string
  identity: string
  mode: string
  pronoun: string
  remote: string
  start: string
  studentId: string
  time: string
}

/** item type for drag and drop prop transfer via dnd */
export type DnDStudentTransferType = {
  type: string
  studentToMove: Student
  studentIndex: number
  groupIndex: number
}

/** special type for reactdnd to keep track of what items are movable. in
 * this case, this is a movable student type
 */
export const STUDENT_TYPE = 'Student'
