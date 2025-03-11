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
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../Apis/backend/MaisPraTiBack";
import Toast from "../../components/Toast/Toast";

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

export default function UsersManagement() {
    const outerTheme = useTheme();
    const authCode = localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: `Bearer ${authCode}`,
        },
    };
    const [students, setStudents] = useState([]);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    useEffect(() => {
        api.get("/aluno", config).then((response) => {
            setStudents(response.data);
        });
    }, []);

    const allStudents = students.map((aluno) => {
        return {
            id: aluno.id_aluno,
            studentName: aluno.nome,
            cpf: aluno.documento,
            active: aluno.ativo,
        };
    });

    // UseState para filtrar por nome no campo de texto
    const [pesquisarAluno, setPesquisarAluno] = useState("");
    const [showInactive, setShowInactive] = useState(false);

    const handleInativarAluno = async (id) => {
        try {
            const response = await api.patch(`/aluno/${id}/status`, { ativo: false }, config);
            console.log("Aluno inativado:", response.data);

            // Atualiza a lista localmente
            setStudents((prevStudents) =>
                prevStudents.map((student) => (student.id_aluno === id ? { ...student, ativo: false } : student))
            );

            setToastMessage("Aluno inativado com sucesso!");
            setToastType("success");
            setOpenToast(true);
        } catch (error) {
            console.error("Erro ao inativar aluno:", error);
            setToastMessage("Erro ao inativar aluno");
            setToastType("error");
            setOpenToast(true);
        }
    };

    const handleAtivarAluno = async (id) => {
        try {
            const response = await api.patch(`/aluno/${id}/status`, { ativo: true }, config);
            console.log("Aluno ativado:", response.data);

            // Atualiza a lista localmente
            setStudents((prevStudents) =>
                prevStudents.map((student) => (student.id_aluno === id ? { ...student, ativo: true } : student))
            );

            setToastMessage("Aluno ativado com sucesso!");
            setToastType("success");
            setOpenToast(true);
        } catch (error) {
            console.error("Erro ao ativar aluno:", error);
            setToastMessage("Erro ao ativar aluno");
            setToastType("error");
            setOpenToast(true);
        }
    };

    const filtroPesquisarAlunos = allStudents
        .filter(
            (aluno) =>
                pesquisarAluno === "" ||
                aluno.active === false ||
                aluno.studentName.toLowerCase().includes(pesquisarAluno.toLowerCase()) ||
                aluno.cpf.toLowerCase().includes(pesquisarAluno.toLowerCase())
        )
        .filter((aluno) => (showInactive ? !aluno.active : aluno.active));

    const columns = [
        { field: "studentName", headerName: "Nome do aluno", width: 350 },
        { field: "cpf", headerName: "Matrícula", width: 200 },
        {
            field: "inactive",
            headerName: "",
            width: 120,
            renderCell: (params) => (
                <Button
                    variant="outlined"
                    className={
                        showInactive
                            ? "!bg-success !text-white !font-bold !border-none"
                            : "!bg-error !text-white !font-bold !border-none"
                    }
                    onClick={
                        showInactive ? () => handleAtivarAluno(params.row.id) : () => handleInativarAluno(params.row.id)
                    }>
                    {showInactive ? "Ativar" : "Inativar"}
                </Button>
            ),
        },
    ];

    return (
        <Box className="flex flex-col items-center bg-secondary justify-center h-dvh w-full p-3 gap-9 md:p-8 ">
            <Box bgcolor="#BBDEFB" borderRadius={2} className="p-4 w=full h-full mr-5">
                <Typography variant="h5" className="pt-4">
                    Gestão de usuários
                </Typography>
                <Box className="my-4 flex gap-2 justify-between">
                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <TextField
                            className="bg-white-100"
                            value={pesquisarAluno}
                            onChange={(e) => setPesquisarAluno(e.target.value)}
                            label="Pesquisar aluno"
                        />
                    </ThemeProvider>
                    <Button
                        variant="contained"
                        className="!bg-error color-white-100 !font-bold"
                        onClick={() => setShowInactive(!showInactive)}>
                        {showInactive ? "Ativos" : "Inativos"}
                    </Button>
                </Box>

                <Paper className="min-h-80 h-4/5 w-72 md:w-full">
                    <DataGrid
                        rows={filtroPesquisarAlunos}
                        columns={columns}
                        pageSizeOptions={false}
                        disableRowSelectionOnClick
                        disableColumnFilter
                        disableColumnMenu
                    />
                </Paper>
            </Box>
            {openToast && (
                <Toast message={toastMessage} type={toastType} open={openToast} onClose={() => setOpenToast(false)} />
            )}
        </Box>
    );
}
