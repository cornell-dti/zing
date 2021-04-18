import React, { FunctionComponent, useState } from 'react'
import {
  StyledContainer,
  StyledFullPanel,
  StyledWrapper,
  StyledLogoWrapper,
  StyledLogo,
  StyledHeaderWrapper,
} from '../Styles/formStyle.style'

export const CreateGroupForm = () => {
  return (
    <StyledContainer>
      <StyledFullPanel>
        <StyledHeaderWrapper>
          <StyledLogoWrapper>
            <StyledLogo />
          </StyledLogoWrapper>
        </StyledHeaderWrapper>
      </StyledFullPanel>
    </StyledContainer>
  )
}
