import axios from 'axios';
import { useState } from 'react';
import Select from 'react-dropdown-select';
import { cities } from '../../data/cities.data';
import { toast } from 'react-toastify';
import Cross from '../../assets/images/cross.png';

toast.configure();

export default function AddUser({ closeModal }) {
  const initialData = {
    name: '',
    cnic: '',
    father_name: '',
    phone: '',
    email: '',
    password: '',
    userType: 'Management',
    designation: 'Manager Operations',
    line1: '',
    line2: '',
    city: '',
    province: '',
    zipcode: '',
    emergencyName: '',
    emergencyRelation: '',
    emergencyPhone: '',
  };
  const [formValues, setFormValues] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});

  const validate = (user) => {
    const errors = {};
    if (!user.name) {
      errors.name = 'Name is required';
    }
    if (!user.cnic) {
      errors.cnic = 'CNIC is required';
    }
    if (!user.father_name) {
      errors.father_name = 'Father Name is required';
    }
    if (!user.phone) {
      errors.phone = 'Phone is required';
    }
    if (!user.email) {
      errors.email = 'Email is required';
    }
    if (!user.password) {
      errors.password = 'Password is required';
    }
    if (!user.line1) {
      errors.line1 = 'Address line1 is required';
    }
    if (!user.line2) {
      errors.line2 = 'Address line2 is required';
    }
    if (!user.city) {
      errors.city = 'City is required';
    }
    if (!user.emergencyName) {
      errors.emergencyName = 'Emergency Name is required';
    }
    if (!user.emergencyRelation) {
      errors.emergencyRelation = 'Emergency Relation is required';
    }
    if (!user.emergencyPhone) {
      errors.emergencyPhone = 'Emergency Phone is required';
    }
    return errors;
  };

  async function registerUser(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const user = {
      company: {
        id: '10000',
        name: 'Juggernaut',
      },
      name: formValues.name,
      cnic: formValues.cnic,
      father_name: formValues.father_name,
      phone: formValues.phone,
      email: formValues.email,
      password: formValues.password,
      type: formValues.userType,
      designation: formValues.designation,
      address: {
        line1: formValues.line1,
        line2: formValues.line2,
        city: formValues.city,
        province: formValues.province,
        zipcode: formValues.zipcode,
      },
      emergency: {
        name: formValues.emergencyName,
        relation: formValues.emergencyRelation,
        phone: formValues.emergencyPhone,
      },
      other_details: { added_by: '123456789' },
    };
    const res = await axios.post('/users/register', user);
    if (
      res.data.status === 'no' &&
      res.data.message === 'Email already used!'
    ) {
      setFormErrors({ ...formErrors, email: 'Email already used!' });
    } else if (res.data.status === 'ok') {
      closeModal(false);
      console.log(res);
      setFormValues(initialData);
      setFormErrors({});
      toast.success(res.data.message, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value, placeholder } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (!e.target.value) {
      setFormErrors({ ...formErrors, [name]: `${placeholder} is required` });
    }
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  return (
    <div className='modal-background flex flex-item bg-pending modal-animation'>
      <div
        className='modal-container mx-144 flex-item modal-container-animation unset-height absolute modal-container-scroll'
        style={{ backgroundColor: 'none', width: '768px' }}
      >
        <div className='pt-8 pb-16 '>
          <div className='flex flex-item space-between px-40 py-16'>
            <div>
              <h1>Add New User</h1>
            </div>
            <div onClick={() => closeModal(false)} className='clickable'>
              <img src={Cross} alt='cross' />
            </div>
          </div>
          <div>
            <form onSubmit={registerUser} className='px-40'>
              <input
                name='name'
                value={formValues.name}
                type='text'
                placeholder='Name'
                onChange={handleChange}
                style={{ width: '48%', marginRight: '2%' }}
              />
              <p className={formErrors.name ? 'errorMessage' : 'hideMe'}>
                {formErrors.name}
              </p>
              <input
                name='cnic'
                value={formValues.cnic}
                type='number'
                placeholder='CNIC'
                onChange={handleChange}
                style={{ width: '48%', marginLeft: '2%' }}
              />
              <p className={formErrors.cnic ? 'errorMessage' : 'hideMe'}>
                {formErrors.cnic}
              </p>
              <input
                name='father_name'
                value={formValues.father_name}
                type='text'
                placeholder='Father Name'
                onChange={handleChange}
                style={{ width: '48%', marginRight: '2%' }}
              />
              <p className={formErrors.father_name ? 'errorMessage' : 'hideMe'}>
                {formErrors.father_name}
              </p>
              <input
                name='phone'
                value={formValues.phone}
                type='number'
                placeholder='Phone'
                onChange={handleChange}
                style={{ width: '48%', marginLeft: '2%' }}
              />
              <p className={formErrors.phone ? 'errorMessage' : 'hideMe'}>
                {formErrors.phone}
              </p>
              <input
                name='email'
                value={formValues.email}
                type='email'
                placeholder='Email'
                onChange={handleChange}
                style={{ width: '48%', marginRight: '2%' }}
              />
              <p className={formErrors.email ? 'errorMessage' : 'hideMe'}>
                {formErrors.email}
              </p>
              <input
                name='password'
                value={formValues.password}
                type='password'
                placeholder='Password'
                onChange={handleChange}
                style={{ width: '48%', marginLeft: '2%' }}
              />
              <p className={formErrors.password ? 'errorMessage' : 'hideMe'}>
                {formErrors.password}
              </p>
              <select
                value={formValues.userType}
                onChange={(e) => {
                  setFormValues({
                    ...formValues,
                    userType: e.target.value,
                  });
                }}
                style={{ width: '48%', marginRight: '2%' }}
              >
                <option value='Management'>Management</option>
                <option value='Dispatch / Tracking'>Dispatch / Tracking</option>
                <option value='Billing / Invoice'>Billing / Invoice</option>
              </select>

              {formValues.userType === 'Management' ? (
                <select
                  value={formValues.designation}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      designation: e.target.value,
                    });
                  }}
                  style={{ width: '48%', marginLeft: '2%' }}
                >
                  <option value='Manager Operations'>Manager Operations</option>
                  <option value='Accounts Manager'>Accounts Manager</option>
                  <option value='Director Operations'>
                    Director Operations
                  </option>
                  <option value='Manager HR'>Manager HR</option>
                  <option value='Director Finance'>Director Finance</option>
                </select>
              ) : formValues.userType === 'Dispatch / Tracking' ? (
                <select
                  value={formValues.designation}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      designation: e.target.value,
                    });
                  }}
                  style={{ width: '48%', marginLeft: '2%' }}
                >
                  <option value='Dispatch Officer'>Dispatch Officer</option>
                  <option value='Tracking Officer'>Tracking Officer</option>
                </select>
              ) : (
                <select
                  value={formValues.designation}
                  onChange={(e) => {
                    setFormValues({
                      ...formValues,
                      designation: e.target.value,
                    });
                  }}
                  style={{ width: '48%', marginLeft: '2%' }}
                >
                  <option value='Invoice Officer'>Invoice Officer</option>
                  <option value='Billing Officer'>Billing Officer</option>
                </select>
              )}
              <input
                name='line1'
                value={formValues.line1}
                type='text'
                placeholder='Line1'
                onChange={handleChange}
              />
              <p className={formErrors.line1 ? 'errorMessage' : 'hideMe'}>
                {formErrors.line1}
              </p>
              <input
                name='line2'
                value={formValues.line2}
                type='text'
                placeholder='Line2'
                onChange={handleChange}
              />
              <p className={formErrors.line2 ? 'errorMessage' : 'hideMe'}>
                {formErrors.line2}
              </p>
              <Select
                options={cities.map((city, index) => {
                  return {
                    value: index,
                    label: city.city,
                    province: city.province,
                  };
                })}
                onChange={(value) => {
                  if (value.length !== 0) {
                    setFormValues({
                      ...formValues,
                      city: value[0].label,
                      province: value[0].province,
                    });
                    setFormErrors({ ...formErrors, city: '' });
                  } else {
                    setFormErrors({ ...formErrors, city: 'City is required!' });
                  }
                }}
              />
              <p className={formErrors.city ? 'errorMessage' : 'hideMe'}>
                {formErrors.city}
              </p>
              <input
                name='zipcode'
                value={formValues.zipcode}
                type='number'
                placeholder='Zipcode'
                onChange={handleChange}
              />
              <input
                name='emergencyName'
                value={formValues.emergencyName}
                type='text'
                placeholder='Emergency Name'
                onChange={handleChange}
                style={{ width: '48%', marginRight: '2%' }}
              />
              <p
                className={formErrors.emergencyName ? 'errorMessage' : 'hideMe'}
              >
                {formErrors.emergencyName}
              </p>
              <input
                name='emergencyRelation'
                value={formValues.emergencyRelation}
                type='text'
                placeholder='Emergency Relation'
                onChange={handleChange}
                style={{ width: '48%', marginLeft: '2%' }}
              />
              <p
                className={
                  formErrors.emergencyRelation ? 'errorMessage' : 'hideMe'
                }
              >
                {formErrors.emergencyRelation}
              </p>
              <input
                name='emergencyPhone'
                value={formValues.emergencyPhone}
                type='number'
                placeholder='Emergency Phone'
                onChange={handleChange}
                pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
              />
              <p
                className={
                  formErrors.emergencyPhone ? 'errorMessage' : 'hideMe'
                }
              >
                {formErrors.emergencyPhone}
              </p>

              <input type='submit' value='Submit' className='primary-button' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
