import React from 'react';

import VideoChat from './VideoChat';

const meeting = () => {
  return (
    <div className="app">
      <div >
        <h1 className='green center'>Video Chat </h1>
      </div>
      <main>
        <VideoChat />
      </main>
      
    </div>
  );
};

export default meeting;
