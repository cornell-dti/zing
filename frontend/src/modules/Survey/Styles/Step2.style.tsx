import styled, { css } from 'styled-components'

import { colors, h1, h2, h3, StyledComponent } from '@core'

import logo from '@assets/img/smallwhitelogo.svg'
import check from '@assets/img/whitecheckmark.svg'

const Logo = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={logo} alt="logo" />
  </div>
)

const Check = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={check} alt="check" />
  </div>
)

export const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledLogo = styled(Logo)`
  margin-top: 8.4%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledCheck = styled(Check)`
  margin-right: 6%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const StyledContainer = styled.div`
  height: 80%;
  width: 80%;
  margin: 0;
  background: linear-gradient(
    162.9deg,
    #c794ee 0.78%,
    #d9b6f6 27.99%,
    #e8d6fb 55.75%,
    #f6f3ff 101.78%
  );
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

export const StyledFullPanel = styled.div`
  ${fullPanel}
`

export const StyledCongratulationsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 75%;
  margin-top: 10%;
`
export const StyledCongratulationsText = styled.text`
  ${h2};
  font-weight: 500;
  color: white;
`
export const StyledContactWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 10%;
`

export const StyledContactText = styled.text`
  ${h3};
  font-weight: 400;
  color: rgba(172, 129, 206, 1);
`
