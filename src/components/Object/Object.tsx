import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';

type SceneProps = {
  modelPath: string;
  cameraPosition?: [number, number, number];
  cameraLookAt?: [number, number, number];
  rotationSpeed?: number;
  rotationLimit?: number | null; // Allow null to disable the limit
  scaleFactor?: number;
  ambientLightIntensity?: number;
  ambientLightColor?: string;
};

export default function Scene({
  modelPath,
  cameraPosition = [0, 5, 300],
  cameraLookAt = [0, 5, 0],
  rotationSpeed = 0.005, // Adjusted for a smoother default rotation
  rotationLimit = null, // Default to null (no limit)
  scaleFactor = 150,
  ambientLightIntensity = 1.5,
  ambientLightColor = '#403c03',
}: SceneProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const requestIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(...cameraPosition);
    camera.lookAt(...cameraLookAt);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(ambientLightColor, ambientLightIntensity);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;
        modelRef.current = model;

        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);

        model.position.sub(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = scaleFactor / maxDim;
        model.scale.setScalar(scale);

        scene.add(model);

        // --- Conditional Animation Logic ---
        if (animationRef.current) animationRef.current.kill();

        if (rotationLimit !== null) {
          // If a limit is provided, use the GSAP back-and-forth animation
          const limitInRadians = THREE.MathUtils.degToRad(rotationLimit);
          const duration = 10 / Math.max(0.1, rotationSpeed);

          animationRef.current = gsap.timeline({ repeat: -1, yoyo: true })
            .to(model.rotation, {
              y: limitInRadians,
              duration: duration,
              ease: 'power1.inOut',
            })
            .to(model.rotation, {
              y: -limitInRadians,
              duration: duration,
              ease: 'power1.inOut',
            });
        }
      },
      undefined,
      (error) => console.error('GLTF load error:', error)
    );

    const animate = () => {
      requestIdRef.current = requestAnimationFrame(animate);
      // If NO limit is set, use the original continuous rotation
      if (rotationLimit === null && modelRef.current) {
        modelRef.current.rotation.y += rotationSpeed;
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      // ... resize logic
    };
    window.addEventListener('resize', handleResize);

    return () => {
      if (requestIdRef.current) cancelAnimationFrame(requestIdRef.current);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) animationRef.current.kill();
      renderer.dispose();
    };
  }, [modelPath, cameraPosition, cameraLookAt, rotationSpeed, rotationLimit, scaleFactor, ambientLightIntensity, ambientLightColor]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
}