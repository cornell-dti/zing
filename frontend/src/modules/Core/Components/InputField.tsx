import React from 'react'
import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { InputProps } from '@core/Types/FormFieldProps'
import {
  defaultContainerStyle,
  defaultInputStyle,
} from '@core/Styles/InputField.style'

export const InputField = ({
  containerStyle = {},
  inputStyle = {},
  type = 'input',
  error = '',
  placeholder,
  disabled = false,
  value,
  onChange,
  ...inputProps
}: InputProps) => {
  const classes = makeStyles({
    container: Object.assign({}, defaultContainerStyle, containerStyle),
    input: Object.assign({}, defaultInputStyle, inputStyle),
  })()

  return (
    <TextField
      error={error !== ''}
      helperText={error}
      className={classes.container}
      inputProps={{ className: classes.input }}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      value={value}
      onChange={onChange}
      {...inputProps}
    />
  )
}
