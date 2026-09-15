import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';

const Ribbon3D = ({ isCut }) => {
  const groupRef = useRef();
  const bowRef = useRef();
  const leftRibbonRef = useRef();
  const rightRibbonRef = useRef();
  const materialRef1 = useRef();
  const materialRef2 = useRef();
  const flashRef = useRef();
  
  const { viewport } = useThree();

  // Create a curved ribbon path
  const [leftGeometry, rightGeometry] = useMemo(() => {
    class RibbonCurve extends THREE.Curve {
      constructor(scale = 1, isLeft = true) {
        super();
        this.scale = scale;
        this.isLeft = isLeft;
      }
      getPoint(t, optionalTarget = new THREE.Vector3()) {
        const x = this.isLeft ? (t - 1) * 10 : t * 10;
        const y = Math.sin(t * Math.PI) * -0.5;
        const z = Math.cos(t * Math.PI) * 0.2;
        return optionalTarget.set(x, y, z).multiplyScalar(this.scale);
      }
    }
    // Added slightly flattened tube scale for ribbon "thickness variation"
    return [
      new THREE.TubeGeometry(new RibbonCurve(1, true), 100, 0.45, 16, false),
      new THREE.TubeGeometry(new RibbonCurve(1, false), 100, 0.45, 16, false)
    ];
  }, []);

  useFrame((state, delta) => {
    if (!isCut) {
      // Subtle idle movement
      if (groupRef.current) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.05;
      }
      
      // Proximity glow
      const mx = (state.pointer.x * viewport.width) / 2;
      const my = (state.pointer.y * viewport.height) / 2;
      const dist = Math.sqrt(mx * mx + my * my);
      
      const glowIntensity = Math.max(0, 1 - dist / 5); // Glows when within 5 units
      
      if (materialRef1.current && materialRef2.current) {
         materialRef1.current.emissiveIntensity = 0.2 + glowIntensity * 1.5;
         materialRef2.current.emissiveIntensity = 0.2 + glowIntensity * 1.5;
      }
    } else {
        if (groupRef.current) groupRef.current.position.y = 0; // reset parent drift
    }
  });

  useEffect(() => {
    if (isCut) {
      // Spark/Flash effect at cut point
      if (flashRef.current) {
         flashRef.current.visible = true;
         gsap.to(flashRef.current.scale, { x: 8, y: 8, z: 8, duration: 0.15, yoyo: true, repeat: 1 });
         gsap.to(flashRef.current.material, { opacity: 0, duration: 0.3, delay: 0.1 });
      }

      // Bow drop & jerk animation
      if (bowRef.current) {
        const tl = gsap.timeline();
        // Jerk upward/shake
        tl.to(bowRef.current.position, { y: 0.5, x: (Math.random()-0.5)*0.5, duration: 0.1, ease: "power1.out" })
          // Fall down (gravity)
          .to(bowRef.current.position, { y: -15, duration: 1.2, ease: "power2.in" });
          
        gsap.to(bowRef.current.scale, { x: 0.5, y: 0.5, z: 0.5, duration: 1.3, ease: "power2.inOut" });
        gsap.to(bowRef.current.rotation, { z: Math.random() * Math.PI, x: Math.random() * Math.PI, duration: 1.3 });
      }

      // Left Ribbon flies left and rotates smoothly
      gsap.to(leftRibbonRef.current.position, {
        x: -15, y: -2, z: -5,
        duration: 2.5,
        ease: "power3.out"
      });
      gsap.to(leftRibbonRef.current.rotation, {
        y: Math.PI / 1.5, z: -Math.PI / 3, x: Math.PI / 4,
        duration: 2.5,
        ease: "power2.out"
      });

      // Right Ribbon flies right and rotates smoothly
      gsap.to(rightRibbonRef.current.position, {
        x: 15, y: -2, z: -5,
        duration: 2.5,
        ease: "power3.out"
      });
      gsap.to(rightRibbonRef.current.rotation, {
        y: -Math.PI / 1.5, z: Math.PI / 3, x: Math.PI / 4,
        duration: 2.5,
        ease: "power2.out"
      });
    }
  }, [isCut]);

  // Shared material settings for realistic satin ribbon
  const ribbonMaterialProps = {
    color: "#e11d48",
    emissive: "#e11d48",
    emissiveIntensity: 0.2,
    roughness: 0.25,
    metalness: 0.6, // Specular shine
    clearcoat: 0.8, // subtle highlight
    clearcoatRoughness: 0.3,
    side: THREE.DoubleSide
  };

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 3D Bow / Knot (Visible initially at center) */}
      <group ref={bowRef} position={[0, 0, 0.4]}>
        {/* Central Knot */}
        <mesh position={[0, 0, 0]} scale={[1, 0.8, 0.5]}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshPhysicalMaterial {...ribbonMaterialProps} emissiveIntensity={0.1} />
        </mesh>
        
        {/* Left Loop */}
        <mesh position={[-0.6, 0.2, 0]} rotation={[0, 0, Math.PI / 6]} scale={[1, 0.6, 1]}>
          <torusGeometry args={[0.5, 0.15, 16, 64]} />
          <meshPhysicalMaterial {...ribbonMaterialProps} emissiveIntensity={0.1} />
        </mesh>
        
        {/* Right Loop */}
        <mesh position={[0.6, 0.2, 0]} rotation={[0, 0, -Math.PI / 6]} scale={[1, 0.6, 1]}>
          <torusGeometry args={[0.5, 0.15, 16, 64]} />
          <meshPhysicalMaterial {...ribbonMaterialProps} emissiveIntensity={0.1} />
        </mesh>

        {/* Left Tail */}
        <mesh position={[-0.4, -0.6, -0.1]} rotation={[0, 0, Math.PI / 8]}>
          <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
          <meshPhysicalMaterial {...ribbonMaterialProps} emissiveIntensity={0.1} />
        </mesh>

        {/* Right Tail */}
        <mesh position={[0.4, -0.6, -0.1]} rotation={[0, 0, -Math.PI / 8]}>
          <cylinderGeometry args={[0.15, 0.15, 1.5, 16]} />
          <meshPhysicalMaterial {...ribbonMaterialProps} emissiveIntensity={0.1} />
        </mesh>
      </group>

      {/* Main Ribbon Strips (Flattened slightly to look like thick fabric) */}
      <mesh ref={leftRibbonRef} geometry={leftGeometry} scale={[1, 0.3, 1]}>
        <meshPhysicalMaterial ref={materialRef1} {...ribbonMaterialProps} />
      </mesh>
      
      <mesh ref={rightRibbonRef} geometry={rightGeometry} scale={[1, 0.3, 1]}>
        <meshPhysicalMaterial ref={materialRef2} {...ribbonMaterialProps} />
      </mesh>

      {/* Spark/Flash at center for hit feedback */}
      <mesh ref={flashRef} position={[0,0,0]} visible={false}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={1} />
      </mesh>
    </group>
  );
};

export default Ribbon3D;
