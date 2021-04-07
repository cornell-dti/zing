import React from 'react'
import { colors, h2, body } from '@core'
import {
  StyledContainer,
  StyledText,
  StyledCalendarWrapper,
  StyledTextField,
  StyledCalendarLabel,
} from 'Survey/Styles/Step3.style'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { StepProps } from 'Survey/Types/StepProps'

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

export const Step3 = ({ setAnswer, currentAnswer }: StepProps) => {
  const classes = useStyles()

  return (
    <StyledContainer>
      <StyledText>When are you graduating?</StyledText>
      <StyledCalendarWrapper>
        <StyledCalendarLabel>MM/DD/YYYY</StyledCalendarLabel>
        <form className={classes.container} noValidate>
          <StyledTextField
            id="date"
            type="date"
            value={currentAnswer}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              // console.log(e.target.value)
              setAnswer(e.target.value)
            }
          />
        </form>
      </StyledCalendarWrapper>
    </StyledContainer>
  )
}
