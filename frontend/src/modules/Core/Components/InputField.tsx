import React from 'react'
import { TextField, ThemeProvider, createMuiTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import { colors } from '@core'
import Montserrat from '@assets/fonts/Montserrat-Regular.ttf'
import { InputProps } from '@core/Types/FormFieldProps'
import {
  defaultContainerStyle,
  defaultInputStyle,
} from '@core/Styles/InputField.style'
import ErrorIconOutline from '@material-ui/icons/ErrorOutline'

/** customized TextInput with themed underlines */
const StyledTextField = styled(TextField)`
&& .MuiInput-underline:hover::before {
  border-color: ${(props) => (props.color ? props.color : colors.darkpurple)};
},
&& .MuiInput-underline:before {
  border-color: ${(props) => (props.color ? props.color : colors.darkpurple)};
},
&& .MuiInput-underline:after {
  border-color: ${(props) => (props.color ? props.color : colors.darkpurple)};
},
`
/** customized TextInput for form validation errors with red underlines */
const StyledErrorTextField = styled(TextField)`
&& .MuiInput-underline:hover::before {
  border-color: ${colors.red};
},
&& .MuiInput-underline:before {
  border-color: ${colors.red};
},
&& .MuiInput-underline:after {
  border-color: ${colors.red};
},
`

/** imported font so MuiTheme can insert it into the TextField */
const montesserat: any = {
  fontFamily: 'Montserrat',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 500,
  src: `
    local('Montserrat-Regular'),
    url(${Montserrat}) format('ttf')
  `,
}

/** Generic InputField component for more specific fields to customize */
export const InputField = ({
  endAdornment,
  key,
  MuiColor = colors.darkpurple,
  containerStyle = {},
  inputStyle = {},
  type = 'input',
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
  console.log(MuiColor)
  const icon = <ErrorIconOutline style={{ fill: colors.red }} />

  const defaultTheme = createMuiTheme({
    typography: {
      fontFamily: 'Montserrat',
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [montesserat],
        },
      },
    },
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      {MuiColor !== colors.red ? (
        <StyledTextField
          key={key}
          className={classes.container}
          inputProps={{ className: classes.input }}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...inputProps}
        />
      ) : (
        <StyledErrorTextField
          key={key}
          className={classes.container}
          inputProps={{ className: classes.input }}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          value={value}
          onChange={onChange}
          InputProps={{
            endAdornment: icon,
          }}
          {...inputProps}
        />
      )}
    </ThemeProvider>
  )
}
