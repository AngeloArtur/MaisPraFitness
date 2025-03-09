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
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../Apis/backend/MaisPraTiBack";
import dayjs from "dayjs";
import Toast from "../../components/Toast/Toast";

export default function Measurement() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");
    const [measurementData, setMeasurementData] = useState({
        data_cadastro: dayjs(),
        peso: "",
        altura: "",
        biceps: "",
        triceps: "",
        abdomen: "",
        gluteo: "",
        coxa: "",
        panturrilha: "",
    });

    const handleInputChange = (field) => (event) => {
        const value = event.target.value;
        // Permite apenas números e ponto decimal
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setMeasurementData({
                ...measurementData,
                [field]: value,
            });
        }
    };

    const handleDateChange = (date) => {
        setMeasurementData({
            ...measurementData,
            data_cadastro: date,
        });
    };

    const handleSubmit = async () => {
        try {
            const authToken = localStorage.getItem("accessToken");
            
            if (!id) {
                setToastMessage("ID do aluno inválido");
                setToastType("error");
                setOpenToast(true);
                return;
            }

            const formattedData = {
                data_cadastro: dayjs(measurementData.data_cadastro).format("YYYY-MM-DD"),
                peso: measurementData.peso || "0",
                altura: measurementData.altura || "0",
                biceps: measurementData.biceps || "0",
                triceps: measurementData.triceps || "0",
                abdomen: measurementData.abdomen || "0",
                gluteo: measurementData.gluteo || "0",
                coxa: measurementData.coxa || "0",
                panturrilha: measurementData.panturrilha || "0"
            };

            console.log("ID do aluno:", id);
            console.log("Dados sendo enviados:", formattedData);

            const response = await api.post(`/medida/${id}`, formattedData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                    'Content-Type': 'application/json'
                },
            });

            console.log("Resposta da API:", response);
            
            setToastMessage("Medidas cadastradas com sucesso!");
            setToastType("success");
            setOpenToast(true);

            setTimeout(() => {
                navigate("/student-list");
            }, 2000);
        } catch (error) {
            console.error("Erro completo:", error);
            console.error("Status do erro:", error.response?.status);
            console.error("Dados do erro:", error.response?.data);
            
            let errorMessage = "Erro ao cadastrar medidas. Por favor, tente novamente.";
            
            if (error.response?.status === 403) {
                errorMessage = "Você não tem permissão para realizar esta operação.";
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            } else if (error.response?.data?.error) {
                errorMessage = error.response.data.error;
            }
            
            setToastMessage(errorMessage);
            setToastType("error");
            setOpenToast(true);
        }
    };

    return (
        <Box className="flex flex-col items-center justify-center bg-secondary h-dvh w-full p-3 gap-9 md:p-8 ">
            <Box
                component="form"
                flexGrow={1}
                className="flex flex-col justify-center h-dvh max-w-[80%] my-5 px-2 gap-7 bg-tint-blue3 md:px-7 rounded-2xl">
                <Box>
                    <Typography variant="h4" className="py-5">
                        Cadastro de medidas
                    </Typography>
                    <FormControl>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
                            <DemoContainer components={["DatePicker"]}>
                                <DatePicker 
                                    className="bg-white-100" 
                                    label="Data de cadastro" 
                                    value={measurementData.data_cadastro}
                                    onChange={handleDateChange}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </FormControl>
                </Box>

                <Box className="flex flex-col gap-3 lg:flex-row ">
                    <FormControl variant="outlined">
                        <OutlinedInput
                            id="peso"
                            value={measurementData.peso}
                            onChange={handleInputChange("peso")}
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
                            value={measurementData.altura}
                            onChange={handleInputChange("altura")}
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
                            value={measurementData.biceps}
                            onChange={handleInputChange("biceps")}
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
                            value={measurementData.triceps}
                            onChange={handleInputChange("triceps")}
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
                            value={measurementData.abdomen}
                            onChange={handleInputChange("abdomen")}
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
                            id="gluteo"
                            value={measurementData.gluteo}
                            onChange={handleInputChange("gluteo")}
                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                            aria-describedby="gluteo"
                            className="bg-white-100"
                            inputProps={{
                                "aria-label": "Gluteo",
                            }}
                        />
                        <FormHelperText id="gluteo">Gluteo</FormHelperText>
                    </FormControl>

                    <FormControl variant="outlined">
                        <OutlinedInput
                            id="coxa"
                            value={measurementData.coxa}
                            onChange={handleInputChange("coxa")}
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
                            value={measurementData.panturrilha}
                            onChange={handleInputChange("panturrilha")}
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
                        <Link to="/student-list">Voltar</Link>
                    </Button>
                    <Button 
                        className="!bg-secondary !mb-4 w-[30%]" 
                        variant="contained"
                        onClick={handleSubmit}
                    >
                        Concluir cadastro
                    </Button>
                </Box>
            </Box>
            <Toast
                open={openToast}
                message={toastMessage}
                severity={toastType}
                onClose={() => setOpenToast(false)}
            />
        </Box>
    );
}
