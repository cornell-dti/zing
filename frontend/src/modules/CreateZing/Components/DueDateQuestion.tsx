import React, { useEffect, useState, FunctionComponent } from 'react'
import { QuestionProps } from '../Types/QuestionType'
import {
  StyledQuestionContainer,
  StyledText,
} from '../Styles/QuestionStyle.style'
import {
  StyledCalendarWrapper,
  StyledTextField,
} from '../Styles/FormStyle.style'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      width: 250,
    },
  })
)

export const DueDateQuestion = ({
  error = '',
  question,
  setAnswer,
  value,
  placeholder,
  isNumber,
  inputStyle,
}: QuestionProps) => {
  const defaultGradDate = '2024-05'
  const classes = useStyles()
  return (
    <StyledQuestionContainer>
      <StyledText>{question}</StyledText>
      <StyledCalendarWrapper>
        <form className={classes.container} noValidate>
          <StyledTextField
            id="date"
            type="date"
            defaultValue={defaultGradDate}
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAnswer(e.target.value)
            }
          />
        </form>
        <text>{value}</text>
      </StyledCalendarWrapper>
    </StyledQuestionContainer>
  )
}
