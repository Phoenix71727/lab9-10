const STORAGE_KEY = 'railway_bookings';

export const BookingService = {
  // Отримати всі бронювання з локального сховища
  getAllBookings: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Отримати заброньовані місця для конкретного потяга та вагона
  getBookedSeats: (trainId, wagonId) => {
    const allBookings = BookingService.getAllBookings();
    return allBookings
      .filter(b => b.trainId === trainId && b.wagonId === wagonId)
      .flatMap(b => b.seats); // Повертаємо плоский масив номерів місць
  },

  // Зберегти нове бронювання
  saveBooking: (bookingData) => {
    const allBookings = BookingService.getAllBookings();
    const newBooking = {
      ...bookingData,
      id: Date.now(), // Унікальний ID для запису
      date: new Date().toISOString()
    };
    
    const updatedBookings = [...allBookings, newBooking];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
    return newBooking;
  }
};