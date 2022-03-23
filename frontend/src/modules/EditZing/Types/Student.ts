// we should probably rename this module to models or data types or something

export type FetchedZing = {
  name: string
  creator: string
  dueDateStr: string
  minGroupSize: string
  courseId: string
  survey: any // bad but lazy
  group: Group
}

type Question = {
  questionDescription: string
  options: string[]
}

export type FilterData = {
  [key: string]: Question
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

/*
college: string
courseId: string
fullName: string
graduation: string
identity: string
mode: string
pronoun: string
location: string
start: string
email: string
time: string
*/
export type Student = {
  courseId: string
  fullName: string
  email: string
  [key: string]: string
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

export type StringJSON = {
  [key: string]: string
}

export type ResponseToSVGIdx = {
  [key: string]: number
}
