import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <>
     <nav className="bg-[#1b4857] text-[#cdbfbc] shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide hover:text-[#eb391d] transition">
          NECTARA
        </Link>

        {/* Enlaces */}
        <div className="space-x-6 hidden md:flex">
          <Link to="/" className="hover:text-[#e66035] transition">Inicio</Link>
          <Link to="/newbutterfly" className="hover:text-[#e66035] transition">Agregar</Link>
          <Link to="/galery" className="hover:text-[#e66035] transition">Ver Galería</Link>
          <Link to="/contact" className="hover:text-[#e66035] transition">Contacto</Link>
          <Link to="/about" className="hover:text-[#e66035] transition"> Creadoras </Link>

        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar