import React, { useState } from 'react';
import './BookingForm.css';

const BookingForm = ({ onSubmit, disabled }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Очищаємо помилку поля при введенні
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validate = () => {
    const newErrors = {};

    // Валідація імені
    if (!formData.name.trim()) {
      newErrors.name = "Ім'я є обов'язковим";
    } else if (formData.name.length < 2) {
      newErrors.name = "Ім'я надто коротке";
    }

    // Валідація телефону (формат України: +380...)
    const phoneRegex = /^\+380\d{9}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = "Телефон є обов'язковим";
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = "Формат має бути: +380XXXXXXXXX";
    }

    // Валідація email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email є обов'язковим";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Невірний формат email";
    }

    setErrors(newErrors);
    
    // Повертає true, якщо помилок немає
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Зупиняємо стандартне перезавантаження сторінки
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="booking-form-container">
      <h3>3. Ваші дані</h3>
      <form onSubmit={handleSubmit} className="booking-form" noValidate>
        
        <div className="form-group">
          <label htmlFor="name">ПІБ</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Іваненко Іван"
            className={errors.name ? 'error-input' : ''}
          />
          {errors.name && <span className="error-text">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Номер телефону</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+380XXXXXXXXX"
            className={errors.phone ? 'error-input' : ''}
          />
          {errors.phone && <span className="error-text">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email для квитка</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@mail.com"
            className={errors.email ? 'error-input' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <button 
          type="submit" 
          className="btn-submit" 
          disabled={disabled}
        >
          Підтвердити бронювання
        </button>
      </form>
    </div>
  );
};

export default BookingForm;