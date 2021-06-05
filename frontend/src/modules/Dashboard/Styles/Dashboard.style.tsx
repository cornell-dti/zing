import styled from 'styled-components'
import logo from '@assets/img/purplelogo.svg'
import { colors, StyledComponent } from '@core'
import bg2 from '@assets/img/bg2.svg'

const Logo = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={logo} alt="logo" />
  </div>
)

export const StyledContainer = styled.div`
  height: 86%;
  width: 80%;
  background-color: ${colors.white};
  box-shadow: -10px -10px 150px rgba(0, 0, 0, 0.1),
    10px 10px 150px rgba(0, 0, 0, 0.1);

  display: flex;
`

export const StyledLogo = styled(Logo)``

export const StyledOuterContainer = styled.div`
  height: 100%;
  background-image: url(${bg2});
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`
