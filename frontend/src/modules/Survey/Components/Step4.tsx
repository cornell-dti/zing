import React, { useState } from 'react'
import {
  StyledContainer,
  StyledPanel,
  StyledText,
} from 'Survey/Styles/Step4.style'

import { StepProps } from 'Survey/Types'
import { StudyHoursSlider } from 'Survey/Components/UIElements/StudyHoursSlider'

export const Step4 = ({ gotoPrevStep, gotoNextStep }: StepProps) => {
  const [hours, setHours] = useState<number | number[]>(0)
  return (
    <StyledContainer>
      <StyledPanel>
        <StyledText>
          How much time do you spend on this course outside of class time, in
          hours per week?
        </StyledText>
        <StudyHoursSlider
          value={hours}
          onChange={(e, newVal) => setHours(newVal)}
        />
      </StyledPanel>
    </StyledContainer>
  )
}
