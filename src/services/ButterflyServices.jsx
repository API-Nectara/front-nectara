// import axios from 'axios';
import { api } from "../api/client.js"; // o "../api/client"

// URL base de tu json-server
const URL_API = '/butterflies';

// GET - Obtener todas las mariposas
export const getAllButterflies = async () => {
  try {
    console.log('🔍 Buscando mariposas en:', URL_API);
    const response = await api.get(URL_API);
    console.log('✅ Mariposas encontradas:', response.data.length);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener las mariposas:', error);
    throw error;
  }
};

// GET - Obtener una mariposa por ID
export const getOneButterfly = async (id) => {
  try {
    console.log('🔍 Buscando mariposa ID:', id);
   const response = await api.get(`${URL_API}/${id}`);
    console.log('✅ Mariposa encontrada:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener la mariposa:', error);
    throw error;
  }
};

// POST - Crear nueva mariposa
export const createButterfly = async (butterflyData) => {
  try {
    console.log('📝 Creando mariposa:', butterflyData);
    
    // // Generar ID único
    // const id = Math.random().toString(36).substr(2, 4);
    // const dataWithId = { ...butterflyData, id };
    
    const response = await api.post(URL_API, butterflyData, {
      headers: { "Content-Type": "application/json"},
    });
    console.log('✅ Mariposa creada:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al crear la mariposa:', error);
    throw error;
  }
};

// PUT - Actualizar mariposa existente
export const updateButterfly = async (id, butterflyData) => {
  try {
    console.log('✏️ Actualizando mariposa:', id, butterflyData);
    
    // Asegurar que el ID esté incluido
    // const dataWithId = { ...butterflyData, id };
    
    const response = await api.put(`${URL_API}/${id}`, butterflyData,{
      headers: { "Content-Type": "application/json"},
    });
    console.log('✅ Mariposa actualizada:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar la mariposa:', error);
    throw error;
  }
};

// DELETE - Eliminar mariposa
export const deleteButterfly = async (id) => {
  try {
    console.log('🗑️ Eliminando mariposa ID:', id);
    const response = await api.delete(`${URL_API}/${id}`);
    console.log('✅ Mariposa eliminada');
    return response.data;
  } catch (error) {
    console.error('❌ Error al eliminar la mariposa:', error);
    throw error;
  }
};

// Función para probar conexión
export const testConnection = async () => {
  try {
    const res = await api.get("/health");
    console.log("🌐 /health →", res.data);
    return !!res.data?.ok;
    
  } catch (error) {
    console.error('❌ No se puede conectar con json-server:', error.message);
    return false;
  }
};

// Validación de datos
export const validateButterflyData = (data) => {
  const errors = {};
  
  // Verificar nombres comunes (múltiples formatos)
  const commonName = data.common_name || data.commonName;
  if (!commonName || commonName.trim() === '') {
    errors.commonName = 'El nombre común es requerido';
  }
  
  // Verificar nombres científicos (múltiples formatos)
  const scientificName = data.scientific_name || data.scientificName;
  if (!scientificName || scientificName.trim() === '') {
    errors.scientificName = 'El nombre científico es requerido';
  }
  
  if (!data.location || data.location.trim() === '') {
    errors.location = 'La ubicación es requerida';
  }
  
  if (!data.habitat || data.habitat.trim() === '') {
    errors.habitat = 'El hábitat es requerido';
  }
  
  if (!data.description || data.description.trim() === '') {
    errors.description = 'La descripción es requerida';
  }
  
  if (!data.image || data.image.trim() === '') {
    errors.image = 'La URL de la imagen es requerida';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
// Metodo post para el create
// export const CreateNewButterfly = async (newButterfly) =>{
//     try {
//     const response = await axios.post(`${URL_API}`,newButterfly);
//     return response;
//   } catch (error) {
//     console.error(`Error al crear mariposa:`, error.message);
//     throw error;
//   }
// }

