import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import Grid from '@mui/material/Grid'
import {
  StyledGroupsContainer,
  StyledMainContainer,
  StyledContainer,
  StyledFlexHeader,
  StyledLogo,
  StyledLogoWrapper,
  StyledClassName,
  StyledGroupsHeader,
} from 'EditZing/Styles/EditZing.style'
import { API_ROOT, COURSE_API, SURVEY_API } from '@core/Constants'
import { FilterData, FiltersSelected } from 'EditZing/Types/Student'
import { GroupGrid } from 'EditZing/Components/GroupGrid'
import { Student } from 'EditZing/Types/Student'
import { CategoriesMultiselector } from 'EditZing/Components/CategoriesMultiselector'
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
import { FilterSidebar } from './FilterSidebar'

export const EditZing = () => {
  // get param that was set from history using location for zingId
  const { search } = useLocation()
  const query = new URLSearchParams(search)
  const id = query.get('id')
  const [zingId] = useState(id)

  const fakeStudentGroupsFromJson: Student[][] = require('EditZing/fakeData.json')
  // actual data fetched from the server
  const [zingData, setZingData] = useState<FetchedZing | null>(null)
  // a Student[][] instance derived from zingData, default is fake data
  const [studentGroups, setStudentGroups] = useState(fakeStudentGroupsFromJson)
  const [categoriesShown, setCategoriesShown] = useState({})

  const [filterData, setFilterData] = useState<FilterData>({})
  const [filtersSelected, setFiltersSelected] = useState<FiltersSelected>({})

  useEffect(() => {
    async function fetchGroups(zingId: string | null) {
      if (zingId) {
        const zingData = await getZingGroups(zingId)
        setZingData(zingData)

        const zingGroup = zingData.group
        const studentGroups: Student[][] = Object.keys(zingGroup).map(
          (id) => zingGroup[id].members
        )
        setStudentGroups(studentGroups)

        let categoriesShown = {}
        Object.keys(studentGroups[0][0]).forEach((category, _) => {
          if (
            !['courseId', 'fullName', 'email', 'location'].includes(category)
          ) {
            categoriesShown = {
              ...categoriesShown,
              [category]: true,
            }
          }
        })
        setCategoriesShown(categoriesShown)
      }
    }

    async function fetchSurvey(zingId: string | null) {
      axios.get(`${API_ROOT}${COURSE_API}/${zingId}${SURVEY_API}`).then(
        (response: any) => {
          let filterData: FilterData = {}
          response.data.questions.forEach((question: any) => {
            filterData = {
              ...filterData,
              [question.hash]: {
                questionDescription: question.description,
                options: question.options,
              },
            }
          })
          setFilterData(filterData)
        },
        (error: any) => {
          alert(error)
        }
      )
    }
    fetchGroups(zingId)
    fetchSurvey(zingId)
  }, [zingId])

  if (zingData) {
    // mui-fixed class is for the modal messing up the padding
    return (
      <Box paddingBottom={3} className="mui-fixed">
        <StyledFlexHeader>
          <StyledLogoWrapper>
            <StyledLogo />
            <StyledClassName>{zingData.name}</StyledClassName>
          </StyledLogoWrapper>
          <ExportButton
            label="Export"
            options={exportButtons}
            data={studentGroups}
            zingName={zingData.name}
          />
        </StyledFlexHeader>
        <StyledMainContainer>
          <FilterSidebar
            filterData={filterData}
            setFilterData={setFilterData}
            filtersSelected={filtersSelected}
            setFiltersSelected={setFiltersSelected}
          />
          <StyledGroupsContainer>
            <StyledGroupsHeader>
              <CategoriesMultiselector
                categoriesShown={categoriesShown}
                setCategoriesShown={setCategoriesShown}
              />
            </StyledGroupsHeader>
            <DndProvider backend={HTML5Backend}>
              <Grid container spacing={1}>
                {studentGroups.map((studentGroup, index) => (
                  <GroupGrid
                    key={index}
                    studentList={studentGroup}
                    groupIndex={index}
                    zingId={zingId}
                    setStudentGroups={setStudentGroups}
                    studentGroups={studentGroups}
                    moveStudentBetweenGrids={moveStudentBetweenGrids}
                    moveStudentWithinGrid={moveStudentWithinGrid}
                    categoriesShown={categoriesShown}
                    filtersSelected={filtersSelected}
                  />
                ))}
              </Grid>
            </DndProvider>
          </StyledGroupsContainer>
        </StyledMainContainer>
      </Box>
    )
  } else {
    // TODO: add a real loading screen asset later
    return (
      <StyledContainer>
        <StyledClassName>Loading</StyledClassName>
      </StyledContainer>
    )
  }
}

/**
 *
 *
 * Plan of action for this task:
 *
 * Collect all SVGs from Alyssa's folder and put them in an svg module that can be imported
 * Edit studentGrid to hold these SVGs
 * Display all of them by default to start
 *
 *
 */
