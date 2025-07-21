// src/components/ButterflyBook.jsx
import { useState, useEffect } from "react";
import BookPage from "./BookPage";

const ButterflyBook = () => {
  const [butterflies, setButterflies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3001/butterflies") // Cambia esto si tu endpoint es diferente
      .then((res) => res.json())
      .then((data) => setButterflies(data))
      .catch((err) => console.error("Error fetching butterflies:", err));
  }, []);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % butterflies.length);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + butterflies.length) % butterflies.length);
  };

  if (butterflies.length === 0) {
    return <p className="text-center text-gray-500 mt-10">Cargando mariposas...</p>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <BookPage butterfly={butterflies[currentPage]} />
      <div className="flex gap-4 mt-4">
        <button onClick={prevPage} className="bg-gray-700 text-white px-4 py-2 rounded-md">⬅ Anterior</button>
        <button onClick={nextPage} className="bg-gray-700 text-white px-4 py-2 rounded-md">Siguiente ➡</button>
      </div>
    </div>
  );
};

export default ButterflyBook;
