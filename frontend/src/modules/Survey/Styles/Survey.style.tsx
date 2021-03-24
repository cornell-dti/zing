import styled from 'styled-components'

import { colors } from '@core'
import bg from '@assets/img/bg2.svg'

export const StyledContainer = styled.div`
  height: 100%;
  background-image: url(${bg});
  background-size: cover;

  display: flex;
  justify-content: center;
  align-items: center;
`
export const StyledInnerContainer = styled.div`
  height: 80%;
  width: 80%;
  background-color: ${colors.white};
  box-shadow: -10px -10px 150px rgba(0, 0, 0, 0.1),
    10px 10px 150px rgba(0, 0, 0, 0.1);

  display: flex;
`
