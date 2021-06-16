import React from 'react'
import {
  StyledOuterContainer,
  StyledContainer,
  StyledHeaderMenu,
  StyledLogo,
  StyledName,
  StyledArrowDown,
} from 'Dashboard/Styles/Dashboard.style'
import { Groups } from 'Dashboard/Components/Groups'

export const Dashboard = () => {
  return (
    <StyledOuterContainer>
      <StyledContainer>
        <StyledHeaderMenu>
          <StyledLogo />
          <StyledName>
            N.Matias
            <StyledArrowDown />
          </StyledName>
        </StyledHeaderMenu>
        <Groups />
      </StyledContainer>
    </StyledOuterContainer>
  )
}
