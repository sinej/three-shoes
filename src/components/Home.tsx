import {Canvas} from "@react-three/fiber";
import ShowRoom from "@components/three/ShowRoom.tsx";

const Home = () => {
 return (
  <>
    <Canvas>
        <axesHelper args={[5]}/>
        <gridHelper/>
        <ShowRoom/>
    </Canvas>
  </>
 );
}

export default Home;