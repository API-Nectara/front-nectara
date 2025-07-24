import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react"; // Si no usas esto, puedes usar íconos simples

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-[#1b4857] text-[#cdbfbc] shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold tracking-wide hover:text-[#eb391d] transition">
            NECTARA
          </Link>

          {/* Hamburguesa */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Enlaces (modo desktop) */}
          <div className="space-x-6 hidden md:flex">
            <Link to="/" className="hover:text-[#e66035] transition">Inicio</Link>
            <Link to="/newbutterfly" className="hover:text-[#e66035] transition">Agregar</Link>
            <Link to="/galery" className="hover:text-[#e66035] transition">Ver Galería</Link>
            <Link to="/contact" className="hover:text-[#e66035] transition">Contacto</Link>
          </div>
        </div>

        {/* Enlaces (modo móvil) */}
        {menuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-2 flex flex-col bg-[#1b4857]">
            <Link to="/" className="hover:text-[#e66035] transition" onClick={() => setMenuOpen(false)}>Inicio</Link>
            <Link to="/newbutterfly" className="hover:text-[#e66035] transition" onClick={() => setMenuOpen(false)}>Agregar</Link>
            <Link to="/galery" className="hover:text-[#e66035] transition" onClick={() => setMenuOpen(false)}>Ver Galería</Link>
            <Link to="/contact" className="hover:text-[#e66035] transition" onClick={() => setMenuOpen(false)}>Contacto</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
