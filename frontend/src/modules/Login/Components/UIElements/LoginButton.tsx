import React from 'react'
import { Button, ButtonProps } from '@core'

export const LoginButton = ({ onClick }: ButtonProps) => {
  const containerStyle = {
    background: 'linear-gradient(296.38deg, #CD9CF2 5.53%, #E8D6FB 96.38%)',
    alignSelf: 'flex-end',
    padding: '0 1.5rem',
    height: '60px',
    borderRadius: '30px',
  }

  const labelStyle = {
    fontSize: '1.5rem',
    textTransform: 'capitalize',
  }

  return (
    <Button
      containerStyle={containerStyle}
      labelStyle={labelStyle}
      label="Log In"
      onClick={onClick}
    />
  )
}
