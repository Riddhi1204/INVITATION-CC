import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const BackgroundRings = () => {
  const groupRef = useRef();
  
  // 2 symmetrical rings for a minimal, premium background
  const ringRefs = [useRef(), useRef()];

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Extremely slow and smooth global rotation for symmetry
      groupRef.current.rotation.y += delta * 0.02;
    }
    
    // Smooth, slow counter-rotations
    if (ringRefs[0].current) {
      ringRefs[0].current.rotation.x += delta * 0.03;
      ringRefs[0].current.rotation.y += delta * 0.04;
    }
    if (ringRefs[1].current) {
      ringRefs[1].current.rotation.x -= delta * 0.03;
      ringRefs[1].current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -20]}>
      {/* Ring 1 - Cyan/Blue */}
      <mesh ref={ringRefs[0]}>
        <torusGeometry args={[12, 0.015, 32, 120]} />
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4"
          emissiveIntensity={0.3}
          transparent
          opacity={0.15}
          wireframe={false}
        />
      </mesh>
      
      {/* Ring 2 - Purple/Blue */}
      <mesh ref={ringRefs[1]}>
        <torusGeometry args={[16, 0.01, 32, 120]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          emissive="#8b5cf6"
          emissiveIntensity={0.2}
          transparent
          opacity={0.1}
          wireframe={false}
        />
      </mesh>
    </group>
  );
};

export default BackgroundRings;

