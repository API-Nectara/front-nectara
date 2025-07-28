import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOneButterfly, deleteButterfly } from "../services/ButterflyServices";
import HTMLFlipBook from "react-pageflip";

const ButterflyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [butterfly, setButterfly] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const flipBookRef = useRef();

  useEffect(() => {
    const fetchButterfly = async () => {
      try {
        const data = await getOneButterfly(id);
        setButterfly(data);
      } catch (error) {
        console.error("Error al obtener los detalles de la mariposa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchButterfly();
  }, [id]);

  const handleBackToGallery = () => {
    navigate('/galery');
  };

  const handleEdit = () => {
    navigate(`/editbutterfly/${id}`);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deleteButterfly(id);
      setTimeout(() => {
        navigate('/galery');
      }, 1500);
    } catch (error) {
      console.error('Error al eliminar la mariposa:', error);
      setDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const confirmDelete = () => {
    setShowDeleteConfirm(true);
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const nextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext();
    }
  };

  const prevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-500 border-t-transparent mb-4"></div>
          <div className="text-2xl text-stone-700 font-serif">Preparando cuaderno de campo...</div>
        </div>
      </div>
    );
  }

  if (!butterfly) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl border-2 border-stone-300 p-8 text-center max-w-md transform rotate-1">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-serif text-stone-800 mb-4">Registro no encontrado</h2>
          <p className="text-stone-600 mb-4">No se encontraron datos de la mariposa solicitada.</p>
          <button 
            onClick={handleBackToGallery}
            className="bg-stone-600 text-white px-6 py-2 rounded-lg hover:bg-stone-700 transition-colors"
          >
            Volver a la galería
          </button>
        </div>
      </div>
    );
  }

  const butterflyData = {
    commonName: butterfly.common_name || butterfly.commonName || "Mariposa Africana",
    scientificName: butterfly.scientific_name || butterfly.scientificName || "Lepidoptera sp.",
    location: butterfly.location || "África",
    habitat: butterfly.habitat || "Bosque tropical",
    description: butterfly.description || "Una hermosa mariposa africana con características únicas.",
    migratory: butterfly.migratory ?? butterfly.is_migratory ?? butterfly.isMigratory ?? false,
    image: butterfly.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='192'%3E%3Crect width='256' height='192' fill='%23f5f5f4'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23525252' font-size='14'%3EImagen no disponible%3C/text%3E%3C/svg%3E",
    dateCaptured: butterfly.date_captured || butterfly.dateCaptured || new Date().toLocaleDateString('es-ES'),
    notes: butterfly.notes || butterfly.description || "Observaciones de campo"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-200 p-4">
      <style jsx>{`
        .flip-book {
          margin: 0 auto;
          background: linear-gradient(135deg, #8B7355, #A0956B, #8B7355);
          border-radius: 15px;
          box-shadow: 
            0 20px 40px rgba(0,0,0,0.3),
            inset 0 0 30px rgba(139, 115, 85, 0.2);
          padding: 8px;
        }

        .page {
          background: linear-gradient(135deg, #FFFFFE, #FEFCF8, #FFFFFE);
          border-radius: 10px;
          box-shadow: 
            inset 0 0 20px rgba(120, 113, 108, 0.08),
            0 2px 10px rgba(0,0,0,0.05);
          overflow: hidden;
          position: relative;
          border: 1px solid rgba(120, 113, 108, 0.1);
        }

        .page::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 25px;
          background: repeating-linear-gradient(
            to bottom,
            transparent,
            transparent 28px,
            rgba(168, 162, 158, 0.15) 29px,
            rgba(168, 162, 158, 0.15) 30px,
            transparent 31px
          );
          z-index: 1;
        }

        .page-content {
          position: relative;
          z-index: 2;
          height: 100%;
          padding: 40px;
          color: #44403c;
        }

        .deleting-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .book-container {
          filter: drop-shadow(0 15px 35px rgba(0,0,0,0.25));
        }

        /* Vintage paper texture */
        .vintage-paper {
          background-image: 
            radial-gradient(circle at 20% 50%, rgba(168, 162, 158, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(168, 162, 158, 0.03) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(168, 162, 158, 0.03) 0%, transparent 50%);
        }

        /* Decorative elements */
        .ornament {
          position: relative;
        }
        
        .ornament::before,
        .ornament::after {
          content: '❦';
          position: absolute;
          color: rgba(168, 162, 158, 0.3);
          font-size: 16px;
        }
        
        .ornament::before {
          left: -30px;
          top: 50%;
          transform: translateY(-50%);
        }
        
        .ornament::after {
          right: -30px;
          top: 50%;
          transform: translateY(-50%);
        }
      `}</style>

      {/* Overlay de eliminación */}
      {deleting && (
        <div className="deleting-overlay">
          <div className="bg-white rounded-lg shadow-xl border-2 border-red-300 p-8 text-center max-w-md transform rotate-2">
            <div className="text-6xl mb-4">🗑️</div>
            <h2 className="text-2xl font-serif text-red-800 mb-4">Eliminando registro...</h2>
            <div className="w-full bg-red-100 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full animate-pulse w-full"></div>
            </div>
            <p className="text-sm text-red-600 mt-2">Redirigiendo a la galería...</p>
          </div>
        </div>
      )}

      {/* Modal de confirmación de eliminación */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl border-2 border-stone-300 p-8 max-w-md mx-4 transform -rotate-1">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-2xl font-serif text-stone-800 mb-4">
                ¿Eliminar registro?
              </h3>
              <p className="text-stone-600 mb-6 leading-relaxed">
                Esta acción <strong>no se puede deshacer</strong>. ¿Estás seguro de que quieres eliminar 
                permanentemente el registro de <em>"{butterflyData.commonName}"</em>?
              </p>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={cancelDelete}
                  className="px-6 py-3 text-stone-600 border-2 border-stone-300 rounded-lg hover:bg-stone-50 transition-colors font-serif"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-serif shadow-lg"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumb */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="bg-white rounded-lg shadow-md border border-stone-200 p-4 transform rotate-1 vintage-paper">
          <nav className="flex items-center space-x-2 text-sm text-stone-600 font-serif">
            <button
              onClick={handleBackToGallery}
              className="flex items-center space-x-1 hover:text-stone-800 transition-colors"
            >
              <span>🏠</span>
              <span>Galería</span>
            </button>
            <span>〉</span>
            <span className="text-stone-800 font-medium">
              📖 {butterflyData.commonName}
            </span>
          </nav>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="max-w-6xl mx-auto mb-8 flex justify-end space-x-4">
        <button
          onClick={handleEdit}
          className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg font-serif shadow-lg hover:from-blue-600 hover:to-blue-700 transform hover:scale-105 transition-all duration-200"
        >
          <span>✏️</span>
          <span>Editar</span>
        </button>

        <button
          onClick={confirmDelete}
          className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 rounded-lg font-serif shadow-lg hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-200"
        >
          <span>🗑️</span>
          <span>Eliminar</span>
        </button>
      </div>

      {/* Libro con React Page Flip */}
      <div className="max-w-6xl mx-auto flex justify-center book-container">
        <HTMLFlipBook
          ref={flipBookRef}
          width={480}
          height={680}
          size="stretch"
          minWidth={320}
          maxWidth={1000}
          minHeight={420}
          maxHeight={1400}
          maxShadowOpacity={0.4}
          showCover={true}
          mobileScrollSupport={false}
          className="flip-book"
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={false}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={30}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Portada */}
          <div className="page vintage-paper">
            <div className="page-content flex flex-col justify-center items-center text-center">
              <div className="mb-12">
                <div className="mb-6">
                  <div className="text-6xl mb-4">🦋</div>
                </div>
                
                <h1 className="text-5xl font-serif text-stone-800 mb-6 tracking-wide ornament">
                  NECTARA
                </h1>
                
                <div className="w-32 h-px bg-stone-400 mx-auto mb-8 relative">
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-stone-400 rotate-45"></div>
                </div>
                
                <p className="text-xl text-stone-600 font-serif mb-8 italic">
                  Cuaderno de Campo Digital
                </p>
                
                <div className="text-base text-stone-500 font-serif">
                  Polinizadores de África
                </div>
                
                <div className="mt-12 text-sm text-stone-400 font-serif">
                  Registro Nº {id}
                </div>
              </div>
              
              <div className="mt-8 p-6 bg-stone-50 rounded-lg border border-stone-200 shadow-inner">
                <p className="text-stone-600 font-serif italic text-sm leading-relaxed">
                  "Haz clic en las esquinas de las páginas<br/>
                  o arrastra para explorar este registro"
                </p>
              </div>
            </div>
          </div>

          {/* Página 1 - Imagen y nombre */}
          <div className="page vintage-paper">
            <div className="page-content">
              <div className="text-center mb-8">
                <h2 className="text-4xl font-serif text-stone-800 mb-2 ornament">
                  {butterflyData.commonName}
                </h2>
                <p className="text-lg font-serif text-stone-500 italic">
                  {butterflyData.scientificName}
                </p>
              </div>
              
              <div className="flex justify-center mb-10">
                <div className="bg-white p-6 rounded-lg shadow-lg border border-stone-200 transform rotate-1">
                  <div className="bg-gradient-to-br from-stone-50 to-neutral-100 p-6 rounded-lg">
                    <img
                      src={butterflyData.image}
                      alt={butterflyData.commonName}
                      className="w-72 h-56 object-cover mx-auto rounded-lg shadow-md filter contrast-[1.05] saturate-[0.9]"
                      onError={(e) => {
                        console.log('Error cargando imagen:', butterflyData.image);
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-stone-50 p-6 rounded-lg shadow-inner border border-stone-200">
                <h3 className="text-xl font-serif text-stone-800 mb-4 text-center ornament">
                  Notas de Campo
                </h3>
                <p className="text-stone-600 italic text-center leading-relaxed font-serif">
                  "{butterflyData.notes}"
                </p>
                <div className="mt-4 text-center">
                  <span className="text-stone-400 text-sm">✦ ✦ ✦</span>
                </div>
              </div>
            </div>
          </div>

          {/* Página 2 - Datos científicos */}
          <div className="page vintage-paper">
            <div className="page-content">
              <h2 className="text-3xl font-serif text-stone-800 mb-8 text-center ornament">
                Datos Científicos
              </h2>
              
              <div className="space-y-5">
                <div className="flex items-center space-x-4 p-5 bg-white/70 rounded-lg border border-stone-200 shadow-sm">
                  <span className="text-2xl">📍</span>
                  <div>
                    <span className="font-semibold text-lg text-stone-800 font-serif">Ubicación</span>
                    <p className="mt-1 text-stone-600">{butterflyData.location}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-5 bg-white/70 rounded-lg border border-stone-200 shadow-sm">
                  <span className="text-2xl">📅</span>
                  <div>
                    <span className="font-semibold text-lg text-stone-800 font-serif">Fecha de Registro</span>
                    <p className="mt-1 text-stone-600">{butterflyData.dateCaptured}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-5 bg-white/70 rounded-lg border border-stone-200 shadow-sm">
                  <span className="text-2xl">🌿</span>
                  <div>
                    <span className="font-semibold text-lg text-stone-800 font-serif">Hábitat</span>
                    <p className="mt-1 text-stone-600">{butterflyData.habitat}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 p-5 bg-white/70 rounded-lg border border-stone-200 shadow-sm">
                  <span className="text-2xl">🦋</span>
                  <div>
                    <span className="font-semibold text-lg text-stone-800 font-serif">Comportamiento</span>
                    <p className="mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        butterflyData.migratory 
                          ? 'bg-blue-100 text-blue-800 border border-blue-200' 
                          : 'bg-stone-100 text-stone-800 border border-stone-200'
                      }`}>
                        {butterflyData.migratory ? "Especie Migratoria" : "Especie Sedentaria"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="p-5 bg-stone-50 rounded-lg border border-stone-200 shadow-inner">
                  <h4 className="font-semibold text-lg text-stone-800 font-serif mb-3">📝 Descripción</h4>
                  <p className="text-stone-600 leading-relaxed italic">"{butterflyData.description}"</p>
                </div>
              </div>
            </div>
          </div>

          {/* Página 3 - Información detallada */}
          <div className="page vintage-paper">
            <div className="page-content">
              <h2 className="text-3xl font-serif text-stone-800 mb-8 text-center ornament">
                Información Detallada
              </h2>
              
              <div className="space-y-6">
                <div className="p-5 bg-white/80 rounded-lg border border-stone-200 shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-stone-800 font-serif">Clasificación Taxonómica</h4>
                  <p className="text-stone-600 italic text-xl mb-2">{butterflyData.scientificName}</p>
                  <p className="text-stone-500 text-sm">Nombre común: {butterflyData.commonName}</p>
                </div>
                
                <div className="p-5 bg-white/80 rounded-lg border border-stone-200 shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-stone-800 font-serif">Ecosistema y Distribución</h4>
                  <p className="text-stone-600 mb-2"><strong>Región:</strong> {butterflyData.location}</p>
                  <p className="text-stone-600"><strong>Hábitat preferido:</strong> {butterflyData.habitat}</p>
                </div>
                
                <div className="p-5 bg-white/80 rounded-lg border border-stone-200 shadow-sm">
                  <h4 className="font-semibold text-lg mb-3 text-stone-800 font-serif">Patrones de Comportamiento</h4>
                  <p className="text-stone-600 leading-relaxed text-sm">
                    {butterflyData.migratory 
                      ? "Esta especie presenta patrones migratorios estacionales, desplazándose en busca de recursos óptimos y condiciones climáticas favorables. Sus rutas migratorias son vitales para la polinización cruzada de especies vegetales distribuidas en diferentes regiones."
                      : "Especie con comportamiento sedentario que mantiene poblaciones estables en su área de distribución. Su presencia constante la convierte en un polinizador fundamental para el mantenimiento del equilibrio ecológico local."
                    }
                  </p>
                </div>

                <div className="p-5 bg-stone-50 rounded-lg border border-stone-200 shadow-inner">
                  <div className="bg-gradient-to-br from-blue-50 to-green-50 h-20 rounded-lg flex items-center justify-center border border-stone-200">
                    <div className="text-center text-stone-500">
                      <div className="text-2xl mb-1">🗺️</div>
                      <p className="text-xs font-serif">Área de distribución: {butterflyData.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Página 4 - Registro final */}
          <div className="page vintage-paper">
            <div className="page-content">
              <h2 className="text-3xl font-serif text-stone-800 mb-8 text-center ornament">
                Registro de Campo
              </h2>
              
              <div className="space-y-5">
                <div className="p-5 bg-white rounded-lg shadow-md border border-stone-200">
                  <h4 className="font-semibold text-lg mb-2 text-stone-800 font-serif">
                    📅 Fecha de Observación
                  </h4>
                  <p className="text-xl text-stone-600">{butterflyData.dateCaptured}</p>
                </div>
                
                <div className="p-5 bg-white rounded-lg shadow-md border border-stone-200">
                  <h4 className="font-semibold text-lg mb-2 text-stone-800 font-serif">
                    🌿 Condiciones Ambientales
                  </h4>
                  <p className="text-stone-600">{butterflyData.habitat}</p>
                </div>
                
                <div className="p-5 bg-white rounded-lg shadow-md border border-stone-200">
                  <h4 className="font-semibold text-lg mb-2 text-stone-800 font-serif">
                    📝 Observaciones del Investigador
                  </h4>
                  <p className="text-stone-600 italic leading-relaxed">"{butterflyData.notes}"</p>
                </div>

                <div className="p-5 bg-white rounded-lg shadow-md border border-stone-200">
                  <h4 className="font-semibold text-lg mb-2 text-stone-800 font-serif">
                    🔢 Número de Registro
                  </h4>
                  <p className="font-mono text-3xl text-stone-700">#{id}</p>
                </div>

                <div className="p-5 bg-gradient-to-r from-stone-100 to-neutral-100 rounded-lg border-l-4 border-stone-400 shadow-md">
                  <h4 className="font-semibold text-lg mb-3 text-stone-800 font-serif">
                    🌍 Proyecto Nectara
                  </h4>
                  <p className="text-sm leading-relaxed text-stone-600">
                    Este espécimen forma parte del catálogo digital de polinizadores africanos, 
                    contribuyendo al esfuerzo internacional de conservación y estudio de la biodiversidad. 
                    Cada registro documenta patrones de distribución, comportamiento y características 
                    morfológicas esenciales para la comprensión de estos organismos fundamentales 
                    en nuestros ecosistemas.
                  </p>
                  
                  <div className="mt-4 text-center">
                    <span className="text-stone-400 text-lg">❦ ❦ ❦</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HTMLFlipBook>
      </div>

      {/* Controles de navegación */}
      <div className="max-w-6xl mx-auto mt-12 flex justify-center">
        <div className="flex items-center space-x-8">
          <button
            onClick={prevPage}
            className="group relative px-8 py-4 bg-stone-600 hover:bg-stone-700 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 font-serif"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">←</span>
              <span className="font-medium">Página Anterior</span>
            </div>
          </button>

          <div className="bg-white/90 backdrop-blur-sm px-8 py-4 rounded-lg shadow-lg border border-stone-200 vintage-paper">
            <span className="text-stone-700 font-serif font-medium text-center block">
              Arrastra las esquinas o usa los controles
            </span>
          </div>

          <button
            onClick={nextPage}
            className="group relative px-8 py-4 bg-stone-600 hover:bg-stone-700 text-white rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 font-serif"
          >
            <div className="flex items-center space-x-3">
              <span className="font-medium">Siguiente Página</span>
              <span className="text-lg">→</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ButterflyDetail;