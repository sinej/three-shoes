import {Canvas} from "@react-three/fiber";
import ShowRoom from "@components/three/ShowRoom.tsx";
import AppBar from "@components/Appbar.tsx";
import ColorComponent from "@components/ColorComponent.tsx";

const Home = () => {
    let angle = 0;
    let dis = 1.5;

 return (
  <>
    <AppBar/>
    <Canvas camera={{
        position: [
            dis * Math.sin(angle),
            0.8,
            dis * Math.cos(angle)
        ]
    }}
    >
        {/*<axesHelper args={[5]}/>*/}
        {/*<gridHelper/>*/}
        <color attach={'background'} args={['#EEE']}/>
        <ShowRoom/>
    </Canvas>
    <ColorComponent/>
  </>
 );
}

export default Home;