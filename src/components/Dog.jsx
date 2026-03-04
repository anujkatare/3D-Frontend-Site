import { useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

const Dog = () => {
  const model = useGLTF(
  "/models/dog.drc.glb", 
  "https://www.gstatic.com/draco/versioned/decoders/1.5.5/"
  )
  const { gl } = useThree()

  const [normalMap, sampleMatCap, branchMap, branchNormalMap] = useTexture([
    "/dog_normals.jpg",
    "/matcap/mat-1.png",
    "/branches_diffuse.jpg",
    "/branches_normals.jpg"
  ])

  const { actions } = useAnimations(model.animations, model.scene)

  useEffect(() => {
    if (actions["Take 001"]) actions["Take 001"].play()
  }, [actions])

  useEffect(() => {
    gl.toneMapping = THREE.ReinhardToneMapping
    gl.outputColorSpace = THREE.SRGBColorSpace

    const dogMaterial = new THREE.MeshMatcapMaterial({
      normalMap: normalMap,
      matcap: sampleMatCap
    })

    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = dogMaterial
      }
    })
  }, [model, normalMap, sampleMatCap, gl])

  return (
    <primitive
      object={model.scene}
      scale={5}
      position={[1, -2, 0]}
      rotation={[-0.3, 0.8, 0]}
    />
  )
}

export default Dog