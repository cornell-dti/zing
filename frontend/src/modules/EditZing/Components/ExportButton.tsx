import React, { useState } from 'react'
import { Button } from '@core/Components'
import { ButtonProps } from '@core/Types/FormFieldProps'
import { colors } from '@core/Constants'
import { makeStyles } from '@material-ui/core/styles'
import { Backdrop, Fade, Modal } from '@material-ui/core'
import { ReactComponent as CSVExportImg } from '@assets/img/csvexport.svg'
import {
  exportButtonsType,
  exportButtonType,
  ExportProps,
} from 'EditZing/Types/ComponentProps'
import { ExportFileIconButton } from 'EditZing/Components/ExportFileIconButton'

// mixed styling lol

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: colors.white,
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: '20px',
    fontFamily: 'Montserrat',
    fontWeight: 'normal',
  },
  headingText: {
    fontWeight: 400,
    textAlign: 'center',
  },
  subHeadingText: {
    fontWeight: 500,
  },
}))

const buttonContainerStyle = {
  background: colors.mediumviolet,
  boxShadow: '4px 4px 8px rgba(0, 0, 0, 0.1)',
  padding: '0 20px',
  height: '40px',
  borderRadius: '10px',
}

const buttonLabelStyle = {
  fontWeight: '600',
  fontSize: '18px',
  textTransform: 'none',
}

export const ExportButton = ({ label, options }: ExportProps) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <>
      <Button
        containerStyle={buttonContainerStyle}
        labelStyle={buttonLabelStyle}
        label={label}
        onClick={handleOpen}
      />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={`${classes.modal} mui-fixed`}
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isOpen}>
          <div className={classes.paper}>
            <h2 className={classes.headingText}>
              Select a file below to download:
            </h2>
            {options.map(({ title, buttons }: exportButtonsType) => {
              return (
                <>
                  <h3>{title}</h3>
                  {buttons.map(({ type, fun }: exportButtonType) => {
                    return <ExportFileIconButton fun={fun} type={type} />
                  })}
                </>
              )
            })}
            {/*<h3 className={classes.subHeadingText}>Download all details:</h3>*/}
            {/*/!*Make this a component*!/*/}
            {/*<CSVExportImg />*/}
            {/*/!*<h3 className={classes.subHeadingText}>Download group netids:</h3>*!/*/}
          </div>
        </Fade>
      </Modal>
    </>
  )
}
