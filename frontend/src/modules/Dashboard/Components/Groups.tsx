import React from 'react'
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
  const groups = [
    {
      name: 'INFO 2300',
      submitted: 300,
      total: 400,
      deadline: new Date(2021, 5, 5),
    },
    {
      name: 'INFO 3300',
      submitted: 300,
      total: 400,
      deadline: new Date(2021, 5, 6),
    },
  ]

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
              submitted={g.submitted}
              total={g.total}
              deadline={g.deadline}
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
