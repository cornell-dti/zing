import styled, { css } from 'styled-components'
import errorIcon from '@assets/img/erroricon.svg'
import { colors, h2, h4, StyledComponent, RadioButtons } from '@core'

const ErrorIcon = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={errorIcon} alt="errorIcon" />
  </div>
)

export const StyledContainer = styled.div`
  margin: auto;
`

export const StyledRadioButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 0.25rem;
  justify-content: center;
  align-items: center;
`

export const StyledRadioButtons = styled(RadioButtons)``

export const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const StyledWelcomeText = styled.text`
  ${h2};
  font-weight: 500;
  line-height: 10px;
`

export const StyledErrorIcon = styled(ErrorIcon)``

export const StyledErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding-bottom: 0.5rem;
`

export const StyledErrorText = styled.text`
  ${h4};
  color: ${colors.red};
  padding-left: 0.5rem;
  font-weight: 500;
  position: relative;
`
