import { useState } from "react";
import "./CreateButterfly.css";

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

const CreateButterfly = () => {
  const [formData, setFormData] = useState({
    commonName: "",
    scientificName: "",
    location: "",
    description: "",
    habitat: "",
    image: "",
    isMigratory: false,
  });

  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsSaved(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.commonName.trim()) newErrors.commonName = "Campo obligatorio";
    if (!formData.scientificName.trim()) newErrors.scientificName = "Campo obligatorio";
    if (!formData.location.trim()) newErrors.location = "Campo obligatorio";
    if (!formData.description.trim()) newErrors.description = "Campo obligatorio";
    if (!formData.image.trim()) newErrors.image = "Campo obligatorio";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await fetch('/butterflies', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al enviar datos");

      alert("🦋 ¡Mariposa creada con éxito!");
      setIsSaved(true);

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
      alert("⚠️ Error al guardar la mariposa");
      console.error(error);
    }
  };

  let currentImage = null;

  if (isSaved) {
    currentImage = savedImage;
  } else if (formData.isMigratory) {
    currentImage = migratoryImage;
  } else {
    const filledFieldsCount = [
      formData.commonName,
      formData.scientificName,
      formData.location,
      formData.description,
      formData.habitat,
      formData.image,
    ].filter(Boolean).length;

    currentImage = progressImages[
      Math.min(filledFieldsCount, progressImages.length - 1)
    ];
  }

  return (
    <div className="cb-container">
      <div className="cb-imageContainer">
        <h2 className="cb-title">
          <span>Crear</span>
          <span>Nueva</span>
          <span>Mariposa</span>
        </h2>

        <img src={currentImage} alt="Estado mariposa" className="cb-progressImage" />
      </div>

      <form onSubmit={handleSubmit} className="cb-form">
        <label>
          Nombre común:
          <input
            type="text"
            name="commonName"
            value={formData.commonName}
            onChange={handleChange}
            placeholder="Ej: Mariposa Reina Africana"
          />
          {errors.commonName && <p className="cb-error">{errors.commonName}</p>}
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
          {errors.scientificName && <p className="cb-error">{errors.scientificName}</p>}
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
            placeholder="¿Dónde la encontramos?"
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
          {errors.image && <p className="cb-error">{errors.image}</p>}
        </label>

        <div className="cb-checkboxCentered">
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

        <button type="submit" className="cb-saveButton">
          Guardar mariposa
        </button>
      </form>
    </div>
  );
};

export default CreateButterfly;
