import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function seededUnit(index, salt) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

// Low poly car model
function LowPolyCar(props) {
  const wheelRef1 = useRef();
  const wheelRef2 = useRef();
  const wheelRef3 = useRef();
  const wheelRef4 = useRef();

  useFrame(() => {
    const speed = Math.abs(window._scrollSpeed || 0) * 0.5;
    [wheelRef1, wheelRef2, wheelRef3, wheelRef4].forEach(ref => {
      if (ref.current) ref.current.rotation.x += speed;
    });
  });

  return (
    <group {...props}>
      {/* Body */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[3.2, 0.7, 1.5]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.2} metalness={0.9} />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.2, 1.1, 0]}>
        <boxGeometry args={[1.8, 0.6, 1.3]} />
        <meshStandardMaterial color="#16213e" roughness={0.1} metalness={0.95} />
      </mesh>
      {/* Windshield */}
      <mesh position={[0.6, 1.05, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.5, 0.5, 1.25]} />
        <meshStandardMaterial color="#f4f1e8" transparent opacity={0.24} roughness={0} metalness={1} />
      </mesh>
      {/* Headlights */}
      <mesh position={[1.65, 0.6, 0.5]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#c4f042" />
      </mesh>
      <mesh position={[1.65, 0.6, -0.5]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <meshBasicMaterial color="#c4f042" />
      </mesh>
      {/* Taillights */}
      <mesh position={[-1.65, 0.6, 0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ff375f" />
      </mesh>
      <mesh position={[-1.65, 0.6, -0.5]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ff375f" />
      </mesh>
      {/* Wheels */}
      {[
        { pos: [-1, 0.2, 0.85], ref: wheelRef1 },
        { pos: [1, 0.2, 0.85], ref: wheelRef2 },
        { pos: [-1, 0.2, -0.85], ref: wheelRef3 },
        { pos: [1, 0.2, -0.85], ref: wheelRef4 },
      ].map((w, i) => (
        <mesh key={i} ref={w.ref} position={w.pos} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.25, 16]} />
          <meshStandardMaterial color="#111111" roughness={0.8} />
        </mesh>
      ))}
    </group>
  );
}

// Car drives alongside the scroll position on the right edge
function ScrollingCarCompanion() {
  const group = useRef();
  const { viewport } = useThree();
  const lastScroll = useRef(0);
  
  useFrame(() => {
    const scrollY = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const progress = maxScroll > 0 ? scrollY / maxScroll : 0;
    
    // Track scroll speed for wheel animation
    window._scrollSpeed = scrollY - lastScroll.current;
    lastScroll.current = scrollY;
    
    // Map scroll progress to vertical position
    const startY = viewport.height / 2 - 1.2;
    const endY = -viewport.height / 2 + 1.2;
    const targetY = THREE.MathUtils.lerp(startY, endY, progress);
    
    // Smooth lerp for buttery feel
    group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.12);
    
    // Slight tilt based on scroll direction
    const tiltTarget = window._scrollSpeed > 0 ? 0.15 : window._scrollSpeed < 0 ? -0.15 : 0;
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, tiltTarget, 0.05);
  });

  return (
    <group ref={group} position={[viewport.width / 2 - 2.5, 0, 0]} rotation={[0.3, -Math.PI / 5, 0]} scale={0.55}>
      <pointLight position={[3, 1, 0]} intensity={8} color="#c4f042" distance={8} />
      <pointLight position={[-3, 1, 0]} intensity={6} color="#ff375f" distance={6} />
      <spotLight position={[0, 5, 3]} angle={0.4} penumbra={0.5} intensity={3} color="#f4f1e8" />
      <LowPolyCar />
    </group>
  );
}

function Particles() {
  const count = 2000;
  const mesh = useRef();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        temp.push({
          x: (seededUnit(i, 1) - 0.5) * 60,
          y: (seededUnit(i, 2) - 0.5) * 60,
          z: (seededUnit(i, 3) - 0.5) * 60,
          speed: seededUnit(i, 4) * 0.01 + 0.005
        });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    particles.forEach((particle, i) => {
        particle.y += particle.speed;
        if (particle.y > 30) particle.y = -30;
        dummy.position.set(particle.x, particle.y, particle.z);
        dummy.updateMatrix();
        mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.02, 4, 4]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.25} />
    </instancedMesh>
  )
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -window.scrollY * 0.003, 0.1);
  });
  return null;
}

export default function AmbientBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 1, pointerEvents: 'none' }}>
      <Canvas camera={{ fov: 60, position: [0, 0, 6] }}>
        <directionalLight position={[5, 10, 5]} intensity={3} color="#ffffff" />
        <ambientLight intensity={0.6} />
        <Particles />
        <CameraRig />
      </Canvas>
    </div>
  )
}
