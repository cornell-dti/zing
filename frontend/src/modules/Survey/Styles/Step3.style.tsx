import styled from 'styled-components'
import { colors, h2, h3 } from '@core'

import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

export const StyledContainer = styled.div`
  margin: auto;
`

export const StyledText = styled.text`
  ${h2};
  color: ${colors.black};
`

export const StyledCalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  justify-content: center;
  align-items: center;
`

export const StyledTextField = withStyles({
  root: {
    background: 'white',
    borderRadius: 3,
    border: 0,
    height: 48,
    padding: '0 30px',
    '& .MuiInput-underline:before': {
      borderBottomColor: colors.darkpurple, // Semi-transparent underline
    },
    '& .MuiInput-underline:hover:before': {
      borderBottomColor: colors.lightviolet, // Solid underline on hover
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: colors.darkpurple, // Solid underline on focus
    },
    // '& .MuiInputBase-root': {
    //   color: colors.lightviolet,
    // },
    // '& .MuiInputBase-root:focus': {
    //   color: colors.lightviolet,
    // },
  },
})(TextField)
