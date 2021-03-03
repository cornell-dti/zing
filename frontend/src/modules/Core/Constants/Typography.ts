import { css } from 'styled-components'

import { device } from '@core/Constants/Media'

export const body = css`
  font-family: 'Montserrat';
  font-style: normal;
  font-weight: normal;
`

export const h1 = css`
  ${body};
  @media ${device.mobileS} {
    font-size: 36px;
    line-height: 48px;
  }

  @media ${device.tablet} {
    font-size: 72px;
    line-height: 96px;
  } ;
`

export const h2 = css`
  ${body};
  @media ${device.mobileS} {
    font-size: 24px;
    line-height: 32px;
  }

  @media ${device.tablet} {
    font-size: 36px;
    line-height: 48px;
  } ;
`

export const h3 = css`
  ${body};
  @media ${device.mobileS} {
    font-size: 18px;
    line-height: 24px;
  }

  @media ${device.tablet} {
    font-size: 24px;
    line-height: 32px;
  } ;
`

export const h4 = css`
  ${body};
  @media ${device.mobileS} {
    font-size: 12px;
    line-height: 16px;
  }

  @media ${device.tablet} {
    font-size: 18px;
    line-height: 24px;
  } ;
`
