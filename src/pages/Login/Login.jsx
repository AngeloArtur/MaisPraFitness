import { useState } from "react";
import Logo from "../../assets/images/+pf_logo 1.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Divider from "@mui/material/Divider";
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdOutlineAccountCircle } from "react-icons/md";
import "./Login.css";
import Toast from "../../components/Toast/Toast";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [showError, setShowError] = useState(true);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <div className="bg-tint-blue1 w-full h-screen flex justify-center items-center">
            <Card className="flex justify-center" sx={{ borderRadius: "16px", backgroundColor: "#F0F4F5" }}>
                <CardContent className="m-7">
                    <img src={Logo} alt="" className="max-w-60 max-h-24 m-auto mb-3" />

                    <form className="flex flex-col ">
                        <FormControl sx={{ m: 2, width: "25ch" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-login" error={showError}>
                                Login
                            </InputLabel>
                            <OutlinedInput
                                error={showError}
                                id="outlined-adornment-login"
                                type="text"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton edge="end">
                                            <MdOutlineAccountCircle />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Login"
                            />
                        </FormControl>

                        <FormControl sx={{ m: 2, width: "25ch" }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password" error={showError}>
                                Password
                            </InputLabel>
                            <OutlinedInput
                                error={showError}
                                id="outlined-adornment-password"
                                type={showPassword ? "text" : "password"}
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
                                label="Password"
                            />
                        </FormControl>
                        <Button variant="contained">Login</Button>
                    </form>

                    {showError ? <Toast message="Email ou senha incorretos" type="error" /> : ""}

                    <Divider>Faça login também com</Divider>

                    <Button></Button>
                </CardContent>
            </Card>
        </div>
    );
}
