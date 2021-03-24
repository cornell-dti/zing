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

export interface GoToButtonProps extends Common {
  className?: string | undefined
  label?: string | React.Component
  labelStyle?: { [key in string]: string }
  src: string
  onClick: () => void
}

export interface RadioButtonProps extends Common {
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickLabel?: (s: string) => void
  value: string
  name: string
}

export interface RadioButtonsProps extends Common {
  values: string[]
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void // to set state of user information in index.tsx
  onClickLabel?: (s: string) => void // to set state when label is clicked
}
