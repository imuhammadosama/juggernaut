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
            <li onClick={() => window.location.href('/about')}>Home</li>
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
              <b>Email:</b> help@juggernautpk.com
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
          <a href='https://facebook.com/juggernautpkofficial' target='_blank'>
            <img src={Facebook} />
          </a>
        </div>
        <div>
          <a href='https://twitter.com/juggernautpk' target='_blank'>
            <img src={Twitter} />
          </a>
        </div>
        <div>
          <a
            href='https://www.youtube.com/channel/UCT8tdE1iSfhtEhDrBcbeKgw'
            target='_blank'
          >
            <img src={Youtube} />
          </a>
        </div>
        <div>
          <a
            href='https://linkedin.com/company/juggernautpkofficial'
            target='_blank'
          >
            <img src={Linkedin} />
          </a>
        </div>
        <div>
          <a href='https://instagram.com/juggernautpkofficial' target='_blank'>
            <img src={Instagram} />
          </a>
        </div>
      </div>
      <div className='footer-copyright'>
        Copyright © 2022 Juggernaut Pvt. Ltd. All rights reserved. All
        trademarks are the property of their respective owners.
      </div>
    </div>
  );
}
