import './NavDropdown.css';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Register from '../../pages/Register';
import getAuth from '../../services/auth.service';
import EditUser from '../../pages/Users/EditUser';

export default function NavDropdown(props) {
  const { loggedIn } = props;
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [registerType, setRegisterType] = useState('');
  const navigate = useNavigate();
  const user = getAuth();

  useEffect(() => {
    getAuth();
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
        {openEditModal && (
          <EditUser closeOpenEditModal={setOpenEditModal} userId={user._id} />
        )}
        <a onClick={myNewFunction} className='navdropbtn'>
          Welcome! {user.name}
        </a>
        <div id='myNavDropdown' className='navdropdown-content'>
          <Link to='/loads'>Loads</Link>
          {user.type === 'Management' || user.type === 'Super Admin' ? (
            <div>
              <Link to='/users'>Users</Link>
              <Link to='/drivers'>Drivers</Link>
              <Link to='/vehicles'>Vehicles</Link>
              <a onClick={() => setOpenEditModal(true)} className='clickable'>
                Edit Profile
              </a>
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
