import { useState } from "react";
import TeamModal from "./TeamModal";
import { motion } from "framer-motion";

const TeamCard = ({ name, image, bio, linkedin, github }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg border border-orange-200 rounded-xl p-6 text-center flex flex-col items-center transition duration-300"
      >
        {/* Imagen del perfil */}
        <img
          src={image}
          alt={name}
          className="w-32 h-32 rounded-full mb-4 object-cover border-4 border-[#e66035]"
        />

        {/* Nombre */}
        <h3 className="text-lg font-semibold text-[#e66035] mb-3">{name}</h3>

        {/* Botón Ver más */}
        <button
          onClick={() => setOpen(true)}
          className="butterfly-button"
        >
          Ver más
        </button>
      </motion.div>

      {/* Modal */}
      {open && (
        <TeamModal
          name={name}
          bio={bio}
          linkedin={linkedin}
          github={github}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default TeamCard;

