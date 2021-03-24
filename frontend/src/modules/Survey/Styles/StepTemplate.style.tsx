import styled, { css } from 'styled-components'

import logo from '@assets/img/purplelogo.svg'
import progress from '@assets/img/progressbarstep1.svg'
import { colors, StyledComponent } from '@core'
import { GoNextPrevButton } from 'Survey/Components/UIElements/GoNextPrevButton'

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

const panel = css`
  display: flex;
  flex-direction: column;
`

const fullPanel = css`
  ${panel};
  height: 100%;
  width: 100%;
`

export const StyledFullPanel = styled.div`
  ${fullPanel}
  box-sizing: border-box;
  padding: 1rem;
`

export const StyledContainer = styled.div`
  height: 80%;
  width: 80%;
  background-color: ${colors.white};
  box-shadow: -10px -10px 150px rgba(0, 0, 0, 0.1),
    10px 10px 150px rgba(0, 0, 0, 0.1);

  display: flex;
`

export const StyledWrapper = styled.div`
  display: flex;
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
