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
import { ExportButton } from 'EditZing/Components/ExportButton'
import { Box } from '@mui/material'
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
