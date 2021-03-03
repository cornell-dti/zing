interface Common {
  containerStyle?: { [key in string]: string }
  disabled?: boolean
}

export interface InputProps extends Common {
  inputStyle?: { [key in string]: string }
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<any>) => void
  onKeyPress?: (e: React.KeyboardEvent) => void
}

export interface ButtonProps extends Common {
  label?: string | React.Component
  labelStyle?: { [key in string]: string }
  onClick: () => void
}
