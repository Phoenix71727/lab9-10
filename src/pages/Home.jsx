import React from 'react';
import TrainList from '../components/TrainList';

const Home = () => {
  return (
    <div className="home-page">
      <h1 className="main-title">Бронювання залізничних квитків</h1>
      <TrainList />
    </div>
  );
};

export default Home;