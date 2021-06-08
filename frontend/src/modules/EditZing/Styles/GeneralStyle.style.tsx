import React from 'react'
import { colors, h1, h2, h3, h4, StyledComponent } from '@core'
import styled from 'styled-components'

export const StyledContainer = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`

export const StyledGroupContainer = styled.div`
  padding: 2rem;
  border: 0.5px solid rgba(205, 156, 242, 0.15);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.07);
  border-radius: 20px;
  margin: 0.25rem;
`

export const StyledGroupTextWrapper = styled.div`
  margin-bottom: 1rem;
`

export const StyledGroupText = styled.text`
  ${h3};
  font-weight: 800;
  color: ${colors.black};
`
