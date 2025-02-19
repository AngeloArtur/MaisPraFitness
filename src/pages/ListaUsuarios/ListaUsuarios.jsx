import React, { useState } from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";

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
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, padding: "20px", textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Lista de Usuários
        </Typography>
        <Card
          style={{
            width: "90vw",
            height: "70vh",
            margin: "5vh auto",
            padding: "20px",
            overflowY: "auto",
            color: "#000000",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
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
        </Card>
      </div>
    </div>
  );
};

export default ListaUsuarios;
