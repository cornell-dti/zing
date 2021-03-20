import styled, { css } from 'styled-components'

import { colors, h1, h2, h3, StyledComponent } from '@core'

import logo from '@assets/img/purplelogo.svg'
import prev from '@assets/img/prev.svg'
import next from '@assets/img/next.svg'
import progress from '@assets/img/progressbarstep1.svg'

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

export const StyledProgressBar = styled(ProgressBar)`
  justify-content: left;
  align-content: left;
`

export const StyledLogo = styled(Logo)`
  margin-top: 50px;
  margin-left: 50px;
  margin-bottom: 18px;
  justify-content: left;
  align-content: left;
`

export const StyledContainer = styled.div`
  height: 80%;
  width: 80%;
  margin: 0;
  background-color: ${colors.white};
  box-shadow: -10px -10px 150px rgba(0, 0, 0, 0.1),
    10px 10px 150px rgba(0, 0, 0, 0.1);
  display: flex;
`

const panel = css`
  display: flex;
  flex-direction: column;
`

const fullPanel = css`
  ${panel};
  height: 100%;
  width: 100%;
`

export const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const StyledWelcomeText = styled.text`
  ${h2};
  font-weight: 500;
`

export const StyledFullPanel = styled.div`
  ${fullPanel}
`
