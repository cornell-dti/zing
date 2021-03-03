import styled, { css } from 'styled-components'

import { h4 } from '@core'

export const StyledContainer = styled.div``

const defaultInputStyle = css`
  ${h4};

  border: 0px;
  padding: 0 12px;
`

export const StyledInput = styled.input`
  ${defaultInputStyle}
`

export const StyledTextArea = styled.textarea`
  ${defaultInputStyle};
`
