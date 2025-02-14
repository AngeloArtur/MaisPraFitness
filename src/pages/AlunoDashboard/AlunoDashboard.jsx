import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Toast from "../../components/Toast/Toast";
import DialogBox from "../../components/Dialog/Dialog";
import { fetchExercise } from "../../services/fetchExercise";

const AlunoDashboard = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const [selectedRows, setSelectedRows] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("error");
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState({
        example: {
            bodyPart: "",
            equipment: "",
            gifUrl: "",
            instructions: [],
            secondaryMuscles: [],
            target: "",
        },
    });

    const columns = [
        { field: "id", headerName: "ID" },
        { field: "exerciseName", headerName: "Exercício", width: 350 },
        { field: "series", headerName: "Séries" },
        { field: "repetitions", headerName: "Repetições" },
        {
            field: "example",
            headerName: "Vídeo Explicativo",
            width: 350,
            renderCell: (params) => (
                <Button variant="text" className="color-tint-blue1" onClick={() => handleOpenDialog(params.row)}>
                    Ver Vídeo
                </Button>
            ),
        },
    ];

    const handleExerciseInformation = async (exerciseName) => {
        try {
            const exerciseData = await fetchExercise(exerciseName);

            if (exerciseData) {
                setSelectedExercise(exerciseData);
            }
        } catch (error) {
            console.error("Erro ao buscar o exercício:", error);
        }
    };

    const handleOpenDialog = (exercise) => {
        handleExerciseInformation(exercise.example);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleSelectionChange = (selectionModel) => {
        setSelectedRows(selectionModel);
        return treinos[treinoSelecionado].filter((row) => selectionModel.includes(row.id));
    };

    const treinos = {
        A: [
            { id: 1, exerciseName: "Supino Reto", series: 3, repetitions: 15, example: "barbell bench press" },
            {
                id: 2,
                exerciseName: "Crucifixo",
                series: 3,
                repetitions: 15,
                example: "https://link.com/video1",
            },
            {
                id: 3,
                exerciseName: "Supino Inclinado",
                series: 3,
                repetitions: 15,
                example: "barbell incline bench press",
            },
            {
                id: 4,
                exerciseName: "Supino Declinado",
                series: 3,
                repetitions: 15,
                example: "https://link.com/video1",
            },
            {
                id: 5,
                exerciseName: "Tríceps Francês",
                series: 3,
                repetitions: 15,
                example: "https://link.com/video1",
            },
            {
                id: 6,
                exerciseName: "Tríceps Testa",
                series: 3,
                repetitions: 15,
                example: "https://link.com/video1",
            },
            {
                id: 7,
                exerciseName: "Tríceps Unilateral",
                series: 3,
                repetitions: 15,
                example: "https://link.com/video1",
            },
        ],
        B: [],
        C: [],
    };
    const [treinoSelecionado, setTreinoSelecionado] = useState("A");

    const concluirTreino = () => {
        const exercise = treinos[treinoSelecionado];

        // Verifica se todos os exercícios estão concluídos ou foram selecionados
        const todosConcluidos = exercise.every(
            (exercicio) => exercicio.concluido || selectedRows.includes(exercicio.id)
        );
        if (todosConcluidos) {
            setToastMessage("Treino Concluído");
            setToastType("success");
        } else {
            setToastMessage("Por favor conclua todos os exercícios");
            setToastType("error");
        }
        setOpenToast(true);
    };

    return (
        <Box className="flex">
            {openDialog && (
                <DialogBox open={handleOpenDialog} onClose={handleCloseDialog} title="teste">
                    <img src={selectedExercise.example.gifUrl} alt="" />
                </DialogBox>
            )}
            <Box flexGrow={1} bgcolor="#E3F2FD" className="h-dvh w-full px-2 md:px-7">
                <h1 className="py-2 md:py-4"> Ângelo | 22 Anos</h1>
                <Box className="flex flex-initial gap-2 md:gap-4 mb-4">
                    {["A", "B", "C"].map((treino) => (
                        <Button
                            className="!text-sm"
                            key={treino}
                            variant={treinoSelecionado === treino ? "contained" : "outlined"}
                            size={isSmallScreen ? "small" : "medium"}
                            onClick={() => setTreinoSelecionado(treino)}>
                            Treino {treino}
                        </Button>
                    ))}
                </Box>
                <Box bgcolor="#BBDEFB" borderRadius={2} className="p-4 w-full mr-5">
                    <Typography variant="h5" className="py-3">
                        Treino {treinoSelecionado}
                    </Typography>
                    <Paper className="min-h-80 h-4/5 w-72 md:w-full">
                        <DataGrid
                            rows={treinos[treinoSelecionado]}
                            columns={columns}
                            checkboxSelection
                            pageSizeOptions={false}
                            onRowSelectionModelChange={handleSelectionChange}
                            disableRowSelectionOnClick
                        />
                    </Paper>

                    <Button
                        variant="contained"
                        className="!bg-tint-blue1 hover:!bg-tint-blue2 !mt-4"
                        onClick={concluirTreino}>
                        Concluir treino
                    </Button>
                    {openToast && (
                        <Toast
                            message={toastMessage}
                            type={toastType}
                            open={openToast}
                            onClose={() => setOpenToast(false)}
                        />
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default AlunoDashboard;
