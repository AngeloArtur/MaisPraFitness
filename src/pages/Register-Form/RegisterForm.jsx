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
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
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
    const [userType, setUserType] = useState("");
    const [registerNav, setRegisterNav] = useState("");

    const handleUserTypeChange = (event) => {
        setUserType(event.target.value);
        console.log(event.target.value);
    };

    const handleRegisterNavigation = () => {
        if (userType == "Aluno") {
            setRegisterNav("measurement");
        } else if (userType === "Funcionário") {
            setRegisterNav("employee");
        } else if (userType === "") {
            setOpenToast(true);
            setToastMessage("Por favor selecione um tipo de usuário");
            setToastType("error");
        }
    };

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
                setToastMessage("CEP não encontrado, por favor verifique o valor digitado");
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
                <Toast message={toastMessage} type={toastType} open={openToast} onClose={() => setOpenToast(false)} />
            )}
            <Box
                component="form"
                flexGrow={1}
                className="flex flex-col justify-center h-dvh px-2 gap-7 bg-tint-blue3 max-w-[80%] md:px-7 rounded-2xl">
                <Box>
                    <Typography variant="h4" className="py-5">
                        Cadastro de usuário
                    </Typography>
                    <FormControl>
                        <InputLabel id="select-type">Tipo de usuário</InputLabel>
                        <Select
                            label="Tipo de usuário"
                            value={userType}
                            onChange={handleUserTypeChange}
                            id="select-type"
                            className="w-full bg-white-100 text-black md:w-96">
                            <MenuItem value="Aluno">Aluno</MenuItem>
                            <MenuItem value="Funcionário">Funcionário</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box className="flex flex-col gap-3 lg:flex-row ">
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-name">Nome</InputLabel>
                        <OutlinedInput className="bg-white-100" id="outlined-adornment-name" type="text" label="Nome" />
                    </FormControl>
                    <FormControl className="w-full">
                        <LocalizationProvider dateAdapter={AdapterDayjs} className="!pb-8">
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker label="Data de nascimento" className="bg-white-100 !pt-0" />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-CPF">CPF</InputLabel>
                        <OutlinedInput className="bg-white-100" id="outlined-adornment-CPF" type="text" label="CPF" />
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
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-password"
                            type="password"
                            label="Senha"
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
                        <InputLabel htmlFor="outlined-adornment-neighbourhood">Bairro</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-neighbourhood"
                            type="text"
                            label="Bairro"
                            value={responseCep.neighborhood}
                        />
                    </FormControl>
                </Box>

                {userType === "Aluno" ? (
                    <div>
                        <Divider />

                        <Box className="flex flex-col gap-3 lg:flex-row pt-6">
                            <FormControl variant="outlined" className="w-full lg:w-1/3">
                                <InputLabel id="select-type">Plano</InputLabel>
                                <Select
                                    label="Plano"
                                    id="select-type"
                                    className="bg-white-100 text-black"
                                    onChange={(e) => setPlano(e.target.value)} // função para atualizar o estado
                                >
                                    <MenuItem value="Mensal">Mensal</MenuItem>
                                    <MenuItem value="Anual">Anual</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" className="w-full lg:w-1/3">
                                <InputLabel htmlFor="outlined-adornment-profissao">Profissão</InputLabel>
                                <OutlinedInput
                                    className="bg-white-100"
                                    id="outlined-adornment-profissao"
                                    type="text"
                                    label="Profissão"
                                    onChange={(e) => setProfissao(e.target.value)} // função para atualizar o estado
                                />
                            </FormControl>
                            <FormControl variant="outlined" className="w-full lg:w-1/3">
                                <InputLabel htmlFor="outlined-adornment-enfermidades">Enfermidades</InputLabel>
                                <OutlinedInput
                                    className="bg-white-100"
                                    id="outlined-adornment-enfermidades"
                                    type="text"
                                    label="Enfermidades"
                                    onChange={(e) => setEnfermidades(e.target.value)} // função para atualizar o estado
                                />
                            </FormControl>
                        </Box>

                        <Box className="flex flex-col gap-3 lg:flex-row pt-6">
                            <FormControl variant="outlined" className="w-full">
                                <LocalizationProvider dateAdapter={AdapterDayjs} className="!pb-8">
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker label="Data de pagamento" className="bg-white-100 !pt-0" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl variant="outlined" className="w-full">
                                <LocalizationProvider dateAdapter={AdapterDayjs} className="!pb-8">
                                    <DemoContainer components={["DatePicker"]}>
                                        <DatePicker label="Data de vencimento" className="bg-white-100 !pt-0" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl variant="outlined" className="w-full">
                                <InputLabel htmlFor="outlined-adornment-ultimo-exercicio">Último Exercício</InputLabel>
                                <OutlinedInput
                                    className="bg-white-100"
                                    id="outlined-adornment-ultimo-exercicio"
                                    type="text"
                                    label="Último Exercício"
                                    onChange={(e) => setUltimoExercicio(e.target.value)} // função para atualizar o estado
                                />
                            </FormControl>
                        </Box>
                    </div>
                ) : (
                    <div>
                        <Divider />

                        <Box className="flex flex-col gap-3 lg:flex-row pt-6">
                            <FormControl variant="outlined" className="w-full">
                                <InputLabel htmlFor="outlined-adornment-carteira-trabalho">
                                    Carteira de Trabalho
                                </InputLabel>
                                <OutlinedInput
                                    className="bg-white-100"
                                    id="outlined-adornment-carteira-trabalho"
                                    type="text"
                                    label="Carteira de Trabalho"
                                    onChange={(e) => setCarteiraTrabalho(e.target.value)} // função para atualizar o estado
                                />
                            </FormControl>
                            <FormControl variant="outlined" className="w-full">
                                <InputLabel htmlFor="outlined-adornment-salario">Salário</InputLabel>
                                <OutlinedInput
                                    className="bg-white-100"
                                    id="outlined-adornment-salario"
                                    type="number"
                                    label="Salário"
                                    onChange={(e) => setSalario(e.target.value)} // função para atualizar o estado
                                />
                            </FormControl>
                        </Box>
                        <Box className="flex flex-col gap-3 lg:flex-row pt-6">
                            <FormControl variant="outlined" className="w-full">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["TimePicker"]}>
                                        <TimePicker label="Hora de entrada" className="bg-white-100 !pt-0" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl variant="outlined" className="w-full">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["TimePicker"]}>
                                        <TimePicker label="Hora de saída" className="bg-white-100 !pt-0" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl variant="outlined" className="w-full">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={["TimePicker"]}>
                                        <TimePicker label="Hora extra" className="bg-white-100 !pt-0" />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </FormControl>
                        </Box>
                    </div>
                )}

                <Box className="flex flex-col gap-4 justify-center items-center">
                    <Button className="!bg-secondary !mt-4 w-[30%]" variant="contained">
                        {userType === "Aluno" ? <Link to="measurement">Avançar</Link> : "Avançar"}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
