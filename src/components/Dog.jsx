import { useGLTF, useTexture, useAnimations } from '@react-three/drei'
import { useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Dog = () => {
  const { gl } = useThree()
  
  const model = useGLTF(
    "/models/dog.drc.glb", 
    "https://www.gstatic.com/draco/versioned/decoders/1.5.5/"
  )

  const normalMap = useTexture("/dog_normals.jpg")
  const matcaps = useTexture([
    "/matcap/mat-1.png",
    "/matcap/mat-2.png",
    "/matcap/mat-3.png",
    "/matcap/mat-4.png",
    "/matcap/mat-5.png",
    "/matcap/mat-6.png",
    "/matcap/mat-7.png",
    "/matcap/mat-8.png",
    "/matcap/mat-9.png",
    "/matcap/mat-10.png",
    "/matcap/mat-11.png",
    "/matcap/mat-12.png",
    "/matcap/mat-13.png",
    "/matcap/mat-14.png",
    "/matcap/mat-15.png",
    "/matcap/mat-16.png",
    "/matcap/mat-17.png",
    "/matcap/mat-18.png",
    "/matcap/mat-19.png",
    "/matcap/mat-20.png"
  ])

  useEffect(() => {
    matcaps.forEach(t => t.colorSpace = THREE.SRGBColorSpace)
  }, [matcaps])

  const dogMaterial = useMemo(() => {
    const mat = new THREE.MeshMatcapMaterial({
      normalMap: normalMap,
      matcap: matcaps[1] 
    })

    mat.userData = {
      uProgress: { value: 1 },
      uMatcap1: { value: matcaps[0] },
      uMatcap2: { value: matcaps[18] }
    }

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uMatcap1 = mat.userData.uMatcap1;
      shader.uniforms.uMatcap2 = mat.userData.uMatcap2;
      shader.uniforms.uProgress = mat.userData.uProgress;

      shader.fragmentShader = `
        uniform sampler2D uMatcap1;
        uniform sampler2D uMatcap2;
        uniform float uProgress;
      ` + shader.fragmentShader;

     
      shader.fragmentShader = shader.fragmentShader.replace(
        /vec4\s+matcapColor\s*=\s*texture2D\(\s*matcap,\s*uv\s*\);/g,
        `
        vec4 color1 = texture2D( uMatcap1, uv );
        vec4 color2 = texture2D( uMatcap2, uv );
        vec4 matcapColor = mix(color1, color2, uProgress);
        `
      );
    };

    return mat;
  }, [normalMap, matcaps]);

  useEffect(() => {
    model.scene.traverse((child) => {
      if (child.isMesh) {
        child.material = dogMaterial
      }
    })
  }, [model, dogMaterial])

  const { actions } = useAnimations(model.animations, model.scene)
  useEffect(() => {
    if (actions && actions["Take 001"]) actions["Take 001"].play()
  }, [actions])

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section-1",
        endTrigger: "#section-3",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      }
    })

    
    tl
     .to(model.scene.position,{
      z:"-3.5"
     })
     .to(model.scene.rotation,{
      x:"0.1"
     })
     .to(model.scene.rotation,{
      y:"-2"
     }, "third")
     .to(model.scene.position,{
      x:"-3"
     }, "third")
     .to(model.scene.rotation,{
      x:"0.5"
     }, "third")
     .to(model.scene.scale,{
      x:11.5,
      y:11.5,
      z:11.5
     }, "third")

  }, [model]) 

  return (
    <primitive 
      object={model.scene} 
      scale={11} 
      position={[2.3, -5.9, 0]} 
      rotation={[0, Math.PI / 5.2, 0]} 
    />
  )
}

export default Dog