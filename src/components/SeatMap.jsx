import React from 'react';
import './SeatMap.css';

const SeatMap = ({ bookedSeats = [], selectedSeats = [], onSeatToggle }) => {
  const totalSeats = 36; // Стандартний плацкарт/купе
  const seats = Array.from({ length: totalSeats }, (_, i) => i + 1);

  return (
    <div className="seat-map-container">
      <h3>2. Оберіть місця</h3>
      
      <div className="seat-grid">
        {seats.map((seat) => {
          const isBooked = bookedSeats.includes(seat);
          const isSelected = selectedSeats.includes(seat);

          // Визначаємо клас для кольорової індикації
          let seatClass = 'seat free';
          if (isBooked) seatClass = 'seat booked';
          else if (isSelected) seatClass = 'seat selected';

          return (
            <button
              key={seat}
              type="button"
              className={seatClass}
              disabled={isBooked}
              onClick={() => onSeatToggle(seat)}
            >
              {seat}
            </button>
          );
        })}
      </div>

      <div className="seat-legend">
        <div className="legend-item"><span className="box free-box"></span> Вільні</div>
        <div className="legend-item"><span className="box selected-box"></span> Обрані</div>
        <div className="legend-item"><span className="box booked-box"></span> Заброньовані</div>
      </div>
    </div>
  );
};

export default SeatMap;