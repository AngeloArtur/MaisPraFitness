import { useEffect, useState } from "react";
import {
    Box,
    Button,
    createTheme,
    outlinedInputClasses,
    Paper,
    TextField,
    ThemeProvider,
    Typography,
    useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../Apis/backend/MaisPraTiBack";
import Toast from "../../components/Toast/Toast";

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

const ListaUsuarios = () => {
    const [employees, setEmployees] = useState([]);
    const authCode = localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: `Bearer ${authCode}`,
        },
    };
    const outerTheme = useTheme();
    const [searchEmployee, setSearchEmployee] = useState("");
    const [showInactive, setShowInactive] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastType, setToastType] = useState("success");

    useEffect(() => {
        api.get("/funcionario", config).then((response) => {
            console.log(response.data);
            setEmployees(response.data);
        });
    }, []);

    const allEmployees = employees.map((funcionario) => {
        return {
            id: funcionario.id_funcionario,
            employeeName: funcionario.nome,
            cpf: funcionario.documento,
            active: funcionario.ativo,
        };
    });

    const handleInativarFuncionario = async (id) => {
        try {
            const response = await api.patch(`/funcionario/${id}/status`, { ativo: false }, config);
            console.log("Funcionário inativado:", response.data);

            // Atualiza a lista localmente
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.id_funcionario === id ? { ...employee, ativo: false } : employee
                )
            );

            setToastMessage("Funcionário inativado com sucesso!");
            setToastType("success");
            setOpenToast(true);
        } catch (error) {
            console.error("Erro ao inativar funcionário:", error);
            setToastMessage("Erro ao inativar funcionário");
            setToastType("error");
            setOpenToast(true);
        }
    };

    const handleAtivarFuncionario = async (id) => {
        try {
            const response = await api.patch(`/funcionario/${id}/status`, { ativo: true }, config);
            console.log("Funcionário ativado:", response.data);

            // Atualiza a lista localmente
            setEmployees((prevEmployees) =>
                prevEmployees.map((employee) =>
                    employee.id_funcionario === id ? { ...employee, ativo: true } : employee
                )
            );

            setToastMessage("Funcionário ativado com sucesso!");
            setToastType("success");
            setOpenToast(true);
        } catch (error) {
            console.error("Erro ao ativar funcionário:", error);
            setToastMessage("Erro ao ativar funcionário");
            setToastType("error");
            setOpenToast(true);
        }
    };

    const filterEmployees = allEmployees
        .filter(
            (employee) =>
                searchEmployee === "" ||
                employee.active === false ||
                employee.employeeName.toLowerCase().includes(searchEmployee.toLowerCase()) ||
                employee.cpf.toLowerCase().includes(searchEmployee.toLowerCase())
        )
        .filter((employee) => (showInactive ? !employee.active : employee.active));

    const columns = [
        { field: "employeeName", headerName: "Nome do Funcionário", width: 350 },
        { field: "cpf", headerName: "CPF", width: 200 },
        {
            field: "data",
            headerName: "",
            width: 120,
            renderCell: (params) => (
                <>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            showInactive
                                ? handleAtivarFuncionario(params.row.id)
                                : handleInativarFuncionario(params.row.id)
                        }
                        className={
                            showInactive
                                ? "!bg-success !text-white !font-bold !border-none"
                                : "!bg-error !text-white !font-bold !border-none"
                        }>
                        {showInactive ? "Ativar" : "Inativar"}
                    </Button>
                </>
            ),
        },
    ];

    return (
        <Box className="flex flex-col items-center bg-secondary justify-center h-dvh w-full p-3 gap-9 md:p-8 ">
            <Box bgcolor="#BBDEFB" borderRadius={2} className="p-4 h-full mr-5">
                <Typography variant="h4" gutterBottom>
                    Lista de Funcionários
                </Typography>
                <Box className="my-4 flex gap-2 justify-between">
                    <ThemeProvider theme={customTheme(outerTheme)}>
                        <TextField
                            className="bg-white-100"
                            value={searchEmployee}
                            onChange={(e) => setSearchEmployee(e.target.value)}
                            label="Pesquisar funcionário"
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
                        rows={filterEmployees}
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
};

export default ListaUsuarios;
