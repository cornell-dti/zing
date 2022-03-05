export type FetchedZing = {
  name: string
  creator: string
  dueDateStr: string
  minGroupSize: string
  courseId: string
  survey: any // bad but lazy
  group: Group
}

// really should be groups (plural), but is formatted this way to follow woosang's response structure
// this is the KV pair GROUPS object where K are consecutive integers starting from 1 (i think)
export type Group = {
  [key: string]: SingleGroup
}

// THIS is ACTUALLY a group (singular) object
export type SingleGroup = {
  groupData: GroupData
  members: Student[]
}

// represents what constraints were failed
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
  email: string
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

export type ShortenedSurveyAns = {
  [key: string]: string
}

export type ItemData = {
  svg: JSX.Element
  text: string
}
