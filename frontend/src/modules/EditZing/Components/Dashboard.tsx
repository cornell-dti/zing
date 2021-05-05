import React from 'react'
import Grid from '@material-ui/core/Grid'
import { StyledContainer } from 'EditZing/Styles/DashboardStyle.style'
import { GroupGrid } from 'EditZing/UIElements/GroupGrid'
import { Student } from 'EditZing/Types/Student'

export const Dashboard = () => {
  const fakeStudentGroup1: Student[] = require('EditZing/fakeData.json')[0]
  console.log(fakeStudentGroup1)
  return (
    <StyledContainer>
      <Grid spacing={3}>
        <GroupGrid studentList={fakeStudentGroup1} />
      </Grid>
    </StyledContainer>
  )
}
