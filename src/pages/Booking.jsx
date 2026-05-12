import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Booking = () => {
  const { trainId } = useParams(); // Отримуємо ID потяга з URL

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Сторінка бронювання</h2>
      <p>Ви обрали потяг з ID: <strong>{trainId}</strong></p>
      
      {/* Заглушка: тут у 10-й лабі будуть вагони, місця та форма */}
      <p style={{ color: '#777', marginTop: '20px' }}>
        Тут скоро з'явиться вибір місць (Лабораторна 10)...
      </p>
      
      <Link to="/" style={{ display: 'inline-block', marginTop: '20px', color: '#007bff' }}>
        Повернутися на головну
      </Link>
    </div>
  );
};

export default Booking;