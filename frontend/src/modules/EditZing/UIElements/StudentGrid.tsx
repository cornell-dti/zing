import React from 'react'
import { Student } from 'EditZing/Types/Student'
import { StudentGridProps } from 'EditZing/Types/ComponentProps'

export const StudentGrid = ({ student }: StudentGridProps) => {
  return (
    <div style={{ width: '1 rem' }}>
      <p>{student.fullName}</p>
    </div>
  )
}
