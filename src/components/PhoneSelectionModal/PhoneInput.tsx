import { TextField } from "@mui/material"
import React, { ChangeEvent } from "react"

interface PhoneInputProps {
  phoneNumber: string
  setPhoneNumber: (phoneNumber: string) => void
}

export default function PhoneInput({
  phoneNumber,
  setPhoneNumber,
}: PhoneInputProps) {
  const formatPhoneNumber = (value: string) => {
    const cleanedValue = value.replace(/\D/g, "")

    const formattedValue = cleanedValue.replace(
      /(\d{3})(\d{1,3})?(\d{1,3})?/,
      (_, p1, p2, p3) =>
        [p1, p2, p3].filter((group: string) => !!group).join("-")
    )

    return formattedValue
  }

  const handlePhoneNumberChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const inputPhoneNumber = event.currentTarget.value
    const formattedPhoneNumber = formatPhoneNumber(inputPhoneNumber)

    setPhoneNumber(formattedPhoneNumber)
  }

  return (
    <TextField
      fullWidth
      size="small"
      placeholder="000-000-000"
      onChange={handlePhoneNumberChange}
      value={phoneNumber}
      inputProps={{ maxLength: 11 }}
    />
  )
}
