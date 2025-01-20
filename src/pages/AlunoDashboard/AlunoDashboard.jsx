import React, { useState } from 'react';
import { Box, Typography, Checkbox, Button } from '@mui/material';

const AlunoDashboard = () => {
  const [treinos, setTreinos] = useState({
    A: [
      { nome: 'treino de braço', series: 5, carga: '25 kg', video: 'https://link.com/video1', concluido: false },
      { nome: 'treino de costas', series: 5, carga: '25 kg', video: 'https://link.com/video2', concluido: false },
    ],
    B: [],
    C: [],
  });
  const [treinoSelecionado, setTreinoSelecionado] = useState('A');

  const handleCheck = (index) => {
    setTreinos((prevTreinos) => {
      const updatedTreinos = { ...prevTreinos };
      updatedTreinos[treinoSelecionado][index].concluido = !updatedTreinos[treinoSelecionado][index].concluido;
      return updatedTreinos;
    });
  };

  const concluirTreino = () => {
    if (treinos[treinoSelecionado].every((exercicio) => exercicio.concluido)) {
      alert('Treino concluído!');
    } else {
      alert('Conclua todos os exercícios antes de finalizar o treino!');
    }
  };

  return (
    <Box className="flex">
      <Box flexGrow={1} p={4} bgcolor="#E3F2FD" className="h-dvh">
        <Typography variant="h4" gutterBottom>
          Dados do aluno | Idade
        </Typography>
        <Box display="flex" justifyContent="space-between" mb={2}>
          {['A', 'B', 'C'].map((treino) => (
            <Button
              key={treino}
              variant={treinoSelecionado === treino ? 'contained' : 'outlined'}
              onClick={() => setTreinoSelecionado(treino)}
            >
              Treino {treino}
            </Button>
          ))}
        </Box>
        <Box p={3} bgcolor="#BBDEFB" borderRadius={2}>
          <Typography variant="h5">Treino {treinoSelecionado}</Typography>
          <Box mt={2}>
            {treinos[treinoSelecionado].map((exercicio, index) => (
              <Box key={index} display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                <Typography>{exercicio.nome}</Typography>
                <Typography>{exercicio.series} séries</Typography>
                <Typography>{exercicio.carga}</Typography>
                <a href={exercicio.video} target="_blank" rel="noopener noreferrer">
                  Vídeo explicativo
                </a>
                <Checkbox
                  checked={exercicio.concluido}
                  onChange={() => handleCheck(index)}
                />
              </Box>
            ))}
          </Box>
          <Button variant="contained" color="primary" onClick={concluirTreino}>
            Concluir treino
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default AlunoDashboard;
