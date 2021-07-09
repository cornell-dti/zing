import React, { useState } from 'react'
import axios from 'axios'

import { API_ROOT } from '@core/Constants'
import { useAppSelector } from '@redux/hooks'

import {
  StyledContainer,
  StyledTitle,
  StyledGroupArea,
  StyledGroupCardArea,
  StyledAddButton,
  StyledText,
} from 'Dashboard/Styles/Groups.style'
import { useHistory } from 'react-router-dom'
import { GroupCard } from 'Dashboard/Components/GroupCard'

export const Groups = () => {
  const history = useHistory()
  const userEmail = useAppSelector((state) => state.auth.user?.email)

  const [groups, setGroups] = useState<CourseInfo[]>([])

  axios.get(`${API_ROOT}/instructor/${userEmail}/course`).then((res) => {
    setGroups(res.data)
  })

  return (
    <StyledContainer>
      {groups.length === 0 && (
        <StyledTitle>Welcome to Zing! Make your first Zing.</StyledTitle>
      )}
      <StyledGroupArea>
        <StyledGroupCardArea>
          {groups.map((g, i) => (
            <GroupCard
              key={i}
              name={g.name}
              submitted={300}
              total={300}
              deadline={new Date(g.dueDateStr)}
            />
          ))}
          <StyledAddButton onClick={() => history.push('/createZing')} />
        </StyledGroupCardArea>
        {groups.length === 0 && (
          <StyledText>Click "+" to create a new group.</StyledText>
        )}
      </StyledGroupArea>
    </StyledContainer>
  )
}

interface CourseInfo {
  name: string
  courseId: string
  minGroupSize: number
  dueDateStr: string
}
