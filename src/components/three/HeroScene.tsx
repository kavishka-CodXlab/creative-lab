import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Box, Torus, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({ position, color, speed = 1, distort = 0.4, size = 1, shape = "sphere" }: { 
  position: [number, number, number]; 
  color: string; 
  speed?: number;
  distort?: number;
  size?: number;
  shape?: "sphere" | "box" | "torus";
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.2;
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        {shape === "sphere" && <sphereGeometry args={[size, 64, 64]} />}
        {shape === "box" && <boxGeometry args={[size * 1.5, size * 1.5, size * 1.5]} />}
        {shape === "torus" && <torusGeometry args={[size, size * 0.4, 32, 64]} />}
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={distort}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={200}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#e11d48"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function GlowingSphere({ position, color, size }: { 
  position: [number, number, number]; 
  color: string;
  size: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 32, 32]} />
      <MeshWobbleMaterial
        color={color}
        factor={0.3}
        speed={2}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#e11d48" />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#3b82f6" />

        {/* Main floating shapes */}
        <FloatingShape position={[-4, 2, -2]} color="#e11d48" speed={1.2} distort={0.5} size={0.8} shape="sphere" />
        <FloatingShape position={[4, -1.5, -3]} color="#3b82f6" speed={0.8} distort={0.3} size={0.6} shape="box" />
        <FloatingShape position={[-3, -2, -1]} color="#8b5cf6" speed={1} distort={0.4} size={0.5} shape="torus" />
        <FloatingShape position={[3.5, 2.5, -2]} color="#06b6d4" speed={0.9} distort={0.35} size={0.55} shape="sphere" />
        <FloatingShape position={[-5, 0, -4]} color="#f59e0b" speed={1.1} distort={0.25} size={0.4} shape="box" />

        {/* Glowing accent spheres */}
        <GlowingSphere position={[2, 1, -1]} color="#e11d48" size={0.15} />
        <GlowingSphere position={[-2, -1, 0]} color="#3b82f6" size={0.12} />
        <GlowingSphere position={[0, 2.5, -2]} color="#8b5cf6" size={0.1} />

        {/* Particle field for depth */}
        <ParticleField />
      </Canvas>
    </div>
  );
}
