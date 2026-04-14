import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function Particles() {
  const count = 3000;
  const mesh = useRef();
  
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
        temp.push({
          x: (Math.random() - 0.5) * 60,
          y: (Math.random() - 0.5) * 60,
          z: (Math.random() - 0.5) * 60,
          speed: Math.random() * 0.01 + 0.005
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
      <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
    </instancedMesh>
  )
}

function CameraRig() {
  useFrame((state) => {
    // True 3D scrolling parallax effect
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, -window.scrollY * 0.005, 0.1);
    state.camera.rotation.x = THREE.MathUtils.lerp(state.camera.rotation.x, window.scrollY * 0.0002, 0.1);
  });
  return null;
}

export default function AmbientBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
      <Canvas camera={{ fov: 75, position: [0, 0, 5] }}>
        <Particles />
        <CameraRig />
      </Canvas>
    </div>
  )
}
