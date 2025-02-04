import {
    Box,
    Divider,
    FormControl,
    Button,
    Avatar,
    InputLabel,
    OutlinedInput,
    useMediaQuery,
    useTheme,
} from "@mui/material/";
import { useState } from "react";

export default function Profile() {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

    const [values, setValues] = useState({
        CPFmask: "000.000.000-00",
        phoneMask: "(10) 00000-000",
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Box className="flex h-dvh w-full p-3 gap-8 md:p-8 flex-col lg:flex-row items-center">
            <Box className="flex items-center flex-col gap-5 px-6">
                <Avatar className="!w-48 !h-48 md:!w-72 md:!h-72 text-4xl">H</Avatar>
                <h2>$FirstName $LastName</h2>
                <h4>Idade: $idade</h4>
            </Box>
            <Divider orientation={isSmallScreen ? "horizontal" : "vertical"} flexItem />
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className="bg-tint-blue4 p-10 rounded-lg flex flex-col gap-3 w-auto lg:w-full m-auto">
                <FormControl variant="outlined" className="!w-full">
                    <InputLabel htmlFor="outlined-adornment-CPF">CPF</InputLabel>
                    <OutlinedInput
                        className="bg-white-100"
                        id="outlined-adornment-CPF"
                        type="text"
                        value="52492330079"
                        label="CPF"
                        disabled
                    />
                </FormControl>
                <FormControl variant="outlined" className="!w-full">
                    <InputLabel htmlFor="outlined-adornment-login">Email</InputLabel>
                    <OutlinedInput
                        className="bg-white-100"
                        id="outlined-adornment-login"
                        type="text"
                        value="teste@email.com"
                        label="Email"
                        disabled
                    />
                </FormControl>
                <FormControl className="!w-full">
                    <InputLabel htmlFor="outlined-adornment-phone">Telefone</InputLabel>
                    <OutlinedInput
                        className="bg-white-100"
                        id="outlined-adornment-phone"
                        type="text"
                        label="Telefone"
                        onChange={handleChange}
                    />
                </FormControl>
                <div className="flex gap-3 w-full">
                    <FormControl className="w-full">
                        <InputLabel htmlFor="outlined-adornment-weight">Peso</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-weight"
                            type="text"
                            label="Peso"
                            onChange={handleChange}
                        />
                    </FormControl>
                    <FormControl className="w-full">
                        <InputLabel htmlFor="outlined-adornment-height">Altura</InputLabel>
                        <OutlinedInput
                            className="bg-white-100"
                            id="outlined-adornment-height"
                            type="text"
                            label="Altura"
                            onChange={handleChange}
                        />
                    </FormControl>
                </div>
                <FormControl>
                    <Button variant="contained" className="!bg-tint-blue1 hover:!bg-tint-blue2">
                        Salvar
                    </Button>
                </FormControl>
            </Box>
        </Box>
    );
}
