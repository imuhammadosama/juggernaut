import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Loads from './pages/Loads/Loads';
import Users from './pages/Users/Users';
import PageNotFound from './pages/404';
import Drivers from './pages/Drivers/Drivers';
import Vehicles from './pages/Vehicles/Vehicles';
import Logout from './pages/Accounts/Logout';
import Business from './pages/Business';
import Services from './pages/Services';
import Details from './pages/Details';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/logout' element={<Logout />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/business' element={<Business />} />
        <Route exact path='/services' element={<Services />} />
        <Route exact path='/loads' element={<Loads />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/drivers' element={<Drivers />} />
        <Route exact path='/vehicles' element={<Vehicles />} />
        <Route exact path='/details' element={<Details />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
