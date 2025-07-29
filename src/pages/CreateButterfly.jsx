import { useState } from "react";
import "./CreateButterfly.css";
import { CreateNewButterfly } from "../services/ButterflyServices";
import { useNavigate } from "react-router-dom";

const progressImages = [
  "/images-form/oruga1.png",
  "/images-form/oruga2.png",
  "/images-form/oruga3.png",
  "/images-form/oruga4.png",
  "/images-form/mariposa1.png",
  "/images-form/mariposa2.png",
  "/images-form/mariposa3.png",
];

const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dauzwfc8z/image/upload";
const CLOUDINARY_PRESET = "mariposas-africa";
const POPUP_DURATION = 10000; // 10 segundos

const migratoryImage = "/images-form/migratoria.png";
const savedImage = "/images-form/guardada1.png";


const CreateButterfly = () => {
  const navigate = useNavigate();
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
  const [isUploading, setIsUploading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showImagePopup, setShowImagePopup] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setIsSaved(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);
    uploadData.append("upload_preset", CLOUDINARY_PRESET);

    try {
      const res = await fetch(CLOUDINARY_URL, {
        method: "POST",
        body: uploadData,
      });
      const data = await res.json();
      setFormData((prev) => ({ ...prev, image: data.secure_url }));
      setErrors((prev) => ({ ...prev, image: null }));
    } catch (err) {
      alert("❌ Error al subir imagen");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleOpenImagePopup = () => {
    setImageUrlInput(formData.image || "");
    setShowImagePopup(true);
  };

  const handleCloseImagePopup = () => {
    setShowImagePopup(false);
  };

  const handleSetImageUrl = () => {
    if (!imageUrlInput.trim()) {
      alert("Introduce una URL válida");
      return;
    }
    setFormData((prev) => ({ ...prev, image: imageUrlInput.trim() }));
    setErrors((prev) => ({ ...prev, image: null }));
    setShowImagePopup(false);
  };

  const handleImageUrlChange = (e) => {
    setImageUrlInput(e.target.value);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.commonName.trim()) newErrors.commonName = "Campo obligatorio";
    if (!formData.scientificName.trim()) newErrors.scientificName = "Campo obligatorio";
    if (!formData.location.trim()) newErrors.location = "Campo obligatorio";
    if (!formData.description.trim()) newErrors.description = "Campo obligatorio";
    if (!formData.image || !formData.image.trim()) newErrors.image = "Campo obligatorio";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const response = await CreateNewButterfly(formData);
    if (response.status === 201) {
      setShowPopup(true);
      setIsSaved(true);

      setTimeout(() => {
        setShowPopup(false);
        navigate("/galery");
      }, POPUP_DURATION);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
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
    navigate("/galery");
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

    currentImage = progressImages[Math.min(filledFieldsCount, progressImages.length - 1)];
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="container">
        {/* Primera columna */}
        <div className="imageContainer">
          <h2 className="title">
            <span>Crear</span>
            <span>Nueva</span>
            <span>Mariposa</span>
          </h2>
          <img src={currentImage} alt="Estado mariposa" className="progressImage" />
        </div>

        {/* Segunda columna: inputs y textarea */}
        <div className="formFields">
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
              placeholder="¿Dónde la encontramos?"
            />
          </label>
        </div>

        {/* Tercera columna: imagen, checkbox, botón */}
        <div className="formOptions">
          <label style={{ fontWeight: 600, color: "#fefdfd" }}>
            Imagen:
            <div className="imageButtons">
              <button
                type="button"
                onClick={() => document.getElementById("imageUploadInput").click()}
                className="saveButton"
                disabled={isUploading}
              >
                {isUploading ? "Subiendo..." : "📁 Seleccionar imagen"}
              </button>

              <button type="button" onClick={handleOpenImagePopup} className="saveButton">
                🌐 Añadir imagen por URL
              </button>
            </div>

            <input
              type="file"
              id="imageUploadInput"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
            {errors.image && <p className="error">{errors.image}</p>}

            {formData.image && (
              <div style={{ marginTop: "1rem" }}>
                <img
                  src={formData.image}
                  alt="Preview"
                  style={{ width: "100%", borderRadius: "8px", objectFit: "cover" }}
                />
                <p style={{ color: "#cdbfbc", fontSize: "0.9rem", marginTop: "0.5rem" }}>
                  ✅ Imagen cargada
                </p>
              </div>
            )}
          </label>

          <div className="checkboxCentered" style={{ marginTop: "1.5rem", color: "#fefdfd" }}>
            <label htmlFor="isMigratory" style={{ fontWeight: 600 }}>
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

          <button type="submit" className="saveButton" style={{ marginTop: "2rem" }}>
            Guardar mariposa
          </button>
        </div>
      </form>

      {/* Popup confirmación */}
      {showPopup && (
        <div className="popupOverlay">
          <div className="popupContent">
            <h3>🦋 ¡Mariposa creada con éxito!</h3>
            <img
              src={savedImage}
              alt="Mariposa guardada"
              style={{ width: "100%", borderRadius: "10px", margin: "1rem 0", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)" }}
            />
            <button onClick={closePopup} className="closeButton">
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Popup para añadir URL imagen */}
      {showImagePopup && (
        <div className="popupOverlay">
          <div className="popupContent">
            <h3>Añade la URL de la imagen</h3>
            <input
              type="text"
              value={imageUrlInput}
              onChange={handleImageUrlChange}
              placeholder="https://ejemplo.com/imagen.jpg"
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleSetImageUrl} className="saveButton">
                Añadir
              </button>
              <button onClick={handleCloseImagePopup} className="cancelButton">
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateButterfly;
