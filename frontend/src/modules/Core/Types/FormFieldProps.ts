interface Common {
  containerStyle?: { [key in string]: any }
  disabled?: boolean
  [x: string]: any
}

export interface InputProps extends Common {
  inputStyle?: { [key in string]: any }
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<any>) => void
}

export interface ButtonProps extends Common {
  label?: string | React.Component
  labelStyle?: { [key in string]: any }
  onClick: () => void
}

interface MarkProps {
  value: number
  label?: string
}

export interface SliderProps extends Common {
  railStyle?: { [key in string]: any }
  trackStyle?: { [key in string]: any }
  thumbStyle?: { [key in string]: any }
  thumbLabelStyle?: { [key in string]: any }
  markStyle?: { [key in string]: any }
  markLabelStyle?: { [key in string]: any }
  defaultValue?: number | Array<number>
  min?: number
  max?: number
  step?: number
  marks?: boolean | Array<MarkProps>
  value: number | Array<number>
  onChange: (e: React.ChangeEvent<any>, value: number | number[]) => void
}
