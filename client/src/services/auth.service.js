import jwt_decode from 'jwt-decode';

export default function getAuth() {
  const token = localStorage.getItem('token');
  if (token) {
    const user = jwt_decode(token);
    if (!user) {
      localStorage.removeItem('token');
      window.location.href = '/';
    } else {
      return user;
    }
  } else {
    window.location.href = '/';
  }
}
