import { useEffect, useState } from 'react';
import axios from 'axios';
import './UpdateTracking.css';
import Moment from 'react-moment';
import Select from 'react-dropdown-select';
import { cities } from '../../data/cities.data';

// Images
import Checked from '../../assets/images/checked.svg';
import UnChecked from '../../assets/images/unchecked.svg';
import Line from '../../assets/images/line.svg';

export default function UpdateTracking({ closeUpdateTrackingModal, load }) {
  const [selectedCity, setSelectedCity] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(load);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch = async () => {
      setLoading(true);
      const res = await axios.get(`/loads/${selectedLoad._id}`);
      console.log(selectedLoad.tracking_details.length);
      setSelectedLoad(res.data.data);
      setLoading(false);
    };
    fetch();
  }, []);

  // Main Function
  const updateLocation = async () => {
    await axios
      .put(`/loads/updateTrack/${selectedLoad._id}`, {
        tracking_details: {
          city: selectedCity,
          province: '',
          date: Date.now(),
          time: Date.now(),
        },
      })
      .then((response) => {
        // window.location.reload(false);
      });
    const res = await axios.get(`/loads/${selectedLoad._id}`, {
      method: 'GET',
    });
    setSelectedLoad(res.data.data);
    selectedLoad.destination.address.city === selectedCity
      ? await axios
          .put(`/loads/complete/${selectedLoad._id}`, {
            status: 'Completed',
          })
          .then((response) => {
            window.location.reload(false);
          })
      : console.log('');
  };

  // Main Function
  const completeLoad = async () => {
    await axios
      .put(`/loads/complete/${selectedLoad._id}`, {
        status: 'Completed',
      })
      .then((response) => {
        window.location.reload(false);
      });
    const res = await axios.get(`/loads/${selectedLoad._id}`, {
      method: 'GET',
    });
    setSelectedLoad(res.data.data);
  };

  if (loading) return <div></div>;
  return (
    <div className='modal-background flex flex-item bg-pending modal-animation'>
      <div
        className='modal-container mx-144 flex-item text-left modal-container-animation unset-height absolute modal-container-scroll'
        style={{ backgroundColor: 'none', width: '500px' }}
      >
        <div className=' flex flex-item'>
          <div className='update-tracking'>
            <div className='flex flex-item space-between'>
              <div>
                <h1 className='primary pr-64'>Update Tracking</h1>
              </div>
              <button
                onClick={() => closeUpdateTrackingModal(false)}
                className='secondary-button'
              >
                Close
              </button>
            </div>
            <h3 className='primary'>
              Select City <span className='red'>*</span>
            </h3>
            <Select
              options={cities.map((city, index) => {
                return {
                  value: index,
                  label: city.city,
                  province: city.province,
                };
              })}
              onChange={(value) => {
                setSelectedCity(value[0].label);
              }}
            />
            {/* <select
            onChange={(event) => {
              setSelectedCity(event.target.value);
            }}
          >
            <option defaultValue='' disabled selected>
              City
            </option>
            <option>Karachi</option>
            <option>Islamabad</option>
            <option>Lahore</option>
            <option>Rawalpindi</option>
          </select> */}
            <div className='flex flex-item'>
              <div>
                <div className='flex mt-32'>
                  <div className=''>
                    <div className='mr-24 mt-4'>
                      <img src={Checked} />
                      <div className='flex-item'>
                        <img src={Line} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className='my-0 primary'>
                      {selectedLoad.origin.address.city}
                    </h3>
                    <p className='track-time mt-4 active bold'>
                      <Moment format='ddd d/M'>
                        {selectedLoad.origin.date}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='hh:mm'>
                          {selectedLoad.origin.time}
                        </Moment>
                      }
                    </p>
                  </div>
                </div>
                {selectedLoad.tracking_details.length === 0 ? (
                  <div></div>
                ) : (
                  selectedLoad.tracking_details.map((location, key, arr) => {
                    return (
                      <div className='flex'>
                        <div className=''>
                          <div className='mr-24 mt-4'>
                            <img src={Checked} />
                            {arr[key].city ===
                            selectedLoad.destination.address.city ? (
                              <span></span>
                            ) : (
                              <div className='flex-item'>
                                <img src={Line} />
                              </div>
                            )}
                          </div>
                        </div>
                        <div>
                          <h3 className='my-0 primary'>
                            {`${location.city} ${location.province}`}
                          </h3>
                          <p className='track-time mt-4 active bold'>
                            <Moment format='ddd d/M'>{location.date}</Moment>
                            <span className='mr-4'></span>
                            {<Moment format='hh:mm'>{location.time}</Moment>}
                          </p>
                        </div>
                      </div>
                    );
                  })
                )}
                {selectedLoad.tracking_details.length === 0 ? (
                  <div className='flex mb-24'>
                    <div className=''>
                      <div className='mr-24 mt-4'>
                        <img src={UnChecked} />
                      </div>
                    </div>
                    <div>
                      <h3 className='my-0 primary'>
                        {selectedLoad.destination.address.city}
                      </h3>
                      <p className='track-time mt-4 active bold'>
                        <Moment format='ddd d/M'>
                          {selectedLoad.destination.date}
                        </Moment>
                        <span className='mr-4'></span>
                        {
                          <Moment format='hh:mm'>
                            {selectedLoad.destination.time}
                          </Moment>
                        }
                      </p>
                    </div>
                  </div>
                ) : selectedLoad.destination.address.city ===
                  selectedLoad.tracking_details[
                    selectedLoad.tracking_details.length - 1
                  ].city ? (
                  <div></div>
                ) : (
                  <div className='flex mb-24'>
                    <div className=''>
                      <div className='mr-24 mt-4'>
                        <img src={UnChecked} />
                      </div>
                    </div>
                    <div>
                      <h3 className='my-0 primary'>
                        {selectedLoad.destination.address.city}
                      </h3>
                      <p className='track-time mt-4 active bold'>
                        <Moment format='ddd d/M'>
                          {selectedLoad.destination.date}
                        </Moment>
                        <span className='mr-4'></span>
                        {
                          <Moment format='hh:mm'>
                            {selectedLoad.destination.time}
                          </Moment>
                        }
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className='flex'>
              <button
                className='primary-button mr-8'
                onClick={() => updateLocation()}
              >
                Update
              </button>
              <button
                className='tertiary-button'
                onClick={() => completeLoad()}
              >
                Complete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
