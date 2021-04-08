import styled, { css } from 'styled-components'

import logo from '@assets/img/purplelogo.svg'
import progress from '@assets/img/progressbarstep1.svg'
import { colors, h2, h4, StyledComponent } from '@core'
import { GoNextPrevButton } from 'Survey/Components/UIElements/GoNextPrevButton'
import errorIcon from '@assets/img/erroricon.svg'

const Logo = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={logo} alt="logo" />
  </div>
)

const ProgressBar = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={progress} alt="progress" />
  </div>
)

const ErrorIcon = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={errorIcon} alt="errorIcon" />
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
  padding: 2rem;
  position: relative;
`

export const StyledFullPanelNoPadding = styled.div`
  ${fullPanel}
`

export const StyledContainer = styled.div`
  height: 85%;
  width: 80%;
  background-color: ${colors.white};
  box-shadow: -10px -10px 150px rgba(0, 0, 0, 0.1),
    10px 10px 150px rgba(0, 0, 0, 0.1);

  display: flex;
`

export const StyledWrapper = styled.div`
  display: flex;
`
export const StyledHeaderWrapper = styled.div`
  height: 5%;
  display: flex;
  flex-direction: column;
`
export const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const StyledPrevButton = styled(GoNextPrevButton)`
  cursor: pointer;
`

export const StyledNextButton = styled(GoNextPrevButton)`
  cursor: pointer;
  margin-left: auto;
`

export const StyledProgressBar = styled(ProgressBar)`
  justify-content: left;
  align-content: left;
`

export const StyledLogo = styled(Logo)``

export const StyledErrorIcon = styled(ErrorIcon)``

export const StyledErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
`

export const StyledErrorText = styled.text`
  ${h4};
  color: ${colors.red};
  padding-left: 0.5rem;
  font-weight: 500;
  position: relative;
`
