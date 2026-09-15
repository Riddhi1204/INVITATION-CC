import React, { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Scissor3D = ({ onIntersect, isCut }) => {
  const groupRef = useRef();
  const blade1Ref = useRef();
  const blade2Ref = useRef();
  const hasMoved = useRef(false);
  
  const { viewport } = useThree();
  
  // Smoothing vars
  const targetPos = new THREE.Vector3();

  useFrame((state, delta) => {
    if (isCut) return; // Stop logic once cut is done

    // Unproject mouse coordinates to 3D space at z=0
    const x = (state.pointer.x * viewport.width) / 2;
    const y = (state.pointer.y * viewport.height) / 2;
    
    // Safety to prevent auto-cut on load when mouse is strictly 0,0
    if (!hasMoved.current) {
        if (state.pointer.x !== 0 || state.pointer.y !== 0) {
            hasMoved.current = true;
        } else {
            // Put it off-screen initially
            targetPos.set(10, -10, 0); 
            if(groupRef.current) groupRef.current.position.copy(targetPos);
            return;
        }
    }

    targetPos.set(x, y, 0);
    
    if (groupRef.current) {
      // Lerp position for smoothness
      groupRef.current.position.lerp(targetPos, delta * 15);
      
      // Calculate movement delta to compute rotation
      const dx = targetPos.x - groupRef.current.position.x;
      const dy = targetPos.y - groupRef.current.position.y;
      
      // Add slight rotation based on movement
      const targetRotZ = THREE.MathUtils.clamp(-dx * 0.5, -0.5, 0.5);
      const targetRotY = THREE.MathUtils.clamp(-dx * 0.2, -0.3, 0.3);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 5);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 5);
      
      // Snapping logic - animate blades
      const speed = Math.sqrt(dx * dx + dy * dy);
      const targetOpening = THREE.MathUtils.clamp(speed * 0.8, 0.15, 0.8);
      
      if (blade1Ref.current && blade2Ref.current) {
        blade1Ref.current.rotation.z = THREE.MathUtils.lerp(blade1Ref.current.rotation.z, targetOpening, delta * 15);
        blade2Ref.current.rotation.z = THREE.MathUtils.lerp(blade2Ref.current.rotation.z, -targetOpening, delta * 15);
      }

      // Intersection logic
      // Assuming ribbon center is at x=0, y=0. Tighten bounds to prevent accidental cuts
      const isOverCenter = Math.abs(groupRef.current.position.x) < 0.6 && Math.abs(groupRef.current.position.y) < 0.6;
      
      if (!isCut && hasMoved.current && isOverCenter) {
        // Trigger "Cut" animation frame
        if (blade1Ref.current && blade2Ref.current) {
           blade1Ref.current.rotation.z = 0; // SNAP shut
           blade2Ref.current.rotation.z = 0;
        }
        onIntersect(groupRef.current.position); // Pass cut position
      }
    }
  });

  // Procedural scissor geometry
  return (
    <group ref={groupRef} scale={[0.4, 0.4, 0.4]} position={[10, -10, 0]}>
      {/* Pivot */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.3, 16]} />
        <meshStandardMaterial color="#aaaaaa" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Blade 1 */}
      <group ref={blade1Ref} position={[0, 0, 0]}>
        <mesh position={[-1.5, 0.1, 0.05]} rotation={[0, 0, 0]}>
          <boxGeometry args={[3, 0.15, 0.05]} />
          <meshStandardMaterial color="#eeeeee" metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[-3, 0.025, 0.05]} rotation={[0, 0, -0.15]}>
             <cylinderGeometry args={[0, 0.075, 0.5, 3]} />
             <meshStandardMaterial color="#eeeeee" metalness={1} roughness={0.1} />
        </mesh>
        
        <mesh position={[1, 0.5, 0.05]}>
          <torusGeometry args={[0.6, 0.15, 16, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.7} />
        </mesh>
        <mesh position={[0.5, 0.25, 0.05]} rotation={[0, 0, -Math.PI/6]}>
            <boxGeometry args={[1, 0.2, 0.1]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.7} />
        </mesh>
      </group>

      {/* Blade 2 */}
      <group ref={blade2Ref} position={[0, 0, -0.05]}>
        <mesh position={[-1.5, -0.1, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[3, 0.15, 0.05]} />
          <meshStandardMaterial color="#eeeeee" metalness={1} roughness={0.1} />
        </mesh>
        <mesh position={[-3, -0.025, 0]} rotation={[0, 0, 0.15]}>
             <cylinderGeometry args={[0.075, 0, 0.5, 3]} />
             <meshStandardMaterial color="#eeeeee" metalness={1} roughness={0.1} />
        </mesh>

        <mesh position={[1, -0.5, 0]}>
          <torusGeometry args={[0.6, 0.15, 16, 32]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.7} />
        </mesh>
        <mesh position={[0.5, -0.25, 0]} rotation={[0, 0, Math.PI/6]}>
            <boxGeometry args={[1, 0.2, 0.1]} />
            <meshStandardMaterial color="#1a1a1a" metalness={0.5} roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
};

export default Scissor3D;
