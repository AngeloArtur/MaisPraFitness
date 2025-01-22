import React, { useState } from "react";
import { Box, Typography, Checkbox, Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const columns = [
    { field: "id", headerName: "ID" },
    { field: "exerciseName", headerName: "Exercício", width: 350 },
    { field: "series", headerName: "Séries" },
    { field: "repetitions", headerName: "Repetições" },
    { field: "example", headerName: "Vídeo Explicativo", width: 350 },
];

const AlunoDashboard = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [treinos, setTreinos] = useState({
        A: [
            { id: 1, exerciseName: "Supino Reto", series: 3, repetitions: 15, example: "https://link.com/video1" },
            { id: 2, exerciseName: "Crucifixo", series: 3, repetitions: 15, example: "https://link.com/video1" },
            { id: 3, exerciseName: "Supino Inclinado", series: 3, repetitions: 15, example: "https://link.com/video1" },
            { id: 4, exerciseName: "Supino Declinado", series: 3, repetitions: 15, example: "https://link.com/video1" },
            { id: 5, exerciseName: "Tríceps Francês", series: 3, repetitions: 15, example: "https://link.com/video1" },
            { id: 6, exerciseName: "Tríceps Testa", series: 3, repetitions: 15, example: "https://link.com/video1" },
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
    });
    const [treinoSelecionado, setTreinoSelecionado] = useState("A");

    const handleCheck = (index) => {
        setTreinos((prevTreinos) => {
            const updatedTreinos = { ...prevTreinos };
            updatedTreinos[treinoSelecionado][index].concluido = !updatedTreinos[treinoSelecionado][index].concluido;
            return updatedTreinos;
        });
    };

    const concluirTreino = () => {
        if (treinos[treinoSelecionado].every((exercicio) => exercicio.concluido)) {
            alert("Treino concluído!");
        } else {
            alert("Conclua todos os exercícios antes de finalizar o treino!");
        }
    };

    return (
        <Box className="flex">
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
                        />
                    </Paper>

                    <Button variant="contained" color="primary" className="!mt-4" onClick={concluirTreino}>
                        Concluir treino
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AlunoDashboard;
