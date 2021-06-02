import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { StyledContainer } from 'EditZing/Styles/DashboardStyle.style'
import { GroupGrid } from 'EditZing/UIElements/GroupGrid'
import { Student } from 'EditZing/Types/Student'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const Dashboard = () => {
  const fakeStudentGroupsFromJson: Student[][] = require('EditZing/fakeData.json')
  const [studentGroups, setStudentGroups] = useState(fakeStudentGroupsFromJson)

  /** This function moves a student from one grid to a destination grid based
   * on a starting and destination grid index */
  function moveStudentBetweenGrids(
    studentToMove: Student,
    startingIndex: number,
    destinationIndex: number
  ): void {
    var newData: Student[][] = []
    studentGroups.map((studentList, index) => {
      var groupToPush: Student[] = []
      if (startingIndex == destinationIndex) {
        groupToPush = studentList
      } else if (index == startingIndex) {
        groupToPush = studentGroups[startingIndex].filter(
          (student) => student.studentId != studentToMove.studentId
        )
      } else if (index == destinationIndex) {
        if (!studentGroups[destinationIndex].includes(studentToMove)) {
          groupToPush = studentGroups[destinationIndex].concat(studentToMove)
        } else {
          groupToPush = studentList
        }
      } else {
        groupToPush = studentList
      }
      newData.push(groupToPush)
    })
    setStudentGroups(newData)
  }

  /** This function rearranges a student within the grid it is currently in */
  function moveStudentWithinGrid(
    studentToMove: Student,
    currentGroupIndex: number,
    destinationStudentIndex: number
  ): void {
    console.log(studentGroups)
    if (studentGroups[currentGroupIndex].includes(studentToMove)) {
      studentGroups[currentGroupIndex] = studentGroups[
        currentGroupIndex
      ].filter((student) => student.studentId != studentToMove.studentId)
    }
    studentGroups[currentGroupIndex].splice(
      destinationStudentIndex,
      0,
      studentToMove
    )
    setStudentGroups(studentGroups)
  }

  return (
    <StyledContainer>
      <DndProvider backend={HTML5Backend}>
        <Grid container spacing={1}>
          {studentGroups.map((studentGroup, index) => (
            <GroupGrid
              key={index}
              studentList={studentGroup}
              groupIndex={index}
              moveStudentBetweenGrids={moveStudentBetweenGrids}
              moveStudentWithinGrid={moveStudentWithinGrid}
            />
          ))}
        </Grid>
      </DndProvider>
    </StyledContainer>
  )
}
