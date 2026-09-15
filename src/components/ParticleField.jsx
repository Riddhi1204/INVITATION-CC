import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleField = ({ count = 1000 }) => {
  const pointsRef = useRef();

  const [positions, colors, speeds] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const speeds = new Float32Array(count); // Z speed
    
    const colorChoices = [
      new THREE.Color('#a855f7'), // purple
      new THREE.Color('#3b82f6'), // blue
      new THREE.Color('#06b6d4'), // cyan
      new THREE.Color('#ffffff')  // white
    ];

    for (let i = 0; i < count; i++) {
      const r = 25 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi) - 10; // offset z

      const color = colorChoices[Math.floor(Math.random() * colorChoices.length)];
      // Lower brightness slightly
      colors[i * 3] = color.r * 0.7;
      colors[i * 3 + 1] = color.g * 0.7;
      colors[i * 3 + 2] = color.b * 0.7;

      speeds[i] = (Math.random() * 0.05) + 0.01;
    }
    
    return [positions, colors, speeds];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.015;
      pointsRef.current.rotation.x += delta * 0.005;

      // Z depth movement
      const posAttr = pointsRef.current.geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        posAttr.array[i * 3 + 2] += speeds[i] * delta * 50; 
        // Reset if moving past camera
        if (posAttr.array[i * 3 + 2] > 10) {
           posAttr.array[i * 3 + 2] = -30;
        }
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute 
          attach="attributes-position" 
          count={positions.length / 3} 
          array={positions} 
          itemSize={3} 
        />
        <bufferAttribute 
          attach="attributes-color" 
          count={colors.length / 3} 
          array={colors} 
          itemSize={3} 
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.06} 
        vertexColors 
        transparent 
        opacity={0.4}
        sizeAttenuation 
      />
    </points>
  );
};

export default ParticleField;
