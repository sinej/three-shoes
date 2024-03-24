import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import {useFrame, useLoader} from "@react-three/fiber";
import { useThree } from "@react-three/fiber";
import {CameraControls, ContactShadows} from "@react-three/drei";
import {useEffect, useRef, useState} from "react";

const ShowRoom = () => {
    const { raycaster, camera } = useThree();
    const cameraControlsRef = useRef<CameraControls>(null!);
    const gltf = useLoader(GLTFLoader, './models/custom.glb');
    const [isFitting, setIsFitting] = useState(false);


    // window.addEventListener('keydown', e => {
    //     console.log("e.key", e.key)
    //     switch (e.key) {
    //         case 'a':
    //             cameraControlsRef.current.setLookAt(
    //                 -2, 0, 2,
    //                 0,0,0,
    //                 true
    //             )
    //             break;
    //         case 'b':
    //             cameraControlsRef.current.setLookAt(
    //                 0, 3, 0,
    //                 0,0,0,
    //                 true
    //             )
    //             break;
    //     }
    // })

    useEffect(() => {
        gltf.scene.children.forEach((shoes) => {
           shoes.children.forEach((mesh) => {
               mesh.castShadow = true;
           })
        });

        cameraControlsRef.current.setTarget(0,0,0, false);
        cameraControlsRef.current.addEventListener('sleep', () => {
            console.log("sleep");
            setIsFitting(false);

        });
        cameraControlsRef.current.addEventListener('control', () => {
            console.log("control")
            setIsFitting(true);
        });
    })


    let angle = 0;
    let dis = 1.5;
    useFrame(() => {
        if (!isFitting) {
            cameraControlsRef.current.setPosition(dis * Math.sin(angle),0.8,dis * Math.cos(angle), true)
            angle = angle + 0.01;
        }

        const rightShoes = gltf.scene.children[0];
        const leftShoes = gltf.scene.children[1];

        // leftShoes.rotation.y = THREE.MathUtils.degToRad(300);
        // leftShoes.rotation.z = .3;

        rightShoes.rotation.y = THREE.MathUtils.degToRad(10);
        leftShoes.rotation.y = THREE.MathUtils.degToRad(355);
        leftShoes.rotation.z = THREE.MathUtils.degToRad(-30);
        leftShoes.position.x = -0.25;
        leftShoes.position.z = 0.37;
        leftShoes.position.y = 0.44;

    })

    const handleShoes = () => {
        const intersects = raycaster.intersectObjects(gltf.scene.children, true);
        if(intersects.length > 0) {
            const firstObj = intersects[0].object as THREE.Mesh;
            const firstMat = firstObj.material as THREE.MeshStandardMaterial;
            const cloneMat = firstMat.clone();



            firstObj.material = cloneMat;

            const mat = firstObj.material as THREE.MeshStandardMaterial;
            mat.color = new THREE.Color('red');

            // setIsFitting(true);
            cameraControlsRef.current.fitToBox(
                firstObj,
                true
            ).then(() => {
                // setIsFitting(false);
            })


            cameraControlsRef.current.fitToBox(
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

 return (
     <>
         <directionalLight position={[3, 3, 3]}
                           castShadow
         />
         <pointLight
                     castShadow
                     position={[0, 1, 0]}
                     intensity={3}
         />
         <CameraControls ref={cameraControlsRef}
                         enabled={true}
                         dollyToCursor={true}
                         minDistance={0.5}
                         maxDistance={10}
                         infinityDolly={true}
                         onChange={() => console.log("onChange", camera.position)}
         />
         <mesh position={[1,0.3, 1]}
               castShadow
         >
             <boxGeometry args={[0.5, 0.5]}/>
             <meshStandardMaterial/>
         </mesh>
         <mesh position={[0, -0.5, 0]}
               scale={5}
               castShadow
               receiveShadow
         >
             <cylinderGeometry args={[0.4, 0.2, 0.2, 30]}/>
             <meshStandardMaterial/>
         </mesh>
         <primitive object={gltf.scene}
                    onClick={handleShoes}
         />

         {/*<ContactShadows position={[0,0,0]}*/}
         {/*                scale={5}*/}
         {/*                color="#000000"*/}
         {/*                resolution={512}*/}
         {/*                opacity={.8}*/}
         {/*                blur={.5}*/}
         {/*/>*/}
     </>
 );
}

export default ShowRoom;