import Hero from "../components/Hero";
import Intro from "../components/Intro";
import ButterflyBook from "../components/ButterflyBook"; // 👈 Asegúrate que esta ruta es correcta

const ButterflyDetails = () => {
  return (
    <div>
      <Hero />
      <Intro />
      <div className="mt-10 px-4">
        <ButterflyBook /> {/* Aquí insertamos el libro */}
      </div>
    </div>
  );
};

export default ButterflyDetails;
