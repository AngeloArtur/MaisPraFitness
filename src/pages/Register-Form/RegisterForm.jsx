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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Toast from "../../components/Toast/Toast";
import api from "../../Apis/backend/MaisPraTiBack";
import dayjs from "dayjs";

const formatForDatabase = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
};

export default function RegisterForm() {
    const navigate = useNavigate();
    const authCode = localStorage.getItem("accessToken");
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("error");
    const [cep, setCep] = useState("");
    const [responseCep, setResponseCep] = useState({
        neighborhood: "",
        street: "",
        complement: "",
    });
    const [userType, setUserType] = useState("");
    const [commonData, setCommonData] = useState({
        nome: "",
        email: "",
        documento: "",
        data_nascimento: "",
        senha: "",
        role: "",
        data_cadastro: dayjs().format("YYYY-MM-DD"),
        imagem_perfil: null,
        ativo: true,
        endereco: {
            rua: "",
            bairro: "",
            cep: "",
            complemento: "",
        },
    });

    const [studentData, setStudentData] = useState({
        ...commonData,
        profissao: "",
        enfermidades: "",
        plano: "",
        altura: 0,
        data_pagamento: "",
        data_vencimento: "",
        ultimo_exercicio: "",
    });

    const [employeeData, setEmployeeData] = useState({
        ...commonData, // Incluindo os campos em comum
        carteira_trabalho: "",
        salario: 0,
    });

    useEffect(() => {
        setStudentData((prev) => ({
            ...prev,
            ...commonData,
        }));
        setEmployeeData((prev) => ({
            ...prev,
            ...commonData,
        }));
    }, [commonData]);

    const handleDateChange = (date) => {
        const formattedDateForDatabase = formatForDatabase(date);
        setCommonData({ ...commonData, data_nascimento: formattedDateForDatabase });
    };

    const handleUserTypeChange = (event) => {
        const selectedType = event.target.value;
        setUserType(selectedType);
        // Atualiza a role nos dados comuns quando o tipo de usuário muda
        setCommonData((prev) => ({
            ...prev,
            role: selectedType,
        }));
    };

    const resetForm = () => {
        setCommonData({
            nome: "",
            email: "",
            documento: "",
            data_nascimento: "",
            senha: "",
            role: "",
            data_cadastro: dayjs().format("YYYY-MM-DD"),
            imagem_perfil: null,
            ativo: true,
            endereco: {
                rua: "",
                bairro: "",
                cep: "",
                complemento: "",
            },
        });
        setStudentData({
            ...commonData,
            profissao: "",
            enfermidades: "",
            plano: "",
            altura: 0,
            data_pagamento: "",
            data_vencimento: "",
            ultimo_exercicio: "",
        });
        setEmployeeData({
            ...commonData,
            carteira_trabalho: "",
            salario: 0,
        });
        setCep("");
        setResponseCep({
            neighborhood: "",
            street: "",
            complement: "",
        });
        setUserType("");
    };

    const handleRegisterUser = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${authCode}`,
                },
            };

            if (userType === "aluno") {
                const studentPayload = {
                    ...commonData,
                    ...studentData,
                    role: userType,
                };
                console.log("Config:", config);
                console.log("Payload sendo enviado:", studentPayload);

                const response = await api.post("/aluno", studentPayload, config);
                const alunoId = response.data.id_aluno;
                resetForm();
                navigate(`/register-form/measurement/${alunoId}`);
            } else {
                const employeePayload = {
                    ...commonData,
                    ...employeeData,
                    role: userType,
                };
                console.log("Config:", config);
                console.log("Payload sendo enviado:", employeePayload);

                const response = await api.post("/funcionario", employeePayload, config);
                resetForm();
                console.log("Resposta:", response);
            }
            setOpenToast(true);
            setToastMessage(`${userType} cadastrado com sucesso!`);
            setToastType("success");
        } catch (error) {
            console.error("Erro completo:", error);
            console.error("Config da requisição:", error.config);
            console.error("Headers enviados:", error.config?.headers);
            setOpenToast(true);
            setToastMessage("Erro ao registrar o usuário: " + (error.response?.data?.message || error.message));
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
                    neighborhood: cepData.bairro,
                    street: cepData.logradouro,
                    complement: cepData.complemento,
                });

                setCommonData((prev) => ({
                    ...prev,
                    endereco: {
                        ...prev.endereco,
                        cep: newCep,
                        rua: cepData.logradouro,
                        bairro: cepData.bairro,
                        complemento: cepData.complemento,
                    },
                }));
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

    const handleNumberOnly = (e) => {
        // Previne caracteres não numéricos no keyPress
        if (!/^\d*$/.test(e.key)) {
            e.preventDefault();
            return false;
        }
    };

    const handleNumberOnlyChange = (e, callback) => {
        const value = e.target.value.replace(/\D/g, ""); // Remove qualquer caractere não numérico
        e.target.value = value; // Atualiza o valor do input
        callback(value); // Chama a função de callback com o valor limpo
    };

    return (
        <Box className="flex flex-col items-center justify-center bg-secondary  h-dvh w-full p-3 gap-9 md:p-8 ">
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
                            <MenuItem value="aluno">Aluno</MenuItem>
                            <MenuItem value="professor">Professor</MenuItem>
                            <MenuItem value="recepcionista">Recepcionista</MenuItem>
                            <MenuItem value="administrador">Administrador</MenuItem>
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
                            onChange={(e) => setCommonData({ ...commonData, nome: e.target.value })}
                        />
                    </FormControl>
                    <FormControl className="w-full">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                maxDate={dayjs()}
                                label="Data de nascimento"
                                className="bg-white-100 w-full"
                                value={commonData.data_nascimento ? dayjs(commonData.data_nascimento) : null}
                                onChange={(e) => handleDateChange(e)}
                                format="DD/MM/YYYY"
                                slotProps={{ textField: { size: "medium" } }}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-CPF">CPF</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-CPF"
                            type="text"
                            label="CPF"
                            onKeyPress={handleNumberOnly}
                            onChange={(e) =>
                                handleNumberOnlyChange(e, (value) => setCommonData({ ...commonData, documento: value }))
                            }
                            inputProps={{ maxLength: 11 }}
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
                            onChange={(e) => setCommonData({ ...commonData, email: e.target.value })}
                        />
                    </FormControl>
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-password"
                            type="password"
                            label="Senha"
                            onChange={(e) => setCommonData({ ...commonData, senha: e.target.value })}
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
                            onKeyPress={handleNumberOnly}
                            onChange={(e) =>
                                handleNumberOnlyChange(e, (value) => {
                                    setCep(value);
                                    handleCepChange({ ...e, target: { ...e.target, value } });
                                })
                            }
                            inputProps={{ maxLength: 8 }}
                        />
                    </FormControl>
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-street">Rua</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-street"
                            type="text"
                            label="Rua"
                            value={responseCep.street}
                            onChange={(e) =>
                                setCommonData((prev) => ({
                                    ...prev,
                                    endereco: {
                                        ...prev.endereco,
                                        rua: e.target.value,
                                    },
                                }))
                            }
                        />
                    </FormControl>
                </Box>
                <Box className="flex flex-col gap-3 lg:flex-row ">
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-neighbourhood">Bairro</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-neighbourhood"
                            type="text"
                            label="Bairro"
                            value={responseCep.neighborhood}
                            onChange={(e) =>
                                setCommonData((prev) => ({
                                    ...prev,
                                    endereco: {
                                        ...prev.endereco,
                                        bairro: e.target.value,
                                    },
                                }))
                            }
                        />
                    </FormControl>
                    <FormControl variant="outlined" className="w-full">
                        <InputLabel htmlFor="outlined-adornment-neighbourhood">Complemento</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-complement"
                            type="text"
                            label="Complemento"
                            value={responseCep.complement}
                            onChange={(e) =>
                                setCommonData((prev) => ({
                                    ...prev,
                                    endereco: {
                                        ...prev.endereco,
                                        complemento: e.target.value,
                                    },
                                }))
                            }
                        />
                    </FormControl>
                </Box>

                {userType === "aluno" ? (
                    <div>
                        <Divider />

                        <Box className="flex flex-col gap-3 lg:flex-row pt-6">
                            <FormControl variant="outlined" className="w-full lg:w-1/3">
                                <InputLabel id="select-type">Plano</InputLabel>
                                <Select
                                    label="Plano"
                                    id="select-type"
                                    className="bg-white-100 text-black"
                                    onChange={(e) => setStudentData({ ...studentData, plano: e.target.value })}>
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
                                    onChange={(e) => setStudentData({ ...studentData, profissao: e.target.value })}
                                />
                            </FormControl>
                            <FormControl variant="outlined" className="w-full lg:w-1/3">
                                <InputLabel htmlFor="outlined-adornment-enfermidades">Enfermidades</InputLabel>
                                <OutlinedInput
                                    className="bg-white-100"
                                    id="outlined-adornment-enfermidades"
                                    type="text"
                                    label="Enfermidades"
                                    onChange={(e) => setStudentData({ ...studentData, enfermidades: e.target.value })}
                                />
                            </FormControl>
                        </Box>

                        <Box className="flex flex-col w-full gap-3 lg:flex-row pt-6">
                            <FormControl variant="outlined" className="w-full lg:w-1/2">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Data de pagamento"
                                        className="bg-white-100 w-full"
                                        slotProps={{ textField: { size: "medium" } }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                            <FormControl variant="outlined" className="w-full lg:w-1/2">
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Data de vencimento"
                                        className="bg-white-100 w-full"
                                        slotProps={{ textField: { size: "medium" } }}
                                    />
                                </LocalizationProvider>
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
                                    onChange={(e) =>
                                        setEmployeeData({ ...employeeData, carteira_trabalho: e.target.value })
                                    }
                                />
                            </FormControl>
                            <FormControl variant="outlined" className="w-full">
                                <InputLabel htmlFor="outlined-adornment-salario">Salário</InputLabel>
                                <OutlinedInput
                                    className="bg-white-100"
                                    id="outlined-adornment-salario"
                                    type="text"
                                    label="Salário"
                                    onKeyPress={handleNumberOnly}
                                    onChange={(e) =>
                                        handleNumberOnlyChange(e, (value) =>
                                            setEmployeeData({ ...employeeData, salario: Number(value) })
                                        )
                                    }
                                    onPaste={(e) => {
                                        e.preventDefault();
                                        const text = e.clipboardData.getData("text");
                                        const numericValue = text.replace(/\D/g, "");
                                        setEmployeeData({ ...employeeData, salario: Number(numericValue) });
                                    }}
                                />
                            </FormControl>
                        </Box>
                    </div>
                )}
                {openToast && (
                    <Toast
                        message={toastMessage}
                        type={toastType}
                        open={openToast}
                        onClose={() => setOpenToast(false)}
                    />
                )}
                <Box className="flex flex-col gap-4 justify-center items-center">
                    <Button className="!bg-secondary !mt-4 w-[30%]" variant="contained" onClick={handleRegisterUser}>
                        Avançar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
