import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './Slider.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper';

export default function Slider() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        className='mySwiper'
      >
        <SwiperSlide className='home-slider-one'>
          <div className='flex space-between flex-item home-slider-one-content'>
            <div className='text-left'>
              <div>
                <h1 className='home-slider-one-content-title'>
                  Take Uncertainty <br />
                  out of your Loads{' '}
                </h1>
              </div>
              <div>
                <div className='home-slider-one-content-description'>
                  50,000 Loads Per Day
                </div>
              </div>
              <div>
                <button className='home-slider-one-content-button'>
                  Find Details
                </button>
              </div>
            </div>
            <div>
              <img src='https://i.imgur.com/cWqo3VS.png' />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='home-slider-two'>
          <div className='flex space-between flex-item home-slider-one-content'>
            <div className='text-left'>
              <div>
                <h1 className='home-slider-one-content-title'>
                  Bringing revolution to <br />
                  Pakistan's Trucking Industry{' '}
                </h1>
              </div>
              <div>
                <div className='home-slider-one-content-description'>
                  50,000 Loads Per Day
                </div>
              </div>
              <div>
                <button className='home-slider-one-content-button'>
                  Find Details
                </button>
              </div>
            </div>
            <div>{/* <img src='https://i.imgur.com/cWqo3VS.png' /> */}</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='home-slider-three'>
          <div className='flex space-between flex-item home-slider-one-content'>
            <div className='text-left'>
              <div>
                <h1 className='home-slider-one-content-title'>
                  We ship all over <br />
                  Pakistan{' '}
                </h1>
              </div>
              <div>
                <div className='home-slider-one-content-description'>
                  50,000 Loads Per Day
                </div>
              </div>
              <div>
                <button className='home-slider-one-content-button'>
                  Find Details
                </button>
              </div>
            </div>
            <div>{/* <img src='https://i.imgur.com/cWqo3VS.png' /> */}</div>
          </div>
        </SwiperSlide>
        <SwiperSlide className='home-slider-four'>
          <div className='flex space-between flex-item home-slider-one-content'>
            <div className='text-left'>
              <div>
                <h1 className='home-slider-one-content-title'>
                  Dedicated team, who <br />
                  can securely deliver.
                </h1>
              </div>
              <div>
                <div className='home-slider-one-content-description'>
                  50,000 Loads Per Day
                </div>
              </div>
              <div>
                <button className='home-slider-one-content-button'>
                  Find Details
                </button>
              </div>
            </div>
            <div>{/* <img src='https://i.imgur.com/cWqo3VS.png' /> */}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}