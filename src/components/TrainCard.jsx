import React from 'react';
import './TrainCard.css';

const TrainCard = ({ train }) => {
  return (
    <div className="train-card">
      <div className="train-card-header">
        <h3>Потяг №{train.trainNumber}</h3>
      </div>
      <div className="train-card-body">
        <p><strong>Маршрут:</strong> {train.departureCity} — {train.arrivalCity}</p>
        <p><strong>Відправлення:</strong> {train.departureDateTime}</p>
        <p><strong>Тривалість:</strong> {train.duration}</p>
      </div>
      <div className="train-card-footer">
        <button className="btn-select" type="button">
          Вибрати
        </button>
      </div>
    </div>
  );
};

export default TrainCard;