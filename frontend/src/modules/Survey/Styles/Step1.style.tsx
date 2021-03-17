import styled, { css } from 'styled-components'

import { colors, h1, h2, h3, StyledComponent } from '@core'

import logo from '@assets/img/whitelogo.svg'
import teamPic from '@assets/img/teamwork.svg'
import whiteBackground from '@assets/img/whiterectangle.png'

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

// const WhiteBackground = ({ className }: StyledComponent) => (
//   <div className={className}>
//     <img src={whiteBackground} alt="whiteBackground" />
//   </div>
// )

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

export const StyledWhiteActionText = styled.text`
  ${h3};
  color: ${colors.white};
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
  font-weight: 300;
  color: ${colors.darkpurple};
`
// export const StyledWhiteBackground = styled(WhiteBackground)`
//   max-width: 100%;
//   margin-top: 108px;
// `
