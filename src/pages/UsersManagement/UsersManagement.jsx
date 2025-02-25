import { useState } from "react";
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
  { field: "id", headerName: "ID" },
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

  //LINHAS DA TABELA DE ALUNOS
  //Aqui é onde vai estar o ARRAY com os objetos alunos.
  const alunos = [
    {
      id: 1,
      studentName: "Paulo Diego",
      cpf: "00000000001",
      active: true,
      data: "infos",
    },
    {
      id: 2,
      studentName: "Angelo Artur",
      cpf: "00000000002",
      active: false,
      data: "infos",
    },
    {
      id: 3,
      studentName: "Guilherme Martins",
      cpf: "00000000003",
      active: true,
      data: "infos",
    },
    {
      id: 4,
      studentName: "Arthur Morgan",
      cpf: "00000000004",
      active: false,
      data: "infos",
    },
    {
      id: 5,
      studentName: "John Marston",
      cpf: "00000000005",
      active: true,
      data: "infos",
    },
    {
      id: 6,
      studentName: "Jack Marston",
      cpf: "00000000006",
      active: true,
      data: "infos",
    },
    {
      id: 7,
      studentName: "Dutch Vanderlinde",
      cpf: "00000000007",
      active: false,
      data: "infos",
    },
    {
      id: 8,
      studentName: "Mary Linton",
      cpf: "00000000008",
      active: false,
      data: "infos",
    },
    {
      id: 9,
      studentName: "Hosea Matthews",
      cpf: "00000000009",
      active: true,
      data: "infos",
    },
    {
      id: 10,
      studentName: "Abigail Roberts",
      cpf: "00000000010",
      active: false,
      data: "infos",
    },
    {
      id: 11,
      studentName: "Sadie Adler",
      cpf: "00000000011",
      active: true,
      data: "infos",
    },
    {
      id: 12,
      studentName: "Charles Smith",
      cpf: "00000000012",
      active: true,
      data: "infos",
    },
  ];

  // UseState para filtrar por nome no campo de texto
  const [pesquisarAluno, setPesquisarAluno] = useState("");

  const filtroPesquisarAlunos = alunos.filter(
    (aluno) =>
      pesquisarAluno === "" ||
      aluno.studentName.toLowerCase().includes(pesquisarAluno.toLowerCase())
  );

  return (
    <Box className="flex flex-col items-center bg-secondary justify-center h-dvh w-full p-3 gap-9 md:p-8 ">
      <Box
        bgcolor="#BBDEFB"
        borderRadius={2}
        className="p-4 w=full h-full mr-5"
      >
        <Typography variant="h5" className="pt-4">
          Gestão de usuários
        </Typography>
        <Box className="my-4">
          <ThemeProvider theme={customTheme(outerTheme)}>
            <TextField
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
