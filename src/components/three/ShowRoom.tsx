import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import {CameraControls} from "@react-three/drei";
import {useRef} from "react";

const ShowRoom = () => {
    const cameraContolsRef = useRef<CameraControls>(null!);
    const { raycaster, camera } = useThree();
    const gltf = useLoader(GLTFLoader, './models/custom.glb');
    const handleShoes = () => {
        const intersects = raycaster.intersectObjects(gltf.scene.children, true);
        if(intersects.length > 0) {
            const firstObj = intersects[0].object as THREE.Mesh;
            const firstMat = firstObj.material as THREE.MeshStandardMaterial;
            const cloneMat = firstMat.clone();

            firstObj.material = cloneMat;

            const mat = firstObj.material as THREE.MeshStandardMaterial;
            mat.color = new THREE.Color('red');


            // cameraContolsRef.current.setLookAt(
            //     -2, 0 , 2,
            //     firstObj.position.x, firstObj.position.y,
            //     firstObj.position.z,
            //     true
            // )
            cameraContolsRef.current.fitToBox(
                firstObj,
                true
            )
        }
    }
 return (
     <>
         <directionalLight position={[3,3,3]}/>
         <CameraControls ref={cameraContolsRef}
             enabled={true}
                         dollyToCursor={true}
                         minDistance={0.5}
                         // maxDistance={10}
                         infinityDolly={true}
                         onChange={() => console.log("onChange", camera.position)}
         />
         <primitive object={gltf.scene}
                    onClick={handleShoes}
         />
     </>
 );
}

export default ShowRoom;