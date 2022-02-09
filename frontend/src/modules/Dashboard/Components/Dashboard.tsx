import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Modal } from '@mui/material'
import { logOutWithGoogle } from '@fire/firebase'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import { CreateZing } from 'CreateZing'
import {
  StyledOuterContainer,
  StyledContainer,
  StyledHeaderMenu,
  StyledLogo,
  StyledName,
  StyledArrowDown,
  StyledModalContainer,
} from 'Dashboard/Styles/Dashboard.style'
import { Groups } from 'Dashboard/Components/Groups'
import { CourseInfo } from 'Dashboard/Types'
import { useAppSelector } from '@redux/hooks'
import { API_ROOT, COURSE_API, USER_API } from '@core/Constants'

const PREFIX = 'Dashboard'

const classes = {
  modal: `${PREFIX}-modal`,
}

export const Dashboard = () => {
  const [modalOpen, setModalOpen] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const userEmail = useAppSelector((state) => state.auth.user?.email)
  const [groups, setGroups] = useState<CourseInfo[]>([])

  useEffect(() => {
    axios
      .get(`${API_ROOT}${USER_API}/${userEmail}${COURSE_API}`)
      .then((res) => {
        setGroups(res.data)
      })
  }, [userEmail])

  return (
    <StyledOuterContainer>
      <StyledContainer>
        <StyledHeaderMenu>
          <StyledLogo />
          <Button
            aria-controls="logout-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <StyledName>
              {useAppSelector((state) => state.auth.user?.displayName)}
              <StyledArrowDown />
            </StyledName>
          </Button>
          <Menu
            anchorEl={anchorEl}
            // getContentAnchorEl={null}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'logout-button',
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <MenuItem
              sx={{
                fontSize: 16,
              }}
              onClick={logOutWithGoogle}
            >
              Log Out
            </MenuItem>
          </Menu>
        </StyledHeaderMenu>
        <Groups groups={groups} toggleModalOpen={() => setModalOpen(true)} />
      </StyledContainer>
      <Modal
        className={classes.modal}
        open={modalOpen}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onClose={() => {
          setModalOpen(false)
        }}
      >
        <StyledModalContainer>
          <CreateZing
            onSubmit={(newGroup: CourseInfo) => {
              const groupsCopy = groups.slice()
              groupsCopy.push(newGroup)
              setGroups(groupsCopy)
              setModalOpen(false)
            }}
          />
        </StyledModalContainer>
      </Modal>
    </StyledOuterContainer>
  )
}
