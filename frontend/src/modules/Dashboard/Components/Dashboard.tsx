import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Modal } from '@material-ui/core'

import { logOutWithGoogle } from '@fire/firebase'

import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

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

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

export const Dashboard = () => {
  const classes = useStyles()
  const [modalOpen, setModalOpen] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  //const [isMenuOpen, setMenuOpen] = useState(false)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const userEmail = useAppSelector((state) => state.auth.user?.email)
  const [groups, setGroups] = useState<CourseInfo[]>([])

  var showMenu = false
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
            id="logout-button"
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
            id="logout-menu"
            anchorEl={anchorEl}
            getContentAnchorEl={null}
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
            <MenuItem onClick={logOutWithGoogle}>Log Out</MenuItem>
          </Menu>
        </StyledHeaderMenu>
        <Groups groups={groups} toggleModalOpen={() => setModalOpen(true)} />
      </StyledContainer>
      <Modal
        className={classes.modal}
        open={modalOpen}
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
