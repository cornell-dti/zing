import styled, { css } from 'styled-components'
import logo from '@assets/img/purplelogo.svg'
import { colors, h3, StyledComponent } from '@core'
import bg2 from '@assets/img/bg2.svg'
import { Question } from '../Components/Question'
import { DueDateQuestion } from 'CreateZing/Components/DueDateQuestion'
import TextField from '@material-ui/core/TextField'
import { withStyles } from '@material-ui/core/styles'

const Logo = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={logo} alt="logo" />
  </div>
)

const panel = css`
  display: flex;
  flex-direction: column;
`

export const fullPanel = css`
  ${panel};
  height: 100%;
  width: 100%;
`

export const StyledFullPanel = styled.div`
  ${fullPanel}
  box-sizing: border-box;
  padding: 1.5rem;
  position: relative;
`

export const StyledFullPanelNoPadding = styled.div`
  ${fullPanel}
`

export const StyledContainer = styled.div`
  background-color: ${colors.white};
  box-shadow: -10px -10px 150px rgba(0, 0, 0, 0.1),
    10px 10px 150px rgba(0, 0, 0, 0.1);

  display: flex;
  justify-content: center;
  align-items: center;
`

export const StyledQuestionWrapper = styled.div`
  height: 88%;
  width: 80%;
  padding-left: 1.5rem;
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  position: relative;
  background: #f6f3ff;
  border-radius: 20px;
  display: flex;
  margin: 0.5rem;
`

export const StyledWrapper = styled.div`
  display: flex;
`
export const StyledHeaderWrapper = styled.div`
  height: 7%;
  display: flex;
  flex-direction: column;
`
export const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

export const StyledLogo = styled(Logo)``

export const StyledText = styled.text`
  ${h3};
  font-weight: 500;
  line-height: 20px;
`

export const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledQuestion = styled(Question)``

export const StyledDueDateQuestion = styled(DueDateQuestion)``

export const StyledQuestionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.25rem;
  justify-content: center;
  align-items: center;
`
export const StyledCalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
`
export const StyledTextField = withStyles({
  root: {
    background: '#f6f3ff',
    borderRadius: 3,
    border: 0,
    height: 48,
    color: colors.lightviolet,
    '& .MuiInput-underline:before': {
      color: colors.lightviolet,
      borderBottomColor: colors.darkpurple, // Semi-transparent underline
    },
    '& .MuiInput-underline:hover:before': {
      color: colors.lightviolet,
      borderBottomColor: colors.lightviolet, // Solid underline on hover
    },
    '& .MuiInput-underline:after': {
      color: colors.lightviolet,
      borderBottomColor: colors.darkpurple, // Solid underline on focus
    },
    '& .MuiInputBase-root': {
      color: colors.lightviolet,
      fontWeight: 500,
    },
    '& .MuiInputBase-root:focus': {
      color: colors.lightviolet,
    },
  },
})(TextField)

export const StyledTextFieldError = withStyles({
  root: {
    background: '#f6f3ff',
    borderRadius: 3,
    border: 0,
    height: 48,
    color: colors.red,
    '& .MuiInput-underline:before': {
      color: colors.red,
      borderBottomColor: colors.red, // Semi-transparent underline
    },
    '& .MuiInput-underline:hover:before': {
      color: colors.red,
      borderBottomColor: colors.red, // Solid underline on hover
    },
    '& .MuiInput-underline:after': {
      color: colors.red,
      borderBottomColor: colors.red, // Solid underline on focus
    },
    '& .MuiInputBase-root': {
      color: colors.red,
      fontWeight: 500,
    },
    '& .MuiInputBase-root:focus': {
      color: colors.red,
    },
  },
})(TextField)
