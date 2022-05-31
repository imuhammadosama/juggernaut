// Socials
import Facebook from '../../assets/images/home/footer/social/Facebook.svg';
import Instagram from '../../assets/images/home/footer/social/Instagram.svg';
import Linkedin from '../../assets/images/home/footer/social/Linkedin.svg';
import Twitter from '../../assets/images/home/footer/social/Twitter.svg';
import Youtube from '../../assets/images/home/footer/social/Youtube.svg';

import './Footer.css';

export default function Footer() {
  return (
    <div className='footer'>
      <div className='footer-content'>
        <div className='footer-column'>
          <div className='footer-title'>Juggernaut</div>
          <div className='footer-description'>
            Get in contact with us to see how we could serve you and your
            transportation needs
          </div>
          <div>
            <div className='footer-subtitle'>Subscribe to our newsletter</div>
            <form className='flex'>
              <input type='text' placeholder='Please enter your email' />
              <input
                type='submit'
                className='primary-button'
                value='Subscribe'
              />
            </form>
          </div>
        </div>
        <div className='footer-column'>
          <div className='footer-title'>QuickLinks</div>
          <div className='footer-description'>
            <li>Home</li>
            <li>About us</li>
            <li>Businesses</li>
            <li>Career</li>
          </div>
        </div>
        <div className='footer-column'>
          <div className='footer-title'>Support</div>
          <div className='footer-description'>
            <li>
              <b>Phone:</b> UAN 304 111 2997
            </li>
            <li>
              <b>Email:</b> help@juggernaut.com
            </li>
            <li>
              <b>Address:</b> 223 2nd Floor, HBL Building, <br />
              IBA City Campus, Karachi
            </li>
          </div>
        </div>
      </div>
      <div className='border-line'></div>
      <div className='footer-social'>
        <div>
          <img src={Facebook} />
        </div>
        <div>
          <img src={Instagram} />
        </div>
        <div>
          <img src={Twitter} />
        </div>
        <div>
          <img src={Youtube} />
        </div>
        <div>
          <img src={Linkedin} />
        </div>
      </div>
      <div className='footer-copyright'>
        Copyright © 2022 Juggernaut Pvt. Ltd. All rights reserved. All
        trademarks are the property of their respective owners.
      </div>
    </div>
  );
}
