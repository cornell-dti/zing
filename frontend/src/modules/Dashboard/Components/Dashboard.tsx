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
import { useAppSelector } from '@redux/hooks'

export const Dashboard = () => {
  return (
    <StyledOuterContainer>
      <StyledContainer>
        <StyledHeaderMenu>
          <StyledLogo />
          <StyledName>
            {useAppSelector((state) => state.auth.user?.displayName)}
            <StyledArrowDown />
          </StyledName>
        </StyledHeaderMenu>
        <Groups />
      </StyledContainer>
    </StyledOuterContainer>
  )
}
