import styled, { css } from 'styled-components'

import { colors, h1, h2, h3, StyledComponent } from '@core'

import logo from '@assets/img/whitelogo.svg'
import teamPic from '@assets/img/teamwork.svg'

const Logo = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={logo} alt="logo" />
  </div>
)
export const StyledLogo = styled(Logo)`
  margin: 40px;
`

const TeamPic = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={teamPic} alt="teamPic" />
  </div>
)
export const StyledTeamPic = styled(TeamPic)`
  max-width: 100%;
  margin-top: 108px;
`

export const StyledContainer = styled.div`
  height: 80%;
  width: 80%;
  background-color: ${colors.white};
  box-shadow: -10px -10px 150px rgba(0, 0, 0, 0.1),
    10px 10px 150px rgba(0, 0, 0, 0.1);

  display: flex;
`

const panel = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const fullPanel = css`
  ${panel};
  height: 100%;
  width: 100%;
`

const halfPanel = css`
  ${panel};
  height: 100%;
  width: 50%;
`

export const StyledLeftPanel = styled.div`
  ${halfPanel};
  background: linear-gradient(
    162.9deg,
    #c794ee 0.78%,
    #d9b6f6 27.99%,
    #e8d6fb 55.75%,
    #f6f3ff 101.78%
  );
`

export const StyledWhiteActionText = styled.text`
  ${h3};
  color: ${colors.white};
`

export const StyledRightPanel = styled.div`
  ${halfPanel};
`

export const StyledTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const StyledHeaderText = styled.text`
  ${h1};
  color: ${colors.darkpurple};
`

export const StyledWelcomeText = styled.text`
  ${h2};
  font-weight: 400;
  color: ${colors.darkpurple};
`
