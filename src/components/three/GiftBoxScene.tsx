"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PresentationControls } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { gsap } from "gsap";

interface GiftBoxMeshProps {
  opened: boolean;
  onOpen: () => void;
}

function GiftBoxMesh({ opened, onOpen }: GiftBoxMeshProps) {
  const lidRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    if (opened || !lidRef.current) return;
    onOpen();
    gsap.to(lidRef.current.position, { y: 1.6, duration: 0.6, ease: "back.out(2)" });
    gsap.to(lidRef.current.rotation, { x: -1.4, duration: 0.7, ease: "power2.out" });
    gsap.to(lidRef.current.position, {
      y: 3.2,
      duration: 0.5,
      delay: 0.6,
      ease: "power1.in",
      onComplete: () => {
        if (lidRef.current) lidRef.current.visible = false;
      },
    });
    if (groupRef.current) {
      gsap.to(groupRef.current.scale, { x: 1.08, y: 1.08, z: 1.08, duration: 0.15, yoyo: true, repeat: 1 });
    }
  };

  useFrame((state) => {
    if (groupRef.current && !opened) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.15;
    }
  });

  return (
    <group
      ref={groupRef}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Box base */}
      <mesh castShadow receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.6, 1.4, 1.6]} />
        <meshStandardMaterial
          color={hovered ? "#F1D97A" : "#D4AF37"}
          metalness={0.6}
          roughness={0.25}
        />
      </mesh>

      {/* Ribbon vertical */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.22, 1.42, 1.62]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.4} roughness={0.3} />
      </mesh>
      {/* Ribbon horizontal */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.62, 1.42, 0.22]} />
        <meshStandardMaterial color="#7C3AED" metalness={0.4} roughness={0.3} />
      </mesh>

      {/* Lid */}
      <mesh ref={lidRef} castShadow position={[0, 0.78, 0]}>
        <boxGeometry args={[1.75, 0.3, 1.75]} />
        <meshStandardMaterial color="#F1D97A" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Bow */}
      <mesh position={[0, 0.98, 0]}>
        <torusKnotGeometry args={[0.18, 0.06, 64, 8]} />
        <meshStandardMaterial color="#EC4899" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  );
}

interface GiftBoxSceneProps {
  opened: boolean;
  onOpen: () => void;
}

/**
 * Full R3F canvas wrapping the gift box. Kept as its own client component so
 * it can be dynamically imported with `ssr: false` from the parent section
 * (three.js requires the DOM/WebGL context).
 */
export function GiftBoxScene({ opened, onOpen }: GiftBoxSceneProps) {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1.5, 4.5], fov: 40 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[3, 5, 2]}
        intensity={1.4}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <pointLight position={[-3, 2, -2]} intensity={0.6} color="#7C3AED" />

      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-0.3, 0.3]}
        azimuth={[-0.6, 0.6]}
      >
        <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.4}>
          <GiftBoxMesh opened={opened} onOpen={onOpen} />
        </Float>
      </PresentationControls>

      <Environment preset="city" />
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} intensity={0.6} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
}
