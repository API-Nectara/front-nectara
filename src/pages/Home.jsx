import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  Sparkles,
  Cloud,
} from "@react-three/drei";
import Model from "../canvas/Model";
import Rose from "../canvas/Rose";
import Hero from "../components/Hero";
import Intro from "../components/Intro";
import { useState, useEffect } from "react";

// Componente para partículas flotantes - responsive
const FloatingParticles = () => {
  const meshRef = useRef();
  const particleCount = window.innerWidth < 768 ? 40 : 80;

  const particles = useMemo(() => {
    const temp = [];
    const scaleArea = window.innerWidth < 768 ? 25 : 40;
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * scaleArea,
          Math.random() * 15,
          (Math.random() - 0.5) * scaleArea,
        ],
        speed: 0.01 + Math.random() * 0.02,
      });
    }
    return temp;
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={meshRef}>
      {particles.map((particle, index) => (
        <Float
          key={index}
          speed={particle.speed * 8}
          rotationIntensity={0.3}
          floatIntensity={0.4}
        >
          <mesh position={particle.position}>
            <sphereGeometry args={[0.015, 6, 6]} />
            <meshStandardMaterial
              color="#ffffff"
              emissive="#4facfe"
              emissiveIntensity={0.4}
              transparent
              opacity={0.7}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

const Garden = () => {
  const isMobile = window.innerWidth < 768;
  
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.95, 0]}>
        <circleGeometry args={[isMobile ? 3.5 : 6, 32]} />
        <meshStandardMaterial
          color="#1a3d16"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

const Home = () => {
  const isMobile = useIsMobile();
  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom, #1b4857 0%, #216b81 50%, #82939d 100%)",
        position: "relative",
        overflow: "hidden", // Evita scroll horizontal
      }}
    >
      {/* Título flotante */}
      <div
        style={{
          position: "absolute",
          top: "3%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
          pointerEvents: "none",
          padding: "0 20px",
        }}
      >
        <h1
          style={{
            background: "linear-gradient(45deg, #c61e0f, #eb391d, #e66035)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontSize: "clamp(4rem, 8vw, 6rem)",
            fontWeight: "bold",
            textShadow: "3px 3px 25px rgba(0,0,0,0.6)",
            fontFamily: `"Georgia", serif`,
            letterSpacing: "0.15em",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          Nectara
        </h1>
      </div>

      {/* Secciones nuevas debajo del Canvas */}
      <div
        style={{
          minHeight: "200vh",
          paddingTop: "100vh",
          position: "relative",
          zIndex: 2,
        }}
      >
        <Hero />
        <Intro />
      </div>

      {/* Escena 3D */}
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
        }}
        camera={{
          position: isMobile ? [0, 2, 8] : [0, 6, 15],
          fov: isMobile ? 80 : 55,
        }}
      >
        {/* Iluminación mejorada */}
        <ambientLight intensity={0.7} />
        <directionalLight
          position={[12, 12, 8]}
          intensity={1.2}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[0, 8, 0]} intensity={0.6} color="#ffeb3b" />
        <pointLight position={[-10, 5, 10]} intensity={0.3} color="#ff69b4" />

        {/* Entorno */}
        <Environment preset="sunset" />

        {/* Nubes decorativas - responsive */}
        <Cloud
          opacity={0.25}
          speed={0.15}
          width={isMobile ? 6 : 12}
          depth={2}
          segments={25}
          position={isMobile ? [-8, 8, -10] : [-15, 10, -15]}
        />
        <Cloud
          opacity={0.2}
          speed={0.1}
          width={isMobile ? 5 : 10}
          depth={1.5}
          segments={20}
          position={isMobile ? [10, 6, -6] : [18, 8, -8]}
        />
        <Cloud
          opacity={0.15}
          speed={0.08}
          width={isMobile ? 4 : 8}
          depth={1}
          segments={15}
          position={isMobile ? [3, 10, -12] : [5, 12, -20]}
        />

        {/* Jardín */}
        <Garden />

        {/*  flor - más grande y centrada - responsive */}
        <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
          <Rose
            scale={isMobile ? 1.9 : 3}
            position={[0, isMobile ? -1.8 : -2.5, 0]}
          />
        </Float>

        <Model
          scale={isMobile ? 0.7 : 1}
          position={[0, isMobile ? -0.5 : 0.5, 0]}
        />

        {/* Partículas flotantes */}
        <FloatingParticles />

        {/* Sparkles mágicos - responsive */}
        <Sparkles
          count={window.innerWidth < 768 ? 30 : 60}
          scale={window.innerWidth < 768 ? [10, 8, 10] : [25, 12, 25]}
          size={window.innerWidth < 768 ? 3 : 4}
          speed={0.4}
          color="#ffffff"
        />

        {/* Controles de cámara */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={isMobile ? 6 : 10}
          maxDistance={isMobile ? 15 : 25}
          autoRotate={true}
          autoRotateSpeed={0.3}
          domElement={undefined}
        />
      </Canvas>
    </div>
  );
};

export default Home;