import Moment from 'react-moment';
import axios from 'axios';
import './TrackLoad.css';

// Images
import Checked from '../../assets/images/checked.svg';
import UnChecked from '../../assets/images/unchecked.svg';
import Line from '../../assets/images/line.svg';
import Cross from '../../assets/images/cross.png';
import { useEffect, useState } from 'react';

export default function TrackLoad({ closeTrackModal, load }) {
  const [selectedLoad, setSelectedLoad] = useState(load);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch = async () => {
      setLoading(true);

      const res = await axios.get(`/loads/${selectedLoad._id}`);

      setSelectedLoad(res.data.data);

      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <div></div>;

  return (
    <div className='modal-background flex flex-item bg-pending tracking-modal modal-animation'>
      <div className='modal-container mx-144 text-left unset-height modal-container-animation'>
        <div className='flex'>
          <div className='tracking-details'>
            <div className='flex flex-item space-between'>
              <div>
                <h1 className='primary pr-64'>Tracking Details</h1>
              </div>
              <div onClick={() => closeTrackModal(false)} className='clickable'>
                <img src={Cross} alt='cross' />
              </div>
            </div>
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
                            {`${location.city}, ${location.province}`}
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
                  <span></span>
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
          </div>
        </div>
      </div>
    </div>
  );
}
