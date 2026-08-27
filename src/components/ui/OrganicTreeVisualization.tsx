import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface BranchData {
  mesh: THREE.Group;
  baseRotX: number;
  baseRotZ: number;
  phase: number;
  speed: number;
}

export const OrganicTreeVisualization: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let resizeObserver: ResizeObserver | null = null;

    const width = container.clientWidth || 500;
    const height = container.clientHeight || 350;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 11.5;
    camera.position.y = 0.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.95);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x10b981, 0.9);
    dirLight.position.set(10, 20, 10);
    scene.add(dirLight);

    const pointLight = new THREE.PointLight(0x003bcb, 1.1, 20);
    pointLight.position.set(0, 0, 6);
    scene.add(pointLight);

    const treeGroup = new THREE.Group();
    treeGroup.position.y = -2.6;
    scene.add(treeGroup);

    const allBranches: BranchData[] = [];

    const branchMaterial = new THREE.MeshPhongMaterial({
      color: 0x16a34a, // Vibrant organic green
      transparent: true,
      opacity: 0.94,
      shininess: 45,
      emissive: 0x064e3b,
      emissiveIntensity: 0.25,
    });

    const leafMaterial = new THREE.MeshPhongMaterial({
      color: 0x22c55e,
      emissive: 0x15803d,
      emissiveIntensity: 0.4,
      shininess: 60,
    });

    function buildCurvedTree(
      parent: THREE.Group,
      depth: number,
      length: number,
      radius: number,
      angleX: number,
      angleZ: number,
      curveBend: number
    ) {
      if (depth === 0) return;

      const pivot = new THREE.Group();
      pivot.rotation.x = angleX;
      pivot.rotation.z = angleZ;
      parent.add(pivot);

      // Create a smooth curved branch using Quadratic Bezier Curve & TubeGeometry
      const start = new THREE.Vector3(0, 0, 0);
      const end = new THREE.Vector3(curveBend * 0.4, length, curveBend * 0.2);
      const mid = new THREE.Vector3(
        curveBend * 0.6,
        length * 0.5,
        curveBend * 0.4
      );

      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      const geometry = new THREE.TubeGeometry(curve, 8, radius, 6, false);
      const branchMesh = new THREE.Mesh(geometry, branchMaterial);
      pivot.add(branchMesh);

      // Terminal leaf / glowing node
      if (depth === 1) {
        const leafGeom = new THREE.SphereGeometry(radius * 2.2, 8, 8);
        const leaf = new THREE.Mesh(leafGeom, leafMaterial);
        leaf.position.copy(end);
        pivot.add(leaf);
      }

      allBranches.push({
        mesh: pivot,
        baseRotX: angleX,
        baseRotZ: angleZ,
        phase: Math.random() * Math.PI * 2,
        speed: 0.6 + Math.random() * 0.4,
      });

      const nextRadius = radius * 0.72;
      if (depth > 1) {
        const nextLength = length * 0.76;

        // Sub-branch 1 (curving outward)
        const p1 = new THREE.Group();
        p1.position.copy(end);
        pivot.add(p1);
        buildCurvedTree(
          p1,
          depth - 1,
          nextLength,
          nextRadius,
          0.32,
          0.38,
          0.35
        );

        // Sub-branch 2 (curving opposite)
        const p2 = new THREE.Group();
        p2.position.copy(end);
        pivot.add(p2);
        buildCurvedTree(
          p2,
          depth - 1,
          nextLength,
          nextRadius,
          -0.3,
          -0.34,
          -0.35
        );

        // Occasional Sub-branch 3
        if (depth >= 3 && Math.random() > 0.4) {
          const p3 = new THREE.Group();
          p3.position.copy(mid);
          pivot.add(p3);
          buildCurvedTree(
            p3,
            depth - 1,
            nextLength * 0.85,
            nextRadius,
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 0.6,
            (Math.random() - 0.5) * 0.4
          );
        }
      }
    }

    buildCurvedTree(treeGroup, 5, 2.3, 0.22, 0, 0, 0.15);

    const animate = (t: number) => {
      animId = requestAnimationFrame(animate);
      const time = t * 0.001;

      allBranches.forEach((data) => {
        const swayX = Math.sin(time * data.speed + data.phase) * 0.04;
        const swayZ = Math.cos(time * data.speed + data.phase) * 0.04;
        data.mesh.rotation.x = data.baseRotX + swayX;
        data.mesh.rotation.z = data.baseRotZ + swayZ;
      });

      treeGroup.rotation.y = time * 0.18;
      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 500;
      const h = container.clientHeight || 350;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 flex items-center justify-center pointer-events-none"
    />
  );
};
