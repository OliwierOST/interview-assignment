import { PhoneSelectionModal } from "./components/PhoneSelectionModal"
import { Stack, Button } from "@mui/material"
import { useState } from "react"

function App() {
  const [showModal, setShowModal] = useState(false)

  return (
    <Stack height="100vh" alignItems="center" justifyContent="center">
      <Button variant="contained" onClick={() => setShowModal(true)}>
        Open modal
      </Button>
      <PhoneSelectionModal showModal={showModal} setShowModal={setShowModal} />
    </Stack>
  )
}

export default App
