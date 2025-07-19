import { useState } from "react";
import "./CreateButterfly.css";

// Array con las imágenes que muestran el progreso según campos rellenados
const progressImages = [
  "/images-form/oruga1.png",
  "/images-form/oruga2.png",
  "/images-form/oruga3.png",
  "/images-form/oruga4.png",
  "/images-form/mariposa1.png",
  "/images-form/mariposa2.png",
  "/images-form/mariposa3.png",
];

const migratoryImage = "/images-form/migratoria.png";
const savedImage = "/images-form/guardada1.png";

// Componente principal para crear una mariposa
const CreateButterfly = () => {
  // Estado para almacenar los datos del formulario
  const [formData, setFormData] = useState({
    commonName: "",      
    scientificName: "",  
    location: "",        
    description: "",     
    habitat: "",         
    image: "",           
    isMigratory: false,  
  });

    // Estado para almacenar posibles errores de validación en el formulario
  const [errors, setErrors] = useState({});

  // Estado para indicar si la mariposa ya se ha guardado correctamente
  const [isSaved, setIsSaved] = useState(false);