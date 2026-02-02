import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars, Line } from "@react-three/drei";
import * as THREE from "three";

/* =======================
   TECH NODE
======================= */
function TechNode({
  position,
  color,
  scale = 1,
  speed = 1,
}: {
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * speed) * 0.3;
    meshRef.current.rotation.y += 0.005 * speed;
  });

  return (
    <Float speed={speed} floatIntensity={0.4} rotationIntensity={0.2}>
      <group position={position} scale={scale}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1, 0]} />
          <meshBasicMaterial
            color={color}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.45, 16, 16]} />
          <meshBasicMaterial color={color} transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

/* =======================
   DATA STREAM LINES
======================= */
function DataStream() {
  const lines = useMemo(
    () =>
      Array.from({ length: 15 }).map(() => ({
        start: [
          Math.random() * 20 - 10,
          Math.random() * 20 - 10,
          Math.random() * -15,
        ] as [number, number, number],
        end: [
          Math.random() * 20 - 10,
          Math.random() * 20 - 10,
          Math.random() * -5,
        ] as [number, number, number],
        speed: Math.random() * 0.4 + 0.2,
        offset: Math.random() * 10,
      })),
    []
  );

  return (
    <>
      {lines.map((line, i) => (
        <AnimatedLine key={i} {...line} />
      ))}
    </>
  );
}

function AnimatedLine({
  start,
  end,
  speed,
  offset,
}: {
  start: [number, number, number];
  end: [number, number, number];
  speed: number;
  offset: number;
}) {
  const ref = useRef<any>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.material.opacity =
      ((Math.sin(state.clock.elapsedTime * speed + offset) + 1) / 2) * 0.4;
  });

  return (
    <Line
      ref={ref}
      points={[start, end]}
      color="#00B4D8"
      lineWidth={1}
      transparent
      opacity={0.3}
    />
  );
}


/* =======================
   NETWORK PARTICLES
======================= */
function NetworkParticles() {
  const count = 200; // Reduced from 300 for better performance
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;
      // FIXED: Reduced range from ±50 to ±20 to prevent overflow
      const x = Math.random() * 40 - 20;
      const y = Math.random() * 40 - 20;
      const z = Math.random() * 40 - 20;
      temp.push({ t, factor, speed, x, y, z, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!mesh.current) return;
    particles.forEach((particle, i) => {
      let { t, factor, speed, x, y, z } = particle;
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);

      // Update position
      dummy.position.set(
        (particle.mx / 10) * a + x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b + y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        (particle.my / 10) * b + z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      // Update scale (pulsing)
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[0.05, 0]} />
      <meshBasicMaterial color="#0077b6" transparent opacity={0.6} />
    </instancedMesh>
  );
}

/* =======================
   HERO SCENE (FIXED)
======================= */
export function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <fog attach="fog" args={["#050A18", 10, 30]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#00B4D8" />
        <pointLight position={[-10, -10, -10]} intensity={1.5} color="#03045E" />

        <NetworkParticles />

        <Stars
          radius={60}
          depth={40}
          count={2500}
          factor={3}
          fade
          speed={0.5}
        />

        <DataStream />

        <TechNode position={[4, 2, -6]} color="#00B4D8" speed={0.6} />
        <TechNode position={[-4, -3, -8]} color="#90E0EF" scale={1.4} speed={0.4} />
        <TechNode position={[5, -4, -10]} color="#03045E" scale={1.8} speed={0.3} />
        <TechNode position={[-3, 4, -6]} color="#0077B6" scale={0.9} speed={0.8} />
      </Canvas>
    </div>
  );
}
