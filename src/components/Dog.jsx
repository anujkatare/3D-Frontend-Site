import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

const Dog = () => {
  return (
    <Canvas camera={{ position: [3, 3, 3] }}>
      
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="green" />
      </mesh>

      <OrbitControls />

    </Canvas>
  )
}

export default Dog