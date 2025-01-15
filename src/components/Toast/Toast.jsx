import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import Alert from "@mui/material/Alert"
import { MdClose } from "react-icons/md"
import { useEffect, useState } from "react"

export default function Toast({ message, type }) {
  const duration = 3000
  const [open, setOpen] = useState(true)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    const intervalTime = 50 // Intervalo de atualização em milissegundos
    const totalIntervals = duration / intervalTime // Quantidade de atualizações
    const decrement = 100 / totalIntervals // Quanto reduzir em cada atualização

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.max(prev - decrement, 0)
        if (newProgress === 0) {
          clearInterval(interval) // Para o intervalo ao atingir 0
          setOpen(false) // Fecha o Snackbar
        }
        return newProgress
      })
    }, intervalTime)

    // Limpar intervalo ao desmontar o componente
    return () => clearInterval(interval)
  }, [duration])


  const handleClose = (event, reason) => {
    if (reason === "clickaway") return
    setOpen(false)
  }

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <MdClose fontSize="small" />
      </IconButton>
    </>
  )
  return (
    <div>
      <Snackbar open={open} autoHideDuration={duration} action={action}>
        <Alert
          sx={{
            color: "#000",
            borderRadius: "3px",
            position: "relative",
            paddingBottom: "6px",
            "&::after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: `${progress}%`, // Largura dinâmica da barra
              height: "3px",
              backgroundColor: "green",
              transition: "width 50ms linear",
            },
          }}
          severity={type}
          onClose={handleClose}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}
