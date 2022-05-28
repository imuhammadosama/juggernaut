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
          delay: 1500,
          disableOnInteraction: false,
          speed: 300,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        className='mySwiper2'
      >
        <SwiperSlide className='card-slider-one'>
          <div className='card-content'>
            <div className='comodity-slider-title'>FMCG</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-two'>
          <div className='card-content'>
            <div className='comodity-slider-title'>AUTO</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-three'>
          <div className='card-content'>
            <div className='comodity-slider-title'>OIL & GAS</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-four'>
          <div className='card-content'>
            <div className='comodity-slider-title'>TEXTILE</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-five'>
          <div className='card-content'>
            <div className='comodity-slider-title'>CEMENT</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-six'>
          <div className='card-content'>
            <div className='comodity-slider-title'>CHEMICALS</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-seven'>
          <div className='card-content'>
            <div className='comodity-slider-title title-PHARMACEUTICALS'>
              PHARMACEUTICALS
            </div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-eight'>
          <div className='card-content'>
            <div className='comodity-slider-title'>BEVERAGES</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-nine'>
          <div className='card-content'>
            <div className='comodity-slider-title'>AGRICULTURE</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='card-slider-ten'>
          <div className='card-content'>
            <div className='comodity-slider-title'>GENERAL GOODS</div>
            <div className='comodity-slider-details'>View More</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
