import React from 'react';
import monkeyFetch from '../assets/monkeyFetch.gif';

const LoadingLoadout = () => {
  return (
    <div>
      <img src={monkeyFetch} alt="fetching" className="mx-auto min-w-min" />
    </div>
  );
};

export default LoadingLoadout;
