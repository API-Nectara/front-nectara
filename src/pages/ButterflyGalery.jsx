import { useEffect, useState } from "react";
import { getAllButterflies } from "../services/ButterflyServices";

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

  return (
    <div className="p-6 bg-[#fdf9f6] min-h-screen">
      <h2 className="text-4xl font-bold text-center mb-10 text-[#1b4857]">Galería de Mariposas</h2>

      {loading ? (
        <p className="text-center text-lg text-gray-600">Cargando mariposas...</p>
      ) : butterflies.length === 0 ? (
        <p className="text-center text-lg text-gray-600">No hay mariposas registradas.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {butterflies.map((butterfly) => (
            <div
              key={butterfly.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold text-[#e66035] mb-2">
                {butterfly.name}
              </h3>
              <p className="text-gray-700 text-sm">{butterfly.description}</p>
              {/* Agrega más detalles si tu objeto butterfly tiene imagen, especie, etc */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButterflyGalery;
