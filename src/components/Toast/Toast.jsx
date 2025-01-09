import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import { MdClose } from "react-icons/md";
import { useState } from "react";

export default function Toast({ message, type }) {
    const duration = 2000;
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const action = (
        <>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                <MdClose fontSize="small" />
            </IconButton>
        </>
    );
    return (
        <div>
            <Snackbar open={true} autoHideDuration={2000} action={action}>
                <Alert
                    sx={{ borderBottom: "3px solid green", color: "#000", borderRadius: "3px" }}
                    severity={type}
                    onClose={handleClose}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
