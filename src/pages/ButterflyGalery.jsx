import { useEffect, useState } from "react";
import { getAllButterflies } from "../services/ButterflyServices";
import { Link } from "react-router-dom";

const ButterflyGalery = () => {
  const [butterflies, setButterflies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchButterflies = async () => {
      try {
        const data = await getAllButterflies();
        setButterflies(data);
      } catch (error) {
        console.error("Error al cargar las mariposas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchButterflies();
  }, []);
  

 /* return (
    <div className="p-6 bg-[#fdf9f6] min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#a73624]">Galería de Mariposas</h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Cargando mariposas...</p>
      ) : butterflies.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No hay mariposas registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {butterflies.map((butterfly) => (
            <div
              key={butterfly.id}
              className="bg-white shadow-md rounded-lg overflow-hidden border border-[#ddd] hover:shadow-lg transition"
            >
              {butterfly.image && (
                <img
                  src={butterfly.image}
                  alt={butterfly.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#e66035] mb-2">{butterfly.name}</h3>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{butterfly.description}</p>
                
                <Link
                  to={`/butterflydetail/${butterfly.id}`}
                  className="inline-block bg-[#e66035] hover:bg-[#cf3b17] text-white px-4 py-2 rounded-md text-sm font-semibold transition"
                >
                  Ver Detalle
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};*/
return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50" style={{backgroundColor: '#fdf9f6'}}>
      {/* Header con gradiente y efectos */}
      <div className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-teal-700/10" style={{background: 'linear-gradient(to right, #c61e0f15, #216b8115)'}}></div>
        <div className="relative text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{background: 'linear-gradient(to right, #c61e0f, #eb391d, #e66035)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
            Galería de Mariposas
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{color: '#1b4857'}}>
            Descubre la belleza y diversidad del mundo de las mariposas
          </p>
        </div>
      </div>

      <div className="px-6 pb-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 rounded-full animate-spin" style={{borderColor: '#cdbfbc', borderTopColor: '#e66035'}}></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent rounded-full animate-spin animate-reverse" style={{borderRightColor: '#eb391d'}}></div>
            </div>
            <p className="text-xl mt-6 animate-pulse" style={{color: '#1b4857'}}>Cargando mariposas mágicas...</p>
          </div>
        ) : butterflies.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🦋</div>
            <p className="text-xl" style={{color: '#1b4857'}}>No hay mariposas registradas.</p>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {butterflies.map((butterfly, index) => (
                <div
                  key={butterfly.id}
                  className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 rounded-2xl"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    backgroundColor: '#ffffff',
                    border: '1px solid #cdbfbc40'
                  }}
                >
                  {/* Efecto de brillo en hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  
                  {/* Contenedor de imagen */}
                  <div className="relative overflow-hidden h-48">
                    {butterfly.image && (
                      <img
                        src={butterfly.image}
                        alt={butterfly.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    )}
                    
                    {/* Overlay gradiente */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{background: 'linear-gradient(to top, #0a181880, transparent)'}}></div>
                    
                    {/* Efecto de mariposa flotante */}
                    <div className="absolute top-3 right-3 text-2xl opacity-60 group-hover:opacity-100 transition-all duration-300 group-hover:animate-bounce">
                      🦋
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="p-6 relative">
                    <h3 className="text-xl font-bold mb-3 transition-colors duration-300" style={{color: '#0a1818'}} onMouseEnter={(e) => e.target.style.color = '#e66035'} onMouseLeave={(e) => e.target.style.color = '#0a1818'}>
                      {butterfly.common_name}
                    </h3>
                    
                    <p className="text-sm mb-4 line-clamp-3 leading-relaxed" style={{color: '#1b4857'}}>
                      {butterfly.description}
                    </p>
                    
                    {/* Link */}
                    <Link
                  to={`/butterflydetail/${butterfly.id}`}
                  className="butterfly-button"
                >
                  Ver Detalle
                </Link>
                  </div>
                  
                  {/* Borde decorativo */}
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{background: 'linear-gradient(135deg, #e6603520, #216b8120, #eb391d20)'}}></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Elementos decorativos de fondo */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#e6603510'}}></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#216b8110', animationDelay: '2s'}}></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full blur-3xl animate-pulse" style={{backgroundColor: '#82939d10', animationDelay: '4s'}}></div>
      </div>
    </div>
  );
};

export default ButterflyGalery;
