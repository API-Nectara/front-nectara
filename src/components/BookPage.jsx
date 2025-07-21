// src/components/BookPage.jsx
const BookPage = ({ butterfly }) => {
  return (
    <div className="flex w-full h-[80vh] bg-[url('/book-bg.jpg')] bg-cover bg-center shadow-lg rounded-xl overflow-hidden">
      {/* Izquierda: imagen */}
      <div className="w-1/2 flex flex-col items-center justify-center p-6">
        <img src={butterfly.imageUrl} alt={butterfly.commonName} className="w-[80%] h-[300px] object-cover rounded-xl mb-4 shadow-lg" />
        <h2 className="text-xl italic text-gray-700">{butterfly.scientificName}</h2>
      </div>

      {/* Derecha: texto */}
      <div className="w-1/2 p-6 flex flex-col justify-center">
        <h3 className="text-2xl font-bold mb-2">🌼 {butterfly.commonName}</h3>
        <p>📍 <strong>Ubicación:</strong> {butterfly.location}</p>
        <p>📝 <strong>Descripción:</strong> {butterfly.description}</p>
        <p>🌱 <strong>Hábitat:</strong> {butterfly.habitat}</p>
        <p>🧭 <strong>¿Es migratoria?:</strong> {butterfly.migratory ? "✅ Sí" : "❌ No"}</p>
      </div>
    </div>
  );
};

export default BookPage;
