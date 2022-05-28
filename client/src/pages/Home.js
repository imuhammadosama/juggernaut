import './Home.css';

import Footer from '../components/Footer/Footer';

import { useState } from 'react';

import Slider from '../components/Sliders/Slider';
import CardSlider from '../components/CardSlider/CardSlider';
import CitiesSlider from '../components/CitiesSlider/CitiesSlider';

export default function Home() {
  return (
    <div>
      <Slider />
      <div className='home-content'>
        <div className='about-section'>
          <div className='about-section-column'>
            <div>
              <p className='about-section-tag'>Pakistan's</p>
              <h1 className='about-section-title'>First Smart Load Board</h1>
              <p className='about-section-description'>
                Juggernaut is Pakistan’s first smart load board, where you can
                get leads to all the available trucks and loads in the entire
                Pakistani trucking marketplace.
              </p>
              <button className='home-button'>Read More</button>
            </div>
          </div>
          <div className='about-section-column'>
            <img src='https://i.imgur.com/dTq4GCd.png' />
          </div>
        </div>
      </div>
      <div className='border-bottom'></div>
      <div className='dashboard-section'>
        <div className='dashboard-section-column'>
          <img src='https://i.imgur.com/wLoz0i8.png' width={'360px'} />
        </div>
        <div className='dashboard-section-column'>
          <div>
            <h1 className='dashboard-section-title'>Dashboard</h1>
            <p className='dashboard-section-description'>
              It is an integrated solution to help industries and carriers. We
              provide seamless information sharing to the transportation and
              brokers or customers in industry. By this service our aim is to
              enhance capacity usage to the fullest and enhance profitability
            </p>
            <button className='home-button'>Find details</button>
          </div>
        </div>
      </div>
      <div className='border-bottom'></div>
      <div className='mission-section'>
        <div className='mission-section-column'>
          <div>
            <h1 className='mission-section-title'>Our Mission</h1>
            <p className='mission-section-description'>
              It is an integrated solution to help industries and carriers. We
              provide seamless information sharing to the transportation and
              brokers or customers in industry. By this service our aim is to
              enhance capacity usage to the fullest and enhance profitability
            </p>
            <button className='home-button'>Find details</button>
          </div>
        </div>
        <div className='mission-section-column'></div>
      </div>
      <div className='max-width-1200'>
        <CardSlider />
      </div>
      <div className='cities'>
        <div className='max-width-1200'>
          <CitiesSlider />
        </div>
      </div>

      <Footer />
    </div>
  );
}
