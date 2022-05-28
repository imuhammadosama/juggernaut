import React, { useRef, useState } from 'react';
// Import Swiper React compnts
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './CitiesSlider.css';

// import required modules
import { Pagination, Navigation, Autoplay } from 'swiper';

export default function CitiesSlider() {
  const cities = [
    'Karachi',
    'Islamabad',
    'Lahore',
    'Faislabad',
    'Peshawar',
    'Quetta',
    'Rawalpindi',
    'Gujranwala',
    'Sialkot',
    'Wazirabad',
    'Gujrat',
    'Okara',
    'Sahiwal',
    'Multan',
    'DG Khan',
    'Rahim Yar Khan',
    'Sukkur',
    'Hyderabad',
    'Gawadar',
    'Sawat',
    'Chitral',
    'Azad Kashimir',
  ];

  return (
    <>
      <Swiper
        slidesPerView={8}
        spaceBetween={1}
        slidesPerGroup={2}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        className='mySwiper3'
      >
        {cities.map((city) => {
          return (
            <SwiperSlide className='cities-slider'>
              <div className='cities-content'>
                <div className='cities-slider-title'>{city}</div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
