import { useEffect, useState } from "react";
import { getAllButterflies } from "../services/ButterflyServices";
import { Link, useNavigate } from "react-router-dom";

const ButterflyGalery = () => {
  const navigate = useNavigate();
  const [butterflies, setButterflies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchButterflies = async () => {
      try {
        setLoading(true);
        const data = await getAllButterflies();
        setButterflies(data);
        setError(null);
      } catch (error) {
        console.error("Error al cargar las mariposas:", error);
        setError('No se puede conectar con el servidor. ¿Está json-server corriendo?');
      } finally {
        setLoading(false);
      }
    };

    fetchButterflies();
  }, []);

  const handleCreateNew = () => {
    navigate('/newbutterfly');
  };

  // Función para obtener el nombre común (múltiples formatos)
  const getCommonName = (butterfly) => {
    return butterfly.common_name || butterfly.commonName || 'Mariposa sin nombre';
  };

  // Función para obtener el nombre científico (múltiples formatos)
  const getScientificName = (butterfly) => {
    return butterfly.scientific_name || butterfly.scientificName || 'Sin clasificar';
  };

  // Función para verificar si es migratoria (múltiples formatos)
  const isMigratory = (butterfly) => {
    return butterfly.migratory ?? butterfly.is_migratory ?? butterfly.isMigratory ?? false;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-200 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-500 border-t-transparent mb-4"></div>
          <div className="text-2xl text-stone-700" style={{ fontFamily: 'Georgia, serif' }}>
            Cargando colección de mariposas...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-200 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl border-2 border-red-300 p-8 text-center max-w-lg transform rotate-1">
          <div className="text-6xl mb-4">🚫</div>
          <h2 className="text-2xl text-red-800 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
            Error de Conexión
          </h2>
          <p className="text-red-600 mb-6 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
            {error}
          </p>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
            <h3 className="font-semibold text-red-800 mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              💡 Para solucionarlo:
            </h3>
            <ol className="text-left text-red-700 text-sm space-y-1" style={{ fontFamily: 'Georgia, serif' }}>
              <li>1. Abre una terminal en tu proyecto</li>
              <li>2. Ejecuta: <code className="bg-red-100 px-2 py-1 rounded">npx json-server --watch server/db.json --port 3001</code></li>
              <li>3. Recarga esta página</li>
            </ol>
          </div>
          
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            style={{ fontFamily: 'Georgia, serif' }}
          >
            🔄 Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-100 via-neutral-50 to-stone-200 p-4">
      {/* Header de la galería */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-lg shadow-xl border-2 border-stone-300 p-6 transform -rotate-1">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h1 className="text-4xl lg:text-5xl font-bold text-stone-800 tracking-wide mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                Galería de Mariposas Africanas
              </h1>
              <p className="text-stone-600 italic text-lg" style={{ fontFamily: 'Georgia, serif' }}>
                Colección digital del proyecto Nectara - {butterflies.length} especies registradas
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-6xl animate-bounce">🦋</div>
              <button
                onClick={handleCreateNew}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-600 transform hover:scale-105 transition-all duration-200"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                <div className="flex items-center space-x-2">
                  <span>➕</span>
                  <span>Nueva Mariposa</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Grid de mariposas */}
      <div className="max-w-7xl mx-auto">
        {butterflies.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg shadow-lg border-2 border-stone-300 p-8 transform rotate-2 max-w-md mx-auto">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl text-stone-700 mb-4" style={{ fontFamily: 'Georgia, serif' }}>
                No hay mariposas registradas
              </h3>
              <p className="text-stone-600 mb-6" style={{ fontFamily: 'Georgia, serif' }}>
                ¡Sé el primero en añadir una mariposa a la colección!
              </p>
              <button
                onClick={handleCreateNew}
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
                style={{ fontFamily: 'Georgia, serif' }}
              >
                Registrar primera mariposa
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {butterflies.map((butterfly, index) => {
              const migratory = isMigratory(butterfly);
              const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2', 'rotate-0'];
              const borderColors = ['border-stone-400', 'border-neutral-400', 'border-stone-500', 'border-neutral-300'];
              
              return (
                <Link
                  key={butterfly.id}
                  to={`/butterflydetail/${butterfly.id}`}
                  className={`group block transform ${rotations[index % rotations.length]} hover:rotate-0 hover:scale-105 transition-all duration-300`}
                >
                  <div className={`bg-white rounded-lg shadow-xl border-2 ${borderColors[index % borderColors.length]} overflow-hidden hover:shadow-2xl transition-all duration-300`}>
                    {/* Imagen */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={butterfly.image}
                        alt={getCommonName(butterfly)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter contrast-[1.05] saturate-[0.9]"
                        onError={(e) => {
                          e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect width='300' height='200' fill='%23f5f5f4'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23525252' font-size='16'%3E🦋 Imagen no disponible%3C/text%3E%3C/svg%3E";
                        }}
                      />
                      
                      {/* Badge migratoria */}
                      {migratory && (
                        <div className="absolute top-2 right-2">
                          <div className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs shadow-lg transform rotate-12" style={{ fontFamily: 'Georgia, serif' }}>
                            🛫 Migratoria
                          </div>
                        </div>
                      )}

                      {/* Overlay vintage */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>

                    {/* Contenido */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-stone-800 mb-1 group-hover:text-stone-600 transition-colors" style={{ fontFamily: 'Georgia, serif' }}>
                        {getCommonName(butterfly)}
                      </h3>
                      
                      <p className="text-sm text-stone-600 italic mb-2" style={{ fontFamily: 'Georgia, serif' }}>
                        {getScientificName(butterfly)}
                      </p>
                      
                      <div className="flex items-center text-xs text-stone-500 mb-3">
                        <span className="mr-1">📍</span>
                        <span className="truncate" style={{ fontFamily: 'Georgia, serif' }}>
                          {butterfly.location}
                        </span>
                      </div>

                      <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed" style={{ fontFamily: 'Georgia, serif' }}>
                        {butterfly.description}
                      </p>

                      {/* Tags decorativos */}
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center space-x-1 text-xs">
                          <span className="bg-stone-100 text-stone-700 px-2 py-1 rounded-full border border-stone-200" style={{ fontFamily: 'Georgia, serif' }}>
                            {butterfly.habitat}
                          </span>
                        </div>
                        
                        <div className="text-stone-400 group-hover:text-stone-600 transition-colors">
                          <span className="text-lg">📖</span>
                        </div>
                      </div>
                    </div>

                    {/* Elementos decorativos vintage */}
                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-neutral-200 transform rotate-45 opacity-80 shadow-lg border border-stone-300"></div>
                    <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-stone-200 transform rotate-12 opacity-70 shadow-md border border-stone-300"></div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer decorativo */}
      <div className="max-w-7xl mx-auto mt-16 text-center">
        <div className="inline-block bg-white rounded-full px-8 py-3 shadow-lg border border-stone-300 transform -rotate-2">
          <p className="text-stone-600 italic" style={{ fontFamily: 'Georgia, serif' }}>
            Conservando la biodiversidad africana - Un registro a la vez 🌍
          </p>
        </div>
      </div>
    </div>
  );
};

export default ButterflyGalery;