import { Link } from "react-router-dom";


export default function Hero() {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-40 flex flex-col md:flex-row items-center gap-10">

      {/* Texto + botones */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-5xl md:text-6xl font-extrabold text-green-800 mb-6 leading-tight">
      Explora el mundo de las mariposas africanas
    </h2>
    <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto">
      Descubre sus colores, hábitats y la magia que aportan al ecosistema.
    </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/galery"
          className="bg-green-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-green-700 transition"
        >
          Ver Galería de Mariposas
        </Link>

        <Link
          to="/field-experience"
          className="border border-green-600 text-green-700 px-6 py-3 rounded-full hover:bg-green-600 hover:text-white transition"
        >
            Descubre nuestra experiencia de libro de campo
          </Link>
        </div>
      </div>
    </section>
  );
}
