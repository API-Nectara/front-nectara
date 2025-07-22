import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOneButterfly } from "../services/ButterflyServices";


const ButterflyDetail = () => {
  const { id } = useParams();
  const [butterfly, setButterfly] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("ID recibido:", id); // Esto debe mostrar solo el id
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

  if (loading) return <p>Cargando...</p>;
  if (!butterfly) return <p>No se encontró la mariposa.</p>;

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2>{butterfly.common_name || butterfly.commonName}</h2>
      <img
        src={butterfly.image}
        alt={butterfly.common_name || butterfly.commonName}
        style={{ width: "100%", borderRadius: "12px" }}
      />
      <p><strong>Nombre científico:</strong> {butterfly.scientific_name || butterfly.scientificName}</p>
      <p><strong>Ubicación:</strong> {butterfly.location}</p>
      <p><strong>Hábitat:</strong> {butterfly.habitat}</p>
      <p><strong>Descripción:</strong> {butterfly.description}</p>
      <p><strong>¿Migratoria?:</strong> {butterfly.migratory ?? butterfly.is_migratory ?? butterfly.isMigratory ? "Sí" : "No"}</p>
    </div>
  );
};

export default ButterflyDetail;
