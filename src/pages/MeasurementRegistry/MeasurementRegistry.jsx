import {
  Box,
  FormControl,
  OutlinedInput,
  Button,
  Typography,
  Divider,
  FormHelperText,
  InputAdornment,
} from "@mui/material";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <Box className="flex flex-col items-center justify-center bg-secondary h-dvh w-full p-3 gap-9 md:p-8 ">
      <Box
        component="form"
        flexGrow={1}
        className="flex flex-col justify-center max-h-[80%] w-[80%] my-5 px-2 gap-7 bg-tint-blue3 md:px-7 rounded-2xl"
      >
        <Box>
          <Typography variant="h4" className="py-5">
            Cadastro de medidas
          </Typography>
          <FormControl>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              adapterLocale="pt-br"
            >
              <DemoContainer components={["DatePicker"]}>
                <DatePicker className="bg-white-100" label="Data de cadastro" />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </Box>

        <Box className="flex flex-col gap-3 lg:flex-row ">
          <FormControl variant="outlined">
            <OutlinedInput
              id="peso"
              endAdornment={<InputAdornment position="end">kg</InputAdornment>}
              aria-describedby="peso"
              className="bg-white-100"
              inputProps={{
                "aria-label": "Peso",
              }}
            />
            <FormHelperText id="peso">Peso</FormHelperText>
          </FormControl>

          <FormControl variant="outlined">
            <OutlinedInput
              id="altura"
              endAdornment={<InputAdornment position="end">m</InputAdornment>}
              aria-describedby="altura"
              className="bg-white-100"
              inputProps={{
                "aria-label": "Altura",
              }}
            />
            <FormHelperText id="altura">Altura</FormHelperText>
          </FormControl>
        </Box>

        <Divider></Divider>

        <Box className="flex flex-col gap-3 lg:flex-row ">
          <FormControl variant="outlined">
            <OutlinedInput
              id="biceps"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              aria-describedby="biceps"
              className="bg-white-100"
              inputProps={{
                "aria-label": "Biceps",
              }}
            />
            <FormHelperText id="biceps">Bíceps</FormHelperText>
          </FormControl>

          <FormControl variant="outlined">
            <OutlinedInput
              id="triceps"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              aria-describedby="triceps"
              className="bg-white-100"
              inputProps={{
                "aria-label": "Triceps",
              }}
            />
            <FormHelperText id="triceps">Tríceps</FormHelperText>
          </FormControl>

          <FormControl variant="outlined">
            <OutlinedInput
              id="abdomen"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              aria-describedby="abdomen"
              className="bg-white-100"
              inputProps={{
                "aria-label": "Abdomen",
              }}
            />
            <FormHelperText id="abdomen">Abdômen</FormHelperText>
          </FormControl>
        </Box>

        <Box className="flex flex-col gap-3 lg:flex-row ">
          <FormControl variant="outlined">
            <OutlinedInput
              id="coxa"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              aria-describedby="coxa"
              className="bg-white-100"
              inputProps={{
                "aria-label": "Coxa",
              }}
            />
            <FormHelperText id="coxa">Coxa</FormHelperText>
          </FormControl>

          <FormControl variant="outlined">
            <OutlinedInput
              id="panturrilha"
              endAdornment={<InputAdornment position="end">cm</InputAdornment>}
              aria-describedby="panturrilha"
              className="bg-white-100"
              inputProps={{
                "aria-label": "Panturrilha",
              }}
            />
            <FormHelperText id="panturrilha">Panturrilha</FormHelperText>
          </FormControl>
        </Box>

        <Box className="flex flex-col gap-4 justify-center items-center">
          <Button className=" !bg-secondary !mt-4 w-[30%]" variant="contained">
            <Link to="/register-form">Voltar</Link>
          </Button>
          <Button className="!bg-secondary !mb-4 w-[30%]" variant="contained">
            <Link to="/measurement-registry">Concluir cadastro</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
