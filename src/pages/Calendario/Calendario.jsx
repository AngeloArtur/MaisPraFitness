import React, { useState } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar"; // Import correto

export default function Calendario() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Box display="flex" className="h-dvh">
      {/* Lateral esquerda - permanece inalterada */}
      <Box width="15%" bgcolor="#E3F2FD" p={2}>
        <Typography variant="h6">Menu</Typography>
        {/* Adicione seus ícones aqui */}
      </Box>

      {/* Conteúdo principal */}
      <Box flexGrow={1} bgcolor="#E3F2FD" p={4}>
        {/* Cabeçalho */}
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Ângelo | 22 Anos
        </Typography>
        <Box className="flex flex-initial gap-2 md:gap-4 mb-4">Calendário</Box>

        {/* Margem azul arredondada */}
        <Paper
          elevation={3}
          sx={{
            bgcolor: "#BBDEFB",
            borderRadius: 4,
            p: 4,
            textAlign: "center",
            mt: 4,
          }}
        >
          {/* Texto acima do calendário */}
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Treino selecionado: Treino A
          </Typography>

          {/* Calendário */}
          <Box display="flex" justifyContent="center" mb={2}>
            <DateCalendar
            />
          </Box>

          {/* Texto à direita do calendário */}
          <Typography variant="body2" align="right" gutterBottom>
            Salvar os treinos no dia que a pessoa for, para métricas futuras
            propor descontos.
          </Typography>

          {/* Botão Salvar */}
          <Button variant="contained" color="primary">
            Salvar
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
