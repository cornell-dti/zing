import React from 'react'
import { Button } from '@core/Components'
import { ButtonProps } from '@core/Types/FormFieldProps'
import { colors } from '@core/Constants'

export const ExportButton = ({
  label,
  onClick,
  disabled = false,
  ...buttonProps
}: ButtonProps) => {
  const buttonContainerStyle = {
    background: colors.mediumviolet,
    boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '0 20px',
    height: '40px',
    borderRadius: '10px',
  }

  const buttonLabelStyle = {
    fontWeight: '600',
    fontSize: '18px',
    textTransform: 'none',
  }

  return (
    <Button
      containerStyle={buttonContainerStyle}
      labelStyle={buttonLabelStyle}
      label={label}
      onClick={onClick}
      disabled={disabled}
      {...buttonProps}
    />
  )
}
