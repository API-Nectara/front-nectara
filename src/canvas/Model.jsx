import { useGLTF } from "@react-three/drei";

useGLTF.preload("/public/mariposa_02.glb");

const Model = () => {
  const { scene } = useGLTF("/public/mariposa_02.glb");

  return (
    <group>
      <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
    </group>
  );
};

export default Model;
