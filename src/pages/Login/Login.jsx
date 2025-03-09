import { useState } from "react";

import Logo from "../../assets/images/+pf_logo 1.png";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Toast from "../../components/Toast/Toast";
import api from "../../Apis/backend/MaisPraTiBack";

import { MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlineAccountCircle } from "react-icons/md";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const CheckCredentials = async () => {
        if (email && password) {
            try {
                const response = await api.post("auth/login", { email: email, senha: password });
                const { accessToken, refreshToken } = response.data;

                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                navigate("/dashboard");
                login();
            } catch (error) {
                console.error("Erro ao fazer login:", error);

                // Verificar se o backend retornou uma mensagem de erro
                if (error.response && error.response.status === 500) {
                    const errorMessage = error.response.data || "Erro desconhecido";
                    setMessage(errorMessage); // Atualiza a mensagem com o erro vindo do backend
                } else {
                    setMessage("Erro de rede ou servidor não disponível");
                }

                setShowError(true); // Define que houve um erro para aplicar ao formulário
                setOpenToast(true); // Abre o Toast
            }
        } else {
            setShowError((show) => !show);
            setOpenToast(true);
            setMessage("Por favor, preencha todos os campos");
        }
    };

    return (
        <div className="bg-tint-blue1 w-full h-screen flex justify-center items-center">
            <Card className="flex justify-center !bg-white !rounded-2xl">
                <CardContent className="m-7">
                    <img src={Logo} alt="" className="max-w-60 max-h-24 m-auto mb-3" />

                    <form className="flex flex-col gap-4 my-5">
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-login" error={showError} required>
                                Login
                            </InputLabel>
                            <OutlinedInput
                                error={showError}
                                id="outlined-adornment-login"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <MdOutlineAccountCircle />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Login*"
                            />
                        </FormControl>

                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" error={showError} required>
                                Password
                            </InputLabel>
                            <OutlinedInput
                                error={showError}
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={showPassword ? "hide the password" : "display the password"}
                                            onClick={handleClickShowPassword}
                                            edge="end">
                                            {showPassword ? <MdOutlineVisibilityOff /> : <MdOutlineVisibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password*"
                            />
                        </FormControl>
                        <Button
                            variant="contained"
                            className="!bg-tint-blue1 hover:!bg-tint-blue2"
                            onClick={CheckCredentials}>
                            Login
                        </Button>
                    </form>

                    {showError && (
                        <Toast open={openToast} message={message} type="error" onClose={() => setOpenToast(false)} />
                    )}

                    <Link className="flex justify-center cursor-pointer mt-6 text-xs underline" to="/forgot-password">
                        Esqueceu sua senha?
                    </Link>
                </CardContent>
            </Card>
        </div>
    );
}
