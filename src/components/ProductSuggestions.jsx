import React from 'react';
import axios from 'axios';

const ProductSuggestions = ({ suggestions }) => {
  const getProductSuggestions = async (layout) => {
    // This is a placeholder - in a real app, this would call an API
    // that analyzes the layout and suggests appropriate storage solutions
    const suggestions = [
      {
        name: 'Adjustable Storage Shelf',
        description: '5-tier adjustable shelf for optimal organization',
        price: '$49.99',
        link: '#',
        image: 'shelf.jpg'
      },
      {
        name: 'Clear Storage Bins',
        description: 'Set of 3 clear storage bins with labels',
        price: '$24.99',
        link: '#',
        image: 'bins.jpg'
      }
    ];
    return suggestions;
  };

  return (
    <div className="product-suggestions">
      <h2>Product Suggestions</h2>
      <div className="suggestions-grid">
        {suggestions.map((suggestion, index) => (
          <div key={index} className="suggestion-card">
            <img src={suggestion.image} alt={suggestion.name} />
            <h3>{suggestion.name}</h3>
            <p>{suggestion.description}</p>
            <p className="price">{suggestion.price}</p>
            <a href={suggestion.link} className="buy-button">
              View Product
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSuggestions;
