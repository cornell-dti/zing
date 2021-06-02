import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { StyledContainer } from 'EditZing/Styles/DashboardStyle.style'
import { GroupGrid } from 'EditZing/UIElements/GroupGrid'
import { Student } from 'EditZing/Types/Student'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const Dashboard = () => {
  const fakeStudentGroupsFromJson: Student[][] = require('EditZing/fakeData.json')
  const [fakeStudentGroups, setFakeStudentGroups] = useState(
    fakeStudentGroupsFromJson
  )

  /** This function moves a student from one grid to a destination grid based
   * on a starting and destination grid index */
  function moveStudent(
    studentToMove: Student,
    startingIndex: number,
    destinationIndex: number
  ): void {
    // console.log('studentToMove.studentId: ' + studentToMove.studentId)
    // console.log('before processing:')
    // console.log(fakeStudentGroups)
    var newData: Student[][] = []
    fakeStudentGroups.map((studentList, index) => {
      var groupToPush: Student[] = []
      if (index == startingIndex) {
        groupToPush = fakeStudentGroups[startingIndex].filter(
          (student) => student.studentId != studentToMove.studentId
        )
      } else if (index == destinationIndex) {
        groupToPush = fakeStudentGroups[destinationIndex].concat(studentToMove)
      } else {
        groupToPush = studentList
      }
      newData.push(groupToPush)
    })
    setFakeStudentGroups(newData)
    // console.log('post-processing:')
    // console.log(newData)
  }

  return (
    <StyledContainer>
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={1}>
          {fakeStudentGroups.map((fakeStudentGroup, index) => (
            <GroupGrid
              key={index}
              studentList={fakeStudentGroup}
              groupIndex={index}
              moveStudent={moveStudent}
            />
          ))}
        </Grid>
      </DndProvider>
    </StyledContainer>
  )
}
