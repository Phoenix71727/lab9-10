import React from 'react';
import './WagonSelector.css';

const WagonSelector = ({ selectedWagon, onSelectWagon }) => {
  // Мокові дані вагонів для прикладу
  const wagons = [
    { id: 1, type: 'Люкс', price: 1200 },
    { id: 2, type: 'Купе', price: 600 },
    { id: 3, type: 'Плацкарт', price: 300 },
  ];

  return (
    <div className="wagon-selector">
      <h3>1. Оберіть вагон</h3>
      <div className="wagon-buttons">
        {wagons.map((wagon) => (
          <button
            key={wagon.id}
            type="button"
            className={`wagon-btn ${selectedWagon === wagon.id ? 'active' : ''}`}
            onClick={() => onSelectWagon(wagon.id)}
          >
            <span className="wagon-number">Вагон {wagon.id}</span>
            <span className="wagon-type">{wagon.type}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WagonSelector;