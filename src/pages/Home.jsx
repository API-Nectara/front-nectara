import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  Float, 
  Sparkles,
  Cloud
} from '@react-three/drei';
import Model from "../canvas/Model";
import Rose from "../canvas/Rose";
import Hero from "../components/Hero";
import Intro from "../components/Intro";

// Floating Particles
const FloatingParticles = () => {
  const meshRef = useRef();
  const particleCount = 80;
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < particleCount; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 40,
          Math.random() * 15,
          (Math.random() - 0.5) * 40,
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
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.95, 0]}>
        <circleGeometry args={[6, 32]} />
        <meshStandardMaterial
          color="#1a3d16"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
};

const Home = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* 🌼 Sección 3D pantalla completa */}
      <div style={{
        width: "100vw",
        height: "100vh",
        background: "linear-gradient(to bottom, #87CEEB 0%, #98FB98 50%, #90EE90 100%)",
        position: "relative",
      }}>
        {/* Título centrado */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          textAlign: "center",
        }}>
          <h1 style={{
            color: "white",
            fontSize: "4.5rem",
            fontWeight: "bold",
            textShadow: "3px 3px 25px rgba(0,0,0,0.6)",
            fontFamily: "serif",
            letterSpacing: "0.15em",
            margin: 0,
          }}>
            Nectara
          </h1>
        </div>

        {/* Canvas 3D */}
        <Canvas
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
          camera={{ position: [0, 6, 15], fov: 55 }}
        >
          <ambientLight intensity={0.7} />
          <directionalLight position={[12, 12, 8]} intensity={1.2} castShadow />
          <pointLight position={[0, 8, 0]} intensity={0.6} color="#ffeb3b" />
          <pointLight position={[-10, 5, 10]} intensity={0.3} color="#ff69b4" />
          <Environment preset="sunset" />
          <Cloud opacity={0.25} speed={0.15} width={12} depth={2} segments={25} position={[-15, 10, -15]} />
          <Cloud opacity={0.2} speed={0.1} width={10} depth={1.5} segments={20} position={[18, 8, -8]} />
          <Cloud opacity={0.15} speed={0.08} width={8} depth={1} segments={15} position={[5, 12, -20]} />
          <Garden />
          <Float speed={0.8} rotationIntensity={0.1} floatIntensity={0.2}>
            <Rose scale={3} position={[0, -2.5, 0]} />
          </Float>
          <Model scale={1} position={[0, 0.5, 0]} />
          <FloatingParticles />
          <Sparkles count={60} scale={[25, 12, 25]} size={4} speed={0.4} color="#ffffff" />
          <OrbitControls enableZoom enablePan={false} maxPolarAngle={Math.PI / 2.2} minDistance={10} maxDistance={25} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* 👇 Secciones nuevas debajo del Canvas */}
      <div style={{ paddingTop: "0vh" }}>
        <Hero />
        <Intro />
      </div>
    </div>
  );
};

export default Home;
