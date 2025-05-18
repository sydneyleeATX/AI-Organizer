import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import ItemInventory from './components/ItemInventory';
import SpaceScanner from './components/SpaceScanner';
import OrganizationView from './components/OrganizationView';
import ProductSuggestions from './components/ProductSuggestions';

function App() {
  const [items, setItems] = useState([]);
  const [spaceLayout, setSpaceLayout] = useState(null);
  const [productSuggestions, setProductSuggestions] = useState([]);

  return (
    <div className="app-container">
      <header>
        <h1>Home Organization Assistant</h1>
      </header>
      
      <main className="main-content">
        <div className="inventory-section">
          <ItemInventory items={items} onAddItem={(item) => setItems([...items, item])} />
        </div>

        <div className="scanner-section">
          <SpaceScanner onScanComplete={(layout) => setSpaceLayout(layout)} />
        </div>

        <div className="organization-section">
          <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <OrganizationView layout={spaceLayout} items={items} />
            <OrbitControls />
          </Canvas>
        </div>

        <div className="suggestions-section">
          <ProductSuggestions suggestions={productSuggestions} />
        </div>
      </main>

      <footer>
        <p>AI Home Organization Assistant © 2025</p>
      </footer>
    </div>
  );
}

export default App;
