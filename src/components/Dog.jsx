import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei'
import { Suspense } from 'react'
import { normalMap } from 'three/src/nodes/display/NormalMapNode.js'

const DogModel = () => {
  const model = useGLTF("/models/dog.drc.glb")
 
  const textures =  useTexture({
    normalMap: "/dog_normals.jpg"
  }) 

  model.scene.traverse((child) => {
       if(child.name.includes("DOG")){
            //do this
       }
  })

  return (
    <primitive object={model.scene} scale={5} position={[1,-2,1]} rotation={[-0.3,0.8,0]}/>
  )
}

const Dog = () => {
  return (
    <Canvas camera={{ position: [0, 2, 6], fov: 50 }}>
      <ambientLight intensity={2} />
      <directionalLight position={[5, 5, 5]} intensity={3} />

      <Suspense fallback={null}>
        <DogModel />
      </Suspense>

      <OrbitControls />
    </Canvas>
  )
}

export default Dog