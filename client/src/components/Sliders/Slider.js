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
import { HashLink } from 'react-router-hash-link';

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
          pauseOnMouseEnter: true,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        navigation={true}
        className='mySwiper'
      >
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
                <div className='home-slider-one-content-description'></div>
              </div>
              <div>
                <HashLink
                  className='home-slider-one-content-button'
                  to='/details/#s1'
                >
                  Find Details
                </HashLink>
              </div>
            </div>
            <div>
              {/* <img src='https://res.cloudinary.com/dnvsynb1c/image/upload/v1655555622/Frame_2_yi1hab.jpg' /> */}
            </div>
          </div>
        </SwiperSlide>
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
                  5,000 Loads Per Day
                </div>
              </div>
              <div>
                <HashLink
                  className='home-slider-one-content-button'
                  to='/details/#s3'
                >
                  Find Details
                </HashLink>
              </div>
            </div>
            <div>
              <img src='https://i.imgur.com/cWqo3VS.png' />
            </div>
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
                <div className='home-slider-one-content-description'></div>
              </div>
              <div>
                <HashLink
                  className='home-slider-one-content-button'
                  to='/details/#s2'
                >
                  Find Details
                </HashLink>
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
                <div className='home-slider-one-content-description'></div>
              </div>
              <div>
                <HashLink
                  className='home-slider-one-content-button'
                  to='/details/#s4'
                >
                  Find Details
                </HashLink>
              </div>
            </div>
            <div>{/* <img src='https://i.imgur.com/cWqo3VS.png' /> */}</div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
