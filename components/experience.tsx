"use client";
import { randomTopic } from "@/static/randomTopic";
import {
  Center,
  Float,
  OrbitControls,
  PresentationControls,
  Text3D,
  useMatcapTexture,
} from "@react-three/drei";
import { use, useEffect, useState } from "react";
export default function Experience() {
  const [matcap] = useMatcapTexture("75322B_96463F_51201A_3D1814", 256);
  const [material, setMaterial] = useState<any>();
  useEffect(() => {});
  return (
    <>
      <Float rotationIntensity={0.4}>
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap
          rotation={[0, 0.5, 0]}
          polar={[-Math.PI / 2, Math.PI / 2]} //for vertical dragging
          azimuth={[-Math.PI / 1.4, Math.PI / 2]} //for horizontal dragging
        >
          <meshMatcapMaterial matcap={matcap} ref={setMaterial} />

          <mesh>
            <Center>
              <Text3D font="/font/asap.json" bevelEnabled material={material}>
                Striver Sheet
              </Text3D>
            </Center>
          </mesh>

          {randomTopic.map((topic, i) => {
            return (
              <mesh
                position={[
                  (Math.random() - 0.5) * 8,
                  (Math.random() - 0.5) * 8,
                  (Math.random() - 0.5) * 8,
                ]}
                scale={0.1 + Math.random() * 0.1}
                key={i}
              >
                <Text3D font="/font/asap.json" material={material}>
                  {topic}
                </Text3D>
              </mesh>
            );
          })}
        </PresentationControls>
      </Float>
    </>
  );
}
