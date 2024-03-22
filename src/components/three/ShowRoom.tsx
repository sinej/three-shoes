import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {useFrame, useLoader} from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import {CameraControls} from "@react-three/drei";
import {useEffect, useRef} from "react";

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
                true,
                {
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingBottom: 1,
                    paddingTop: 1,
                }
            )
        }
    }


    window.addEventListener('keydown', e => {
        console.log("e.key", e.key)
        switch (e.key) {
            case 'a':
                cameraContolsRef.current.setLookAt(
                    -2, 0, 2,
                    0,0,0,
                    true
                )
                break;
            case 'b':
                cameraContolsRef.current.setLookAt(
                    0, 3, 0,
                    0,0,0,
                    true
                )
                break;
        }
    })

    useEffect(() => {
        cameraContolsRef.current.setTarget(0,0,0)
    })
    let angle = 0;
    let dis = 2;
    useFrame(() => {
        cameraContolsRef.current.setPosition(dis * Math.sin(angle),0.8,dis * Math.cos(angle))
        angle = angle + 0.01
    })


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