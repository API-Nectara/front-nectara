import axios from "axios";

const URL_API = "http://localhost:3000/butterflies";

// Método GET para obtener todas las mariposas
export const getAllButterflies = async () => {
  try {
    const response = await axios.get(URL_API);
    return response.data;
  } catch (error) {
    console.error("Error al obtener las mariposas:", error);
    throw error;
  }
};

// Método GET para obtener una mariposa por ID
export const getOneButterfly = async (id) => {
  try {
    const response = await axios.get(`${URL_API}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la mariposa con ID ${id}:`, error);
    throw error;
  }
};

// Metodo post para el create
// Metodo put para actualizar
// Metodo delete para eliminar
