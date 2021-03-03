import React from 'react'

import { Button } from '@core/Components/Button'
import { ButtonProps } from '@core/Types/FormFieldProps'

export const GetConnectedButton = ({ onClick }: ButtonProps) => {
  const labelStyle = {
    fontSize: '24px',
    lineHeight: '60px',
  }
  return (
    <Button labelStyle={labelStyle} label="Get Connected" onClick={onClick} />
  )
}
