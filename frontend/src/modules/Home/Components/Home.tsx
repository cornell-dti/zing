import React from 'react'

import {
  StyledBackground,
  StyledContainer,
  StyledHeaderText,
  StyledLeftPanel,
  StyledLogo,
  StyledRightPanel,
  StyledTeacherPic,
  StyledTitleWrapper,
  StyledWelcomeText,
  StyledWhiteActionText,
} from 'Home/Styles/Home.style'

export const Home = () => {
  return (
    <StyledBackground>
      <StyledContainer>
        <StyledLeftPanel>
          <StyledLogo />
          <StyledWhiteActionText>
            Create groups, connect students
          </StyledWhiteActionText>
          <StyledTeacherPic />
        </StyledLeftPanel>
        <StyledRightPanel>
          <StyledTitleWrapper>
            <StyledHeaderText>Hi,</StyledHeaderText>
            <StyledWelcomeText>Welcome to Zing!</StyledWelcomeText>
          </StyledTitleWrapper>
        </StyledRightPanel>
      </StyledContainer>
    </StyledBackground>
  )
}
