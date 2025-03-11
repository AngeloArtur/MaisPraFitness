import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import Sidebar, { drawerWidth } from "./components/Sidebar/Sidebar";
import { useTheme } from "@mui/material/styles";
import { AuthProvider } from "./context/AuthContext";
import Routes from "./Routes/index.jsx";
import { useAuth } from "./context/AuthContext.jsx";
import RegisterForm from "./pages/Register-Form/RegisterForm.jsx";

const closedWidth = (theme) => `calc(${theme.spacing(7)} + 1px)`;

const App = () => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const hideSidebarRoutes = ["/login", "/forgot-password"];
    const shouldRenderSidebar = !hideSidebarRoutes.includes(location.pathname);
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    return (
        <>
            {(shouldRenderSidebar && isAuthenticated) && <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />}
            <main
                style={{
                    ...((shouldRenderSidebar && isAuthenticated) && {
                        marginLeft: open ? `${drawerWidth}px` : closedWidth(theme),
                        transition: "margin 0.3s ease",
                    }),
                }}>
                <Routes />
            </main>
        </>
    );
};

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
);
