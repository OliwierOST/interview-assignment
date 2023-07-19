import { PhoneSelectionModal } from "./components/PhoneSelectionModal"
import { Stack, Button } from "@mui/material"
import { useState } from "react"

function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Button
        variant="contained"
        onClick={() => setShowModal(true)}
        sx={{
          borderRadius: "6px",
          borderColor: "#5870E0",
          fontFamily: "Poppins",
          fontSize: "16px",
          fontWeight: 500,
          textTransform: "none",
          bgcolor: "#5870E0",
          //add hover bg color slightly darker
          ":hover": {
            bgcolor: "#5978eb",
          },
        }}
      >
        Open modal
      </Button>
      <PhoneSelectionModal showModal={showModal} setShowModal={setShowModal} />
    </Stack>
  )
}

export default App
