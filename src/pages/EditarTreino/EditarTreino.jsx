import Logo from "../../assets/images/+pf_logo 1.png";
import { useState } from "react";
import { Box, Button, Checkbox, FormControlLabel, MenuItem, Select, Typography, InputLabel, FormControl } from "@mui/material";

export default function ExerciseForm() {
  const [checkedItems, setCheckedItems] = useState({});
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");

  const toggleCheckbox = (index) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <Box className="flex items-center justify-center min-h-screen bg-[#7DA0C4] p-4 flex-col">
      {/* Logo centralizada mais para cima */}
      <Box className="mb-4 mt-[-20px]"> {/* Aqui ajustamos a margem superior */}
        <img src={Logo} alt="Logo" className="max-w-60 max-h-24" />
      </Box>

      <Box className="bg-[#E3F2FD] rounded-xl p-10 shadow-lg w-full max-w-4xl">
        <Typography variant="h4" className="font-bold text-base md:text-xl text-[#021024] text-center mb-8">
          Adicione seus exercícios
        </Typography>

        <Box className="grid grid-cols-4 gap-4 items-center text-primary mb-4">
          <Typography variant="subtitle1" className="font-bold text-[#021024] !text-sm md:!text-base"></Typography>
          <Typography variant="subtitle1" className="font-bold text-[#021024] !text-sm md:!text-base"></Typography>
          <Typography variant="subtitle1" className="font-bold text-[#021024] !text-sm md:!text-base"></Typography>
          <Typography variant="subtitle1"></Typography>
        </Box>

        {[1, 2].map((_, index) => (
          <Box key={index} className="grid grid-cols-4 gap-4 items-center mt-4">
            <input className="p-3 bg-[#5483B3] text-white rounded-lg w-full !text-sm md:!text-base" placeholder="Nome do exercício" />

            {/* Dropdown de Repetições */}
            <FormControl className="w-full !text-sm md:!text-base">
              <InputLabel id={`reps-label-${index}`} className="text-white">Repetições</InputLabel>
              <Select
                labelId={`reps-label-${index}`}
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                label="Repetições"
                className="bg-[#5483B3] text-white rounded-lg"
              >
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
              </Select>
            </FormControl>

            {/* Dropdown de Carga */}
            <FormControl className="w-full !text-sm md:!text-base">
              <InputLabel id={`load-label-${index}`} className="text-white">Carga</InputLabel>
              <Select
                labelId={`load-label-${index}`}
                value={load}
                onChange={(e) => setLoad(e.target.value)}
                label="Carga"
                className="bg-[#5483B3] text-white rounded-lg"
              >
                <MenuItem value="">Carga</MenuItem>
                <MenuItem value="5kg">5kg</MenuItem>
                <MenuItem value="10kg">10kg</MenuItem>
                <MenuItem value="15kg">15kg</MenuItem>
              </Select>
            </FormControl>

            {/* Checkbox de Concluído */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedItems[index] || false}
                  onChange={() => toggleCheckbox(index)}
                  sx={{
                    color: "#021024",
                    "&.Mui-checked": {
                      color: "#5483B3",
                    },
                  }}
                />
              }
              label=""
            />
          </Box>
        ))}

        <Box className="flex justify-center mt-6">
          <Button
            variant="contained"
            className="bg-[#021024] text-white py-3 px-8 rounded-xl !text-sm md:!text-base"
          >
            Salvar
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
