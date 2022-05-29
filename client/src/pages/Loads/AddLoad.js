import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import { cities } from '../../data/cities.data';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddLoad.css';
import getAuth from '../../services/auth.service';

toast.configure();

function AddLoad({ closeOpenAddLoadModal }) {
  const user = getAuth();
  function getTodaysDate() {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  }

  useEffect(() => {
    getAuth();
  }, []);
  const [load, setLoad] = useState({
    status: 'Pending',
    start_date: '',
    origin: {
      address: {
        line1: '',
        line2: '',
        city: '',
        province: '',
        postalcode: 0,
      },
      date_and_time: getTodaysDate(),
    },
    destination: {
      address: {
        line1: '',
        line2: '',
        city: '',
        province: '',
        postalcode: 0,
      },
      date_and_time: getTodaysDate(),
    },
    calculated_distance: 0,
    details: {
      distance: '',
      trailer_type: 'Container',
      trailer_axle: '2 Axle',
      full_or_partial: 'Full',
      capacity: { value: '', unit: 'lt' },
      quantity: 0,
      weight: { value: 0, unit: 'kg' },
      volume: { value: 0, unit: 'm3' },
      comodity_description: '',
      quantity_description: '',
      notes: '',
    },
    consignor: { name: '', phone: '' },
    consignee: { name: '', phone: '' },

    tracking_details: {
      locations: [{}],
    },
    business_id: user.company,
  });

  async function submitLoad(event) {
    event.preventDefault();
    console.log(load);
    await axios
      .post('/loads/', load)
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
        window.location.reload(false);
      })
      .catch((error) => {
        toast.error(error.message, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  const updateState = (value, field) => {
    setLoad({
      ...load,
      status: 'Pending',
      start_date: '',
      origin: {
        address: {
          line1:
            field === 'Origin Address Line1'
              ? value.target.value
              : load.origin.address.line1,
          line2:
            field === 'Origin Address Line2'
              ? value.target.value
              : load.origin.address.line2,
          city:
            field === 'Origin Address City'
              ? value.length === 0
                ? load.origin.address.city
                : value[0].label
              : load.origin.address.city,

          province:
            field === 'Origin Address City'
              ? value.length === 0
                ? load.origin.address.province
                : value[0].province
              : load.origin.address.province,
          postalcode:
            field === 'Origin Address Postal Code'
              ? value.target.value
              : load.origin.address.postalcode,
        },
        date_and_time:
          field === 'Origin Date & Time'
            ? value.target.value
            : load.origin.date_and_time,
      },

      destination: {
        address: {
          line1:
            field === 'Destination Address Line1'
              ? value.target.value
              : load.destination.address.line1,
          line2:
            field === 'Destination Address Line2'
              ? value.target.value
              : load.destination.address.line2,
          city:
            field === 'Destination Address City'
              ? value.length === 0
                ? load.destination.address.city
                : value[0].label
              : load.destination.address.city,

          province:
            field === 'Destination Address City'
              ? value.length === 0
                ? load.destination.address.province
                : value[0].province
              : load.destination.address.province,
          postalcode:
            field === 'Destination Address Postal Code'
              ? value.target.value
              : load.destination.address.postalcode,
        },
        date_and_time:
          field === 'Destination Date & Time'
            ? value.target.value
            : load.destination.date_and_time,
      },

      distance: '0',
      details: {
        trailer_type:
          field === 'Details Trailer Type'
            ? value.target.value
            : load.details.trailer_type,
        trailer_axle:
          field === 'Details Trailer Axle'
            ? value.target.value
            : load.details.trailer_axle,
        full_or_partial:
          field === 'Details Full Or Partial'
            ? value.target.value
            : load.details.full_or_partial,
        capacity: {
          value:
            field === 'Details Capacity Value'
              ? value.target.value
              : load.details.capacity.value,
          unit:
            field === 'Details Capacity Unit'
              ? value.target.value
              : load.details.capacity.unit,
        },
        quantity:
          field === 'Details Quantity'
            ? value.target.value
            : load.details.quantity,
        weight: {
          value:
            field === 'Details Weight Value'
              ? value.target.value
              : load.details.weight.value,
          unit:
            field === 'Details Weight Unit'
              ? value.target.value
              : load.details.weight.unit,
        },
        volume: {
          value:
            field === 'Details Volume Value'
              ? value.target.value
              : load.details.volume.value,
          unit:
            field === 'Details Volume Unit'
              ? value.target.value
              : load.details.volume.unit,
        },
        comodity_description:
          field === 'Details Comodity Description'
            ? value.target.value
            : load.details.comodity_description,
        quantity_description:
          field === 'Details Quantity Description'
            ? value.target.value
            : load.details.quantity_description,
        notes:
          field === 'Details Notes' ? value.target.value : load.details.notes,
      },
      consignor: {
        name:
          field === 'Consignor Name' ? value.target.value : load.consignor.name,
        phone:
          field === 'Consignor Phone'
            ? value.target.value
            : load.consignor.phone,
      },
      consignee: {
        name:
          field === 'Consignee Name' ? value.target.value : load.consignee.name,
        phone:
          field === 'Consignee Phone'
            ? value.target.value
            : load.consignee.phone,
      },

      tracking_details: {
        locations: [
          {
            origin: {
              city: '',
              province: '',
              date: '',
              time: '',
            },
          },
          {
            destination: {
              city: '',
              province: '',
              date: '',
              time: '',
            },
          },
          {
            location1: {
              city: '',
              province: '',
              date: '',
              time: '',
            },
          },
          {
            location2: {
              city: '',
              province: '',
              date: '',
              time: '',
            },
          },
        ],
      },
    });
    console.log(load);
  };

  return (
    <div className='modal-background flex flex-item bg-pending modal-animation'>
      <div
        className='modal-container pt-40 pb-40 text-left modal-container-animation absolute height-eighty modal-container-scroll'
        style={{ backgroundColor: 'none', width: '600px' }}
      >
        <div className='flex flex-item'>
          <div className='table'>
            <div className='flex flex-item space-between'>
              <div>
                <h1>Add New Load</h1>
              </div>
              <button
                onClick={() => closeOpenAddLoadModal(false)}
                className='secondary-button'
              >
                Close
              </button>
            </div>
            <form onSubmit={submitLoad}>
              <div>
                <h1>Origin</h1>
                <div className='flex'>
                  <div className='right-inputs'>
                    <div className='text-left head-label pb-8'>
                      Pickup Address
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <input
                      value={load.origin.address.line1 || ''}
                      onChange={(value) =>
                        updateState(value, 'Origin Address Line1')
                      }
                      type='text'
                      placeholder='Line 1'
                      className='full-width'
                    />
                    <br />
                    <input
                      value={load.origin.address.line2 || ''}
                      onChange={(value) =>
                        updateState(value, 'Origin Address Line2')
                      }
                      type='text'
                      placeholder='Line 2'
                      className='full-width'
                    />
                    <br />
                  </div>
                </div>
                <div className='flex'>
                  <div className='right-inputs mr-16'>
                    <div className='text-left head-label pb-8'>
                      <Select
                        options={cities.map((city, index) => {
                          return {
                            value: index,
                            label: city.city,
                            province: city.province,
                          };
                        })}
                        onChange={(value) => {
                          updateState(value, 'Origin Address City');
                        }}
                      />
                    </div>
                  </div>
                  <div className='left-inputs'>
                    <div className='text-left head-label pb-8'>
                      <input
                        value={load.origin.address.postalcode || ''}
                        onChange={(value) =>
                          updateState(value, 'Origin Address Postal Code')
                        }
                        type='text'
                        placeholder='Postal Code'
                        className='full-width'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex border-bottom pb-16'>
                  <div className='right-inputs mr-16'>
                    <div className='text-left head-label pb-8'>
                      Pickup Date & Time
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <input
                      type='datetime-local'
                      onChange={(value) =>
                        updateState(value, 'Origin Date & Time')
                      }
                      value={load.origin.date_and_time}
                      className='full-width'
                      min={load.origin.date_and_time}
                    />
                  </div>
                </div>

                <div className='flex pt-16'>
                  <div className='right-inputs mr-16'>
                    <div className='text-left head-label pb-8'>
                      Consignor Name
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <input
                      value={load.consignor.name || ''}
                      onChange={(value) => updateState(value, 'Consignor Name')}
                      type='text'
                      placeholder='Consignor Name'
                      className='full-width'
                    />
                  </div>
                  <div className='left-inputs'>
                    <div className='text-left head-label pb-8'>
                      Phone
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <input
                      value={load.consignor.phone || ''}
                      onChange={(value) =>
                        updateState(value, 'Consignor Phone')
                      }
                      type='number'
                      placeholder='Consignor Phone'
                      className='full-width'
                    />
                  </div>
                </div>
              </div>
              <div>
                <h1>Destination</h1>
                <div className='flex'>
                  <div className='right-inputs'>
                    <div className='text-left head-label pb-8'>
                      Delivery Address
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <input
                      value={load.destination.address.line1 || ''}
                      onChange={(value) =>
                        updateState(value, 'Destination Address Line1')
                      }
                      type='text'
                      placeholder='Line 1'
                      className='full-width'
                    />

                    <br />
                    <input
                      value={load.destination.address.line2 || ''}
                      onChange={(value) =>
                        updateState(value, 'Destination Address Line2')
                      }
                      type='text'
                      placeholder='Line 2'
                      className='full-width'
                    />
                    <br />
                  </div>
                </div>
                <div className='flex'>
                  <div className='right-inputs mr-16'>
                    <div className='text-left head-label pb-8'>
                      <Select
                        options={cities.map((city, index) => {
                          return {
                            value: index,
                            label: city.city,
                            province: city.province,
                          };
                        })}
                        onChange={(value) => {
                          updateState(value, 'Destination Address City');
                        }}
                      />
                    </div>
                  </div>
                  <div className='left-inputs'>
                    <div className='text-left head-label pb-8'>
                      <input
                        value={load.destination.address.postalcode || ''}
                        onChange={(value) =>
                          updateState(value, 'Destination Address Postal Code')
                        }
                        type='text'
                        placeholder='Postal Code'
                        className='full-width'
                      />
                    </div>
                  </div>
                </div>

                <div className='flex border-bottom pb-16'>
                  <div className='right-inputs'>
                    <div className='text-left head-label pb-8'>
                      Delivery Date & Time
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <input
                      type='datetime-local'
                      onChange={(value) =>
                        updateState(value, 'Destination Date & Time')
                      }
                      value={load.destination.date_and_time}
                      className='full-width'
                      min={load.origin.date_and_time}
                    />
                  </div>
                </div>

                <div className='flex pt-16'>
                  <div className='right-inputs mr-16'>
                    <div className='text-left head-label pb-8'>
                      Consignee Name
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <input
                      value={load.consignee.name || ''}
                      onChange={(value) => updateState(value, 'Consignee Name')}
                      type='text'
                      placeholder='Consignee Name'
                      className='full-width'
                    />
                  </div>
                  <div className='left-inputs'>
                    <div className='text-left head-label pb-8'>
                      Phone
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <input
                      value={load.consignee.phone || ''}
                      onChange={(value) =>
                        updateState(value, 'Consignee Phone')
                      }
                      type='number'
                      placeholder='Consignee Phone'
                      className='full-width'
                    />
                  </div>
                </div>
              </div>

              <div>
                <h1>Details</h1>
                <div className='flex'>
                  <div className='right-inputs'>
                    <div className='flex'>
                      <div className='pr-24 full-width'>
                        <div className='text-left head-label pb-8'>
                          Trailer Type
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <select
                          value={load.details.trailer_type || ''}
                          onChange={(value) =>
                            updateState(value, 'Details Trailer Type')
                          }
                          type='text'
                          placeholder='Line 1'
                          className='full-width'
                        >
                          <option value='Container'>Container</option>
                          <option value='Dry Van / Enclosed Trailer'>
                            Dry Van / Enclosed Trailer
                          </option>
                          <option value='Flatbed'>Flatbed</option>
                          <option value='Lowboy Trailer'>Lowboy Trailer</option>
                          <option value='Oil Tanker'>Oil Tanker</option>
                          <option value='Reefer'>Reefer</option>
                        </select>
                      </div>
                      <div className='full-width'>
                        <div className='text-left head-label pb-8'>
                          Trailer Axle
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <select
                          value={load.details.trailer_axle || ''}
                          onChange={(value) =>
                            updateState(value, 'Details Trailer Axle')
                          }
                          type='text'
                          placeholder='Line 1'
                          className='full-width'
                        >
                          <option>2 Axle</option>
                          <option>3 Axle</option>
                          <option>4 Axle</option>
                          <option>5 Axle</option>
                          <option>6 Axle</option>
                        </select>
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
                <div className='flex'>
                  <div className='right-inputs'>
                    <div className='flex'>
                      <div className='full-width'>
                        <div className='text-left head-label pb-8'>
                          Full or Parial
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div>
                          <div className='flex pt-12'>
                            <div className='flex'>
                              <input
                                type='radio'
                                value='Full'
                                checked
                                name='Details Full Or Partial'
                                className='ratio-input full-width'
                                onChange={(value) =>
                                  updateState(value, 'Details Full Or Partial')
                                }
                              />
                              Full
                              <input
                                type='radio'
                                value='Partial'
                                name='Details Full Or Partial'
                                className='ratio-input full-width'
                                onChange={(value) =>
                                  updateState(value, 'Details Full Or Partial')
                                }
                              />
                              Partial
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='full-width'>
                        <div className='text-left head-label pb-8'>
                          Quantity
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <input
                          type='number'
                          value={load.details.quantity || ''}
                          onChange={(value) =>
                            updateState(value, 'Details Quantity')
                          }
                          name='Details Quantity'
                          placeholder='i.e, 10'
                          className='full-width'
                        />
                      </div>
                    </div>
                    <div className='flex'>
                      <div className='pr-24'>
                        <div className='text-left head-label pb-8'>
                          Capacity
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div className='flex'>
                          <input
                            type='number'
                            value={load.details.capacity.value || ''}
                            onChange={(value) =>
                              updateState(value, 'Details Capacity Value')
                            }
                            name='Details Capacity Value'
                            placeholder='i.e, 20'
                            className='full-width'
                          />
                          <select
                            value={load.details.capacity.unit || ''}
                            onChange={(value) =>
                              updateState(value, 'Details Capacity Unit')
                            }
                            name='Details Capacity Unit'
                          >
                            <option value='lt'>lt</option>
                          </select>
                        </div>
                      </div>
                      <div className='pr-24'>
                        <div className='text-left head-label pb-8'>
                          Weight
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div className='flex'>
                          <input
                            type='number'
                            value={load.details.weight.value || ''}
                            onChange={(value) =>
                              updateState(value, 'Details Weight Value')
                            }
                            name='Details Weight Value'
                            placeholder='i.e, 20'
                            className='full-width'
                          />
                          <select
                            value={load.details.weight.unit || ''}
                            onChange={(value) =>
                              updateState(value, 'Details Weight Unit')
                            }
                            name='Details Weight Unit'
                          >
                            <option value='kg'>kg</option>
                            <option value='ton'>ton</option>
                            <option value='lbs'>lbs</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <div className='text-left head-label pb-8'>
                          Volume
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div className='flex'>
                          <input
                            type='number'
                            value={load.details.volume.value || ''}
                            onChange={(value) =>
                              updateState(value, 'Details Volume Value')
                            }
                            name='Details Volume Value'
                            placeholder='i.e, 30'
                            className='full-width'
                          />
                          <select
                            value={load.details.volume.unit || ''}
                            onChange={(value) =>
                              updateState(value, 'Details Volume Unit')
                            }
                          >
                            <option value='m3'>m3</option>
                            <option value='ft3'>ft3</option>
                            <option value='lbs'>lbs</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
                <div className='flex'>
                  <div className='right-inputs'>
                    <div className='flex'>
                      <div className='pr-24 right-inputs'>
                        <div className='text-left head-label pb-8'>
                          Comodity Description
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <textarea
                          type='number'
                          value={load.details.comodity_description || ''}
                          onChange={(value) =>
                            updateState(value, 'Details Comodity Description')
                          }
                          name='Details Comodity Description'
                          placeholder='Enter details'
                        />
                      </div>
                      <div className='left-inputs'>
                        <div className='text-left head-label pb-8'>
                          Quantity Description
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <textarea
                          type='number'
                          value={load.details.quantity_description || ''}
                          onChange={(value) =>
                            updateState(value, 'Details Quantity Description')
                          }
                          name='Details Quantity Description'
                          placeholder='i.e, Pallets, Bags, Carton etc'
                        />
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
              </div>

              <div>
                <h1>
                  Notes
                  <sup>
                    <span className='red ten'> ✸</span>
                  </sup>
                </h1>

                <div className='flex'>
                  <div className='right-inputs'>
                    <div className='flex'>
                      <div className='pr-24 left-inputs'>
                        <textarea
                          type='number'
                          value={load.details.notes || ''}
                          onChange={(value) =>
                            updateState(value, 'Details Notes')
                          }
                          name='Details Notes'
                          placeholder='Enter your notes'
                        />
                      </div>
                    </div>

                    <br />
                  </div>
                </div>
              </div>

              <input
                defaultValue='Submit'
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

export default AddLoad;
