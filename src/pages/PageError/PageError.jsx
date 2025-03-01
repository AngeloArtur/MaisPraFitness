import { Link } from "react-router-dom";
import PageNotFound from "../../assets/images/undraw_page-not-found.svg";
import { Box, Button } from "@mui/material";
import { useAuth } from "../../context/AuthContext";

export default function PageError() {
    const { isAuthenticated } = useAuth();
    return (
        <Box className="flex flex-col items-center justify-center h-dvh w-full p-3 gap-9 md:p-8 ">
            <h1>Ops, parece que algo deu errado</h1>
            <img src={PageNotFound} className="w-64 md:w-1/2" alt="Página não encontrada" />

            <Button variant="outlined" className="!text-secondary !border-secondary">
                <Link to={isAuthenticated ? "/dashboard" : "/login"}>Retornar a página inicial</Link>
            </Button>
        </Box>
    );
}
