import React from 'react';
import TrainList from '../components/TrainList';

const Home = () => {
  return (
    <div className="home-page">
      <h1 style={{ textAlign: 'center', margin: '20px 0', color: '#333' }}>
        Бронювання залізничних квитків
      </h1>
      <TrainList />
    </div>
  );
};

export default Home;