import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CombinationLock3DProps {
  digits: number[];
  isUnlocked: boolean;
  isShaking: boolean;
  onDigitClick?: (index: number) => void;
}

export const CombinationLock3D: React.FC<CombinationLock3DProps> = ({
  digits,
  isUnlocked,
  isShaking,
  onDigitClick,
}) => {
  const safeGroupRef = useRef<THREE.Group>(null);
  const doorPivotRef = useRef<THREE.Group>(null);
  const interiorLightRef = useRef<THREE.PointLight>(null);
  const dialsRef = useRef<(THREE.Mesh | null)[]>([]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Floating idle safe tilt
    if (safeGroupRef.current) {
      if (isShaking) {
        // Shake animation
        safeGroupRef.current.position.x = Math.sin(t * 45) * 0.12;
        safeGroupRef.current.rotation.z = Math.sin(t * 35) * 0.05;
      } else {
        safeGroupRef.current.position.x = 0;
        safeGroupRef.current.position.y = Math.sin(t * 1.2) * 0.06;
        safeGroupRef.current.rotation.y = Math.sin(t * 0.4) * 0.08;
      }
    }

    // Door swing open when unlocked
    if (doorPivotRef.current) {
      const targetAngle = isUnlocked ? -Math.PI / 1.7 : 0;
      doorPivotRef.current.rotation.y = THREE.MathUtils.lerp(
        doorPivotRef.current.rotation.y,
        targetAngle,
        delta * 3.5
      );
    }

    // Interior glow light expansion
    if (interiorLightRef.current) {
      const targetIntensity = isUnlocked ? 3.5 : 0.2;
      interiorLightRef.current.intensity = THREE.MathUtils.lerp(
        interiorLightRef.current.intensity,
        targetIntensity,
        delta * 4
      );
    }

    // Dials rotation based on digits
    dialsRef.current.forEach((dial, idx) => {
      if (dial) {
        const targetRot = (digits[idx] || 0) * (Math.PI * 2 / 10);
        dial.rotation.x = THREE.MathUtils.lerp(dial.rotation.x, targetRot, delta * 12);
      }
    });
  });

  return (
    <group ref={safeGroupRef} position={[0, 0, 0]}>
      {/* Safe Outer Frame / Housing */}
      <mesh position={[0, 0, -0.6]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 2.8, 1.4]} />
        <meshStandardMaterial
          color="#071426"
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* Metallic Gold Corner Brackets */}
      {[-1.5, 1.5].map((x) =>
        [-1.3, 1.3].map((y) => (
          <mesh key={`${x}-${y}`} position={[x, y, 0.05]}>
            <boxGeometry args={[0.3, 0.3, 0.12]} />
            <meshStandardMaterial color="#FFD98E" roughness={0.2} metalness={0.9} />
          </mesh>
        ))
      )}

      {/* Interior Chamber (visible when door opens) */}
      <mesh position={[0, 0, -0.3]}>
        <boxGeometry args={[2.8, 2.4, 0.9]} />
        <meshStandardMaterial
          color="#163B70"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Glowing Treasure / Heart inside */}
      <mesh position={[0, 0, -0.2]} scale={isUnlocked ? 1.2 : 0.8}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial
          color="#FFB6D5"
          emissive="#F45B9A"
          emissiveIntensity={isUnlocked ? 1.8 : 0.4}
          roughness={0.1}
          metalness={0.4}
        />
      </mesh>

      {/* Interior Point Light */}
      <pointLight
        ref={interiorLightRef}
        position={[0, 0, 0.1]}
        color="#FFD98E"
        distance={6}
        intensity={0.2}
      />
      <pointLight
        position={[0, 0.5, 0.2]}
        color="#F45B9A"
        distance={5}
        intensity={isUnlocked ? 2.5 : 0.1}
      />

      {/* Safe Door (Hinged on the left side: x = -1.5) */}
      <group ref={doorPivotRef} position={[-1.5, 0, 0.12]}>
        {/* Door Body (offset so hinge is at x=0 of group) */}
        <group position={[1.5, 0, 0]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[2.9, 2.5, 0.18]} />
            <meshStandardMaterial
              color="#0E223D"
              roughness={0.2}
              metalness={0.88}
            />
          </mesh>

          {/* Rose-Gold & Soft-Gold Beveled Trim */}
          <mesh position={[0, 0, 0.1]}>
            <boxGeometry args={[2.7, 2.3, 0.04]} />
            <meshStandardMaterial
              color="#F45B9A"
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>

          {/* Central Dial Panel (Midnight blue recessed plate) */}
          <mesh position={[0, 0.1, 0.13]}>
            <boxGeometry args={[2.2, 0.95, 0.05]} />
            <meshStandardMaterial
              color="#040B16"
              roughness={0.3}
              metalness={0.9}
            />
          </mesh>

          {/* 4 Number Rotary Cylinders / Dials */}
          {[-0.75, -0.25, 0.25, 0.75].map((xOffset, idx) => (
            <group key={idx} position={[xOffset, 0.1, 0.17]}>
              <mesh
                ref={(el) => (dialsRef.current[idx] = el)}
                rotation={[0, 0, Math.PI / 2]}
                onClick={(e) => {
                  e.stopPropagation();
                  onDigitClick && onDigitClick(idx);
                }}
                onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
                onPointerOut={() => { document.body.style.cursor = 'default'; }}
              >
                <cylinderGeometry args={[0.3, 0.3, 0.35, 20]} />
                <meshStandardMaterial
                  color="#FFD98E"
                  roughness={0.15}
                  metalness={0.95}
                />
              </mesh>
              {/* Dial bezel ring */}
              <mesh position={[0, 0, -0.02]}>
                <ringGeometry args={[0.32, 0.36, 24]} />
                <meshBasicMaterial color="#F45B9A" />
              </mesh>
            </group>
          ))}

          {/* Golden Keyhole Below Dials */}
          <group position={[0, -0.65, 0.13]}>
            <mesh>
              <circleGeometry args={[0.22, 32]} />
              <meshStandardMaterial color="#FFD98E" roughness={0.1} metalness={0.9} />
            </mesh>
            <mesh position={[0, 0.04, 0.01]}>
              <circleGeometry args={[0.07, 16]} />
              <meshBasicMaterial color="#040B16" />
            </mesh>
            <mesh position={[0, -0.05, 0.01]}>
              <planeGeometry args={[0.06, 0.12]} />
              <meshBasicMaterial color="#040B16" />
            </mesh>
            {/* Glowing Keyhole Aura */}
            <pointLight position={[0, 0, 0.1]} color="#FFD98E" distance={0.8} intensity={1.2} />
          </group>

          {/* Vault Wheel Handle on the Right */}
          <group position={[0.9, -0.65, 0.18]}>
            <mesh rotation={[0, 0, 0]}>
              <torusGeometry args={[0.18, 0.035, 12, 24]} />
              <meshStandardMaterial color="#FFD98E" roughness={0.15} metalness={0.9} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.06, 12, 12]} />
              <meshStandardMaterial color="#FFB6D5" roughness={0.2} metalness={0.8} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};
