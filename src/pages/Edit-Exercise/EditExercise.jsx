import Logo from "../../assets/images/+pf_logo 1.png";
import { useState } from "react";
import Toast from "../../components/Toast/Toast";
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    MenuItem,
    Select,
    Typography,
    TextField,
    InputLabel,
    FormControl,
} from "@mui/material";

export default function ExerciseForm() {
    const [checkedItems, setCheckedItems] = useState({});
    const [reps, setReps] = useState("");
    const [load, setLoad] = useState("");
    const [exerciseNames, setExerciseNames] = useState(["", ""]);
    const [showError, setShowError] = useState(false);
    const [openToast, setOpenToast] = useState(false);

    const toggleCheckbox = (index) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleSave = () => {
        const hasError =
            exerciseNames.some((name, index) => checkedItems[index] && name.trim() === "") ||
            reps === "" ||
            load === "";

        if (hasError) {
            setShowError(true);
            setOpenToast(true);
            return;
        }

        setShowError(false);
        setOpenToast(false);
        // Lógica para salvar os dados (exemplo: enviar para API)
    };

    return (
        <Box className="flex items-center justify-center min-h-screen bg-[#7DA0C4] p-4 flex-col">
            {/* Logo mais para cima */}
            <Box className="mb-6">
                <img src={Logo} alt="Logo" className="max-w-56 max-h-50 mt-[-150px]" />
            </Box>

            <Box className="bg-[#E3F2FD] rounded-xl p-20 shadow-lg w-full max-w-5xl">
                <Typography
                    variant="h4"
                    className="font-bold text-base md:text-xl text-[#021024] text-center mb-8"
                    sx={{ fontFamily: "Poppins, sans-serif" }} // Aplicando fonte Poppins
                >
                    Adicione seus exercícios
                </Typography>

                {[0, 1].map((index) => (
                    <Box key={index} className="grid grid-cols-4 gap-4 items-center mt-4">
                        {/* Nome do exercício */}
                        <TextField
                            label="Nome do exercício"
                            variant="outlined"
                            fullWidth
                            value={exerciseNames[index]}
                            onChange={(e) => {
                                const updatedNames = [...exerciseNames];
                                updatedNames[index] = e.target.value;
                                setExerciseNames(updatedNames);
                            }}
                            sx={{
                                fontFamily: "Poppins, sans-serif", // Fonte Poppins nos inputs
                                "& .MuiInputBase-input": {
                                    color: "black", // Cor do texto dentro do input
                                },
                                "& .MuiInputLabel-root": {
                                    color: "black", // Cor da label
                                },
                                backgroundColor: "#fff",
                                borderRadius: "8px",
                            }}
                        />

                        {/* Dropdown de Repetições */}
                        <FormControl fullWidth sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
                            <InputLabel
                                id={`reps-label-${index}`}
                                sx={{ color: "black", fontFamily: "Poppins, sans-serif" }}>
                                Repetições
                            </InputLabel>
                            <Select
                                labelId={`reps-label-${index}`}
                                value={reps}
                                onChange={(e) => setReps(e.target.value)}
                                label="Repetições"
                                sx={{
                                    color: "black",
                                    fontFamily: "Poppins, sans-serif", // Fonte Poppins no dropdown
                                    "& .MuiSelect-icon": {
                                        color: "black", // Cor do ícone
                                    },
                                    "& .MuiMenuItem-root": {
                                        color: "black", // Cor dos itens do menu
                                    },
                                }}>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={15}>15</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Dropdown de Carga */}
                        <FormControl fullWidth sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
                            <InputLabel
                                id={`load-label-${index}`}
                                sx={{ color: "black", fontFamily: "Poppins, sans-serif" }}>
                                Carga
                            </InputLabel>
                            <Select
                                labelId={`load-label-${index}`}
                                value={load}
                                onChange={(e) => setLoad(e.target.value)}
                                label="Carga"
                                sx={{
                                    color: "black",
                                    fontFamily: "Poppins, sans-serif", // Fonte Poppins no dropdown
                                    "& .MuiSelect-icon": {
                                        color: "black", // Cor do ícone
                                    },
                                    "& .MuiMenuItem-root": {
                                        color: "black", // Cor dos itens do menu
                                    },
                                }}>
                                <MenuItem value="5kg">5kg</MenuItem>
                                <MenuItem value="10kg">10kg</MenuItem>
                                <MenuItem value="15kg">15kg</MenuItem>
                            </Select>
                        </FormControl>

                        {/* Checkbox de Concluído */}
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checkedItems[index] || false}
                                    onChange={() => toggleCheckbox(index)}
                                    className="w-1/3 max-w-24"
                                    sx={{
                                        color: "#021024",
                                        "&.Mui-checked": {
                                            color: "#5483B3",
                                        },
                                    }}
                                />
                            }
                            label=""
                        />
                    </Box>
                ))}

                <Box className="flex justify-center mt-6">
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            backgroundColor: "#021024",
                            color: "white",
                            padding: "12px 32px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontFamily: "Poppins, sans-serif", // Fonte Poppins no botão
                            "&:hover": {
                                backgroundColor: "#021024",
                            },
                        }}>
                        Salvar
                    </Button>
                </Box>

                {/* Toast de erro */}
                {showError && (
                    <Toast
                        open={openToast}
                        message="Preencha todos os campos antes de salvar"
                        type="error"
                        onClose={() => setOpenToast(false)}
                    />
                )}
            </Box>
        </Box>
    );
}
