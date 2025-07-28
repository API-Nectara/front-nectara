import { useState } from "react";
import TeamModal from "./TeamModal";
import { motion } from "framer-motion";

const TeamCard = ({ name, image, bio, linkedin, github }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white shadow-lg rounded-xl p-6 text-center flex flex-col items-center"
      >
        <img src={image} alt={name} className="w-32 h-32 rounded-full mb-4 object-cover" />
        <h3 className="text-lg font-semibold text-green-800">{name}</h3>
        <button
          onClick={() => setOpen(true)}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded-full hover:bg-green-700 transition"
        >
          Ver más
        </button>
      </motion.div>

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
