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

  // Función que actualiza el estado cuando cambia cualquier input o checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      // Si es checkbox, usamos checked, si no, el value del input
      [name]: type === "checkbox" ? checked : value,
    }));

    // Si hay cambios, indicamos que aún no se ha guardado
    setIsSaved(false);
  };

  // Función que valida los campos obligatorios y devuelve errores
  const validate = () => {
    const newErrors = {};

    // Si algún campo obligatorio está vacío, añadimos mensaje de error
    if (!formData.commonName.trim()) newErrors.commonName = "Campo obligatorio";
    if (!formData.scientificName.trim()) newErrors.scientificName = "Campo obligatorio";
    if (!formData.location.trim()) newErrors.location = "Campo obligatorio";
    if (!formData.description.trim()) newErrors.description = "Campo obligatorio";
    if (!formData.image.trim()) newErrors.image = "Campo obligatorio";

    return newErrors;
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validamos y guardamos errores si los hay
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Enviamos los datos al backend con fetch (POST JSON)
      const res = await fetch("http://localhost:3001/butterfly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      // Si la respuesta no es ok, lanzamos error
      if (!res.ok) throw new Error("Error al enviar datos");

      // Mostramos mensaje de éxito
      alert("🦋 ¡Mariposa creada con éxito!");
      setIsSaved(true);

      // Limpiamos formulario y errores
      setFormData({
        commonName: "",
        scientificName: "",
        location: "",
        description: "",
        habitat: "",
        image: "",
        isMigratory: false,
      });
      setErrors({});
    } catch (error) {
      // En caso de error, mostramos alerta y lo logueamos en consola
      alert("⚠️ Error al guardar la mariposa");
      console.error(error);
    }
  };

   // Variable para controlar qué imagen mostrar según el estado del formulario
  let currentImage = null;

  if (isSaved) {
    // Si ya se guardó, mostramos imagen de éxito
    currentImage = savedImage;
  } else if (formData.isMigratory) {
    // Si es migratoria, mostramos la imagen migratoria
    currentImage = migratoryImage;
  } else {
    // Contamos cuántos campos tiene rellenos para mostrar progreso
    const filledFieldsCount = [
      formData.commonName,
      formData.scientificName,
      formData.location,
      formData.description,
      formData.habitat,
      formData.image,
    ].filter(Boolean).length;

    // Mostramos la imagen de progreso correspondiente (máximo la última)
    currentImage = progressImages[
      Math.min(filledFieldsCount, progressImages.length - 1)
    ];
  }

  return (
    <div className="container">
      <div className="imageContainer">
        {/* Título dividido en 3 líneas */}
        <h2 className="title">
          <span>Crear</span>
          <span>Nueva</span>
          <span>Mariposa</span>
        </h2>

        {/* Imagen que muestra el estado según el formulario */}
        <img src={currentImage} alt="Estado mariposa" className="progressImage" />
      </div>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="form">
        <label>
          Nombre común:
          <input
            type="text"
            name="commonName"
            value={formData.commonName}
            onChange={handleChange}
            placeholder="Ej: Mariposa Reina Africana"
          />
          {errors.commonName && <p className="error">{errors.commonName}</p>}
        </label>

        <label>
          Nombre científico:
          <input
            type="text"
            name="scientificName"
            value={formData.scientificName}
            onChange={handleChange}
            placeholder="Ej: Danaus chrysippus"
          />
          {errors.scientificName && <p className="error">{errors.scientificName}</p>}
        </label>

        <label>
          Ubicación:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Ej: África Oriental"
          />
          {errors.location && <p className="error">{errors.location}</p>}
        </label>

        <label>
          Descripción:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Colores y características"
            rows={3}
          />
          {errors.description && <p className="error">{errors.description}</p>}
        </label>

        <label>
          Hábitat:
          <input
            type="text"
            name="habitat"
            value={formData.habitat}
            onChange={handleChange}
            placeholder="Dónde la encontramos"
          />
        </label>

        <label>
          Imagen (URL):
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://..."
          />
          {errors.image && <p className="error">{errors.image}</p>}
        </label>

        <div className="checkboxCentered">
          <label htmlFor="isMigratory">
            ¿Es migratoria?
          </label>
          <input
            type="checkbox"
            id="isMigratory"
            name="isMigratory"
            checked={formData.isMigratory}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="saveButton">
          Guardar mariposa
        </button>
      </form>
    </div>
  );
};

export default CreateButterfly;