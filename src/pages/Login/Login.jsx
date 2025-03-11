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
                console.log("Resposta completa do backend:", response.data);

                // Extrai os dados da resposta
                const { accessToken, refreshToken, tipoUsuario } = response.data;
                console.log("Tipo de usuário recebido:", tipoUsuario);

                if (!accessToken || !refreshToken) {
                    console.error("Tokens não encontrados na resposta");
                    setMessage("Erro na autenticação. Por favor, tente novamente.");
                    setShowError(true);
                    setOpenToast(true);
                    return;
                }

                // Limpa o localStorage antes de salvar novos dados
                localStorage.clear();

                // Mapeia o tipo de usuário para o role
                let role;
                const tipoUsuarioNum = Number(tipoUsuario);
                console.log("Tipo de usuário convertido para número:", tipoUsuarioNum);

                switch (tipoUsuarioNum) {
                    case 1:
                        role = "ADMIN";
                        console.log("Usuário identificado como ADMIN");
                        break;
                    case 2:
                        role = "ALUNO";
                        console.log("Usuário identificado como ALUNO");
                        break;
                    case 3:
                        role = "PROFESSOR";
                        console.log("Usuário identificado como PROFESSOR");
                        break;
                    case 4:
                        role = "RECEPCIONISTA";
                        console.log("Usuário identificado como RECEPCIONISTA");
                        break;
                    default:
                        // Se não reconhecer o tipo, verifica o email como fallback
                        if (email.includes("admin")) {
                            role = "ADMIN";
                            console.log("Definindo como ADMIN baseado no email");
                        } else {
                            role = "ALUNO";
                            console.log("Definindo como ALUNO por padrão");
                        }
                }

                console.log("Papel final definido:", role);

                // Salva os dados na ordem correta
                localStorage.setItem("accessToken", accessToken);
                localStorage.setItem("refreshToken", refreshToken);
                localStorage.setItem("userRole", role);

                // Verifica se os dados foram salvos
                const savedRole = localStorage.getItem("userRole");
                console.log("Role salvo no localStorage:", savedRole);

                // Primeiro faz login
                await login();
                
                // Depois navega para o dashboard
                navigate("/dashboard");
            } catch (error) {
                console.error("Erro ao fazer login:", error);

                // Melhor tratamento de erro com mais detalhes
                if (error.response) {
                    // O servidor respondeu com um status de erro
                    console.error("Detalhes do erro:", {
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers
                    });
                    
                    if (error.response.status === 500) {
                        setMessage("Erro interno do servidor. Por favor, tente novamente ou contate o suporte.");
                    } else if (error.response.data && error.response.data.message) {
                        setMessage(error.response.data.message);
                    } else {
                        setMessage("Erro ao fazer login. Verifique suas credenciais.");
                    }
                } else if (error.request) {
                    // A requisição foi feita mas não houve resposta
                    console.error("Sem resposta do servidor:", error.request);
                    setMessage("Servidor não está respondendo. Verifique sua conexão.");
                } else {
                    // Erro ao configurar a requisição
                    console.error("Erro de configuração:", error.message);
                    setMessage("Erro ao processar sua requisição. Tente novamente.");
                }

                setShowError(true);
                setOpenToast(true);
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
