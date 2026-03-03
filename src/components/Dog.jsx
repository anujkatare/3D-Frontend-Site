import { Canvas, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { Suspense } from 'react'

const DogModel = () => {
  const model = useGLTF("/models/dog.drc.glb")

  useThree(({camera, scene, gl}) => {
    gl.toneMapping = THREE.ReinhardToneMapping,
    gl.outputColorSpace = THREE.SRGBColorSpace
  })
 

  const [ normalMap, sampleMatCap] = (useTexture(["/dog_normals.jpg","/matcap/mat-2.png"])).map(texture => {
    texture.flipY = false
    texture.outputColorSpace = THREE.SRGBColorSpace
    return texture;
  })

  

  model.scene.traverse((child) => {
       if(child.name.includes("DOG")){
            child.material = new THREE.MeshMatcapMaterial({
              normalMap:normalMap,
              matcap:sampleMatCap
            })
       }
  })

  return (
    <primitive object={model.scene} scale={5} position={[1,-2,1]} rotation={[-0.3,0.8,0]}/>
  )
}

const Dog = () => {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      <Suspense fallback={null}>
        <DogModel />
      </Suspense>

      <OrbitControls />
    </Canvas>
  )
}

export default Dog