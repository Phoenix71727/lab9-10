import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import WagonSelector from '../components/WagonSelector';
import SeatMap from '../components/SeatMap';
import BookingForm from '../components/BookingForm';
import { BookingService } from '../services/BookingService';

const Booking = () => {
  const { trainId } = useParams();
  const [selectedWagon, setSelectedWagon] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  // Завантаження заброньованих місць при зміні потяга або вагона
  useEffect(() => {
    const alreadyBooked = BookingService.getBookedSeats(trainId, selectedWagon);
    setBookedSeats(alreadyBooked);
    setSelectedSeats([]); // Скидаємо вибір при переході в інший вагон
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

    BookingService.saveBooking(bookingPayload);
    
    // Оновлюємо UI: додаємо щойно заброньовані місця до списку червоних
    setBookedSeats([...bookedSeats, ...selectedSeats]);
    setSelectedSeats([]);
    
    alert('Бронювання успішно збережено!'); 
    // На наступному кроці замінимо alert на красиві сповіщення react-toastify
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Бронювання квитків на потяг №{trainId}</h2>
      
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