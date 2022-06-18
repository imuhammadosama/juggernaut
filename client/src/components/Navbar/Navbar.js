import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import chevDown from '../../assets/icons/chev-down.svg';
import { HashLink } from 'react-router-hash-link';

// Businesses
import oilAndGas from '../../assets/navbar/businesses/oil-and-gas.svg';
import textile from '../../assets/navbar/businesses/textile.svg';
import fmcg from '../../assets/navbar/businesses/fmcg.svg';
import auto from '../../assets/navbar/businesses/auto.svg';
import chemical from '../../assets/navbar/businesses/chemical.svg';
import beverages from '../../assets/navbar/businesses/beverages.svg';
import cement from '../../assets/navbar/businesses/cement.svg';
import generalGoods from '../../assets/navbar/businesses/general-goods.svg';
import pharmaceutical from '../../assets/navbar/businesses/pharmaceutical.svg';
import agriculture from '../../assets/navbar/businesses/agriculture.svg';

import Login from '../../pages/Login.js';
import Register from '../../pages/Register';
import { useNavigate } from 'react-router-dom';
import NavDropdown from '../Dropdown/NavDropdown';
import './Navbar.css';

function Navigation(props) {
  const [userExists, setUserExists] = useState(false);
  const [registerType, setRegisterType] = useState('');
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  let location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUserExists(true);
    }
  }, []);

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  }

  if (
    location.pathname === '/' ||
    location.pathname === '/business/' ||
    location.pathname === '/details/' ||
    location.pathname === '/services/'
  )
    return (
      <div className='home-header border-bottom'>
        {openLogin && <Login closeModal={setOpenLogin} />}
        {openRegister && (
          <Register closeModal={setOpenRegister} type={registerType} />
        )}
        <div className='top-bar'>
          <div className='top-bar-content'>
            <div className='pt-4 roboto bold'>UAN 304 111 2997</div>
            {userExists ? (
              <div>
                <a href='/loads' className='top-bar-content-link'>
                  Dashboard
                </a>
                <a onClick={logout} className='top-bar-content-link' href='#'>
                  Logout
                </a>
              </div>
            ) : (
              <div className='flex'>
                <div className='home-dropdown'>
                  <button className='signup-button'>Signup</button>
                  <div className='home-dropdown-content'>
                    <li
                      className='signup-list clickable'
                      onClick={() => {
                        setOpenRegister(true);
                        setRegisterType('Business');
                      }}
                    >
                      <a className='signup-item'>Business</a>
                    </li>
                    <li
                      className='signup-list clickable'
                      onClick={() => {
                        setOpenRegister(true);
                        setRegisterType('Carrier');
                      }}
                    >
                      <a className='signup-item'>Carrier</a>
                    </li>
                  </div>
                </div>
                <button
                  className='login-button'
                  onClick={() => {
                    setOpenLogin(true);
                  }}
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </div>

        <div className='menu-bar'>
          <div className='menu-bar-content'>
            <div>
              <a href='/'>
                <img src={logo} />
              </a>
            </div>
            <div>
              <ul className='menu-items'>
                <li>
                  <a className='menu-link menu-child-href' href='/'>
                    Home
                  </a>
                </li>
                <li>
                  <a className='menu-link'>About Us</a>
                </li>
                <li>
                  <span className='menu-link menu-parent'>
                    Businesses <img src={chevDown} className='menu-icon'></img>
                    <div className='menu-child menu-child-businesses'>
                      <div className='menu-child-container'>
                        <div className='menu-child-column-one'>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={oilAndGas} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#oil-and-gas'
                                className='menu-child-href'
                              >
                                Oil & Gas
                              </HashLink>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={textile} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#textile'
                                className='menu-child-href'
                              >
                                Textile
                              </HashLink>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={fmcg} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#fmcg'
                                className='menu-child-href'
                              >
                                FMCG
                              </HashLink>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={auto} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#auto'
                                className='menu-child-href'
                              >
                                Auto
                              </HashLink>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={chemical} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#chemical'
                                className='menu-child-href'
                              >
                                Chemical
                              </HashLink>
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={beverages} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#beverages'
                                className='menu-child-href'
                              >
                                Beverages
                              </HashLink>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={cement} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#cement'
                                className='menu-child-href'
                              >
                                Cement
                              </HashLink>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={generalGoods} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#general-goods'
                                className='menu-child-href'
                              >
                                General Goods
                              </HashLink>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={pharmaceutical} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#pharmaceutical'
                                className='menu-child-href'
                              >
                                Pharmaceutical
                              </HashLink>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item menu-child-icon'>
                              <img src={agriculture} />
                            </div>
                            <div className='flex-item'>
                              <HashLink
                                to='/business/#agriculture'
                                className='menu-child-href'
                              >
                                Agriculture
                              </HashLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </li>
                <li>
                  <span className='menu-link menu-parent'>
                    Services <img src={chevDown} className='menu-icon'></img>
                    <div className='menu-child menu-child-services'>
                      <div className='menu-child-container'>
                        <div className=''>
                          <div className='flex menu-child-item'>
                            <div className='flex-item'>
                              <a
                                href='/services/#load-board'
                                className='menu-child-href'
                              >
                                Load Board
                              </a>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item'>
                              <a
                                href='/services/#businesses'
                                className='menu-child-href'
                              >
                                Businesses
                              </a>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item'>
                              <a
                                href='/services/#carriers'
                                className='menu-child-href'
                              >
                                Carriers
                              </a>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item'>
                              <a
                                href='/services/#brokers'
                                className='menu-child-href'
                              >
                                Brokers
                              </a>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item'>
                              <a
                                href='/services/#load-tracking'
                                className='menu-child-href'
                              >
                                Load Tracking
                              </a>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item'>
                              <a
                                href='/services/#insurance'
                                className='menu-child-href'
                              >
                                Insurance
                              </a>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item'>
                              <a
                                href='/services/#fuel-card'
                                className='menu-child-href'
                              >
                                Fuel Card
                              </a>
                            </div>
                          </div>
                          <div className='flex menu-child-item'>
                            <div className='flex-item'>
                              <a
                                href='/services/#dash-cam'
                                className='menu-child-href'
                              >
                                Dash Cam
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </li>
                <li>
                  <a className='menu-link'>Blog</a>
                </li>
                <li>
                  <a className='menu-link'>Support</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  if (!userExists) {
    return (
      <nav className='flex space-between'>
        {openLogin && <Login closeModal={setOpenLogin} />}
        <div>
          <Link to='/'>
            <img src={logo} className='logo pl-8' alt='Juggernaut Logo' />
          </Link>
        </div>

        <div>
          <span
            className='menu-item clickable'
            onClick={() => {
              setOpenLogin(true);
            }}
          >
            Login
          </span>
          <NavDropdown loggedIn={'no'} />
        </div>
      </nav>
    );
  } else {
    return (
      <nav className='flex space-between'>
        <div>
          <Link to='/'>
            <img src={logo} className='logo pl-8' alt='Juggernaut Logo' />
          </Link>
        </div>
        <div>
          <NavDropdown loggedIn={'yes'} />
        </div>
      </nav>
    );
  }
}

export default Navigation;
