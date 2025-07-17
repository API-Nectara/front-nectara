import Model from "../canvas/Model";
import {Canvas} from "@react-three/fiber";
import {Stage} from "@react-three/drei"
const Home = () => {
  return (
    <Canvas>
        <Stage environment="city">
            <Model scale={[1, 1, 1]} />
        </Stage>
    </Canvas>
  )
}

export default Home;