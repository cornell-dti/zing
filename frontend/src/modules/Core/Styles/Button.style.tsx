import styled, { css } from 'styled-components'

import { colors, h4 } from '@core'

const defaultContainerStyle = css`
  background: linear-gradient(296.38deg, #cd9cf2 5.53%, #e8d6fb 96.38%);
  border-radius: 40px;
  padding: 0 20px;

  text-align: center;
  color: ${colors.white};
  cursor: pointer;
`

export const StyledContainer = styled.div`
  ${defaultContainerStyle}
`

const defaultLabelStyle = css`
  ${h4};

  font-weight: 600;
  cursor: pointer;
`

export const StyledLabel = styled.label`
  ${defaultLabelStyle}
`
