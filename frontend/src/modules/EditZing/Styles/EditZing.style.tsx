import { colors, h3, StyledComponent } from '@core'
import styled from 'styled-components'
import logo from '@assets/img/purplelogo.svg'

export const StyledContainer = styled.div`
  height: 100%;
`
// this was in the above, but there was an error which prevented it from showing these styles
// flex-grow: 1;
// display: flex;
// justify-content: center;
// align-items: center;

export const StyledFlexHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: flex-start;
`

const Logo = ({ className }: StyledComponent) => (
  <div className={className}>
    <img src={logo} alt="logo" />
  </div>
)

export const StyledText = styled.div`
  ${h3};
  font-weight: 400;
  line-height: 10px;
  text-align: center;
  color: ${colors.mediumviolet};
  padding: 1.5rem;
`

export const StyledLogo = styled(Logo)``

export const StyledLogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.25rem;
`
