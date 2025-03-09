import { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    TextField,
    outlinedInputClasses,
    createTheme,
    ThemeProvider,
    useTheme,
    Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import api from "../../Apis/backend/MaisPraTiBack";

// Tema do campo de texto
const customTheme = (outerTheme) =>
    createTheme({
        palette: {
            mode: outerTheme.palette.mode,
        },
        components: {
            MuiTextField: {
                styleOverrides: {
                    root: {
                        "--TextField-brandBorderColor": "black",
                        "--TextField-brandBorderHoverColor": "black",
                        "--TextField-brandBorderFocusedColor": "black",
                        "& label.Mui-focused": {
                            color: "var(--TextField-brandBorderFocusedColor)",
                        },
                    },
                },
            },
            MuiOutlinedInput: {
                styleOverrides: {
                    notchedOutline: {
                        borderColor: "var(--TextField-brandBorderColor)",
                    },
                    root: {
                        [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: "var(--TextField-brandBorderHoverColor)",
                        },
                        [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                            borderColor: "var(--TextField-brandBorderFocusedColor)",
                        },
                    },
                },
            },
        },
    });

//COLUNAS DA TABELA ALUNOS
//As colunas informam quais informações dos alunos vão aparecer
const columns = [
    { field: "studentName", headerName: "Nome do aluno", width: 350 },
    { field: "cpf", headerName: "Matrícula", width: 200 },
    {
        field: "active",
        headerName: "",
        width: 100,
        renderCell: () => (
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success">
                    <Link to="">ATIVAR</Link>
                </Button>
            </Stack>
        ),
    },
    {
        field: "inactive",
        headerName: "",
        width: 100,
        renderCell: () => (
            <Stack direction="row">
                <Button variant="outlined" color="error">
                    <Link to="">INATIVAR</Link>
                </Button>
            </Stack>
        ),
    },
];

export default function StudentList() {
    const outerTheme = useTheme();
    const authCode = localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: `Bearer ${authCode}`,
        },
    };
    const [students, setStudents] = useState([]);

    useEffect(() => {
        api.get("/aluno", config).then((response) => {
            setStudents(response.data);
        });
    }, []);

    const allStudents = students.map((aluno) => {
        return {
            id: aluno.documento,
            studentName: aluno.nome,
            cpf: aluno.documento,
            active: aluno.ativo,
        };
    });

    // UseState para filtrar por nome no campo de texto
    const [pesquisarAluno, setPesquisarAluno] = useState("");

    const filtroPesquisarAlunos = allStudents.filter(
        (aluno) =>
            pesquisarAluno === "" ||
            aluno.studentName.toLowerCase().includes(pesquisarAluno.toLowerCase()) ||
            aluno.cpf.toLowerCase().includes(pesquisarAluno.toLowerCase())
    );
    
    return (
        <Box className="flex flex-col items-center bg-secondary justify-center h-dvh w-full p-3 gap-9 md:p-8 ">
            <Box bgcolor="#BBDEFB" borderRadius={2} className="p-4 w=full h-full mr-5">
                <Typography variant="h5" className="pt-4">
                    Gestão de usuários
                </Typography>
                <Box className="my-4">
                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <TextField
                            className="bg-white-100"
                            value={pesquisarAluno}
                            onChange={(e) => setPesquisarAluno(e.target.value)}
                            label="Pesquisar aluno"
                        />
                    </ThemeProvider>
                </Box>

                <Paper className="min-h-80 h-4/5 w-72 md:w-full">
                    <DataGrid
                        rows={filtroPesquisarAlunos}
                        columns={columns}
                        pageSizeOptions={false}
                        disableRowSelectionOnClick
                    />
                </Paper>
            </Box>
        </Box>
    );
}
