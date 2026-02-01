import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ 
  position, 
  geometry, 
  color, 
  speed = 1,
  distort = 0.3,
  scale = 1 
}: { 
  position: [number, number, number];
  geometry: "sphere" | "torus" | "octahedron" | "icosahedron";
  color: string;
  speed?: number;
  distort?: number;
  scale?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const getGeometry = () => {
    switch (geometry) {
      case "sphere":
        return <sphereGeometry args={[1, 64, 64]} />;
      case "torus":
        return <torusGeometry args={[1, 0.4, 32, 100]} />;
      case "octahedron":
        return <octahedronGeometry args={[1]} />;
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      default:
        return <sphereGeometry args={[1, 64, 64]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {getGeometry()}
        <MeshDistortMaterial
          color={color}
          roughness={0.1}
          metalness={0.8}
          distort={distort}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
    </Float>
  );
}

function GlowSphere({ position, color, scale = 0.3 }: { position: [number, number, number]; color: string; scale?: number }) {
  return (
    <Float speed={3} rotationIntensity={0} floatIntensity={2}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00D4FF" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8B5CF6" />
        <pointLight position={[0, 10, -10]} intensity={0.3} color="#06B6D4" />

        {/* Main shapes */}
        <FloatingShape 
          position={[-3, 1, 0]} 
          geometry="sphere" 
          color="#00D4FF" 
          scale={1.2}
          distort={0.4}
        />
        <FloatingShape 
          position={[3, -1, -2]} 
          geometry="torus" 
          color="#8B5CF6" 
          scale={0.9}
          speed={0.8}
          distort={0.2}
        />
        <FloatingShape 
          position={[0, 2, -3]} 
          geometry="octahedron" 
          color="#06B6D4" 
          scale={0.7}
          speed={1.2}
          distort={0.1}
        />
        <FloatingShape 
          position={[-2, -2, -1]} 
          geometry="icosahedron" 
          color="#8B5CF6" 
          scale={0.6}
          speed={0.9}
          distort={0.3}
        />
        <FloatingShape 
          position={[4, 2, -4]} 
          geometry="sphere" 
          color="#00D4FF" 
          scale={0.5}
          distort={0.5}
        />

        {/* Small glow spheres */}
        <GlowSphere position={[5, 0, -3]} color="#00D4FF" scale={0.15} />
        <GlowSphere position={[-5, 3, -2]} color="#8B5CF6" scale={0.2} />
        <GlowSphere position={[2, -3, -1]} color="#06B6D4" scale={0.12} />
        <GlowSphere position={[-3, -1, -4]} color="#00D4FF" scale={0.18} />
      </Canvas>
    </div>
  );
}
