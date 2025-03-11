import { useAuth } from "../context/AuthContext";
import AppRoutes from "./AppRoutes";
import AuthRoutes from "./AuthRoutes";

export default function Routes() {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
