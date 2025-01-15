import { useState } from "react"

import Logo from "../../assets/images/+pf_logo 1.png"

import Button from "@mui/material/Button"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Divider from "@mui/material/Divider"
import FormControl from "@mui/material/FormControl"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import InputLabel from "@mui/material/InputLabel"
import OutlinedInput from "@mui/material/OutlinedInput"
import Toast from "../../components/Toast/Toast"

import {
  MdOutlineVisibility,
  MdOutlineVisibilityOff,
  MdOutlineAccountCircle,
} from "react-icons/md"

import { GoogleIcon } from "../../assets/GoogleIcon"

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [showError, setShowError] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)
  const handleClickError = () => setShowError((show) => !show)

  return (
    <div className="bg-tint-blue1 w-full h-screen flex justify-center items-center">
      <Card className="flex justify-center !bg-white !rounded-2xl">
        <CardContent className="m-7">
          <img src={Logo} alt="" className="max-w-60 max-h-24 m-auto mb-3" />

          <form className="flex flex-col gap-4 my-5">
            <FormControl variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-login"
                error={showError}
                required
              >
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
                label="Login*"
              />
            </FormControl>

            <FormControl variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                error={showError}
                required
              >
                Password
              </InputLabel>
              <OutlinedInput
                error={showError}
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? (
                        <MdOutlineVisibilityOff />
                      ) : (
                        <MdOutlineVisibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password*"
              />
            </FormControl>
            <Button
              variant="contained"
              className="!bg-tint-blue1 hover:!bg-tint-blue2"
              onClick={handleClickError}
            >
              Login
            </Button>
          </form>

          {showError ? (
            <Toast message="Email ou senha incorretos" type="error" />
          ) : (
            ""
          )}

          <p className="flex justify-center cursor-pointer mt-6 text-xs underline">
            Esqueceu sua senha?
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
