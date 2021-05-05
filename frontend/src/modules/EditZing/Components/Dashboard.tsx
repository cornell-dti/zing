import React from 'react'
import Grid from '@material-ui/core/Grid'
import { StyledContainer } from 'EditZing/Styles/DashboardStyle.style'
import { GroupGrid } from 'EditZing/UIElements/GroupGrid'
import { Student } from 'EditZing/Types/Student'

export const Dashboard = () => {
  const fakeStudentGroup: Student[] = require('EditZing/fakeData.json')[0]
  console.log(fakeStudentGroup)
  return (
    <StyledContainer>
      <Grid spacing={3}>{<GroupGrid studentList={fakeStudentGroup} />}</Grid>
    </StyledContainer>
  )
}
