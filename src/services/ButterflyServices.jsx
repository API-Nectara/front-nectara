import axios from 'axios';

// URL base de tu json-server
const API_URL = 'http://localhost:3000/butterflies';

// GET - Obtener todas las mariposas
export const getAllButterflies = async () => {
  try {
    console.log('🔍 Buscando mariposas en:', API_URL);
    const response = await axios.get(API_URL);
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
    const response = await axios.get(`${API_URL}/${id}`);
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
    
    // Generar ID único
    const id = Math.random().toString(36).substr(2, 4);
    const dataWithId = { ...butterflyData, id };
    
    const response = await axios.post(API_URL, dataWithId);
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
    const dataWithId = { ...butterflyData, id };
    
    const response = await axios.put(`${API_URL}/${id}`, dataWithId);
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
    const response = await axios.delete(`${API_URL}/${id}`);
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
    const response = await axios.get(API_URL);
    console.log('✅ Conexión con json-server OK');
    return true;
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
export const CreateNewButterfly = async (newButterfly) =>{
    try {
    const response = await axios.post(`${URL_API}`,newButterfly);
    return response;
  } catch (error) {
    console.error(`Error al crear mariposa:`, error.message);
    throw error;
  }
}
// Metodo put para actualizar
// Metodo delete para eliminar
