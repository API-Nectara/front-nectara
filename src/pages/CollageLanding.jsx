import React from 'react';

export default function CollageLanding() {
    return (
        <div className="min-h-screen w-full relative font-serif text-black">
            {/* Collage cubriendo toda la pantalla */}
            <img
                src="/images-home/Group2.png"
                alt="Collage Nectara"
                className="absolute inset-0 w-full h-full object-cover z-0"
            />

            {/* Capa blanca translúcida si quieres darle más lectura al texto (opcional) */}
            {/* <div className="absolute inset-0 bg-white/10 z-10 backdrop-blur-sm" /> */}

            {/* Navbar personalizada */}
            <nav className="absolute top-0 left-0 w-full z-20 flex items-center justify-between px-8 py-4 bg-white bg-opacity-90 shadow-md text-sm font-medium">
                <span className="text-xl font-bold tracking-wide">NECTARA</span>
                <div className="space-x-6">
                    <a href="#" className="hover:underline">Inicio</a>
                    <a href="#" className="hover:underline">Proyecto</a>
                    <a href="#" className="hover:underline">Buscar</a>
                    <a href="#" className="hover:underline">Atlas</a>
                    <a href="#" className="hover:underline">Sobre nosotras</a>
                </div>
            </nav>

            {/* Footer blanco encima del collage */}
            <footer className="absolute bottom-0 left-0 w-full z-20 bg-white bg-opacity-90 text-center text-xs py-3 px-4 shadow-inner font-serif">
                Proyecto creado por grupo P4 Femcoders Factoría F5<br />
                ©2025 Nectara: Polinizadoras - África
            </footer>
        </div>
    );
}
