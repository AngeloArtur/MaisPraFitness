import { useEffect, useState } from "react";
import { Box, Button, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import api from "../../Apis/backend/MaisPraTiBack";

const columns = [
    { field: "employeeName", headerName: "Nome do Funcionário", width: 350 },
    { field: "cpf", headerName: "CPF", width: 150 },
    { field: "active", headerName: "Ativos" },
    {
        field: "data",
        headerName: "",
        width: 350,
        renderCell: () => (
            <>
                <Button variant="contained" className="!bg-danger text-white !font-bold">
                    Inativar
                </Button>
            </>
        ),
    },
];

const ListaUsuarios = () => {
    const [employees, setEmployees] = useState([]);
    const authCode = localStorage.getItem("accessToken");
    const config = {
        headers: {
            Authorization: `Bearer ${authCode}`,
        },
    };

    useEffect(() => {
        api.get("/funcionario", config).then((response) => {
            console.log(response.data);
            setEmployees(response.data);
        });
    }, []);

    const allEmployees = employees.map((funcionario) => {
        return {
            id: funcionario.documento,
            employeeName: funcionario.nome,
            cpf: funcionario.documento,
            active: funcionario.ativo,
        };
    });

    return (
        <Box className="flex flex-col items-center bg-secondary justify-center h-dvh w-full p-3 gap-9 md:p-8 ">
            <Box bgcolor="#BBDEFB" borderRadius={2} className="p-4 h-full mr-5">
                <Typography variant="h4" gutterBottom>
                    Lista de Funcionários
                </Typography>
                <Paper className="min-h-80 h-4/5 w-72 md:w-full">
                    <DataGrid
                        rows={allEmployees}
                        columns={columns}
                        pageSizeOptions={false}
                        disableRowSelectionOnClick
                    />
                </Paper>
            </Box>
        </Box>
    );
};

export default ListaUsuarios;
