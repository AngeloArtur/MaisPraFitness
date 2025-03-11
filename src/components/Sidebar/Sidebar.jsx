import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import {
    MdMenuOpen,
    MdOutlineMenu,
    MdPersonPin,
    MdDashboard,
    MdPerson,
    MdExitToApp,
    MdGroups,
    MdOutlinePersonAddAlt,
    MdManageAccounts,
} from "react-icons/md";

// Define as navegações por tipo de usuário
const ADMIN_NAVIGATION = [
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <MdDashboard className="text-secondary text-xl" />,
        route: "/dashboard",
    },
    {
        segment: "lista-usuarios",
        title: "Lista de Usuários",
        icon: <MdPersonPin className="text-secondary text-xl" />,
        route: "/employee-list",
    },
    {
        segment: "studentlist",
        title: "Lista alunos",
        icon: <MdGroups className="text-secondary text-xl" />,
        route: "/student-list",
    },
    {
        segment: "usersmanagement",
        title: "Gestão de usuários",
        icon: <MdManageAccounts className="text-secondary text-xl" />,
        route: "/users-management",
    },
    {
        segment: "Create",
        title: "Registrar Usuário",
        icon: <MdOutlinePersonAddAlt className="text-secondary text-xl" />,
        route: "/register-form",
    },
    {
        kind: "divider",
    },
    {
        segment: "reports",
        title: "Meu Perfil",
        icon: <MdPerson className="text-secondary text-xl" />,
        route: "/profile",
    },
    {
        segment: "exitapp",
        title: "Exit App",
        icon: <MdExitToApp className="text-secondary text-xl" />,
        route: "/login",
    },
];

const STUDENT_NAVIGATION = [
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <MdDashboard className="text-secondary text-xl" />,
        route: "/dashboard",
    },
    {
        kind: "divider",
    },
    {
        segment: "reports",
        title: "Meu Perfil",
        icon: <MdPerson className="text-secondary text-xl" />,
        route: "/profile",
    },
    {
        segment: "exitapp",
        title: "Exit App",
        icon: <MdExitToApp className="text-secondary text-xl" />,
        route: "/login",
    },
];

const PROFESSOR_NAVIGATION = [
    {
        segment: "dashboard",
        title: "Dashboard",
        icon: <MdDashboard className="text-secondary text-xl" />,
        route: "/dashboard",
    },
    {
        segment: "studentlist",
        title: "Lista alunos",
        icon: <MdGroups className="text-secondary text-xl" />,
        route: "/student-list",
    },
    {
        kind: "divider",
    },
    {
        segment: "reports",
        title: "Meu Perfil",
        icon: <MdPerson className="text-secondary text-xl" />,
        route: "/profile",
    },
    {
        segment: "exitapp",
        title: "Exit App",
        icon: <MdExitToApp className="text-secondary text-xl" />,
        route: "/login",
    },
];

const RECEPCIONISTA_NAVIGATION = [
    {
        segment: "studentlist",
        title: "Lista alunos",
        icon: <MdGroups className="text-secondary text-xl" />,
        route: "/student-list",
    },
    {
        segment: "usersmanagement",
        title: "Gestão de usuários",
        icon: <MdManageAccounts className="text-secondary text-xl" />,
        route: "/users-management",
    },
    {
        segment: "Create",
        title: "Registrar Usuário",
        icon: <MdOutlinePersonAddAlt className="text-secondary text-xl" />,
        route: "/register-form",
    },
    {
        kind: "divider",
    },
    {
        segment: "reports",
        title: "Meu Perfil",
        icon: <MdPerson className="text-secondary text-xl" />,
        route: "/profile",
    },
    {
        segment: "exitapp",
        title: "Exit App",
        icon: <MdExitToApp className="text-secondary text-xl" />,
        route: "/login",
    },
];

export const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

export default function Sidebar({ open, handleDrawerOpen }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [userRole, setUserRole] = useState(null);
    const [navigation, setNavigation] = useState([]);

    const updateNavigation = () => {
        const role = localStorage.getItem("userRole");
        console.log("Role do usuário na Sidebar:", role);

        if (!role) {
            console.log("Nenhuma role encontrada, redirecionando para login");
            localStorage.clear();
            logout();
            navigate("/login");
            return;
        }

        // Define a navegação com base na role do usuário
        switch (role) {
            case "ALUNO":
                console.log("Definindo navegação do aluno");
                setNavigation(STUDENT_NAVIGATION);
                break;
            case "PROFESSOR":
                console.log("Definindo navegação do professor");
                setNavigation(PROFESSOR_NAVIGATION);
                break;
            case "RECEPCIONISTA":
                console.log("Definindo navegação do recepcionista");
                setNavigation(RECEPCIONISTA_NAVIGATION);
                break;
            case "ADMINISTRADOR":
                console.log("Definindo navegação do administrador");
                setNavigation(ADMIN_NAVIGATION);
                break;
            default:
                console.log("Role não reconhecida:", role);
                localStorage.clear();
                logout();
                navigate("/login");
                return;
        }

        setUserRole(role);
    };

    useEffect(() => {
        // Atualiza a navegação quando o componente monta
        updateNavigation();

        // Adiciona listener para mudanças no localStorage
        window.addEventListener("storage", updateNavigation);

        // Cleanup
        return () => {
            window.removeEventListener("storage", updateNavigation);
        };
    }, []);

    const handleNavigation = (route, segment) => {
        if (segment === "exitapp") {
            // Limpa todo o localStorage
            localStorage.clear();
            logout();
            navigate("/login");
            return;
        }
        navigate(route);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Drawer variant="permanent" open={open} className="!pr-5">
                <DrawerHeader>
                    <IconButton
                        color="inherit"
                        aria-label={open ? "close drawer" : "open drawer"}
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ color: "black" }}>
                        {open ? (
                            <MdMenuOpen className="text-secondary" />
                        ) : (
                            <MdOutlineMenu className="text-secondary" />
                        )}
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                    {navigation.map((item, index) => {
                        if (item.kind === "divider") {
                            return <Divider key={index} />;
                        }

                        return (
                            <ListItem
                                key={item.segment}
                                disablePadding
                                onClick={() => handleNavigation(item.route, item.segment)}>
                                <ListItemButton
                                    className="text-black"
                                    sx={[
                                        {
                                            minHeight: 48,
                                            px: 3,
                                        },
                                        open
                                            ? {
                                                  justifyContent: "initial",
                                              }
                                            : {
                                                  justifyContent: "center",
                                              },
                                    ]}>
                                    <ListItemIcon
                                        sx={[
                                            {
                                                minWidth: 0,
                                                justifyContent: "center",
                                            },
                                            open
                                                ? {
                                                      mr: 3,
                                                  }
                                                : {
                                                      mr: "auto",
                                                  },
                                        ]}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.title}
                                        sx={[
                                            open
                                                ? {
                                                      opacity: 1,
                                                  }
                                                : {
                                                      opacity: 0,
                                                  },
                                        ]}
                                    />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Drawer>
        </Box>
    );
}
