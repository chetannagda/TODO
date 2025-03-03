// import React, { useRef } from 'react';
// import { useFrame } from '@react-three/fiber';
// import { Points, PointMaterial } from '@react-three/drei';
// import * as THREE from 'three';

// // Generate random points for the stars
// const generatePoints = (count: number) => {
//   const points = new Float32Array(count * 3);
//   const colors = new Float32Array(count * 3);
  
//   for (let i = 0; i < count; i++) {
//     const i3 = i * 3;
//     points[i3] = (Math.random() - 0.5) * 50;
//     points[i3 + 1] = (Math.random() - 0.5) * 50;
//     points[i3 + 2] = (Math.random() - 0.5) * 50;
    
//     // Add some color variation
//     colors[i3] = 0.5 + Math.random() * 0.5; // R
//     colors[i3 + 1] = 0.5 + Math.random() * 0.5; // G
//     colors[i3 + 2] = 0.5 + Math.random() * 0.5; // B
//   }
  
//   return { positions: points, colors };
// };

// const Background: React.FC = () => {
//   const pointsRef = useRef<THREE.Points>(null);
//   const { positions, colors } = React.useMemo(() => generatePoints(5000), []);
  
//   useFrame((state) => {
//     if (pointsRef.current) {
//       pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
//       pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
//     }
//   });
  
//   return (
//     <>
//       {/* Ambient light */}
//       <ambientLight intensity={0.2} />
      
//       {/* Directional light */}
//       <directionalLight position={[10, 10, 5]} intensity={1} color="#8b5cf6" />
//       <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      
//       {/* Stars */}
//       <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
//         <PointMaterial
//           transparent
//           vertexColors
//           size={0.15}
//           sizeAttenuation={true}
//           depthWrite={false}
//           blending={THREE.AdditiveBlending}
//         />
//       </Points>
      
//       {/* Gradient background */}
//       <mesh position={[0, 0, -10]}>
//         <planeGeometry args={[100, 100]} />
//         <meshBasicMaterial color="#0f172a" />
//       </mesh>
//     </>
//   );
// };

// export default Background;

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random points for the stars
const generatePoints = (count: number) => {
  const points = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    points[i3] = (Math.random() - 0.5) * 50;
    points[i3 + 1] = (Math.random() - 0.5) * 50;
    points[i3 + 2] = (Math.random() - 0.5) * 50;
    
    // Add some color variation
    colors[i3] = 0.5 + Math.random() * 0.5; // R
    colors[i3 + 1] = 0.5 + Math.random() * 0.5; // G
    colors[i3 + 2] = 0.5 + Math.random() * 0.5; // B
  }
  
  return { positions: points, colors };
};

const Background: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const { positions, colors } = React.useMemo(() => generatePoints(5000), []);
  
  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
    }
  });
  
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.2} />
      
      {/* Directional light */}
      <directionalLight position={[10, 10, 5]} intensity={1} color="#8b5cf6" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3b82f6" />
      
      {/* Stars */}
      <Points ref={pointsRef} positions={positions} colors={colors} stride={3}>
        <PointMaterial
          transparent
          vertexColors
          size={0.15}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
      
      {/* Gradient background */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
    </>
  );
};

export default Background;