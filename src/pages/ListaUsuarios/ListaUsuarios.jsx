import React, { useState } from "react";
import { Box, Button, Card, CardContent, Typography } from "@mui/material";

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([
    "Usuário 1",
    "Usuário 2",
    "Usuário 3",
  ]);

  const handleDelete = (index) => {
    const novaLista = usuarios.filter((_, i) => i !== index);
    setUsuarios(novaLista);
  };

  return (
    <Box flexGrow={1} bgcolor="#E3F2FD" className="h-dvh w-full px-2 md:px-7">
      <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Lista de Usuários
        </Typography>
        <Box bgcolor="#fff" borderRadius={2} className="p-4 w-full min-h-96 mr-5">
          <CardContent>
            {usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <Typography>{usuario}</Typography>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "secondary", color: "#ffffff" }}
                    onClick={() => handleDelete(index)}
                  >
                    Deletar
                  </Button>
                </div>
              ))
            ) : (
              <Typography color="textSecondary">
                Nenhum usuário cadastrado
              </Typography>
            )}
          </CardContent>
        </Box>
      </div>
    </Box>
  );
};

export default ListaUsuarios;
