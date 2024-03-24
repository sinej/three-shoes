import {Canvas} from "@react-three/fiber";
import ShowRoom from "@components/three/ShowRoom.tsx";
import AppBar from "@components/Appbar.tsx";

const Home = () => {
 return (
  <>
    <AppBar/>
    <Canvas>
        {/*<axesHelper args={[5]}/>*/}
        {/*<gridHelper/>*/}
        <color attach={'background'} args={['#EEE']}/>
        <ShowRoom/>
    </Canvas>
  </>
 );
}

export default Home;