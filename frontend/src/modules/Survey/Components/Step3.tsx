import React from 'react'
import { colors, h2, body } from '@core'
import {
  StyledContainer,
  StyledText,
  StyledCalendarWrapper,
  StyledTextField,
} from 'Survey/Styles/Step3.style'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  })
)

export const Step3 = () => {
  const defaultGradDate = '2024-05'
  const [gradDate, setGradDate] = React.useState<string>(defaultGradDate)
  const classes = useStyles()

  return (
    <StyledContainer>
      <StyledText>When are you graduating?</StyledText>
      <StyledCalendarWrapper>
        <form className={classes.container} noValidate>
          <StyledTextField
            id="date"
            type="month"
            defaultValue={defaultGradDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setGradDate(e.target.value)
            }
          />
        </form>
        {/* <text>{gradDate}</text> */}
      </StyledCalendarWrapper>
    </StyledContainer>
  )
}
