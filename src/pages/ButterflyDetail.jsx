import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Edit, Trash2, Upload, X } from 'lucide-react';
import { getAllButterflies, getOneButterfly, updateButterfly, deleteButterfly } from '../services/ButterflyServices';

const ButterflyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Estados
  const [butterfly, setButterfly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [allButterflies, setAllButterflies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Estado del formulario de edición
  const [editForm, setEditForm] = useState({
    common_name: '',
    scientific_name: '',
    location: '',
    description: '',
    habitat: '',
    image: '',
    migratory: false
  });

  // Estado para Cloudinary
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  // Cargar datos iniciales
  useEffect(() => {
    fetchAllButterflies();
  }, []);

  useEffect(() => {
    if (allButterflies.length > 0) {
      const index = allButterflies.findIndex(b => b.id === id);
      if (index !== -1) {
        setCurrentIndex(index);
        setButterfly(allButterflies[index]);
        setEditForm(allButterflies[index]);
        setLoading(false);
      } else {
        setError('Mariposa no encontrada');
        setLoading(false);
      }
    }
  }, [id, allButterflies]);

  // Función para obtener todas las mariposas usando tu service
  const fetchAllButterflies = async () => {
    try {
      console.log('🔄 Cargando todas las mariposas...');
      const data = await getAllButterflies();
      console.log('✅ Mariposas cargadas:', data.length);
      setAllButterflies(data);
    } catch (err) {
      console.error('❌ Error al cargar mariposas:', err);
      setError('Error al cargar las mariposas: ' + err.message);
      setLoading(false);
    }
  };

  // Navegación entre páginas
  const handlePageFlip = (direction) => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    
    setTimeout(() => {
      let newIndex;
      if (direction === 'next' && currentIndex < allButterflies.length - 1) {
        newIndex = currentIndex + 1;
      } else if (direction === 'prev' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else {
        setIsFlipping(false);
        return;
      }
      
      setCurrentIndex(newIndex);
      const newButterfly = allButterflies[newIndex];
      setButterfly(newButterfly);
      setEditForm(newButterfly);
      navigate(`/butterfly/${newButterfly.id}`, { replace: true });
      
      setTimeout(() => setIsFlipping(false), 100);
    }, 300);
  };

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Subir imagen a Cloudinary
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'butterfly_uploads'); // ⚠️ CAMBIAR por tu upload_preset
    formData.append('cloud_name', 'nectara-project'); // ⚠️ CAMBIAR por tu cloud_name

    try {
      setUploading(true);
      console.log('☁️ Subiendo imagen a Cloudinary...');
      
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/nectara-project/image/upload', // ⚠️ CAMBIAR por tu cloud_name
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ Imagen subida exitosamente:', data.secure_url);
      return data.secure_url;
    } catch (error) {
      console.error('❌ Error al subir imagen:', error);
      alert('❌ Error al subir imagen: ' + error.message);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Manejar subida de archivos con validación
  const handleFileUpload = async (file) => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('⚠️ Por favor selecciona una imagen válida (JPG, PNG, GIF, etc.)');
      return;
    }

    // Validar tamaño (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB en bytes
    if (file.size > maxSize) {
      alert('⚠️ La imagen es demasiado grande. Máximo 5MB permitidos.');
      return;
    }

    console.log('📁 Procesando archivo:', {
      name: file.name,
      size: (file.size / 1024 / 1024).toFixed(2) + ' MB',
      type: file.type
    });

    const imageUrl = await uploadToCloudinary(file);
    if (imageUrl) {
      console.log('✅ URL de imagen obtenida:', imageUrl);
      setEditForm(prev => ({ ...prev, image: imageUrl }));
    }
  };

  // Drag and drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Actualizar mariposa usando tu service
  const handleUpdate = async () => {
    try {
      console.log('✏️ Iniciando actualización de mariposa...');
      
      // Normalizar datos para compatibilidad con ambos formatos
      const normalizedData = {
        ...editForm,
        // Asegurar compatibilidad con ambos formatos de migración
        migratory: editForm.migratory || editForm.is_migratory || false,
        is_migratory: editForm.migratory || editForm.is_migratory || false
      };

      console.log('📝 Datos a actualizar:', normalizedData);
      
      const updatedButterfly = await updateButterfly(butterfly.id, normalizedData);
      console.log('✅ Mariposa actualizada exitosamente:', updatedButterfly);
      
      setButterfly(updatedButterfly);
      
      // Actualizar en la lista local
      const updatedList = allButterflies.map(b => 
        b.id === butterfly.id ? updatedButterfly : b
      );
      setAllButterflies(updatedList);
      
      setIsEditing(false);
      alert('✅ Mariposa actualizada exitosamente');
    } catch (error) {
      console.error('❌ Error al actualizar:', error);
      alert('❌ Error al actualizar: ' + error.message);
    }
  };

  // Eliminar mariposa usando tu service
  const handleDelete = async () => {
    if (!window.confirm('🗑️ ¿Estás seguro de que quieres eliminar esta mariposa?\n\nEsta acción no se puede deshacer.')) {
      return;
    }

    try {
      console.log('🗑️ Iniciando eliminación de mariposa ID:', butterfly.id);
      
      await deleteButterfly(butterfly.id);
      console.log('✅ Mariposa eliminada exitosamente');
      
      alert('✅ Mariposa eliminada exitosamente');
      navigate('/gallery');
    } catch (error) {
      console.error('❌ Error al eliminar:', error);
      alert('❌ Error al eliminar: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-amber-800 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
            Cargando espécimen...
          </p>
        </div>
      </div>
    );
  }

  if (error || !butterfly) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Error
          </h2>
          <p className="text-gray-600 mb-4">{error || 'Mariposa no encontrada'}</p>
          <button
            onClick={() => navigate('/gallery')}
            className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition-colors"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            Volver a la Galería
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-4">
      
      {/* Controles de navegación superiores */}
      <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <button
          onClick={() => navigate('/gallery')}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md hover:bg-white transition-colors border border-amber-200"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          <ChevronLeft size={20} />
          Volver a Galería
        </button>
        
        <div className="text-center">
          <h1 className="text-2xl font-bold text-amber-900 mb-1" style={{ fontFamily: 'Georgia, serif' }}>
            Libro de Especímenes
          </h1>
          <p className="text-amber-700" style={{ fontFamily: 'Georgia, serif' }}>
            Página {currentIndex + 1} de {allButterflies.length}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => handlePageFlip('prev')}
            disabled={currentIndex === 0 || isFlipping}
            className="p-3 bg-amber-100 rounded-full hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 shadow-md"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => handlePageFlip('next')}
            disabled={currentIndex === allButterflies.length - 1 || isFlipping}
            className="p-3 bg-amber-100 rounded-full hover:bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-110 shadow-md"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>

      {/* Libro */}
      <div style={{ perspective: '2500px' }} className="mx-auto">
        <div 
          className={`relative w-full max-w-7xl h-[700px] mx-auto transition-transform duration-300 ${
            isFlipping ? 'animate-pulse' : ''
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="absolute inset-0 bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-amber-200">
            
            {/* Página izquierda - Imagen de la mariposa */}
            <div className="absolute left-0 top-0 w-1/2 h-full border-r-4 border-amber-100">
              <div 
                className="w-full h-full relative bg-cover bg-center flex flex-col justify-center items-center p-12"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(139, 69, 19, 0.1), rgba(139, 69, 19, 0.1)), url('/images-home/vintage-paper.jpg')`,
                  backgroundColor: '#fef7ed'
                }}
              >
                <div className="relative z-10 text-center max-w-md">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-2xl border-4 border-amber-300">
                    <img 
                      src={butterfly.image} 
                      alt={butterfly.common_name}
                      className="w-64 h-64 object-cover rounded-lg shadow-lg mb-6 mx-auto border-4 border-white"
                      onError={(e) => {
                        e.target.src = '/images-home/butterfly-placeholder.jpg';
                      }}
                    />
                    
                    <h2 className="text-3xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      {butterfly.common_name}
                    </h2>
                    
                    <div className="border-t-2 border-amber-200 pt-4">
                      <p className="text-sm text-amber-700 font-semibold mb-2 uppercase tracking-wide">
                        Notas de campo:
                      </p>
                      <p className="text-amber-800 italic text-lg leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                        {butterfly.description.length > 100 
                          ? butterfly.description.substring(0, 100) + '...'
                          : butterfly.description
                        }
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Efecto de margen de libro */}
                <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-amber-200/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Página derecha - Información científica */}
            <div className="absolute right-0 top-0 w-1/2 h-full">
              <div className="w-full h-full p-12 bg-gradient-to-br from-amber-50 to-white relative">
                <div className="h-full flex flex-col">
                  
                  {/* Header */}
                  <header className="mb-8">
                    <h1 className="text-4xl font-bold text-amber-900 mb-3" style={{ fontFamily: 'Georgia, serif' }}>
                      Científicos
                    </h1>
                    <div className="h-1 w-24 bg-amber-600 rounded mb-4"></div>
                    
                    {/* Botones de acción */}
                    <div className="flex gap-3">
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors shadow-md"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        <Edit size={16} />
                        {isEditing ? 'Cancelar' : 'Editar'}
                      </button>
                      
                      <button
                        onClick={handleDelete}
                        className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-md"
                        style={{ fontFamily: 'Georgia, serif' }}
                      >
                        <Trash2 size={16} />
                        Eliminar
                      </button>
                    </div>
                  </header>

                  {/* Contenido principal */}
                  <div className="flex-1 space-y-6 overflow-y-auto">
                    
                    {!isEditing ? (
                      // Vista de lectura
                      <>
                        <div className="bg-white/70 p-6 rounded-lg border-2 border-amber-200 shadow-sm">
                          <h3 className="font-bold text-amber-800 text-sm uppercase tracking-wide mb-3">
                            Clasificación Taxonómica
                          </h3>
                          <p className="text-2xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                            {butterfly.common_name}
                          </p>
                          <p className="text-lg text-gray-600 italic" style={{ fontFamily: 'Georgia, serif' }}>
                            {butterfly.scientific_name}
                          </p>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                          <div className="bg-white/70 p-4 rounded-lg border border-amber-200">
                            <h4 className="font-bold text-amber-700 text-sm uppercase tracking-wide mb-2">
                              Locate
                            </h4>
                            <p className="text-gray-800 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                              {butterfly.location}
                            </p>
                          </div>

                          <div className="bg-white/70 p-4 rounded-lg border border-amber-200">
                            <h4 className="font-bold text-amber-700 text-sm uppercase tracking-wide mb-2">
                              Hábitat
                            </h4>
                            <p className="text-gray-800 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                              {butterfly.habitat}
                            </p>
                          </div>

                          <div className="bg-white/70 p-4 rounded-lg border border-amber-200">
                            <h4 className="font-bold text-amber-700 text-sm uppercase tracking-wide mb-2">
                              Comportamiento Migratorio
                            </h4>
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${
                                butterfly.migratory || butterfly.is_migratory ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <p className="text-gray-800 text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                                {butterfly.migratory || butterfly.is_migratory ? 'Migratoria' : 'No migratoria'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white/70 p-6 rounded-lg border border-amber-200">
                          <h4 className="font-bold text-amber-700 text-sm uppercase tracking-wide mb-3">
                            Descripción Científica
                          </h4>
                          <p className="text-gray-800 leading-relaxed text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                            {butterfly.description}
                          </p>
                        </div>
                      </>
                    ) : (
                      // Vista de edición
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nombre Común
                            </label>
                            <input
                              type="text"
                              name="common_name"
                              value={editForm.common_name}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              style={{ fontFamily: 'Georgia, serif' }}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Nombre Científico
                            </label>
                            <input
                              type="text"
                              name="scientific_name"
                              value={editForm.scientific_name}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              style={{ fontFamily: 'Georgia, serif' }}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Ubicación
                            </label>
                            <input
                              type="text"
                              name="location"
                              value={editForm.location}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              style={{ fontFamily: 'Georgia, serif' }}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Hábitat
                            </label>
                            <input
                              type="text"
                              name="habitat"
                              value={editForm.habitat}
                              onChange={handleInputChange}
                              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              style={{ fontFamily: 'Georgia, serif' }}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Descripción
                            </label>
                            <textarea
                              name="description"
                              value={editForm.description}
                              onChange={handleInputChange}
                              rows="3"
                              className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                              style={{ fontFamily: 'Georgia, serif' }}
                            />
                          </div>

                          {/* Upload de imagen con Cloudinary */}
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Imagen
                            </label>
                            
                            {/* Zona de drag and drop */}
                            <div
                              className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                                dragActive 
                                  ? 'border-amber-500 bg-amber-50' 
                                  : 'border-amber-300 bg-amber-25'
                              }`}
                              onDragEnter={handleDrag}
                              onDragLeave={handleDrag}
                              onDragOver={handleDrag}
                              onDrop={handleDrop}
                            >
                              {uploading ? (
                                <div className="flex flex-col items-center">
                                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mb-2"></div>
                                  <p className="text-amber-700">Subiendo imagen...</p>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center">
                                  <Upload size={32} className="text-amber-600 mb-2" />
                                  <p className="text-amber-700 mb-2">
                                    Arrastra una imagen aquí o
                                  </p>
                                  <label className="cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors">
                                    Seleccionar archivo
                                    <input
                                      type="file"
                                      accept="image/*"
                                      onChange={(e) => {
                                        if (e.target.files[0]) {
                                          handleFileUpload(e.target.files[0]);
                                        }
                                      }}
                                      className="hidden"
                                    />
                                  </label>
                                </div>
                              )}
                            </div>

                            {/* URL manual */}
                            <div className="mt-2">
                              <input
                                type="url"
                                name="image"
                                value={editForm.image}
                                onChange={handleInputChange}
                                placeholder="O pega una URL de imagen"
                                className="w-full p-3 border border-amber-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                                style={{ fontFamily: 'Georgia, serif' }}
                              />
                            </div>

                            {/* Preview de la imagen */}
                            {editForm.image && (
                              <div className="mt-3">
                                <img
                                  src={editForm.image}
                                  alt="Preview"
                                  className="w-full h-32 object-cover rounded-lg border border-amber-300"
                                  onError={(e) => {
                                    e.target.src = '/images-home/butterfly-placeholder.jpg';
                                  }}
                                />
                              </div>
                            )}
                          </div>

                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="migratory"
                              checked={editForm.migratory || editForm.is_migratory}
                              onChange={handleInputChange}
                              className="mr-2 w-4 h-4 text-amber-600 bg-gray-100 border-gray-300 rounded focus:ring-amber-500"
                            />
                            <label className="text-sm font-medium text-gray-700">
                              Especie migratoria
                            </label>
                          </div>
                        </div>

                        {/* Botones de guardar/cancelar */}
                        <div className="flex gap-3 pt-4 border-t border-amber-200">
                          <button
                            onClick={handleUpdate}
                            className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
                            style={{ fontFamily: 'Georgia, serif' }}
                          >
                            Guardar Cambios
                          </button>
                          <button
                            onClick={() => {
                              setIsEditing(false);
                              setEditForm(butterfly);
                            }}
                            className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors font-medium"
                            style={{ fontFamily: 'Georgia, serif' }}
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer */}
                  {!isEditing && (
                    <footer className="pt-6 border-t-2 border-amber-200">
                      <div className="text-center">
                        <div className="flex justify-center gap-1 mb-3">
                          {allButterflies.map((_, index) => (
                            <div
                              key={index}
                              className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                                index === currentIndex ? 'bg-amber-600' : 'bg-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-amber-700 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                          Proyecto Nectara - Expedición África 2024
                        </p>
                      </div>
                    </footer>
                  )}
                </div>
                
                {/* Efecto de margen derecho */}
                <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-amber-200/20 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Línea central del libro */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-amber-400 to-transparent transform -translate-x-0.5 z-10"></div>
          </div>

          {/* Sombra del libro */}
          <div className="absolute -bottom-6 left-6 right-6 h-6 bg-black/20 rounded-full blur-lg"></div>
        </div>
      </div>
    </div>
  );
};

export default ButterflyDetail; 

// CUANDO EDITA--> ALERTA DE MARIPOSA GUARDADA (MIRAR BOTÓN DE GUARDAR) USENAVIGATE Y QUE ME REDIRIJA AUTOMÁTICAMENTE A LA GALERÍA DE MARIPOSAS + BOTÓN DE SOFÍA + NAVEGACIÓN??