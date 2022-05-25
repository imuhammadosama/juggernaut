import axios from 'axios';
import { useEffect, useState } from 'react';
import { cities } from '../data/cities.data';
import Select from 'react-dropdown-select';
import { useNavigate } from 'react-router-dom';
import Cross from '../assets/images/cross.png';
import { toast } from 'react-toastify';
toast.configure();

function Register({ closeModal, type }) {
  const url = `/clients`;
  const [client, setClient] = useState({
    id: '',
    status: '',
    type: '',
    name: '',
    ntn: '',
    strn: '',
    email: '',
    address: {
      line1: '',
      line2: '',
      city: '',
      province: '',
      postalcode: 0,
    },
    authorize_person_name: '',
    authorize_person_phone: '',
    commodity: [],
    isSuspended: {
      status: false,
      suspended_period: '',
    },
    isBlacklisted: {
      status: false,
    },
    other_details: {
      approved_by: '',
      suspended_by: '',
      blacklisted_by: '',
    },
  });
  const commodities = [
    'Oil & Gas',
    'General Goods',
    'Beverages',
    'FMCG',
    'Chemical',
    'Textile',
    'Cement',
    'Pharmaceutical',
    'Auto',
  ];
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/loads');
    }
  });

  async function registerUser(event) {
    event.preventDefault();
    await axios
      .post(url, client)
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
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const updateState = (value, field) => {
    setClient({
      ...client,
      id: '',
      status: 'Pending',
      type: client.type,
      name: field === 'Name' ? value.target.value : client.name,
      ntn: field === 'NTN' ? value.target.value : client.ntn,
      strn: field === 'STRN' ? value.target.value : client.strn,
      email: field === 'Email' ? value.target.value : client.email,
      address: {
        line1:
          field === 'Address Line1' ? value.target.value : client.address.line1,
        line2:
          field === 'Address Line2' ? value.target.value : client.address.line2,
        city:
          field === 'Address City'
            ? value.length === 0
              ? client.address.city
              : value[0].label
            : client.address.city,

        province:
          field === 'Address City'
            ? value.length === 0
              ? client.address.province
              : value[0].province
            : client.address.province,
        postalcode:
          field === 'Address Postal Code'
            ? value.target.value
            : client.address.postalcode,
      },

      authorize_person_name:
        field === 'Authorize Person Name'
          ? value.target.value
          : client.authorize_person_name,
      authorize_person_phone:
        field === 'Authorize Person Phone'
          ? value.target.value
          : client.authorize_person_phone,

      commodity: client.commodity,
      isSuspended: {
        status: false,
        suspended_period: '',
      },
      isBlacklisted: {
        status: false,
      },
      other_details: {
        approved_by: '',
        suspended_by: '',
        blacklisted_by: '',
      },
    });
  };

  if (type === 'Business')
    return (
      <div className='modal-background flex flex-item modal-animation'>
        <div className='modal-container modal-container-animation unset-height'>
          <div className='pt-8 pb-16'>
            <div className='flex flex-item space-between px-40 py-16'>
              <div></div>
              <div>
                <h1>Business Sign Up</h1>
              </div>
              <div onClick={() => closeModal(false)} className='clickable'>
                <img src={Cross} alt='cross' />
              </div>
            </div>
            <form onSubmit={registerUser} className='px-40'>
              <div className='flex'>
                <div className='right-inputs mr-16'>
                  <div className='text-left head-label pb-8'>
                    Business Name
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={(client.type = 'Business')}
                    className='hideMe'
                  />
                  <input
                    value={client.name || ''}
                    onChange={(value) => updateState(value, 'Name')}
                    type='text'
                    placeholder='Business Name'
                  />
                  <br />
                  <div className='text-left head-label pb-8 pt-16'>
                    Business STRN
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.strn || ''}
                    onChange={(value) => updateState(value, 'STRN')}
                    type='text'
                    placeholder='Business STRN'
                  />
                  <br />
                </div>
                <div className='left-inputs'>
                  <div className='text-left head-label pb-8'>
                    Business NTN
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.ntn || ''}
                    onChange={(value) => updateState(value, 'NTN')}
                    type='text'
                    placeholder='Business NTN'
                  />
                  <br />
                  <div className='text-left head-label pb-8 pt-16'>
                    Business Email
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.email || ''}
                    onChange={(value) => updateState(value, 'Email')}
                    type='email'
                    placeholder='Buisness Email'
                  />
                  <br />
                </div>
              </div>
              <div className='text-left head-label pb-8 pt-16'>
                Address
                <sup>
                  <span className='red ten'> ✸</span>
                </sup>
              </div>
              <input
                value={client.address.line1 || ''}
                onChange={(value) => updateState(value, 'Address Line1')}
                type='text'
                placeholder='Line 1'
              />
              <br />
              <input
                value={client.address.line2 || ''}
                onChange={(value) => updateState(value, 'Address Line2')}
                type='text'
                placeholder='Line 2'
              />
              <br />
              <div className='flex flex-wrap'>
                <div className='right-inputs mr-16'>
                  <Select
                    options={cities.map((city, index) => {
                      return {
                        value: index,
                        label: city.city,
                        province: city.province,
                      };
                    })}
                    onChange={(value) => {
                      updateState(value, 'Address City');
                    }}
                  />
                </div>
                <div className='right-inputs'>
                  <input
                    value={client.address.postalcode || ''}
                    onChange={(value) =>
                      updateState(value, 'Address Postal Code')
                    }
                    type='number'
                    placeholder='Postal Code'
                  />
                  <br />
                </div>
              </div>

              <div className='flex flex-wrap'>
                <div className='right-inputs mr-16'>
                  <div className='text-left head-label pb-8 pt-16'>
                    Authorize Person
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.authorize_person_name || ''}
                    onChange={(value) =>
                      updateState(value, 'Authorize Person Name')
                    }
                    type='text'
                    placeholder='Name'
                  />
                  <br />
                </div>
                <div className='left-inputs'>
                  <div className='text-left head-label pb-8 pt-16'>
                    Phone
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.authorize_person_phone || ''}
                    onChange={(value) =>
                      updateState(value, 'Authorize Person Phone')
                    }
                    type='number'
                    placeholder='Phone'
                  />
                  <br />
                </div>
              </div>
              <div className='flex flex-wrap'>
                {commodities.map((value, index) => (
                  <div className='flex-item' key={index}>
                    <a
                      className={
                        client.commodity.find((c) => c === value)
                          ? 'selected-tag my-4 mr-4'
                          : 'tag my-4 mr-4'
                      }
                      key={index}
                      onClick={() =>
                        client.commodity.find((c) => c === value)
                          ? setClient({
                              ...client,
                              commodity: client.commodity.filter(
                                (c) => c !== value
                              ),
                            })
                          : setClient({
                              ...client,
                              commodity: [...client.commodity, value],
                            })
                      }
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
              <br />

              <input
                type='submit'
                value='Register'
                className='primary-button'
              />
            </form>
          </div>
        </div>
      </div>
    );
  else {
    return (
      <div className='modal-background flex flex-item modal-animation'>
        <div className='modal-container modal-container-animation unset-height'>
          <div className='pt-8 pb-16'>
            <div className='flex flex-item space-between px-40 py-16'>
              <div></div>
              <div>
                <h1>Carrier Sign Up</h1>
              </div>
              <div onClick={() => closeModal(false)} className='clickable'>
                <img src={Cross} alt='cross' />
              </div>
            </div>
            <form onSubmit={registerUser} className='px-40'>
              <div className='flex'>
                <div className='right-inputs mr-16'>
                  <div className='text-left head-label pb-8'>
                    Company Name
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input value={(client.type = 'Carrier')} className='hideMe' />
                  <input
                    value={client.name || ''}
                    onChange={(value) => updateState(value, 'Name')}
                    type='text'
                    placeholder='Company Name'
                  />
                  <br />
                  <div className='text-left head-label pb-8 pt-16'>
                    Company STRN
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.strn || ''}
                    onChange={(value) => updateState(value, 'STRN')}
                    type='text'
                    placeholder='Company STRN'
                  />
                  <br />
                </div>
                <div className='left-inputs'>
                  <div className='text-left head-label pb-8'>
                    Company NTN
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.ntn || ''}
                    onChange={(value) => updateState(value, 'NTN')}
                    type='text'
                    placeholder='Company NTN'
                  />
                  <br />
                  <div className='text-left head-label pb-8 pt-16'>
                    Company Email
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.email || ''}
                    onChange={(value) => updateState(value, 'Email')}
                    type='email'
                    placeholder='Company Email'
                  />
                  <br />
                </div>
              </div>
              <div className='text-left head-label pb-8 pt-16'>
                Address
                <sup>
                  <span className='red ten'> ✸</span>
                </sup>
              </div>
              <input
                value={client.address.line1 || ''}
                onChange={(value) => updateState(value, 'Address Line1')}
                type='text'
                placeholder='Line 1'
              />
              <br />
              <input
                value={client.address.line2 || ''}
                onChange={(value) => updateState(value, 'Address Line2')}
                type='text'
                placeholder='Line 2'
              />
              <br />
              <div className='flex flex-wrap'>
                <div className='right-inputs mr-16'>
                  <Select
                    options={cities.map((city, index) => {
                      return {
                        value: index,
                        label: city.city,
                        province: city.province,
                      };
                    })}
                    onChange={(value) => {
                      updateState(value, 'Address City');
                    }}
                  />
                </div>
                <div className='right-inputs'>
                  <input
                    value={client.address.postalcode || ''}
                    onChange={(value) =>
                      updateState(value, 'Address Postal Code')
                    }
                    type='number'
                    placeholder='Postal Code'
                  />
                  <br />
                </div>
              </div>

              <div className='flex flex-wrap'>
                <div className='right-inputs mr-16'>
                  <div className='text-left head-label pb-8 pt-16'>
                    Authorize Person
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.authorize_person_name || ''}
                    onChange={(value) =>
                      updateState(value, 'Authorize Person Name')
                    }
                    type='text'
                    placeholder='Name'
                  />
                  <br />
                </div>
                <div className='left-inputs'>
                  <div className='text-left head-label pb-8 pt-16'>
                    Phone
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    value={client.authorize_person_phone || ''}
                    onChange={(value) =>
                      updateState(value, 'Authorize Person Phone')
                    }
                    type='number'
                    placeholder='Phone'
                  />
                  <br />
                </div>
              </div>
              <div className='flex flex-wrap'>
                {commodities.map((value, index) => (
                  <div className='flex-item' key={index}>
                    <a
                      className={
                        client.commodity.find((c) => c === value)
                          ? 'selected-tag my-4 mr-4'
                          : 'tag my-4 mr-4'
                      }
                      key={index}
                      onClick={() =>
                        client.commodity.find((c) => c === value)
                          ? setClient({
                              ...client,
                              commodity: client.commodity.filter(
                                (c) => c !== value
                              ),
                            })
                          : setClient({
                              ...client,
                              commodity: [...client.commodity, value],
                            })
                      }
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
              <br />

              <input
                type='submit'
                value='Register'
                className='primary-button'
              />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
