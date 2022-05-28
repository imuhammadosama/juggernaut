import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Loads from './pages/Loads/Loads';
import AddLoad from './pages/Loads/AddLoad';
import UpdateTracking from './pages/Loads/UpdateTracking';
import TrackLoad from './pages/Loads/TrackLoad';
import Users from './pages/Users/Users';
import AddUser from './pages/Users/AddUser';
import PageNotFound from './pages/404';
import Drivers from './pages/Drivers/Drivers';
import AddDriver from './pages/Drivers/AddDriver';
import Vehicles from './pages/Vehicles/Vehicles';
import AddVehicle from './pages/Vehicles/AddVehicle';
import Logout from './pages/Accounts/Logout';
import Invoice from './components/Printables/Invoice';
import Business from './pages/Business';
import PickLoad from './pages/Loads/PickLoad';
import Print from './pages/Print';
import Slider from './components/Sliders/Slider';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/logout' element={<Logout />} />
        <Route exact path='/' element={<Home />} />
        <Route exact path='/business' element={<Business />} />
        <Route exact path='/loads' element={<Loads />} />
        <Route exact path='/loads/add' element={<AddLoad />} />
        <Route exact path='/loads/pick' element={<PickLoad />} />
        <Route exact path='/loads/tracking' element={<UpdateTracking />} />
        <Route exact path='/loads/track' element={<TrackLoad />} />
        <Route exact path='/users' element={<Users />} />
        <Route exact path='/users/add' element={<AddUser />} />
        <Route exact path='/drivers' element={<Drivers />} />
        <Route exact path='/drivers/add' element={<AddDriver />} />
        <Route exact path='/vehicles' element={<Vehicles />} />
        <Route exact path='/vehicle/add' element={<AddVehicle />} />
        <Route exact path='/invoice' element={<Invoice />} />
        <Route exact path='/print' element={<Print />} />
        <Route exact path='/slider' element={<Slider />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
