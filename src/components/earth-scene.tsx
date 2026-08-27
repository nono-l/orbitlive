import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function makeEarthMap(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const ocean = ctx.createLinearGradient(0, 0, 0, height);
  ocean.addColorStop(0, "#8ec8dc");
  ocean.addColorStop(0.18, "#1b4e72");
  ocean.addColorStop(0.5, "#0d2a48");
  ocean.addColorStop(0.82, "#1b4e72");
  ocean.addColorStop(1, "#8ec8dc");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, width, height);

  const land = (x: number, y: number, rx: number, ry: number, rot: number, color: string) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Approximate continents on an equirectangular canvas
  land(width * 0.18, height * 0.38, 70, 95, -0.35, "#3d6b46"); // N America
  land(width * 0.24, height * 0.62, 42, 78, 0.2, "#4a7340"); // S America
  land(width * 0.52, height * 0.34, 38, 42, 0.1, "#4f6e4a"); // Europe
  land(width * 0.54, height * 0.5, 58, 88, 0.15, "#3f6844"); // Africa
  land(width * 0.7, height * 0.36, 130, 70, 0.05, "#456b48"); // Asia
  land(width * 0.82, height * 0.62, 38, 22, 0.3, "#4c7048"); // Australia
  land(width * 0.52, height * 0.08, 180, 28, 0, "#dce8ee"); // Arctic
  land(width * 0.5, height * 0.94, 140, 26, 0, "#dce8ee"); // Antarctic

  const img = ctx.getImageData(0, 0, width, height);
  const d = img.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.sin(i * 0.013) + Math.cos(i * 0.007)) * 4;
    d[i] = Math.max(0, Math.min(255, d[i] + n));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n * 0.6));
  }
  ctx.putImageData(img, 0, 0);
  return canvas;
}

function makeCloudMap(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;
  ctx.clearRect(0, 0, width, height);
  for (let i = 0; i < 1400; i += 1) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const r = 6 + Math.random() * 28;
    ctx.fillStyle = `rgba(255,255,255,${0.04 + Math.random() * 0.12})`;
    ctx.beginPath();
    ctx.ellipse(x, y, r, r * 0.45, Math.random() * Math.PI, 0, Math.PI * 2);
    ctx.fill();
  }
  return canvas;
}

function Globe() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudRef = useRef<THREE.Mesh>(null);
  const reduced = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );

  const { earthMap, cloudMap } = useMemo(() => {
    const earthCanvas = makeEarthMap(1024, 512);
    const cloudCanvas = makeCloudMap(1024, 512);
    const earthTex = new THREE.CanvasTexture(earthCanvas);
    earthTex.colorSpace = THREE.SRGBColorSpace;
    earthTex.anisotropy = 8;
    const cloudTex = new THREE.CanvasTexture(cloudCanvas);
    cloudTex.anisotropy = 4;
    return { earthMap: earthTex, cloudMap: cloudTex };
  }, []);

  useFrame((_, delta) => {
    if (reduced) return;
    const d = Math.min(delta, 0.05);
    if (earthRef.current) earthRef.current.rotation.y += d * 0.12;
    if (cloudRef.current) cloudRef.current.rotation.y += d * 0.155;
  });

  return (
    <group rotation={[0.41, 0.4, 0.08]}>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.35, 64, 64]} />
        <meshStandardMaterial map={earthMap} roughness={0.62} metalness={0.08} />
      </mesh>
      <mesh ref={cloudRef}>
        <sphereGeometry args={[1.375, 48, 48]} />
        <meshStandardMaterial
          map={cloudMap}
          transparent
          opacity={0.42}
          depthWrite={false}
        />
      </mesh>
      <mesh scale={1.48}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#8eb8cc"
          transparent
          opacity={0.09}
          side={THREE.BackSide}
          depthWrite={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.95, 0.008, 8, 128]} />
        <meshBasicMaterial color="#8eb8cc" transparent opacity={0.45} />
      </mesh>
      <mesh rotation={[Math.PI / 2.6, 0.3, 0.2]}>
        <torusGeometry args={[2.18, 0.004, 8, 128]} />
        <meshBasicMaterial color="#eceef2" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export function EarthScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-full w-full bg-bg" aria-hidden />;
  }

  return (
    <Canvas
      camera={{ position: [0, 0.2, 6.1], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={["#07080c"]} />
      <ambientLight intensity={0.28} />
      <directionalLight position={[4.5, 2.2, 3.2]} intensity={2.1} color="#fff6ea" />
      <directionalLight position={[-3, -1, -2]} intensity={0.25} color="#8eb8cc" />
      <Stars radius={80} depth={40} count={1400} factor={2.4} saturation={0} fade speed={0.4} />
      <Globe />
      <OrbitControls
        enablePan={false}
        minDistance={3.4}
        maxDistance={8}
        enableDamping
        rotateSpeed={0.45}
      />
    </Canvas>
  );
}
