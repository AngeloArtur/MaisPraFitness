import { Snackbar, Grow, IconButton, Alert } from "@mui/material";
import { MdClose } from "react-icons/md";
import { useEffect, useState } from "react";

function GrowTransition(props) {
    return <Grow {...props} />;
  }

export default function Toast({ message, type, open, onClose }) {
    const duration = 3000;
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        if (open) {
            const intervalTime = 50;
            const totalIntervals = duration / intervalTime;
            const decrement = 100 / totalIntervals;

            const interval = setInterval(() => {
                setProgress((prev) => {
                    const newProgress = Math.max(prev - decrement, 0);
                    if (newProgress === 0) {
                        clearInterval(interval);
                        onClose(); // Fecha o Toast
                    }
                    return newProgress;
                });
            }, intervalTime);

            return () => clearInterval(interval);
        }
    }, [open, duration, onClose]);

    const action = (
        <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={onClose}>
                <MdClose fontSize="small" />
            </IconButton>
        </>
    );
    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={duration}
                action={action}
                onClose={onClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                TransitionComponent={GrowTransition}>
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
                    onClose={onClose}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
