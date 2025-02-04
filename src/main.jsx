import { useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";
import Sidebar, { drawerWidth } from "./components/Sidebar/Sidebar";
import MainRoutes from "./Routes/MainRoutes.jsx";
import { useTheme } from "@mui/material/styles";

const closedWidth = (theme) => `calc(${theme.spacing(7)} + 1px)`;

const App = () => {
    const location = useLocation();
    const hideSidebarRoutes = ["/login", "/forgot-password"];
    const shouldRenderSidebar = !hideSidebarRoutes.includes(location.pathname);
    const [open, setOpen] = useState(false);
    const theme = useTheme();

    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    return (
        <>
            {shouldRenderSidebar && <Sidebar open={open} handleDrawerOpen={handleDrawerOpen} />}
            <main
                style={{
                    ...(shouldRenderSidebar && {
                        marginLeft: open ? `${drawerWidth}px` : closedWidth(theme),
                        transition: "margin 0.3s ease",
                    }),
                }}>
                <MainRoutes />
            </main>
        </>
    );
};

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
);
