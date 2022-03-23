import React from 'react'
import { useHistory } from 'react-router-dom'
import moment from 'moment'
import Snackbar from '@mui/material/Snackbar'

import {
  StyledContainer,
  StyledName,
  StyledRows,
  StyledRow,
  StyledClock,
  StyledManIcon,
  StyledText,
  StyledButtons,
} from 'Dashboard/Styles/GroupCard.style'
import {
  colors,
  SURVEY_PATH,
  API_ROOT,
  COURSE_API,
  CSV_API,
  BACKEND_ROOT,
  CREATE_GROUPS_API,
} from '@core'
import axios from 'axios'
import { Alert, Button } from '@mui/material'

export const GroupCard = ({
  componentKey,
  id,
  name,
  submitted,
  total,
  deadline,
}: GroupCardProps) => {
  const history = useHistory()
  const [open, setOpen] = React.useState(false)

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <StyledContainer key={componentKey}>
      <StyledName>{name}</StyledName>
      <StyledRows>
        <StyledRow>
          <StyledManIcon />
          <StyledText>{submitted} Forms Submitted</StyledText>
        </StyledRow>
        <StyledRow>
          <StyledClock />
          <StyledText>{moment(deadline).format('Do MMM YYYY')}</StyledText>
        </StyledRow>
      </StyledRows>
      <StyledButtons>
        <Button
          variant={new Date() > deadline ? 'outlined' : 'contained'}
          color={new Date() > deadline ? 'secondary' : 'primary'}
          onClick={() => {
            const index = window.location.href.indexOf('/dashboard')
            const baseUrl = window.location.href.slice(0, index)
            navigator.clipboard.writeText(`${baseUrl}${SURVEY_PATH}?id=${id}`)
            setOpen(true)
          }}
        >
          Copy link
        </Button>
        {new Date() > deadline && (
          <Button
            sx={{
              width: '45%',
            }}
            onClick={() => {
              axios.post(`${API_ROOT}${COURSE_API}/${id}${CSV_API}`).then(
                (response: any) => {
                  axios
                    .post(`${BACKEND_ROOT}${CREATE_GROUPS_API}?className=${id}`)
                    .catch((error: any) => {
                      console.log(error)
                    })
                    .finally(() => history.push(`/editZing/?id=${id}`))
                },
                (error: any) => {
                  console.log(error)
                }
              )
            }}
          >
            Match
          </Button>
        )}
      </StyledButtons>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          icon={false}
          onClose={handleClose}
          severity="success"
          sx={{
            backgroundColor: '#6FCF97',
            color: colors.white,
            fontWeight: 600,
          }}
        >
          Link for {name} copied to clipboard!
        </Alert>
      </Snackbar>
    </StyledContainer>
  )
}

interface GroupCardProps {
  componentKey: number
  id: string
  name: string
  submitted: number
  total: number
  deadline: Date
}
