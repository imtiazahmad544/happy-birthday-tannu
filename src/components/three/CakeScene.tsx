"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

interface CandleProps {
  position: [number, number, number];
  lit: boolean;
}

function Candle({ position, lit }: CandleProps) {
  const flameRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (flameRef.current) {
      const flicker = 1 + Math.sin(state.clock.elapsedTime * 12 + position[0] * 10) * 0.08;
      flameRef.current.scale.set(flicker, lit ? flicker * 1.1 : 0.001, flicker);
      flameRef.current.visible = lit;
    }
  });

  return (
    <group position={position}>
      <mesh castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 12]} />
        <meshStandardMaterial color="#F1D97A" />
      </mesh>
      <mesh ref={flameRef} position={[0, 0.32, 0]}>
        <coneGeometry args={[0.05, 0.16, 8]} />
        <meshStandardMaterial
          color="#F59E0B"
          emissive="#F59E0B"
          emissiveIntensity={2.5}
          toneMapped={false}
        />
      </mesh>
      {lit && <pointLight position={[0, 0.35, 0]} intensity={0.4} distance={1.2} color="#F59E0B" />}
    </group>
  );
}

interface CakeMeshProps {
  candlesLit: boolean;
}

function CakeMesh({ candlesLit }: CakeMeshProps) {
  const candlePositions: [number, number, number][] = [
    [-0.5, 0.85, 0],
    [-0.2, 0.85, 0.3],
    [0.2, 0.85, 0.3],
    [0.5, 0.85, 0],
    [0, 0.85, -0.4],
  ];

  return (
    <Float speed={1} rotationIntensity={0.05} floatIntensity={0.2}>
      <group>
        {/* Bottom tier */}
        <mesh castShadow receiveShadow position={[0, 0.15, 0]}>
          <cylinderGeometry args={[1.3, 1.4, 0.5, 48]} />
          <meshStandardMaterial color="#F5E6C8" roughness={0.5} />
        </mesh>
        {/* Top tier */}
        <mesh castShadow receiveShadow position={[0, 0.65, 0]}>
          <cylinderGeometry args={[0.9, 1.0, 0.45, 48]} />
          <meshStandardMaterial color="#FFF7E6" roughness={0.4} />
        </mesh>
        {/* Icing drip ring */}
        <mesh position={[0, 0.42, 0]}>
          <torusGeometry args={[0.95, 0.06, 12, 48]} />
          <meshStandardMaterial color="#D4AF37" metalness={0.3} roughness={0.4} />
        </mesh>

        {candlePositions.map((pos, i) => (
          <Candle key={i} position={pos} lit={candlesLit} />
        ))}
      </group>
    </Float>
  );
}

interface CakeSceneProps {
  candlesLit: boolean;
}

export function CakeScene({ candlesLit }: CakeSceneProps) {
  return (
    <Canvas shadows camera={{ position: [0, 1.6, 4], fov: 42 }} dpr={[1, 1.8]}>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 5, 2]} intensity={1} castShadow />
      <CakeMesh candlesLit={candlesLit} />
      <Environment preset="apartment" />
      <EffectComposer>
        <Bloom luminanceThreshold={0.6} intensity={0.8} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
