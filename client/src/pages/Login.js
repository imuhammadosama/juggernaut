import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login({ closeModal }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  let [message, setMessage] = useState('');

  function setMessageClass() {
    if (message === '') {
      return 'hideMe';
    } else {
      return 'errorMessage';
    }
  }

  async function loginUser(event) {
    event.preventDefault();

    const user = { email: email, password: password };

    await axios
      .post('/users/login', user)
      .then((response) => {
        const data = response.data;
        console.log(data);
        const message = response.data.message;
        if (data.user) {
          closeModal(false);
          localStorage.setItem('token', data.user);
          navigate('/loads');
          window.location.reload(true);
        } else {
          setMessage(message, message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className='modal-background flex flex-item modal-animation'>
      <div className='modal-container unset-height modal-container-animation relative'>
        <div className='pt-8 pb-16'>
          <div className='flex flex-item space-between px-40 py-16'>
            <p className='login-title'>Login</p>
            <button
              onClick={() => closeModal(false)}
              className='secondary-button'
            >
              Close
            </button>
          </div>
          <form onSubmit={loginUser} className='px-40 text-left'>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setMessage('');
              }}
              type='email'
              placeholder='email'
              autoComplete='on'
              className='full-width'
            />
            <br />
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMessage('');
              }}
              type='password'
              placeholder='password'
              autoComplete='on'
              className='full-width'
            />
            <p className={setMessageClass()}>{message}</p>
            <a className='forgot-password'>Forgot Password?</a>
            <br />
            <br />
            <input type='submit' value='Login' className='primary-button' />
          </form>
        </div>
      </div>
    </div>
  );
}
