import { Link } from 'react-router-dom';
import NotFound from '../assets/images/empty-state/404.svg';
export default function PageNotFound() {
  return (
    <div className='div-center'>
      <div className='flex flex-item pb-48' style={{ height: '100%' }}>
        <img src={NotFound} alt='Not Selected' />
      </div>
      <Link to='/' className='primary-button'>
        Go Back Home
      </Link>
    </div>
  );
}
