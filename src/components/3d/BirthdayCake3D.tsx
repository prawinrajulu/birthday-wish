import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BirthdayCake3DProps {
  candlesLit: boolean;
  onBlowCandles?: () => void;
}

export const BirthdayCake3D: React.FC<BirthdayCake3DProps> = ({
  candlesLit,
  onBlowCandles,
}) => {
  const cakeGroupRef = useRef<THREE.Group>(null);
  const flamesRef = useRef<(THREE.Mesh | null)[]>([]);
  const balloonsRef = useRef<THREE.Group>(null);
  const smokeParticlesRef = useRef<THREE.Points>(null);

  // Candles position on top tier
  const candlePositions: [number, number, number][] = [
    [-0.35, 1.25, 0],
    [0, 1.25, 0.25],
    [0.35, 1.25, 0],
  ];

  // Smoke particles when blown out
  const smokeCount = 35;
  const [smokePos, smokeVel] = useMemo(() => {
    const pos = new Float32Array(smokeCount * 3);
    const vel = new Float32Array(smokeCount * 3);
    for (let i = 0; i < smokeCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.4;
      pos[i * 3 + 1] = 1.3 + Math.random() * 0.2;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.02 + 0.01;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return [pos, vel];
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Gentle slow cake rotation
    if (cakeGroupRef.current) {
      cakeGroupRef.current.rotation.y += delta * 0.25;
      cakeGroupRef.current.position.y = Math.sin(t * 1.5) * 0.05 - 0.5;
    }

    // Flicker candle flames
    flamesRef.current.forEach((flame, idx) => {
      if (flame) {
        if (candlesLit) {
          const flicker = 1 + Math.sin(t * 18 + idx * 3) * 0.15;
          const sway = Math.sin(t * 8 + idx) * 0.08;
          flame.scale.set(0.12 * flicker, 0.28 * flicker, 0.12 * flicker);
          flame.position.x = candlePositions[idx][0] + sway;
        } else {
          flame.scale.set(0, 0, 0);
        }
      }
    });

    // Balloons floating up gently
    if (balloonsRef.current) {
      balloonsRef.current.position.y = Math.sin(t * 0.8) * 0.25;
    }

    // Smoke rising animation when unlit
    if (smokeParticlesRef.current && !candlesLit) {
      const positions = smokeParticlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < smokeCount; i++) {
        positions[i * 3] += smokeVel[i * 3];
        positions[i * 3 + 1] += smokeVel[i * 3 + 1];
        positions[i * 3 + 2] += smokeVel[i * 3 + 2];
        if (positions[i * 3 + 1] > 2.8) {
          positions[i * 3 + 1] = 1.3;
        }
      }
      smokeParticlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group
      onClick={onBlowCandles}
      onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
      onPointerOut={() => { document.body.style.cursor = 'default'; }}
    >
      {/* Floating Balloons behind Cake */}
      <group ref={balloonsRef}>
        {[
          { pos: [-1.8, 1.8, -1.2], color: '#FFB9D5', scale: 0.65 },
          { pos: [1.9, 2.2, -1.0], color: '#C9B8FF', scale: 0.75 },
          { pos: [1.2, 1.4, -1.5], color: '#F4D49A', scale: 0.6 },
          { pos: [-1.4, 2.4, -0.9], color: '#F47FAF', scale: 0.7 },
        ].map((b, i) => (
          <group key={i} position={b.pos as [number, number, number]} scale={b.scale}>
            {/* Balloon Body */}
            <mesh>
              <sphereGeometry args={[0.7, 24, 24]} />
              <meshPhysicalMaterial
                color={b.color}
                roughness={0.15}
                metalness={0.35}
                clearcoat={0.9}
              />
            </mesh>
            {/* Balloon Knot */}
            <mesh position={[0, -0.72, 0]}>
              <coneGeometry args={[0.1, 0.15, 12]} />
              <meshStandardMaterial color={b.color} />
            </mesh>
            {/* String */}
            <mesh position={[0, -1.5, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 1.4, 6]} />
              <meshBasicMaterial color="#FFB9D5" transparent opacity={0.6} />
            </mesh>
          </group>
        ))}
      </group>

      {/* Main Cake Group */}
      <group ref={cakeGroupRef}>
        {/* Cake Stand / Pedestal Plate (Champagne Gold) */}
        <mesh position={[0, -0.6, 0]} receiveShadow>
          <cylinderGeometry args={[1.7, 1.7, 0.12, 40]} />
          <meshStandardMaterial
            color="#F4D49A"
            roughness={0.18}
            metalness={0.92}
          />
        </mesh>
        <mesh position={[0, -0.75, 0]}>
          <cylinderGeometry args={[0.5, 0.9, 0.25, 24]} />
          <meshStandardMaterial color="#FFE8BE" roughness={0.2} metalness={0.88} />
        </mesh>

        {/* Bottom Tier (Blush Pink Velvet) */}
        <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.4, 1.4, 0.7, 36]} />
          <meshStandardMaterial
            color="#FFB9D5"
            roughness={0.32}
            metalness={0.2}
          />
        </mesh>

        {/* Bottom Tier Cream Frosting Drips / Border */}
        <mesh position={[0, 0.16, 0]}>
          <torusGeometry args={[1.41, 0.08, 16, 36]} />
          <meshStandardMaterial color="#FFF7F8" roughness={0.15} />
        </mesh>

        {/* Top Tier (Rose Pink Velvet) */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.95, 0.95, 0.65, 36]} />
          <meshStandardMaterial
            color="#F47FAF"
            roughness={0.28}
            metalness={0.25}
          />
        </mesh>

        {/* Top Tier Cream Edge */}
        <mesh position={[0, 0.83, 0]}>
          <torusGeometry args={[0.96, 0.07, 16, 36]} />
          <meshStandardMaterial color="#FFF7F8" roughness={0.15} />
        </mesh>

        {/* Decorative Golden Pearl Beads around tiers */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(angle) * 1.42, -0.1, Math.sin(angle) * 1.42]}>
              <sphereGeometry args={[0.05, 12, 12]} />
              <meshStandardMaterial color="#F4D49A" metalness={0.95} roughness={0.1} />
            </mesh>
          );
        })}

        {/* Candles and Animated Flame Meshes */}
        {candlePositions.map((pos, idx) => (
          <group key={idx} position={pos}>
            {/* Candle Body */}
            <mesh position={[0, -0.15, 0]}>
              <cylinderGeometry args={[0.045, 0.045, 0.45, 16]} />
              <meshStandardMaterial
                color="#F4D49A"
                roughness={0.2}
                metalness={0.75}
              />
            </mesh>
            {/* Candle Wick */}
            <mesh position={[0, 0.1, 0]}>
              <cylinderGeometry args={[0.008, 0.008, 0.08, 8]} />
              <meshBasicMaterial color="#333333" />
            </mesh>
            {/* Flickering Flame Mesh */}
            <mesh
              ref={(el) => (flamesRef.current[idx] = el)}
              position={[0, 0.22, 0]}
            >
              <sphereGeometry args={[1, 16, 16]} />
              <meshBasicMaterial color="#FFE8BE" />
            </mesh>
            {/* Candle Point Light */}
            {candlesLit && (
              <pointLight
                position={[0, 0.25, 0]}
                color="#F4D49A"
                distance={2.8}
                intensity={2.0}
              />
            )}
          </group>
        ))}

        {/* Smoke Particles after blowing */}
        {!candlesLit && (
          <points ref={smokeParticlesRef}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={smokeCount}
                array={smokePos}
                itemSize={3}
              />
            </bufferGeometry>
            <pointsMaterial
              size={0.08}
              color="#FFF8FC"
              transparent
              opacity={0.45}
            />
          </points>
        )}
      </group>
    </group>
  );
};
