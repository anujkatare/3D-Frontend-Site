import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows } from '@react-three/drei'
import Dog from './components/Dog'
import './App.css'

function App() {
  return (
    <main>
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 2, 10], fov: 50 }}>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} />
          
          <Suspense fallback={null}>
            <Dog />
          </Suspense>

          <ContactShadows position={[0, -2, 0]} opacity={0.5} scale={10} blur={2} far={4.5} />
          <OrbitControls makeDefault />
          <gridHelper args={[20, 20]} /> 
        </Canvas>
      </div>

      <section><h1>Scroll Down</h1></section>
      <section><h1>The Dog is Fixed</h1></section>
      <section><h1>Keep Going</h1></section>
    </main>
  )
}

export default App