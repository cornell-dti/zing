import React from 'react'

import { styled } from '@mui/material/styles'

import { colors } from '@core'
import { CheckboxProps } from '@core/Types'
import { Checkbox as MaterialUICheckbox, FormControlLabel } from '@mui/material'
import {
  defaultContainerStyle,
  defaultLabelStyle,
} from '@core/Styles/Checkbox.style'

const PurpleCheckbox = styled((props: CheckboxProps) => (
  <MaterialUICheckbox color="default" {...props} />
))`
  &.MuiCheckbox-root {
    color: ${colors.darkpurple};
  }

  .Mui-checked {
    color: ${colors.darkpurple};
  }
`
export const Checkbox = ({
  containerStyle = {},
  labelStyle = {},
  checked,
  onChange,
  key,
  label,
  labelPlacement = 'end',
}: CheckboxProps) => {
  const newContainerStyle = Object.assign(
    {},
    defaultContainerStyle,
    containerStyle
  )
  const newLabelStyle = Object.assign({}, defaultLabelStyle, labelStyle)

  // Whoa it's got a form control label attached to it!!!!1!
  return (
    <FormControlLabel
      sx={{
        root: newContainerStyle,
        label: newLabelStyle,
      }}
      control={<PurpleCheckbox checked={checked} onChange={onChange} />}
      key={key}
      label={label}
      labelPlacement={labelPlacement}
    />
  )
}
