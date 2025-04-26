import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function BlackHole() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const wormholeGeometry = new THREE.TorusGeometry(15, 8, 50, 100);
    const wormholeMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vUv = uv;
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        varying vec3 vPosition;

        void main() {
          vec2 position = vUv * 2.0 - 1.0;
          float dist = length(position);

          float wave = sin(dist * 10.0 - time * 2.0) * 0.5 + 0.5;
          vec3 color = mix(
            vec3(0.1, 0.2, 0.3),
            vec3(0.5, 0.7, 1.0),
            wave
          );

          float alpha = smoothstep(1.0, 0.8, dist);
          gl_FragColor = vec4(color, alpha * 0.3);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    });


    const starGeometry = new THREE.BufferGeometry();
    const starCount = 1500;
    const starPositions = new Float32Array(starCount * 3);
    const starSizes = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      starPositions[i3] = (Math.random() - 0.5) * 200;
      starPositions[i3 + 1] = (Math.random() - 0.5) * 200;
      starPositions[i3 + 2] = (Math.random() - 0.5) * 200;
      starSizes[i] = Math.random() * 2;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

    const starMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 }
      },
      vertexShader: `
        attribute float size;
        varying float vSize;
        uniform float time;

        void main() {
          vSize = size;
          vec3 pos = position;
          pos.z = mod(pos.z + time * 10.0, 200.0) - 100.0;

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying float vSize;

        void main() {
          vec2 center = gl_PointCoord * 2.0 - 1.0;
          float dist = length(center);
          float alpha = smoothstep(1.0, 0.0, dist);

          vec3 color = mix(
            vec3(0.8, 0.9, 1.0),
            vec3(1.0),
            vSize / 2.0
          );

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 50;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      time += 0.005;
      starMaterial.uniforms.time.value = time;


      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }} className='black-hole' />;
}
