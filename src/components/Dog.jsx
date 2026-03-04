import { useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Dog = () => {

  gsap.registerPlugin(useGSAP());
  gsap.registerPlugin(ScrollTrigger)

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

  const dogModel = useRef(model)

  useGSAP(() => {
     const tl = gsap.timeline({
      scrollTrigger:{
        trigger: "#section-1",
        endTrigger: "#section-3",
        start:" top top",
        end: "bottom bottom",
        markers: true,
        scrub: true
      }
     })

     tl
     .to(dogModel.current.scene.position,{
      z:"-3.5"
     })
     .to(dogModel.current.scene.rotation,{
      x:"0.1"
     })
     .to(dogModel.current.scene.rotation,{
      y:"-2"
     }, "third")
     .to(dogModel.current.scene.position,{
      x:"-3"
     }, "third")
     .to(dogModel.current.scene.rotation,{
      x:"0.5"
     }, "third")
     .to(dogModel.current.scene.scale,{
      x:11.5,
      y:11.5,
      z:11.5
     }, "third")

  }, [])

  return (
    <>
    <primitive object={model.scene} scale={11} position={[ 2.3, -5.9, 0 ]} rotation={[ 0, Math.PI / 5.2, 0 ]} />
            <directionalLight position={[ 0, 5, 5 ]} color={0x171717} intensity={-10} />
    </>
  )
}

export default Dog