import React, { useRef, useState } from 'react';
// Import Swiper React compnts
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './CardSlider.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';
import { HashLink } from 'react-router-hash-link';

export default function CardSlider() {
  return (
    <>
      <Swiper
        slidesPerView={8}
        spaceBetween={24}
        slidesPerGroup={2}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        className='mySwiper2'
      >
        <SwiperSlide className='card-slider-one'>
          <div className='card-content'>
            <div className='comodity-slider-title'>FMCG</div>
            <div className='comodity-slider-details'>
              <HashLink to='/business/#fmcg'>View More</HashLink>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-two'>
          <div className='card-content'>
            <div className='comodity-slider-title'>AUTO</div>
            <HashLink to='/business/#auto'>View More</HashLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-three'>
          <div className='card-content'>
            <div className='comodity-slider-title'>OIL & GAS</div>
            <HashLink to='/business/#oil-and-gas'>View More</HashLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-four'>
          <div className='card-content'>
            <div className='comodity-slider-title'>TEXTILE</div>
            <HashLink to='/business/#textile'>View More</HashLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-five'>
          <div className='card-content'>
            <div className='comodity-slider-title'>CEMENT</div>
            <HashLink to='/business/#cement'>View More</HashLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-six'>
          <div className='card-content'>
            <div className='comodity-slider-title'>CHEMICALS</div>
            <HashLink to='/business/#chemical'>View More</HashLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-seven'>
          <div className='card-content'>
            <div className='comodity-slider-title title-PHARMACEUTICALS'>
              PHARMACEUTICALS
            </div>
            <HashLink to='/business/#pharmaceutical'>View More</HashLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-eight'>
          <div className='card-content'>
            <div className='comodity-slider-title'>BEVERAGES</div>
            <HashLink to='/business/#beverages'>View More</HashLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-nine'>
          <div className='card-content'>
            <div className='comodity-slider-title'>AGRICULTURE</div>
            <HashLink to='/business/#agriculture'>View More</HashLink>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-ten'>
          <div className='card-content'>
            <div className='comodity-slider-title'>GENERAL GOODS</div>
            <HashLink to='/business/#general-goods'>View More</HashLink>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
