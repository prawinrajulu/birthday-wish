import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GiftBox3DProps {
  isOpen: boolean;
  onOpen?: () => void;
}

export const GiftBox3D: React.FC<GiftBox3DProps> = ({ isOpen, onOpen }) => {
  const boxGroupRef = useRef<THREE.Group>(null);
  const lidGroupRef = useRef<THREE.Group>(null);
  const heartMeshRef = useRef<THREE.Mesh>(null); 
  const particlesRef = useRef<THREE.Points>(null);
  const petalsRef = useRef<THREE.InstancedMesh>(null);

  // Floating animation & lid opening animation
  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (boxGroupRef.current) {
      boxGroupRef.current.position.y = Math.sin(t * 1.5) * 0.12 - 0.2;
      boxGroupRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
    }

    if (heartMeshRef.current) {
      heartMeshRef.current.position.y = 1.3 + Math.sin(t * 2.2) * 0.15;
      heartMeshRef.current.rotation.y += delta * 0.8;
      heartMeshRef.current.rotation.z = Math.sin(t * 1.8) * 0.1;
      const s = 1 + Math.sin(t * 3) * 0.06;
      heartMeshRef.current.scale.set(s, s, s);
    }

    // Lid opening interpolation
    if (lidGroupRef.current) {
      if (isOpen) {
        lidGroupRef.current.position.y = THREE.MathUtils.lerp(lidGroupRef.current.position.y, 1.8, delta * 3);
        lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(lidGroupRef.current.rotation.x, -Math.PI / 3, delta * 3);
        lidGroupRef.current.position.z = THREE.MathUtils.lerp(lidGroupRef.current.position.z, -0.8, delta * 3);
      } else {
        lidGroupRef.current.position.y = THREE.MathUtils.lerp(lidGroupRef.current.position.y, 0.45, delta * 4);
        lidGroupRef.current.rotation.x = THREE.MathUtils.lerp(lidGroupRef.current.rotation.x, 0, delta * 4);
        lidGroupRef.current.position.z = THREE.MathUtils.lerp(lidGroupRef.current.position.z, 0, delta * 4);
      }
    }

    // Swirling sparkles around heart and box
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.35;
      particlesRef.current.rotation.x = Math.sin(t * 0.4) * 0.15;
    }
  });

  // Generate glowing burst particle coordinates
  const sparkleCount = 90;
  const sparklePositions = useMemo(() => {
    const pos = new Float32Array(sparkleCount * 3);
    for (let i = 0; i < sparkleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 1.2 + Math.random() * 1.5;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) + 0.5;
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, []);

  // Heart shape geometry
  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.25,
    bevelEnabled: true,
    bevelSegments: 6,
    steps: 2,
    bevelSize: 0.08,
    bevelThickness: 0.08,
  }), []);

  return (
    <group>
      {/* Floating Glass Heart */}
      <group position={[0, 0, 0]}>
        <mesh
          ref={heartMeshRef}
          rotation={[Math.PI, 0, 0]}
          position={[0, 1.3, 0]}
          scale={0.9}
        >
          <extrudeGeometry args={[heartShape, extrudeSettings]} />
          <meshPhysicalMaterial
            color="#FFB9D5"
            emissive="#F47FAF"
            emissiveIntensity={0.35}
            roughness={0.08}
            metalness={0.1}
            transmission={0.85}
            thickness={0.8}
            ior={1.45}
            clearcoat={1}
            clearcoatRoughness={0.04}
          />
        </mesh>
      </group>

      {/* Sparkling particle halo */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={sparklePositions.length / 3}
            array={sparklePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color="#F4D49A"
          transparent
          opacity={0.85}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Main 3D Gift Box */}
      <group
        ref={boxGroupRef}
        onClick={onOpen}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'default'; }}
      >
        {/* Box Base (Deep Midnight Navy with Rose Satin Sheen) */}
        <mesh position={[0, -0.2, 0]} castShadow receiveShadow>
          <boxGeometry args={[1.6, 1.2, 1.6]} />
          <meshStandardMaterial
            color="#0D1E38"
            roughness={0.25}
            metalness={0.5}
          />
        </mesh>

        {/* Vertical Ribbon (Body - Champagne Gold) */}
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[1.62, 1.22, 0.26]} />
          <meshStandardMaterial
            color="#F4D49A"
            roughness={0.18}
            metalness={0.85}
          />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <boxGeometry args={[0.26, 1.22, 1.62]} />
          <meshStandardMaterial
            color="#F4D49A"
            roughness={0.18}
            metalness={0.85}
          />
        </mesh>

        {/* Box Lid (Animated - Rose Pink Velvet) */}
        <group ref={lidGroupRef} position={[0, 0.45, 0]}>
          <mesh castShadow>
            <boxGeometry args={[1.7, 0.28, 1.7]} />
            <meshStandardMaterial
              color="#F47FAF"
              roughness={0.3}
              metalness={0.35}
            />
          </mesh>
          {/* Lid Ribbon Cross */}
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[1.72, 0.29, 0.27]} />
            <meshStandardMaterial color="#F4D49A" roughness={0.15} metalness={0.9} />
          </mesh>
          <mesh position={[0, 0.01, 0]}>
            <boxGeometry args={[0.27, 0.29, 1.72]} />
            <meshStandardMaterial color="#F4D49A" roughness={0.15} metalness={0.9} />
          </mesh>

          {/* Bow on Top */}
          <group position={[0, 0.25, 0]}>
            <mesh position={[-0.25, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
              <torusGeometry args={[0.22, 0.07, 14, 28]} />
              <meshStandardMaterial color="#F4D49A" roughness={0.18} metalness={0.88} />
            </mesh>
            <mesh position={[0.25, 0, 0]} rotation={[0, 0, -Math.PI / 4]}>
              <torusGeometry args={[0.22, 0.07, 14, 28]} />
              <meshStandardMaterial color="#F4D49A" roughness={0.18} metalness={0.88} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.11, 16, 16]} />
              <meshStandardMaterial color="#FFE8BE" roughness={0.15} metalness={0.92} />
            </mesh>
          </group>
        </group>

        {/* Soft Pedestal Shadow Disc */}
        <mesh position={[0, -1.0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[1.8, 32]} />
          <meshBasicMaterial
            color="#040B16"
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
};
