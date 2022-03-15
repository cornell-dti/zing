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

export const StyledGroupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0rem 1rem 1rem 1rem;
`

export const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid ${colors.lightgray};
`

export const StyledFilterContainer = styled.div`
  height: 100%;
  width: 400%;
`

export const StyledGroupsHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`

export const StyledFlexHeader = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
  justify-content: space-between;
  align-items: flex-start;
  margin: 2rem 2rem 0;
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
