import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import getAuth from '../../services/auth.service';
import { cities } from '../../data/cities.data';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './AddLoad.css';

toast.configure();

function AddLoad({ closeOpenAddLoadModal }) {
  const user = getAuth();

  useEffect(() => {
    getAuth();
  }, []);

  const [load, setLoad, getLoad] = useState({
    status: 'Pending',
    start: '',
    origin: {
      address: {
        line1: 'Unset',
        line2: 'Unset',
        city: 'Unset',
        province: 'Unset',
        postalcode: 'Unset',
      },
      date_and_time: 'Unset',
    },
    destination: {
      address: {
        line1: 'Unset',
        line2: 'Unset',
        city: 'Unset',
        province: 'Unset',
        postalcode: 'Unset',
      },
      date_and_time: 'Unset',
    },
    calculated_distance: 'Unset',
    commodity: 'Unset',
    details: {
      distance: 'Unset',
      trailer_type: 'Unset',
      trailer_axle: 'Unset',
      full_or_partial: 'Unset',
      capacity: { value: 'Unset', unit: ' ltr' },
      quantity: 'Unset',
      weight: { value: 'Unset', unit: ' kg' },
      volume: { value: 'Unset', unit: ' m³' },
      commodity_description: 'Unset',
      quantity_description: 'Unset',
      notes: 'Unset',
    },
    consignor: { name: 'Unset', phone: 'Unset' },
    consignee: { name: 'Unset', phone: 'Unset' },
    business_id: user.company_id,
    business_name: user.company_name,
  });

  function validateLoad() {
    if (
      load.origin.address.line1 === 'Unset' ||
      load.origin.address.line1 === '' ||
      load.origin.address.line2 === 'Unset' ||
      load.origin.address.line2 === '' ||
      load.origin.address.city === 'Unset' ||
      load.origin.address.city === '' ||
      load.origin.address.province === 'Unset' ||
      load.origin.address.province === '' ||
      load.origin.address.postalcode === 'Unset' ||
      load.origin.address.postalcode === '' ||
      load.origin.date_and_time === 'Unset' ||
      load.origin.date_and_time === '' ||
      load.destination.address.line1 === 'Unset' ||
      load.destination.address.line1 === '' ||
      load.destination.address.line2 === 'Unset' ||
      load.destination.address.line2 === '' ||
      load.destination.address.city === 'Unset' ||
      load.destination.address.city === '' ||
      load.destination.address.province === 'Unset' ||
      load.destination.address.province === '' ||
      load.destination.address.postalcode === 'Unset' ||
      load.destination.address.postalcode === '' ||
      load.destination.date_and_time === 'Unset' ||
      load.destination.date_and_time === '' ||
      load.commodity === 'Unset' ||
      load.commodity === '' ||
      load.details.trailer_type === 'Unset' ||
      load.details.trailer_type === '' ||
      load.details.trailer_axle === 'Unset' ||
      load.details.trailer_axle === '' ||
      load.details.full_or_partial === 'Unset' ||
      load.details.full_or_partial === '' ||
      load.details.quantity === 'Unset' ||
      load.details.quantity === '' ||
      load.details.capacity.value === 'Unset' ||
      load.details.capacity.value === '' ||
      load.details.weight.value === 'Unset' ||
      load.details.weight.value === '' ||
      load.details.volume.value === 'Unset' ||
      load.details.volume.value === '' ||
      load.details.commodity_description === 'Unset' ||
      load.details.commodity_description === '' ||
      load.details.quantity_description === 'Unset' ||
      load.details.quantity_description === '' ||
      load.details.notes === 'Unset' ||
      load.details.notes === '' ||
      load.consignee.name === 'Unset' ||
      load.consignee.name === '' ||
      load.consignee.phone === 'Unset' ||
      load.consignee.phone === '' ||
      load.consignor.name === 'Unset' ||
      load.consignor.name === '' ||
      load.consignor.phone === 'Unset' ||
      load.consignor.phone === ''
    ) {
      setLoad({
        ...load,
        status: 'Pending',
        start: '',
        origin: {
          address: {
            line1:
              load.origin.address.line1 === 'Unset'
                ? ''
                : load.origin.address.line1,
            line2:
              load.origin.address.line2 === 'Unset'
                ? ''
                : load.origin.address.line2,
            city:
              load.origin.address.city === 'Unset'
                ? ''
                : load.origin.address.city,

            province:
              load.origin.address.province === 'Unset'
                ? ''
                : load.origin.address.province,
            postalcode:
              load.origin.address.postalcode === 'Unset'
                ? ''
                : load.origin.address.postalcode,
          },
          date_and_time:
            load.origin.date_and_time === 'Unset'
              ? ''
              : load.origin.date_and_time,
        },

        destination: {
          address: {
            line1:
              load.destination.address.line1 === 'Unset'
                ? ''
                : load.destination.address.line1,
            line2:
              load.destination.address.line2 === 'Unset'
                ? ''
                : load.destination.address.line2,
            city:
              load.destination.address.city === 'Unset'
                ? ''
                : load.destination.address.city,

            province:
              load.destination.address.province === 'Unset'
                ? ''
                : load.destination.address.province,
            postalcode:
              load.destination.address.postalcode === 'Unset'
                ? ''
                : load.destination.address.postalcode,
          },
          date_and_time:
            load.destination.date_and_time === 'Unset'
              ? ''
              : load.destination.date_and_time,
        },

        distance: '0',
        commodity: load.commodity === 'Unset' ? '' : load.commodity,
        details: {
          trailer_type:
            load.details.trailer_type === 'Unset'
              ? ''
              : load.details.trailer_type,
          trailer_axle:
            load.details.trailer_axle === 'Unset'
              ? ''
              : load.details.trailer_axle,
          full_or_partial:
            load.details.full_or_partial === 'Unset'
              ? ''
              : load.details.full_or_partial,
          capacity: {
            value:
              load.details.capacity.value === 'Unset'
                ? ''
                : load.details.capacity.value,
            unit: load.details.capacity.unit,
          },
          quantity:
            load.details.quantity === 'Unset' ? '' : load.details.quantity,
          weight: {
            value:
              load.details.weight.value === 'Unset'
                ? ''
                : load.details.weight.value,
            unit: load.details.weight.unit,
          },
          volume: {
            value:
              load.details.volume.value === 'Unset'
                ? ''
                : load.details.volume.value,
            unit: load.details.volume.unit,
          },
          commodity_description:
            load.details.commodity_description === 'Unset'
              ? ''
              : load.details.commodity_description,
          quantity_description:
            load.details.quantity_description === 'Unset'
              ? ''
              : load.details.quantity_description,
          notes: load.details.notes === 'Unset' ? '' : load.details.notes,
        },
        consignor: {
          name: load.consignor.name === 'Unset' ? '' : load.consignor.name,
          phone: load.consignor.phone === 'Unset' ? '' : load.consignor.phone,
        },
        consignee: {
          name: load.consignee.name === 'Unset' ? '' : load.consignee.name,
          phone: load.consignee.phone === 'Unset' ? '' : load.consignee.phone,
        },
      });
      return false;
    } else {
      return true;
    }
  }

  async function submitLoad(event) {
    event.preventDefault();
    validateLoad()
      ? await axios
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
            if (response.data.message === 'Successfully Added!') {
              window.location.reload(false);
            }
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
          })
      : toast.error('Please fill the missing details', {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
  }

  const updateState = (value, field) => {
    setLoad({
      ...load,
      status: 'Pending',
      start: '',
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

      distance: 0,
      commodity: field === 'Commodity' ? value.target.value : load.commodity,
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
        commodity_description:
          field === 'Details Commodity Description'
            ? value.target.value
            : load.details.commodity_description,
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
    });
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
                    <div>
                      <input
                        value={
                          load.origin.address.line1 === 'Unset'
                            ? ''
                            : load.origin.address.line1
                        }
                        onChange={(value) => {
                          updateState(value, 'Origin Address Line1');
                        }}
                        type='text'
                        placeholder='Line 1'
                        className='full-width'
                      />
                      <p
                        className={
                          load.origin.address.line1 ? 'hideMe' : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
                    <div>
                      <input
                        value={
                          load.origin.address.line2 === 'Unset'
                            ? ''
                            : load.origin.address.line2
                        }
                        onChange={(value) =>
                          updateState(value, 'Origin Address Line2')
                        }
                        type='text'
                        placeholder='Line 2'
                        className='full-width'
                      />
                      <p
                        className={
                          load.origin.address.line2 ? 'hideMe' : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
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
                    <div className='text-left pb-8'>
                      <div>
                        <input
                          value={
                            load.origin.address.postalcode === 'Unset'
                              ? ''
                              : load.origin.address.postalcode
                          }
                          onChange={(value) =>
                            updateState(value, 'Origin Address Postal Code')
                          }
                          type='text'
                          placeholder='Postal Code'
                          className='full-width'
                        />
                        <p
                          className={
                            load.origin.address.postalcode
                              ? 'hideMe'
                              : 'errorMessage'
                          }
                        >
                          Field is Required
                        </p>
                      </div>
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

                    <div>
                      <input
                        type='datetime-local'
                        onChange={(value) =>
                          updateState(value, 'Origin Date & Time')
                        }
                        value={
                          load.origin.date_and_time === 'Unset'
                            ? ''
                            : load.origin.date_and_time
                        }
                        className='full-width'
                      />
                      <p
                        className={
                          load.origin.date_and_time ? 'hideMe' : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
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
                    <div>
                      <input
                        value={
                          load.consignor.name === 'Unset'
                            ? ''
                            : load.consignor.name
                        }
                        onChange={(value) =>
                          updateState(value, 'Consignor Name')
                        }
                        type='text'
                        placeholder='Consignor Name'
                        className='full-width'
                      />
                      <p
                        className={
                          load.consignor.name ? 'hideMe' : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
                  </div>
                  <div className='left-inputs'>
                    <div className='text-left head-label pb-8'>
                      Phone
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <div>
                      <input
                        value={
                          load.consignor.phone === 'Unset'
                            ? ''
                            : load.consignor.phone
                        }
                        onChange={(value) =>
                          updateState(value, 'Consignor Phone')
                        }
                        type='number'
                        min='0'
                        placeholder='Consignor Phone'
                        className='full-width'
                      />
                      <p
                        className={
                          load.consignor.phone ? 'hideMe' : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
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
                    <div>
                      <input
                        value={
                          load.destination.address.line1 === 'Unset'
                            ? ''
                            : load.destination.address.line1
                        }
                        onChange={(value) =>
                          updateState(value, 'Destination Address Line1')
                        }
                        type='text'
                        placeholder='Line 1'
                        className='full-width'
                      />
                      <p
                        className={
                          load.destination.address.line1
                            ? 'hideMe'
                            : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
                    <div>
                      <input
                        value={
                          load.destination.address.line2 === 'Unset'
                            ? ''
                            : load.destination.address.line2
                        }
                        onChange={(value) =>
                          updateState(value, 'Destination Address Line2')
                        }
                        type='text'
                        placeholder='Line 2'
                        className='full-width'
                      />{' '}
                      <p
                        className={
                          load.destination.address.line2
                            ? 'hideMe'
                            : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex'>
                  <div className='right-inputs mr-16'>
                    <div className='text-left head-label pb-8'>
                      <div>
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
                        <p
                          className={
                            load.destination.address.city
                              ? 'hideMe'
                              : 'errorMessage'
                          }
                        >
                          Field is Required
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='left-inputs'>
                    <div className='text-left pb-8'>
                      <div>
                        <input
                          value={
                            load.destination.address.postalcode === 'Unset'
                              ? ''
                              : load.destination.address.postalcode
                          }
                          onChange={(value) =>
                            updateState(
                              value,
                              'Destination Address Postal Code'
                            )
                          }
                          type='text'
                          placeholder='Postal Code'
                          className='full-width'
                        />{' '}
                        <p
                          className={
                            load.destination.address.postalcode
                              ? 'hideMe'
                              : 'errorMessage'
                          }
                        >
                          Field is Required
                        </p>
                      </div>
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
                    <div>
                      <input
                        type='datetime-local'
                        onChange={(value) =>
                          updateState(value, 'Destination Date & Time')
                        }
                        value={
                          load.destination.date_and_time === 'Unset'
                            ? ''
                            : load.destination.date_and_time
                        }
                        className='full-width'
                        min={load.origin.date_and_time}
                      />
                      <p
                        className={
                          load.destination.date_and_time
                            ? 'hideMe'
                            : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
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
                    <div>
                      <input
                        value={
                          load.consignee.name === 'Unset'
                            ? ''
                            : load.consignee.name
                        }
                        onChange={(value) =>
                          updateState(value, 'Consignee Name')
                        }
                        type='text'
                        placeholder='Consignee Name'
                        className='full-width'
                      />
                      <p
                        className={
                          load.consignee.name ? 'hideMe' : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
                  </div>
                  <div className='left-inputs'>
                    <div className='text-left head-label pb-8'>
                      Phone
                      <sup>
                        <span className='red ten'> ✸</span>
                      </sup>
                    </div>
                    <div>
                      <input
                        value={
                          load.consignee.phone === 'Unset'
                            ? ''
                            : load.consignee.phone
                        }
                        onChange={(value) =>
                          updateState(value, 'Consignee Phone')
                        }
                        type='number'
                        min='0'
                        placeholder='Consignee Phone'
                        className='full-width'
                      />
                      <p
                        className={
                          load.consignee.phone ? 'hideMe' : 'errorMessage'
                        }
                      >
                        Field is Required
                      </p>
                    </div>
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
                        <div>
                          <select
                            value={
                              load.details.trailer_type === 'Unset'
                                ? ''
                                : load.details.trailer_type
                            }
                            onChange={(value) =>
                              updateState(value, 'Details Trailer Type')
                            }
                            type='text'
                            placeholder='Line 1'
                            className='full-width'
                          >
                            <option value='' disabled>
                              Select a Trailer
                            </option>
                            <option value='Container'>Container</option>
                            <option value='Tanked'>Tanker</option>
                            <option value='Flat-bed'>Flat-bed</option>
                            <option value='Cement Truck'>Cement Truck</option>
                            <option value='Reefer Truck'>Reefer Truck</option>
                            <option value='Car Carrier'>Car Carrier</option>
                            <option value='Dry Van'>Dry Van</option>
                            <option value='Lowboy Trailer'>
                              Lowboy Trailer
                            </option>
                            <option value='Enclosed Trailer'>
                              Enclosed Trailer
                            </option>
                          </select>
                          <p
                            className={
                              load.details.trailer_type
                                ? 'hideMe'
                                : 'errorMessage'
                            }
                          >
                            Field is Required
                          </p>
                        </div>
                      </div>
                      <div className='full-width'>
                        <div className='text-left head-label pb-8'>
                          Trailer Axle
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div>
                          <select
                            value={
                              load.details.trailer_axle === 'Unset'
                                ? ''
                                : load.details.trailer_axle
                            }
                            onChange={(value) =>
                              updateState(value, 'Details Trailer Axle')
                            }
                            type='text'
                            placeholder='Line 1'
                            className='full-width'
                          >
                            <option value='' disabled>
                              Select Axle
                            </option>
                            <option>2 Axle</option>
                            <option>3 Axle</option>
                            <option>4 Axle</option>
                            <option>5 Axle</option>
                            <option>6 Axle</option>
                          </select>
                          <p
                            className={
                              load.details.trailer_axle
                                ? 'hideMe'
                                : 'errorMessage'
                            }
                          >
                            Field is Required
                          </p>
                        </div>
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
                            <div>
                              <div className='flex'>
                                <input
                                  type='radio'
                                  value='Full'
                                  name='Details Full Or Partial'
                                  className='ratio-input full-width'
                                  onChange={(value) =>
                                    updateState(
                                      value,
                                      'Details Full Or Partial'
                                    )
                                  }
                                />
                                Full
                                <input
                                  type='radio'
                                  value='Partial'
                                  name='Details Full Or Partial'
                                  className='ratio-input full-width'
                                  onChange={(value) =>
                                    updateState(
                                      value,
                                      'Details Full Or Partial'
                                    )
                                  }
                                />
                                Partial
                              </div>
                              <p
                                className={
                                  load.details.full_or_partial
                                    ? 'hideMe'
                                    : 'errorMessage'
                                }
                              >
                                Field is Required
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='full-width mr-8'>
                        <div className='text-left head-label pb-8'>
                          Commodity
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div>
                          <select
                            value={
                              load.commodity === 'Unset' ? '' : load.commodity
                            }
                            onChange={(value) =>
                              updateState(value, 'Commodity')
                            }
                            name='Commodity'
                            className='full-width'
                          >
                            <option value='' disabled>
                              Select a Commodity
                            </option>
                            <option value='Oil & Gas'>Oil & Gas</option>
                            <option value='Textile'>Textile</option>
                            <option value='FMCG'>FMCG</option>
                            <option value='Chemical'>Chemical</option>
                            <option value='Auto'>Auto</option>
                            <option value='Beverages'>Beverages</option>
                            <option value='Cement'>Cement</option>
                            <option value='General Goods'>General Goods</option>
                            <option value='Pharmaceutical'>
                              Pharmaceutical
                            </option>
                            <option value='Agriculture'>Agriculture</option>
                          </select>
                          <p
                            className={
                              load.commodity ? 'hideMe' : 'errorMessage'
                            }
                          >
                            Field is Required
                          </p>
                        </div>
                      </div>
                      <div className='full-width'>
                        <div className='text-left head-label pb-8'>
                          Quantity
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div>
                          <input
                            type='number'
                            min='0'
                            value={
                              load.details.quantity === 'Unset'
                                ? ''
                                : load.details.quantity
                            }
                            onChange={(value) =>
                              updateState(value, 'Details Quantity')
                            }
                            name='Details Quantity'
                            placeholder='i.e, 10'
                            className='full-width'
                          />
                          <p
                            className={
                              load.details.quantity ? 'hideMe' : 'errorMessage'
                            }
                          >
                            Field is Required
                          </p>
                        </div>
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
                          <div>
                            <input
                              type='number'
                              min='0'
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
                              className='full-width'
                            >
                              <option value='ltr'>ltr</option>
                            </select>
                          </div>
                        </div>
                        <p
                          className={
                            load.details.capacity.value
                              ? 'hideMe'
                              : 'errorMessage'
                          }
                        >
                          Field is Required
                        </p>
                      </div>
                      <div className='pr-24'>
                        <div className='text-left head-label pb-8'>
                          Weight
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div className='flex'>
                          <div>
                            <input
                              type='number'
                              min='0'
                              value={
                                load.details.weight.value === 'Unset'
                                  ? ''
                                  : load.details.weight.value
                              }
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
                              className='full-width'
                            >
                              <option value=' kg'>kg</option>
                              <option value=' ton'>ton</option>
                              <option value=' lbs'>lbs</option>
                            </select>
                          </div>
                        </div>
                        <p
                          className={
                            load.details.weight.value
                              ? 'hideMe'
                              : 'errorMessage'
                          }
                        >
                          Field is Required
                        </p>
                      </div>
                      <div>
                        <div className='text-left head-label pb-8'>
                          Volume
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div className='flex'>
                          <div>
                            <input
                              type='number'
                              min='0'
                              value={
                                load.details.volume.value === 'Unset'
                                  ? ''
                                  : load.details.volume.value
                              }
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
                              className='full-width'
                            >
                              <option value=' m³'>m³</option>
                              <option value=' ft³'>ft³</option>
                              <option value=' lbs'>lbs</option>
                            </select>
                          </div>
                        </div>
                        <p
                          className={
                            load.details.volume.value
                              ? 'hideMe'
                              : 'errorMessage'
                          }
                        >
                          Field is Required
                        </p>
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
                        <div>
                          <textarea
                            value={
                              load.details.commodity_description === 'Unset'
                                ? ''
                                : load.details.commodity_description
                            }
                            onChange={(value) =>
                              updateState(
                                value,
                                'Details Commodity Description'
                              )
                            }
                            name='Details Commodity Description'
                            placeholder='Enter details'
                          />
                          <p
                            className={
                              load.details.commodity_description
                                ? 'hideMe'
                                : 'errorMessage'
                            }
                          >
                            Field is Required
                          </p>
                        </div>
                      </div>
                      <div className='left-inputs'>
                        <div className='text-left head-label pb-8'>
                          Quantity Description
                          <sup>
                            <span className='red ten'> ✸</span>
                          </sup>
                        </div>
                        <div>
                          <textarea
                            value={
                              load.details.quantity_description === 'Unset'
                                ? ''
                                : load.details.quantity_description
                            }
                            onChange={(value) =>
                              updateState(value, 'Details Quantity Description')
                            }
                            name='Details Quantity Description'
                            placeholder='i.e, Pallets, Bags, Carton etc'
                          />
                          <p
                            className={
                              load.details.quantity_description
                                ? 'hideMe'
                                : 'errorMessage'
                            }
                          >
                            Field is Required
                          </p>
                        </div>
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
                        <div>
                          <textarea
                            type='number'
                            min='0'
                            value={
                              load.details.notes === 'Unset'
                                ? ''
                                : load.details.notes
                            }
                            onChange={(value) =>
                              updateState(value, 'Details Notes')
                            }
                            name='Details Notes'
                            placeholder='Enter your notes'
                          />
                        </div>
                        <p
                          className={
                            load.details.notes ? 'hideMe' : 'errorMessage'
                          }
                        >
                          Field is Required
                        </p>
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
