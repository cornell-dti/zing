import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Grid from '@mui/material/Grid'
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
import {
  getZingGroups,
  moveStudentBetweenGrids,
  moveStudentWithinGrid,
} from './Helpers'
import { FetchedZing } from 'EditZing/Types/Student'
import { ExportButton, exportButtons } from 'EditZing/Components/ExportButton'
import { Box } from '@mui/material'

export const EditZing = () => {
  // get param that was set from history using location for zingId
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const id = query.get('id')
  const [zingId] = useState(id)
  // TODO: true for now since there's no toggle; will be false when toggle is added (or not necessary at all)
  const [filterMode, setFilterMode] = useState(true)

  const fakeStudentGroupsFromJson: Student[][] = require('EditZing/fakeData.json')
  // actual data fetched from the server
  const [zingData, setZingData] = useState<FetchedZing | null>(null)
  // a Student[][] instance derived from zingData, default is fake data
  const [studentGroups, setStudentGroups] = useState(fakeStudentGroupsFromJson)

  useEffect(() => {
    async function fetchGroups(zingId: string | null) {
      if (zingId) {
        const zingData = await getZingGroups(zingId)
        setZingData(zingData)

        const zingGroup = zingData.group
        let studentGroups: Student[][] = []
        for (let id in zingGroup) {
          const studentList = zingGroup[id].members
          studentGroups.push(studentList)
        }
        setStudentGroups(studentGroups)
      }
    }
    fetchGroups(zingId)
  }, [zingId])

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
            label="Export"
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
                zingId={zingId}
                studentGroups={studentGroups}
                setStudentGroups={setStudentGroups}
                moveStudentBetweenGrids={moveStudentBetweenGrids}
                moveStudentWithinGrid={moveStudentWithinGrid}
                filterMode={filterMode}
              />
            ))}
          </Grid>
        </DndProvider>
      </Box>
    )
  } else {
    // TODO: add a real loading screen asset later
    return (
      <StyledContainer>
        <StyledText>Loading</StyledText>
      </StyledContainer>
    )
  }
}
