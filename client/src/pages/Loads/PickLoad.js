import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PickLoad.css';
import Cross from '../../assets/images/cross.png';
import { useEffect, useState } from 'react';
import axios from 'axios';
import getAuth from '../../services/auth.service.js';

toast.configure();

function PickLoad({ closePickModal, selectedLoad }) {
  const [drivers, setDrivers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [eligiblity, setEligiblity] = useState(true);

  const user = getAuth();
  useEffect(() => {
    getAuth();
    async function fetch() {
      setLoading(true);

      // Get Available Drivers
      const availableDrivers = await axios.get(
        `/drivers/client/${user.company}`
      );
      setDrivers(availableDrivers.data.data);

      // Get Available Vehicles
      const availableVehicles = await axios.get(
        `/vehicles/client/${user.company}`
      );
      if (
        availableDrivers.data.data.length === 0 ||
        availableVehicles.data.data.length === 0
      ) {
        setEligiblity(false);
      }
      setVehicles(availableVehicles.data.data);
      setLoading(false);
    }
    fetch();
  }, []);

  async function pickThisLoad(event) {
    event.preventDefault();
    console.log(selectedLoad);
    await axios
      .put(`/loads/pick/${selectedLoad._id}`, {
        client_id: user.company,
      })
      .then((response) => {
        toast.success(response.data.message, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
        });
      });
    window.location.reload(false);
  }
  if (loading)
    return (
      <div className='modal-background flex flex-item bg-pending modal-animation'>
        <div
          className='modal-container mx-144 flex-item modal-container-animation unset-height relative'
          style={{ backgroundColor: 'none', width: '600px' }}
        ></div>
      </div>
    );

  if (!eligiblity) {
    return (
      <div className='modal-background flex flex-item bg-pending modal-animation '>
        <div
          className='modal-container mx-144 flex-item modal-container-animation unset-height relative py-80'
          style={{ backgroundColor: 'none', width: '600px' }}
        >
          <div>
            Either Approved Vehicle or Driver is Missing!
            <br />
            <div className='py-24'>
              <a href='/vehicles' className='primary-button'>
                Check Vehicles
              </a>
            </div>
            <div className='py-24'>
              <a href='/drivers' className='primary-button'>
                Check Drivers
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='modal-background flex flex-item bg-pending modal-animation'>
      <div
        className='modal-container mx-144 flex-item modal-container-animation unset-height relative'
        style={{ backgroundColor: 'none', width: '750px' }}
      >
        <div className='flex flex-item full-width text-left'>
          <div className='table pb-48 pt-32'>
            <form onSubmit={pickThisLoad}>
              <div>
                <div className='flex flex-item space-between '>
                  <div>
                    <h1>Pick Load</h1>
                  </div>
                  <div
                    onClick={() => closePickModal(false)}
                    className='clickable'
                  >
                    <img src={Cross} alt='cross' />
                  </div>
                </div>
                <div className='flex'>
                  <div className='right-inputs pr-24'>
                    <div className='text-left head-label pb-8'>
                      Select Vehicle
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <select>
                      {vehicles.map((vehicle, index) => {
                        return (
                          <option key={index}>
                            {vehicle.registeration_number}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className='left-inputs'>
                    <div className='text-left head-label pb-8'>
                      Select Driver
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>

                    <select>
                      {drivers.map((driver, index) => {
                        return <option key={index}>{driver.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
                <div className='flex py-24'>
                  <input
                    type='checkbox'
                    id='vehicle1'
                    name='vehicle1'
                    value='Bike'
                    className='check-input'
                  />
                  I accept
                  <span className='pl-4 terms-and-conditions'>
                    Terms & Conditions
                  </span>
                  <sup>
                    <span className='red ten'> ✸</span>
                  </sup>
                </div>
              </div>

              <input
                defaultValue='Pick Load'
                type='Submit'
                className='primary-button'
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PickLoad;
