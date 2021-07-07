import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import {
  StyledContainer,
  StyledLogo,
  StyledLogoWrapper,
  StyledText,
} from 'EditZing/Styles/DashboardStyle.style'
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
    // the new data to replace the old studentGroups state
    let newData: Student[][] = []
    // this will replace the old studentGroups stored state
    studentGroups.map((studentList, index) => {
      let groupToPush: Student[] = []
      // case where the current iterated group is the starting index
      if (startingIndex == destinationIndex) {
        groupToPush = studentList
      } else if (index == startingIndex) {
        // filter for only students with IDs that are not the studentToMove's
        groupToPush = studentGroups[startingIndex].filter(
          (student) => student.studentId != studentToMove.studentId
        )
      }
      // case where the current interated group is the destination index
      else if (index == destinationIndex) {
        /* based on how drop functions work, we need to first check if the 
        destination group has the studentToMove in it first and skip it 
        if it already contains it */
        if (!studentGroups[destinationIndex].includes(studentToMove)) {
          groupToPush = studentGroups[destinationIndex].concat(studentToMove)
        }
        // case where it is neither starting nor destination
        else {
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

  // TODO: COURSE SHOULDN'T BE HARDCODED
  return (
    <StyledContainer>
      <StyledLogoWrapper>
        <StyledLogo />
        <StyledText>ZING 101</StyledText>
      </StyledLogoWrapper>
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
