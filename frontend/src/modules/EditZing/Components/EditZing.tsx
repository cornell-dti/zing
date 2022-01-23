import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Grid, { GridSize } from '@material-ui/core/Grid'
import {
  StyledContainer,
  StyledFiltersAndGrid,
  StyledFilterContainer,
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
  apiDataToRealData,
} from './Helpers'
import { FetchedZing } from 'EditZing/Types/Student'
import { ExportButton } from 'EditZing/Components/ExportButton'
import { Box } from '@material-ui/core'
import { CSV_FILE, DOWNLOAD_ALL } from '@core'

export const EditZing = () => {
  const [showFilters, setShowFilters] = useState<boolean>(true)
  const [spacingConfig, setSpacingConfig] = useState<GridSize[]>([7, 5, 4])
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

        const realData: Student[][] = apiDataToRealData(zingData)
        setStudentGroups(realData)
      }
    }
    fetchGroups(zingId)
  }, [zingId])

  function makeFilters() {
    if (showFilters) {
      return (
        <StyledFilterContainer>
          <p>hi</p>
        </StyledFilterContainer>
      )
    } else {
      return null
    }
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
        <StyledFiltersAndGrid>
          {makeFilters()}
          <DndProvider backend={HTML5Backend}>
            <Grid container spacing={1}>
              {studentGroups.map((studentGroup, index) => (
                //  todo: pass in an xs prop that changes based on showfilter to make rows contain 3 instead of 4
                <GroupGrid
                  key={index}
                  studentList={studentGroup}
                  groupIndex={index}
                  zingId={zingId}
                  setStudentGroups={setStudentGroups}
                  studentGroups={studentGroups}
                  moveStudentBetweenGrids={moveStudentBetweenGrids}
                  moveStudentWithinGrid={moveStudentWithinGrid}
                  spacingConfig={spacingConfig}
                />
              ))}
            </Grid>
          </DndProvider>
        </StyledFiltersAndGrid>
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
