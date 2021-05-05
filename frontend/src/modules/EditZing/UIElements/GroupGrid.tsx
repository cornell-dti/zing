import React from 'react'
import { StudentGrid } from 'EditZing/UIElements/StudentGrid'

import { GroupGridProps } from 'EditZing/Types/ComponentProps'

export const GroupGrid = ({ studentList }: GroupGridProps) => {
  return (
    <div>
      {studentList.map((student) => (
        <StudentGrid student={student} />
      ))}
    </div>
  )
}
