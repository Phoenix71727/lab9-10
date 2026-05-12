import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; // Імпорт функції сповіщення
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';
import { BookingService } from '../services/BookingService';

const Booking = () => {
  const { trainId } = useParams();
  const navigate = useNavigate(); // Для кнопки "Назад" та редиректу
  const [selectedWagon, setSelectedWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Завантаження заброньованих місць
  useEffect(() => {
    const alreadyBooked = BookingService.getBookedSeats(trainId, selectedWagon);
    setBookedSeats(alreadyBooked);
    setSelectedSeats([]); // Скидаємо вибір місць при зміні вагона
  }, [trainId, selectedWagon]);

  const handleSeatToggle = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBookingSubmit = (userData) => {
    const bookingPayload = {
      trainId,
      wagonId: selectedWagon,
      seats: selectedSeats,
      user: userData
    };

    // Зберігаємо в LocalStorage
    BookingService.saveBooking(bookingPayload);
    
    // Оновлюємо UI: робимо вибрані місця заброньованими (червоними)
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    
    // Викликаємо попап успішного бронювання
    toast.success(`Успішно! Заброньовано місця: ${selectedSeats.join(', ')}`);
    
    // Очищаємо вибір
    setSelectedSeats([]);
    
    // Редирект на головну сторінку через 3 секунди
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button 
        onClick={() => navigate('/')} 
        style={{ 
          marginBottom: '20px', 
          padding: '8px 16px', 
          cursor: 'pointer', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          backgroundColor: '#fff'
        }}
      >
        ← Назад до списку
      </button>

      <h2 style={{ marginBottom: '24px' }}>Бронювання квитків на потяг {trainId}</h2>
      
      <WagonSelector 
        selectedWagon={selectedWagon} 
        onSelectWagon={setSelectedWagon} 
      />
      
      <SeatMap 
        bookedSeats={bookedSeats} 
        selectedSeats={selectedSeats} 
        onSeatToggle={handleSeatToggle} 
      />
      
      <BookingForm 
        onSubmit={handleBookingSubmit} 
        disabled={selectedSeats.length === 0} 
      />
    </div>
  );
};

export default Booking;