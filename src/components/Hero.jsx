import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="w-full min-h-[85vh] px-6 md:px-12 py-12 bg-gradient-to-r from-green-50 via-white to-yellow-50 flex flex-col md:flex-row items-center justify-between gap-12">
      
      {/* Texto principal */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-extrabold text-green-700 leading-tight mb-4">
          Cuaderno de Polinizadores
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          Descubre y gestiona información sobre mariposas polinizadoras en África.
        </p>
        <Link to="/gallery">
          <button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-full transition-all shadow-md">
            Ver mariposas
          </button>
        </Link>
      </div>

      {/* Imagen ilustrativa */}
      <div className="flex-1 flex justify-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Butterfly_icon.svg/1024px-Butterfly_icon.svg.png"
          alt="Mariposa"
          className="w-64 md:w-[400px] object-contain drop-shadow-lg"
        />
      </div>

    </section>
  );
};

export default Hero;
