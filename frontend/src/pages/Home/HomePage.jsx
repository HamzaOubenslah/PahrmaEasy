import React from 'react'
import Section1 from './sections/Section1'
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';

const HomePage = () => {
  return (
    <div className='w-full h-full flex flex flex-col justify-center items-center'>
        <Section1 />
        <Section2 />
        <Section3 />
    </div>
  )
}

export default HomePage;