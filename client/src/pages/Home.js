import './Home.css';

// Icons
import rightArrow from '../assets/icons/right-arrow.svg';
import leftArrow from '../assets/icons/left-arrow.svg';

import roundedRightArrow from '../assets/icons/rounded-right-arrow.svg';
import roundedLeftArrow from '../assets/icons/rounded-left-arrow.svg';

import Footer from '../components/Footer/Footer';

import Video from '../components/Modal/Video/Video';
import { useState } from 'react';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  function slide() {
    const slider = document.getElementById('slider');
    slider.src === 'https://i.imgur.com/JGlqMPT.jpg'
      ? (slider.src = 'https://i.imgur.com/zUOlo9y.jpg')
      : (slider.src = 'https://i.imgur.com/JGlqMPT.jpg');
  }

  return (
    <div>
      {openModal && <Video closeModal={setOpenModal} />}
      <div className='sliders'>
        <img src='https://i.imgur.com/JGlqMPT.jpg' id='slider' />
        <div className='slider-content'>
          <div id='slider-previous' className='pl-120' onClick={slide}>
            <img src={leftArrow} />
          </div>
          <div id='slider-next' className='pr-120' onClick={slide}>
            <img src={rightArrow} />
          </div>
        </div>
      </div>
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
        <div className='mission-section-column'>
          <img
            src='https://i.imgur.com/LDNv9FJ.png'
            width={'360px'}
            onClick={() => setOpenModal(true)}
            className='home-video'
          />
        </div>
      </div>
      <div className='cards'>
        <img src={roundedLeftArrow} />
        <img className='card' src='https://i.imgur.com/o9Ne6wi.png' />
        <img className='card' src='https://i.imgur.com/YgEeHwj.png' />
        <img className='card' src='https://i.imgur.com/cXTxcqO.png' />
        <img className='card' src='https://i.imgur.com/9ffIWgr.png' />
        <img className='card' src='https://i.imgur.com/ZDdYba6.png' />
        <img src={roundedRightArrow} />
      </div>
      <div className='cities'>
        <img src={leftArrow} />
        <p className='city'>Karachi</p>
        <p className='city'>Lahore</p>
        <p className='city city-active'>Islamabad</p>
        <p className='city'>Rawalpindi</p>
        <p className='city'>Peshawar</p>
        <img src={rightArrow} />
      </div>
      <Footer />
    </div>
  );
}
