import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TrainCard.css';

const TrainCard = ({ train }) => {
  const navigate = useNavigate(); // Ініціалізуємо навігацію

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
        {/* Додаємо обробник події кліку */}
        <button 
          className="btn-select" 
          type="button" 
          onClick={() => navigate(`/booking/${train.id}`)}
        >
          Вибрати
        </button>
      </div>
    </div>
  );
};

export default TrainCard;