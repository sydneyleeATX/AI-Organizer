import React from 'react';
import { useDrag } from 'react-dnd';
import { useThree } from '@react-three/fiber';

const OrganizationView = ({ layout, items }) => {
  const { camera } = useThree();

  const createItemMesh = (item, position) => {
    const size = 0.5; // Base size for items
    const colors = {
      'book': '#2ecc71',
      'bottle': '#3498db',
      'cup': '#e74c3c',
      'keyboard': '#95a5a6',
      'mouse': '#f1c40f',
      'default': '#9b59b6'
    };

    return (
      <mesh
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          // Handle item click
        }}
      >
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial color={colors[item.toLowerCase()] || colors.default} />
      </mesh>
    );
  };

  return (
    <>
      {layout?.map((item, index) => (
        <group key={index}>
          {createItemMesh(item.type, [item.position.x, item.position.y, 0])}
        </group>
      ))}

      {/* Add shelves and bins based on layout analysis */}
      {layout && (
        <group position={[0, 0, -2]}>
          <mesh position={[0, -1, 0]}>
            <boxGeometry args={[5, 0.1, 3]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <boxGeometry args={[5, 0.1, 3]} />
            <meshStandardMaterial color="#34495e" />
          </mesh>
        </group>
      )}
    </>
  );
};

export default OrganizationView;
