import React from 'react'

import {
  StyledContainer,
  StyledTitle,
  StyledGroupArea,
  StyledGroupCardArea,
  StyledText,
} from 'Dashboard/Styles/Groups.style'
import { GroupCard } from 'Dashboard/Components/GroupCard'
import { CourseInfo } from 'Dashboard/Types'
import { IconButton } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

export const Groups = ({
  toggleModalOpen,
  groups,
}: ModalProps & GroupsProps) => {
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
              id={g.courseId}
              name={g.name}
              submitted={300}
              total={300}
              deadline={new Date(g.dueDateStr)}
            />
          ))}
          <IconButton
            color="secondary"
            size="large"
            onClick={() => toggleModalOpen()}
            sx={{
              padding: 3,
            }}
          >
            <AddIcon />
          </IconButton>
        </StyledGroupCardArea>
        {groups.length === 0 && (
          <StyledText>Click "+" to create a new group.</StyledText>
        )}
      </StyledGroupArea>
    </StyledContainer>
  )
}

interface ModalProps {
  toggleModalOpen: () => void
}

interface GroupsProps {
  groups: CourseInfo[]
}
