import axios from "axios";

export const ExerciseGif = async (endpoint, queryParams ={}) => {
    const url = `https://exercisedb.p.rapidapi.com/exercises/${endpoint}`;

    const options = {
        method: 'GET',
        url: url,
        headers: {
            "x-rapidapi-key": "f153c1c383msh6d784387dc449bbp1e5cc6jsn391957740f62",
            "x-rapidapi-host": "exercisedb.p.rapidapi.com"
        },
        params: queryParams
    };

    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
};
