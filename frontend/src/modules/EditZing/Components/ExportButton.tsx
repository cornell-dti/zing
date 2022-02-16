import React, { useState } from 'react'
import { colors } from '@core/Constants'
import { Box, Button, Modal, Typography } from '@mui/material'
import {
  ExportButtonListType,
  ExportButtonInformationType,
  ExportProps,
} from 'EditZing/Types/ComponentProps'
import { ExportFileIconButton } from 'EditZing/Components/ExportFileIconButton'

export const ExportButton = ({
  label,
  options,
  data,
  zingName,
}: ExportProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Box>
      <Button onClick={handleOpen}>{label}</Button>
      <Modal
        id="button-modal"
        className="mui-fixed"
        open={isOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 300,
          style: { backgroundColor: 'rgba(0, 0, 0, 0.75)' },
        }}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            backgroundColor: colors.white,
            pt: 4,
            px: 5,
            pb: 2,
            minWidth: { md: '500px' },
            borderRadius: '20px',
            fontWeight: 'normal',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 400,
              textAlign: 'center',
              marginBottom: '1.8rem',
              fontSize: 24,
            }}
          >
            Select a file below to download:
          </Typography>
          {options.map(({ title, buttons }: ExportButtonListType, index) => {
            return (
              <div key={index}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 500,
                    fontSize: '1.1rem',
                    mb: 2,
                  }}
                  key={index}
                >
                  {title}
                </Typography>
                <Box mx={2} display="flex" justifyContent="space-around">
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
                </Box>
              </div>
            )
          })}
        </Box>
      </Modal>
    </Box>
  )
}
