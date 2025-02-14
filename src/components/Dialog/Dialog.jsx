import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import { MdClose } from "react-icons/md";

export default function DialogBox({ open, onClose, title, children }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <header className="flex justify-between items-center px-3">
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {title}
                </DialogTitle>
                <IconButton onClick={onClose}>
                    <MdClose aria-label="close" />
                </IconButton>
            </header>
            <DialogContent dividers className="w-3/4">
                {children}
            </DialogContent>
        </Dialog>
    );
}
