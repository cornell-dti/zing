import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import {
  StyledContainer,
  StyledFlexHeader,
  StyledLogo,
  StyledLogoWrapper,
  StyledText,
} from 'EditZing/Styles/EditZing.style'
import { GroupGrid } from 'EditZing/Components/GroupGrid'
import { Student } from 'EditZing/Types/Student'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { getZingGroups, saveSwapStudent } from './Helpers'
import { FetchedZing } from 'EditZing/Types/Student'
import { ExportButton } from 'EditZing/Components/ExportButton'
import { Box } from '@material-ui/core'
import { CSV_FILE, DOWNLOAD_ALL } from '@core'

export const EditZing = () => {
  // get param that was set from history using location
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const id = query.get('id')
  const [zingId] = useState(id)

  // buttons that are used for the "export" feature
  const exportButtons = [
    {
      title: 'Download all details:',
      buttons: [{ type: CSV_FILE, downloadData: DOWNLOAD_ALL }],
    },
  ]

  const fakeStudentGroupsFromJson: Student[][] = require('EditZing/fakeData.json')
  // full fetched zing object
  const [zingData, setZingData] = useState<FetchedZing | null>(null)
  // student groups parsed out from zingData into a Student[][]
  const [studentGroups, setStudentGroups] = useState(fakeStudentGroupsFromJson)
  useEffect(() => {
    async function fetchGroups(zingId: string | null) {
      if (zingId) {
        const zingData = await getZingGroups(zingId)
        setZingData(zingData)

        // parse out groups into Student[][]
        const zingGroup = zingData.group
        let realData: Student[][] = []
        for (let id in zingGroup) {
          const studentList = zingGroup[id].members
          realData.push(studentList)
        }
        setStudentGroups(realData)
      }
    }
    fetchGroups(zingId)
  }, [zingId])

  /** Move a student from one grid to a destination grid based
   * on a starting and destination grid index */
  function moveStudentBetweenGrids(
    studentToMove: Student,
    startingIndex: number,
    destinationIndex: number
  ): void {
    // only set new groups if actually changing index
    if (startingIndex !== destinationIndex) {
      setStudentGroups(
        studentGroups.map((studentList, index) => {
          // case where the current iterated group is the starting index
          if (index === startingIndex) {
            // filter for only students with IDs that are not the studentToMove's
            return studentGroups[startingIndex].filter(
              (student) => student.email !== studentToMove.email
            )
          }
          // case where the current iterated group is the destination index
          else if (index === destinationIndex) {
            /* based on how drop functions work, we need to first check if the 
          destination group has the studentToMove in it first and skip it 
          if it already contains it */
            if (!studentGroups[destinationIndex].includes(studentToMove)) {
              return studentGroups[destinationIndex].concat(studentToMove)
            } else {
              return studentList
            }
          }
          // case where it is neither starting nor destination
          else {
            return studentList
          }
        })
      )
      saveSwapStudent(
        zingId,
        studentToMove.email,
        startingIndex + 1,
        destinationIndex + 1
      )
    }
  }

  /** This function rearranges a student within the grid it is currently in */
  function moveStudentWithinGrid(
    studentToMove: Student,
    currentGroupIndex: number,
    destinationStudentIndex: number
  ): void {
    let groups = [...studentGroups]
    if (groups[currentGroupIndex].includes(studentToMove)) {
      groups[currentGroupIndex] = groups[currentGroupIndex].filter(
        (student) => student.email !== studentToMove.email
      )
    }
    groups[currentGroupIndex].splice(destinationStudentIndex, 0, studentToMove)
    setStudentGroups(groups)
  }

  if (zingData) {
    // mui-fixed class is for the modal messing up the padding
    return (
      <Box m={4} paddingBottom={3} className="mui-fixed">
        <StyledFlexHeader>
          <StyledLogoWrapper>
            <StyledLogo />
            <StyledText>{zingData.name}</StyledText>
          </StyledLogoWrapper>
          <ExportButton
            label="export"
            options={exportButtons}
            data={studentGroups}
            zingName={zingData.name}
          />
        </StyledFlexHeader>
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
      </Box>
    )
  } else {
    return (
      <StyledContainer>
        <StyledText>Loading</StyledText>
      </StyledContainer>
    )
  }
}
