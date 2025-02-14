import axios from "axios";

export const ApiCep = async(cep) => {
    try {
        const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`, {
            timeout: 1000,
        });
        return response.data;
    } catch (error){
        console.error("Erro ao buscar CEP:", error);
        return null;
    }
}