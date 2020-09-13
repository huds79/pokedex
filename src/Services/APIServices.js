import axios from 'axios';

const API = axios.create({
    baseURL: 'https://pokeapi.co/api/v2/',
    timeout: 10000,
});

class APIServices {
    static getPokemonNames = async () => {
        try {
            const response = await API.get("pokemon/?limit=1200");
            
            return { data: response.data }
        }
        catch (error) {
            return { error: error.response }
        }
    };

    static getPokemonData = async (number) => {
        try {
            const response = await API.get("pokemon/" + number +  "/");
            
            return response.data;
        }
        catch (error) {
            return { error: error.response }
        }
    };

    static getPokemoncharacteristic = async (number) => {
        try {
            const response = await API.get("characteristic/" + number +  "/");
            return response.data;
        }
        catch (error) {
            return { error: error.response }
        }
    };
}

export default APIServices;