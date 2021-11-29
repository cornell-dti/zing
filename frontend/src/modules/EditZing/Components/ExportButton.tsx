import React, { useState } from 'react'
import { Button } from '@core/Components'
import { colors } from '@core/Constants'
import { makeStyles } from '@material-ui/core/styles'
import { Backdrop, Fade, Modal } from '@material-ui/core'
import {
  ExportButtonListType,
  ExportButtonInformationType,
  ExportProps,
} from 'EditZing/Types/ComponentProps'
import { ExportFileIconButton } from 'EditZing/Components/ExportFileIconButton'

// MUI-based styling
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: colors.white,
    padding: theme.spacing(2, 4, 3),
    borderRadius: '20px',
    fontFamily: 'Montserrat',
    fontWeight: 'normal',
  },
  headingText: {
    fontWeight: 400,
    textAlign: 'center',
    fontSize: '24px',
  },
  subHeadingText: {
    fontWeight: 500,
    fontSize: '18px',
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

export const ExportButton = ({
  label,
  options,
  data,
  zingName,
}: ExportProps) => {
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
        id="button-modal"
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
            {options.map(({ title, buttons }: ExportButtonListType, index) => {
              return (
                <div key={index}>
                  <h3 className={classes.subHeadingText} key={index}>
                    {title}
                  </h3>
                  {buttons.map(
                    (
                      { type, downloadData }: ExportButtonInformationType,
                      index
                    ) => {
                      return (
                        <ExportFileIconButton
                          key={index}
                          type={type}
                          data={data}
                          downloadData={downloadData}
                          zingName={zingName}
                        />
                      )
                    }
                  )}
                </div>
              )
            })}
          </div>
        </Fade>
      </Modal>
    </>
  )
}
