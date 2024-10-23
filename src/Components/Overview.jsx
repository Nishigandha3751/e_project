import React from 'react';
import { Outlet } from 'react-router';

const Overview = () => {
  return (
    <div className='border border-1 border-secondary text-center px-2 mt-4' style={{ borderRadius: '10px', height: '100vh' }}>
      <h1>Welcome Nishigandha...</h1>
      <p>This is your overview page where you can find important information and updates.</p>
     
      <Outlet/>
    </div>

  );
}

export default Overview;
