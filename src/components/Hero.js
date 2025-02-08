import React from 'react';

const Hero = () => {
    const bgImage = 'https://img.freepik.com/premium-vector/serene-young-woman-with-braided-hair-sitting-floor-looking-peaceful-calm_1326094-3671.jpg?w=1380'
  return (
    <div className="w-full">
      <div className="relative bg-cover bg-center w-full h-48 sm:h-64 md:h-72 lg:h-96" style={{ backgroundImage:  `url(${bgImage})` }}>
      <div className='w-2/3 mx-auto absolute bottom-10 left-20 p-1 bg-background'>
      <h1 className="text-text font-bold text-left  text-lg sm:text-2xl md:text-3xl lg:text-4xl">Hi. I am Oyindamola</h1>
      </div>
      <p className=' absolute bottom-2 left-20 text-text font-italic'> </p>
      </div>
    </div>
  );
};

export default Hero;
