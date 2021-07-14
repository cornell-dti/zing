import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import { Modal } from '@material-ui/core'

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

  const userEmail = useAppSelector((state) => state.auth.user?.email)
  const [groups, setGroups] = useState<CourseInfo[]>([])

  useEffect(() => {
    axios
      .get(`${API_ROOT}${USER_API}/${userEmail}${COURSE_API}`)
      .then((res) => {
        setGroups(res.data)
        console.log(res.data)
      })
  }, [])

  return (
    <StyledOuterContainer>
      <StyledContainer>
        <StyledHeaderMenu>
          <StyledLogo />
          <StyledName>
            {useAppSelector((state) => state.auth.user?.displayName)}
            <StyledArrowDown />
          </StyledName>
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
