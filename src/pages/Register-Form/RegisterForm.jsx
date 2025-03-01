import {
  Box,
  FormControl,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Select,
  Button,
  Typography,
  Divider,
} from "@mui/material";
import { ApiCep } from "../../Apis/ViaCep";
import { useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../../components/Toast/Toast";

export default function RegisterForm() {
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("error");
  const [cep, setCep] = useState("");
  const [responseCep, setResponseCep] = useState({
    state: "",
    city: "",
    neighborhood: "",
    street: "",
  });

  const handleCepChange = async (event) => {
    const newCep = event.target.value;
    setCep(newCep);

    if (newCep.length === 8) {
      const cepData = await ApiCep(newCep);
      if (!("erro" in cepData)) {
        setResponseCep({
          state: cepData.uf,
          city: cepData.localidade,
          neighborhood: cepData.bairro,
          street: cepData.logradouro,
        });
      } else {
        setOpenToast(true);
        setToastMessage(
          "CEP não encontrado, por favor verifique o valor digitado"
        );
        setToastType("error");
        setResponseCep({
          state: "",
          city: "",
          neighborhood: "",
          street: "",
        });
      }
    }
  };

  return (
    <Box className="flex flex-col items-center justify-center bg-secondary  h-dvh w-full p-3 gap-9 md:p-8 ">
      {openToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          open={openToast}
          onClose={() => setOpenToast(false)}
        />
      )}
      <Box
        component="form"
        flexGrow={1}
        className="flex flex-col justify-center h-dvh px-2 gap-7 bg-tint-blue3 max-w-[80%] md:px-7 rounded-2xl"
      >
        <Box>
          <Typography variant="h4" className="py-5">
            Cadastro de usuário
          </Typography>
          <FormControl>
            <InputLabel id="select-type">Tipo de usuário</InputLabel>
            <Select
              label="Tipo de usuário"
              id="select-type"
              className="w-full bg-white-100 text-black md:w-96"
            >
              <MenuItem>Aluno</MenuItem>
              <MenuItem>Professor</MenuItem>
              <MenuItem>Administrador</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box className="flex flex-col gap-3 lg:flex-row ">
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-name">Nome</InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-name"
              type="text"
              label="Nome"
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-lastName">
              Sobrenome
            </InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-lastName"
              type="text"
              label="Sobrenome"
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-CPF">CPF</InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-CPF"
              type="text"
              label="CPF"
            />
          </FormControl>
        </Box>
        <Box className="flex flex-col gap-3 lg:flex-row ">
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-mail">Email</InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-mail"
              type="text"
              label="Email"
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-phone">Telefone</InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-phone"
              type="text"
              label="Telefone"
            />
          </FormControl>
        </Box>

        <Divider></Divider>

        <Box className="flex flex-col gap-3 lg:flex-row ">
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-CEP">CEP</InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-CEP"
              type="text"
              label="CEP"
              value={cep}
              onChange={handleCepChange}
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-state">Estado</InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-state"
              type="text"
              label="Estado"
              value={responseCep.state}
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-city">Cidade</InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-city"
              type="text"
              label="Cidade"
              value={responseCep.city}
            />
          </FormControl>
        </Box>
        <Box className="flex flex-col gap-3 lg:flex-row ">
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-street">Rua</InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-street"
              type="text"
              label="Rua"
              value={responseCep.street}
            />
          </FormControl>
          <FormControl variant="outlined" className="w-full">
            <InputLabel htmlFor="outlined-adornment-neighbourhood">
              Bairro
            </InputLabel>
            <OutlinedInput
              className="bg-white-100"
              id="outlined-adornment-neighbourhood"
              type="text"
              label="Bairro"
              value={responseCep.neighborhood}
            />
          </FormControl>
        </Box>

        <Box className="flex flex-col gap-4 justify-center items-center">
          <Button className="!bg-secondary !mt-4 w-[30%]" variant="contained">
            <Link to="/measurement-registry">Avançar</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
