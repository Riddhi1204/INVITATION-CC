import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const BackgroundRings = () => {
  const groupRef = useRef();
  const { viewport } = useThree();
  
  // Adjust sizing based on viewport (responsive)
  const isMobile = viewport.width < 6;
  const scaleMult = isMobile ? 0.6 : 1;

  // Define the atom-like orbital system
  const ringsData = useMemo(() => {
    const data = [
      { 
        // Electric Blue - Main diagonal orbit
        radius: 12 * scaleMult, 
        tube: 0.015, 
        scale: [1, 0.3, 1], 
        rotation: [0.3, 0.2, Math.PI / 3], 
        color: "#00f0ff", 
        opacity: 0.2,
        speed: 0.08
      },
      { 
        // Purple - Opposite diagonal orbit
        radius: 14 * scaleMult, 
        tube: 0.02, 
        scale: [1, 0.25, 1], 
        rotation: [-0.2, 0.4, -Math.PI / 4], 
        color: "#8b5cf6", 
        opacity: 0.15,
        speed: -0.06
      },
      { 
        // Deep Cyan - Flatter horizontal orbit
        radius: 16 * scaleMult, 
        tube: 0.01, 
        scale: [1, 0.35, 1], 
        rotation: [0.5, -0.3, 0.1], 
        color: "#06b6d4", 
        opacity: 0.1,
        speed: 0.04
      }
    ];

    // Add a 4th ring only on desktop for added depth
    if (!isMobile) {
      data.push({
        // Dark Violet - Steep vertical orbit extending beyond viewport
        radius: 18 * scaleMult, 
        tube: 0.02, 
        scale: [1, 0.4, 1], 
        rotation: [-0.4, -0.1, Math.PI / 2.2], 
        color: "#b026ff", 
        opacity: 0.08,
        speed: -0.03
      });
    }
    return data;
  }, [isMobile, scaleMult]);

  const ringRefs = useRef([]);

  useFrame((state, delta) => {
    // Extremely slow, elegant global drift
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.1) * 0.05;
    }
    
    // Very slow individual orbital rotation
    ringRefs.current.forEach((ring, i) => {
      if (ring) {
        ring.rotation.z += delta * ringsData[i].speed;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, -15]}>
      {ringsData.map((ring, idx) => (
        <group 
          key={idx} 
          rotation={ring.rotation} 
        >
          {/* We scale the group to create the elliptical shape safely without squashing the tube excessively in a weird way, though torus squashing gives a nice calligraphic stroke effect which we want */}
          <mesh 
            ref={(el) => ringRefs.current[idx] = el}
            scale={ring.scale}
          >
            <torusGeometry args={[ring.radius, ring.tube, 16, 100]} />
            <meshStandardMaterial 
              color={ring.color} 
              emissive={ring.color}
              emissiveIntensity={0.8}
              transparent
              opacity={ring.opacity}
              wireframe={false}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export default BackgroundRings;
