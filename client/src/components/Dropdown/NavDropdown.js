import './NavDropdown.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Register from '../../pages/Register';
import getAuth from '../../services/auth.service';

export default function NavDropdown(props) {
  const { loggedIn } = props;
  const [openModal, setOpenModal] = useState(false);
  const [registerType, setRegisterType] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = getAuth();
    setUser(getUser);
    // console.log(user);
  }, []);

  function myNewFunction() {
    document.getElementById('myNavDropdown').classList.toggle('showMe');
  }

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  }

  window.onclick = (event) => {
    // console.log('Nav');
    if (!event.target.matches('.navdropbtn')) {
      var navdropdowns = document.getElementsByClassName('navdropdown-content');

      var i;
      for (i = 0; i < navdropdowns.length; i++) {
        var openNavDropdown = navdropdowns[i];
        if (openNavDropdown.classList.contains('showMe')) {
          openNavDropdown.classList.remove('showMe');
        }
      }
    }
  };
  if (loggedIn === 'no') {
    return (
      <div className='navdropdown'>
        {openModal && (
          <Register closeModal={setOpenModal} type={registerType} />
        )}
        <button onClick={myNewFunction} className='navdropbtn'>
          Register
        </button>
        <div id='myNavDropdown' className='navdropdown-content'>
          <li
            className='menu-item clickable'
            onClick={() => {
              setOpenModal(true);
              setRegisterType('Business');
            }}
            href='#'
          >
            Business
          </li>

          <li
            className='menu-item clickable'
            onClick={() => {
              setOpenModal(true);
              setRegisterType('Company');
            }}
            href='#'
          >
            Carrier
          </li>
        </div>
      </div>
    );
  } else {
    return (
      <div className='navdropdown'>
        <button onClick={myNewFunction} className='navdropbtn'>
          Welcome! {user.name}
        </button>
        <div id='myNavDropdown' className='navdropdown-content'>
          <Link to='/loads'>Loads</Link>
          {user.type === 'Management' ? (
            <div>
              <Link to='/users'>Users</Link>
              <Link to='/drivers'>Drivers</Link>
              <Link to='/vehicles'>Vehicles</Link>
            </div>
          ) : (
            <div></div>
          )}
          {user.type === 'Carrier' ? (
            <div>
              <Link to='/drivers'>Drivers</Link>
              <Link to='/vehicles'>Vehicles</Link>
            </div>
          ) : (
            <div></div>
          )}
          <a className='clickable' onClick={logout}>
            Logout
          </a>
        </div>
      </div>
    );
  }
}
