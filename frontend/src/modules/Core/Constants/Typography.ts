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
    font-size: 2.25rem;
    line-height: 3rem;
  }

  @media ${device.tablet} {
    font-size: 4.5rem;
    line-height: 6rem;
  } ;
`

export const h2 = css`
  ${body};
  @media ${device.mobileS} {
    font-size: 1.67rem;
    line-height: 2rem;
  }

  @media ${device.tablet} {
    font-size: 2.25rem;
    line-height: 3rem;
  } ;
`

export const h3 = css`
  ${body};
  @media ${device.mobileS} {
    font-size: 1.25rem;
    line-height: 1.67rem;
  }

  @media ${device.tablet} {
    font-size: 1.67rem;
    line-height: 2rem;
  } ;
`

export const h4 = css`
  ${body};
  @media ${device.mobileS} {
    font-size: 0.75rem;
    line-height: 1rem;
  }

  @media ${device.tablet} {
    font-size: 1.25rem;
    line-height: 1.67rem;
  } ;
`
