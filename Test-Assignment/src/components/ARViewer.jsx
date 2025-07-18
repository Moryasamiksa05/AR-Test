import React, { useMemo } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls, Stage } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const Model = () => {
  const dracoLoader = useMemo(() => {
    const loader = new DRACOLoader();
    loader.setDecoderConfig({ type: "js" });
    loader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");
    return loader;
  }, []);

  const gltf = useLoader(GLTFLoader, "/models/Chair.glb", (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  
  useMemo(() => {
    gltf.scene.position.set(0, -1, 0); 
    gltf.scene.scale.set(1.2, 1.2, 1.2);
  }, [gltf]);

  return <primitive object={gltf.scene} />;
};

const ARViewer = () => (
  <div className="bg-white p-4 rounded-2xl shadow-xl w-full max-w-xl h-64 md:h-96 my-6">
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 50 }}>
      {/* Soft lighting */}
      <ambientLight intensity={0.7} />
      <Stage
        environment="city"
        intensity={0.7}
        contactShadow
        shadows
        preset="rembrandt"
        adjustCamera
      >
        <Model />
      </Stage>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  </div>
);

export default ARViewer;
