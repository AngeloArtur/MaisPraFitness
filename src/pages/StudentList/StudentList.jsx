import { useState, useEffect } from "react";
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
    { field: "studentName", headerName: "Nome do aluno", width: 300 },
    { field: "cpf", headerName: "CPF", width: 200 },
    { field: "register", headerName: "Cadastro", width: 150 },
    {
        field: "data",
        headerName: "",
        width: 250,
        renderCell: (params) => (
            <>
                <Button className="flex gap-5">
                    <Link to={`measurement/${params.row.id}`}>Medidas</Link>
                </Button>
                <Button className="flex gap-5">
                    <Link to={`edit-exercise/${params.row.id}`}>Editar treino</Link>
                </Button>
            </>
        ),
    },
];

export default function StudentList() {
    const outerTheme = useTheme();
    const [students, setStudents] = useState([]);
    const authCode = localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: `Bearer ${authCode}`,
        },
    };

    useEffect(() => {
        api.get("/aluno", config).then((response) => {
            console.log(response.data);
            console.log(response.data.id_aluno);
            setStudents(response.data);
        });
    }, []);

    const allStudents = students.map((aluno) => {
        return {
            id: aluno.id_aluno,
            studentName: aluno.nome,
            cpf: aluno.documento,
            register: aluno.data_cadastro.replace(/-/g, "/").split("/").reverse().join("/"),
            active: aluno.ativo,
        };
    });

    // Variável com um FILTER para mostrar apenas os alunos ativos.
    const AlunosAtivos = allStudents.filter((student) => {
        return student.active == true;
    });

    // UseState para filtrar por nome no campo de texto
    const [pesquisarAluno, setPesquisarAluno] = useState("");

    const filtroPesquisarAlunos = AlunosAtivos.filter(
        (aluno) =>
            pesquisarAluno == "" ||
            aluno.studentName.toLowerCase().includes(pesquisarAluno.toLowerCase()) ||
            aluno.cpf.toLowerCase().includes(pesquisarAluno.toLowerCase())
    );

    return (
        <Box className="flex flex-col items-center bg-secondary justify-center h-dvh w-full p-3 gap-9 md:p-8 ">
            <Box bgcolor="#BBDEFB" borderRadius={2} className="p-4 h-full mr-5">
                <Typography variant="h5" className="pt-4">
                    Lista de alunos
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
                        disableColumnMenu
                        disableColumnFilter
                    />
                </Paper>
            </Box>
        </Box>
    );
}
