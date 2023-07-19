import React, { useState } from "react"

import "@fontsource/poppins"
import { Stack, Typography, Modal, Button } from "@mui/material"
import { styled } from "@mui/system"
import { countries, type Country } from "../../data/countries"
import { CountryAutocomplete } from "./CountryAutocomplete"
import PhoneInput from "./PhoneInput"

const ModalButton = styled(Button)({
  width: "116px",
  height: "32px",
  borderRadius: "6px",
  borderColor: "#5870E0",
  fontFamily: "Poppins",
  fontSize: "16px",
  fontWeight: 500,
})

interface PhoneSelectionModalProps {
  showModal: boolean
  setShowModal: (showModal: boolean) => void
}

export function PhoneSelectionModal({
  showModal,
  setShowModal,
}: PhoneSelectionModalProps) {
  const initialCountry = countries.find((country) => country.label === "Poland")
  const [country, setCountry] = useState<Country | undefined>(initialCountry)
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [showSelect, setShowSelect] = useState<boolean>(false)

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <Modal open={showModal} onClose={() => handleClose()}>
      <Stack
        justifyContent="space-between"
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, calc(-50% - 101px))",
          height: "202px",
          width: "564px",
          bgcolor: "background.default",
          p: "24px",
          borderRadius: "24px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#28293D",
            fontFamily: "Poppins",
            fontSize: "22px",
            fontWeight: 600,
            lineHeight: "24px",
          }}
        >
          Change phone number
        </Typography>
        <Stack spacing={1}>
          <Typography
            color="gray"
            sx={{
              ml: "8px",
              color: "#555770",
              fontFamily: "Poppins",
              fontSize: "14px",
              fontWeight: 500,
              lineHeight: "16px",
              letterSpacing: "0.2px",
            }}
          >
            Provide new phone number
          </Typography>
          <Stack
            direction="row"
            gap="10px"
            position="relative"
            alignItems="center"
          >
            <CountryAutocomplete
              showSelect={showSelect}
              setShowSelect={setShowSelect}
              country={country}
              setCountry={setCountry}
            />
            <PhoneInput
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
            />
          </Stack>
        </Stack>
        <Stack direction="row" alignSelf="flex-end" gap="16px">
          <ModalButton
            variant="outlined"
            sx={{ textTransform: "none", color: "#28293D" }}
            onClick={() => {
              setCountry(initialCountry)
              setPhoneNumber("")
            }}
          >
            Cancel
          </ModalButton>
          <ModalButton
            variant="contained"
            sx={{
              textTransform: "none",
              bgcolor: "#5870E0",
              ":hover": {
                bgcolor: "#5978eb",
              },
            }}
            onClick={() => setShowModal(false)}
          >
            Save
          </ModalButton>
        </Stack>
      </Stack>
    </Modal>
  )
}
