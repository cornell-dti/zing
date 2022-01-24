import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { TextField, Box } from '@mui/material'
import { colors } from '@core'
import { InputProps } from '@core/Types/FormFieldProps'
import {
  defaultContainerStyle,
  defaultInputStyle,
} from '@core/Styles/InputField.style'
import ErrorIconOutline from '@mui/icons-material/ErrorOutline'

/** customized TextInput with themed underlines */
const StyledTextField = styled(TextField)`
  & .MuiInput-underline:hover::before {
    border-color: ${(props) => (props.color ? props.color : colors.purple)};
  }

  & .MuiInput-underline::before {
    border-color: ${(props) => (props.color ? props.color : colors.purple)};
  }

  & .MuiInput-underline::after {
    border-color: ${(props) => (props.color ? props.color : colors.purple)};
  }
`
/** customized TextInput for form validation errors with red underlines */
const StyledErrorTextField = styled(TextField)`
  & .MuiInput-underline:hover::before {
    border-color: ${colors.red};
  }

  & .MuiInput-underline::before {
    border-color: ${colors.red};
  }

  & .MuiInput-underline::after {
    border-color: ${colors.red};
  }
`

/** Generic InputField component for more specific fields to customize */
export const InputField = ({
  fullWidth,
  endAdornment,
  key,
  MuiColor = colors.purple,
  containerStyle = {},
  inputStyle = {},
  type = 'input',
  error = '',
  placeholder,
  disabled = false,
  value,
  onChange,
  isNumber = false,
  ...inputProps
}: InputProps) => {
  const newContainerStyle = Object.assign(
    {},
    defaultContainerStyle,
    containerStyle
  )
  const newInputStyle = Object.assign({}, defaultInputStyle, inputStyle)

  const [localValue, setLocalValue] = useState(value)
  /** Error icon that is attached as a endAndornment to the textfield when error
   * occurs */
  const icon = <ErrorIconOutline style={{ fill: colors.red }} />

  return (
    <Box>
      {error === '' ? (
        <StyledTextField
          onClick={() =>
            // if number input, make sure its > 0
            isNumber && Number(localValue) < 0
              ? setLocalValue('0')
              : setLocalValue(localValue)
          }
          fullWidth={fullWidth}
          key={key}
          sx={newContainerStyle}
          inputProps={{ sx: newInputStyle }}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={localValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocalValue(e.target.value)
          }
          onBlur={onChange}
          variant="standard"
          {...inputProps}
        />
      ) : (
        <StyledErrorTextField
          error
          onClick={() =>
            // if number input, make sure its > 0
            isNumber && Number(localValue) < 0
              ? setLocalValue('0')
              : setLocalValue(localValue)
          }
          fullWidth={fullWidth}
          key={key}
          helperText={error}
          sx={newContainerStyle}
          inputProps={{ sx: newInputStyle }}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={localValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setLocalValue(e.target.value)
          }
          // onChange is really actually an onBlur for optimization
          onBlur={onChange}
          variant="standard"
          InputProps={{
            endAdornment: icon,
          }}
          {...inputProps}
        />
      )}
    </Box>
  )
}
