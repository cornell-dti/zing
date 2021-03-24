import React from 'react'

// import { Image } from '@core/Components/Button'
import { GoToButtonProps } from '@core/Types/FormFieldProps'
import { StyledContainer } from '@core/Styles/Button.style'

export const GoNextPrevButton = ({
  className,
  src,
  onClick,
}: GoToButtonProps) => {
  const containerStyle = {}
  return (
    <div className={className} style={containerStyle}>
      <img src={src} alt="gonextprevbutton" onClick={onClick}></img>
    </div>
  )
}
