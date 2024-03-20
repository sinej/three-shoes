import {Canvas} from "@react-three/fiber";
import ShowRoom from "./ShowRoom.tsx";
import {OrbitControls} from "@react-three/drei";

const Home = () => {
 return (
  <>
    <Canvas>
        <axesHelper args={[5]}/>
        <gridHelper/>
        <OrbitControls/>
        <directionalLight position={[3,3,3]} />
        <ShowRoom/>
    </Canvas>
  </>
 );
}

export default Home;