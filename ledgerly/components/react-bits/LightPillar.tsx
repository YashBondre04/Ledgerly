"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface LightPillarProps {
    topColor?: string;
    bottomColor?: string;
    intensity?: number;
    rotationSpeed?: number;
    interactive?: boolean;
    glowAmount?: number;
    pillarWidth?: number;
    pillarHeight?: number;
    noiseIntensity?: number;
    className?: string;
    mixBlendMode?: string;
    pillarRotation?: number;
    quality?: "low" | "medium" | "high";
    style?: React.CSSProperties;
}

const LightPillar: React.FC<LightPillarProps> = ({
    topColor = "#5227FF",
    bottomColor = "#FF9FFC",
    intensity = 1.0,
    rotationSpeed = 0.3,
    interactive = false,
    glowAmount = 0.005,
    pillarWidth = 3.0,
    pillarHeight = 0.4,
    noiseIntensity = 0.5,
    className = "",
    mixBlendMode = "screen",
    pillarRotation = 0,
    quality = "high",
    style,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Setup Scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.offsetWidth / container.offsetHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: quality === 'high' });
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        // Cylinder Geometry for Pillar
        const geometry = new THREE.CylinderGeometry(pillarWidth, pillarWidth, 10, 32, 1, true);

        // Custom Shader Material
        const vertexShader = `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normal;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

        const fragmentShader = `
      uniform vec3 uTopColor;
      uniform vec3 uBottomColor;
      uniform float uIntensity;
      uniform float uTime;
      varying vec2 vUv;
      
      void main() {
        // Gradient
        vec3 color = mix(uBottomColor, uTopColor, vUv.y);
        
        // Simple glow falloff
        float glow = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 3.0);
        
        // Add some noise-like variation
        float noise = sin(vUv.y * 20.0 - uTime * 2.0) * 0.1;
        
        gl_FragColor = vec4(color, (glow + noise) * uIntensity * 0.5);
      }
    `;

        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTopColor: { value: new THREE.Color(topColor) },
                uBottomColor: { value: new THREE.Color(bottomColor) },
                uIntensity: { value: intensity },
                uTime: { value: 0 },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false, // Important for glowing effect
            blending: THREE.AdditiveBlending,
        });

        const pillar = new THREE.Mesh(geometry, material);
        pillar.rotation.x = 0.2; // slight tilt
        scene.add(pillar);

        // Animation Loop
        let animationId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            animationId = requestAnimationFrame(animate);

            const elapsedTime = clock.getElapsedTime();
            material.uniforms.uTime.value = elapsedTime;

            pillar.rotation.y += rotationSpeed * 0.01;

            renderer.render(scene, camera);
        };

        animate();

        // Resize Handler
        const handleResize = () => {
            if (!containerRef.current) return;
            const width = containerRef.current.offsetWidth;
            const height = containerRef.current.offsetHeight;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationId);
            if (container && renderer.domElement && container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [topColor, bottomColor, intensity, rotationSpeed, interactive, glowAmount, pillarWidth, pillarHeight, noiseIntensity, quality]);

    return (
        <div
            ref={containerRef}
            className={`${className} absolute inset-0 -z-10`}
            style={{ ...style, mixBlendMode: mixBlendMode as any }}
        />
    );
};

export default LightPillar;
