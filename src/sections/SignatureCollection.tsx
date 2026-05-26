import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uTime;
  uniform float uRefraction;
  varying vec2 vUv;

  float fresnel(vec3 viewDirection, vec3 normal) {
    return pow(1.0 - max(dot(viewDirection, normal), 0.0), 3.0);
  }

  vec3 chromaticShift(vec2 uv, float amount) {
    vec2 rUv = uv + vec2(amount, 0.0);
    vec2 gUv = uv;
    vec2 bUv = uv - vec2(amount, 0.0);
    return vec3(
      texture2D(uTexture, rUv).r,
      texture2D(uTexture, gUv).g,
      texture2D(uTexture, bUv).b
    );
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    uv = uv * 2.0 - 1.0;
    uv.x *= uResolution.x / uResolution.y;
    vec2 mouse = uMouse;
    mouse.x *= uResolution.x / uResolution.y;
    vec2 parallax = (mouse - uv) * 0.05;
    uv = (uv + 1.0) / 2.0;
    vec3 color = chromaticShift(uv + parallax, uRefraction * 0.01);
    vec3 edge = vec3(0.2, 0.5, 0.9) * fresnel(vec3(0.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0));
    edge += sin(uTime) * 0.1;
    gl_FragColor = vec4(color + edge, 1.0);
  }
`;

interface CardData {
  texture: string;
  title: string;
  tagline: string;
}

const cards: CardData[] = [
  { texture: '/holo-card-1.jpg', title: 'Terra', tagline: 'Earth-toned elegance for the modern wardrobe.' },
  { texture: '/holo-card-2.jpg', title: 'Aura', tagline: 'Iridescent pieces that catch every light.' },
  { texture: '/holo-card-3.jpg', title: 'Shadow', tagline: 'Bold silhouettes for statement makers.' },
];

export default function SignatureCollection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const meshRefs = useRef<THREE.Mesh[]>([]);
  const currentMouse = useRef({ x: 0, y: 0 });
  const targetMouse = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio, 2);

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Orthographic camera for 2D-like card rendering
    const frustum = 3;
    const camera = new THREE.OrthographicCamera(
      -frustum, frustum, frustum, -frustum, 0.1, 100
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load textures and create cards
    const textureLoader = new THREE.TextureLoader();
    const cardWidth = 1.4;
    const cardHeight = 2.2;
    const spacing = 1.8;

    cards.forEach((card, i) => {
      const texture = textureLoader.load(card.texture);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;

      const geometry = new THREE.PlaneGeometry(cardWidth, cardHeight);
      const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0, 0) },
          uResolution: { value: new THREE.Vector2(width * dpr, height * dpr) },
          uTime: { value: 0 },
          uRefraction: { value: 0.5 + i * 0.2 },
        },
        transparent: true,
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (i - 1) * spacing;
      scene.add(mesh);
      meshRefs.current.push(mesh);
    });

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    container.addEventListener('mousemove', onMouseMove);

    // Animation loop
    const animate = () => {
      timeRef.current += 0.01;

      // Lerp mouse
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.05;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.05;

      meshRefs.current.forEach((mesh, i) => {
        // 3D tilt based on mouse
        mesh.rotation.y = 0.3 * currentMouse.current.x + (i - 1) * 0.05;
        mesh.rotation.x = -0.2 * currentMouse.current.y;

        // Update shader uniforms
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uMouse.value.set(currentMouse.current.x, currentMouse.current.y);
        mat.uniforms.uTime.value = timeRef.current + i * 0.5;
      });

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Resize
    const onResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      meshRefs.current.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uResolution.value.set(w * dpr, h * dpr);
      });
    };

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      container.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      meshRefs.current.forEach((mesh) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.ShaderMaterial).dispose();
      });
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      meshRefs.current = [];
    };
  }, []);

  return (
    <section id="collections" className="relative min-h-screen bg-pure-white py-32 lg:py-48">
      {/* Section Header */}
      <div className="text-center mb-16 px-6">
        <p className="text-[10px] uppercase tracking-[2px] text-copper font-medium mb-3">
          Signature Collection
        </p>
        <h2 className="font-display text-4xl lg:text-6xl font-light text-charcoal leading-tight">
          Three <em className="italic">worlds</em>. One vision.
        </h2>
      </div>

      {/* 3D Card Canvas Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[60vh] lg:h-[70vh]"
        style={{ touchAction: 'none' }}
      />

      {/* Card Labels */}
      <div className="flex justify-center gap-8 lg:gap-24 mt-12 px-6">
        {cards.map((card, i) => (
          <div key={i} className="text-center max-w-[200px]">
            <h3 className="font-display text-2xl lg:text-3xl text-charcoal mb-2">
              {card.title}
            </h3>
            <p className="text-xs text-charcoal/50 leading-relaxed">
              {card.tagline}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
