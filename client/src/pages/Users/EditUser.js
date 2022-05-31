import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-dropdown-select';
import { cities } from '../../data/cities.data';
import { toast } from 'react-toastify';
import getAuth from '../../services/auth.service';

toast.configure();

export default function EditUser({ closeOpenEditModal, userId }) {
  console.log(userId);
  const [initialData, setInitialData] = useState({});
  const [loading, setLoading] = useState(false);
  const loggedUser = getAuth();

  useEffect(() => {
    getAuth();
    async function fetch() {
      setLoading(true);
      const res = await axios.get(`/users/${userId}`);
      setFormValues(res.data.data);
      setLoading(false);
    }

    fetch();
  }, []);

  const [formValues, setFormValues] = useState({});
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
      company_id: formValues.company_id,
      company_name: formValues.company_name,
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
        postalcode: formValues.postalcode,
      },
      emergency: {
        name: formValues.emergencyName,
        relation: formValues.emergencyRelation,
        phone: formValues.emergencyPhone,
      },
      added_by: formValues.added_by,
    };
    const res = await axios.post('/users/register', user);
    if (
      res.data.status === 'no' &&
      res.data.message === 'Email already used!'
    ) {
      setFormErrors({ ...formErrors, email: 'Email already used!' });
    } else if (res.data.status === 'ok') {
      closeOpenEditModal(false);
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
  if (loading)
    return (
      <div className='modal-background flex flex-item bg-pending modal-animation'>
        <div
          className='modal-container mx-144 flex-item modal-container-animation unset-height absolute modal-container-scroll'
          style={{ backgroundColor: 'none', width: '550px' }}
        ></div>
      </div>
    );
  return (
    <div className='modal-background flex flex-item bg-pending modal-animation'>
      <div
        className='modal-container mx-144 flex-item modal-container-animation unset-height absolute modal-container-scroll'
        style={{ backgroundColor: 'none', width: '550px' }}
      >
        <div className='pt-8 pb-16 '>
          <div className='flex flex-item space-between px-40 py-16'>
            <div>
              <h1>Edit Profile</h1>
            </div>
            <button
              onClick={() => closeOpenEditModal(false)}
              className='secondary-button'
            >
              Close
            </button>
          </div>
          <div>
            <form onSubmit={registerUser} className='px-40'>
              <div className='flex'>
                <div className='full-width mr-8'>
                  <input
                    name='name'
                    value={formValues.name}
                    type='text'
                    placeholder='Name'
                    onChange={handleChange}
                    className='full-width'
                    disabled
                  />
                  <p
                    className={
                      formErrors.name
                        ? 'errorMessage text-left'
                        : 'hideMe text-left'
                    }
                  >
                    {formErrors.name}
                  </p>
                </div>
                <div className='full-width'>
                  <input
                    name='cnic'
                    value={formValues.cnic}
                    type='number'
                    placeholder='CNIC'
                    onChange={handleChange}
                    className='full-width'
                    disabled
                  />
                  <p
                    className={
                      formErrors.cnic ? 'errorMessage text-left' : 'hideMe'
                    }
                  >
                    {formErrors.cnic}
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div className='full-width mr-8'>
                  <input
                    name='father_name'
                    value={formValues.father_name}
                    type='text'
                    placeholder='Father Name'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.father_name
                        ? 'errorMessage text-left'
                        : 'hideMe'
                    }
                  >
                    {formErrors.father_name}
                  </p>
                </div>
                <div className='full-width'>
                  <input
                    name='phone'
                    value={formValues.phone}
                    type='number'
                    placeholder='Phone'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.phone ? 'errorMessage text-left' : 'hideMe'
                    }
                  >
                    {formErrors.phone}
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div class='full-width mr-8'>
                  <input
                    name='email'
                    value={formValues.email}
                    type='email'
                    placeholder='Email'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.email ? 'errorMessage text-left' : 'hideMe'
                    }
                  >
                    {formErrors.email}
                  </p>
                </div>
                <div class='full-width'>
                  {' '}
                  <input
                    name='password'
                    value={formValues.password}
                    type='password'
                    placeholder='Password'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.password ? 'errorMessage text-left' : 'hideMe'
                    }
                  >
                    {formErrors.password}
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div className='full-width mr-8'>
                  <select
                    value={formValues.userType}
                    onChange={(e) => {
                      setFormValues({
                        ...formValues,
                        userType: e.target.value,
                      });
                    }}
                    className='full-width'
                  >
                    <option value='Management'>Management</option>
                    <option value='Dispatch / Tracking'>
                      Dispatch / Tracking
                    </option>
                    <option value='Billing / Invoice'>Billing / Invoice</option>
                  </select>
                </div>
                <div className='full-width'>
                  {formValues.userType === 'Management' ? (
                    <select
                      value={formValues.designation}
                      onChange={(e) => {
                        setFormValues({
                          ...formValues,
                          designation: e.target.value,
                        });
                      }}
                      className='full-width'
                    >
                      <option value='Manager Operations'>
                        Manager Operations
                      </option>
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
                      className='full-width'
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
                      className='full-width'
                    >
                      <option value='Invoice Officer'>Invoice Officer</option>
                      <option value='Billing Officer'>Billing Officer</option>
                    </select>
                  )}
                </div>
              </div>

              <div className='flex'>
                <div className='full-width mr-8'>
                  <input
                    name='line1'
                    value={formValues.line1}
                    type='text'
                    placeholder='Line1'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.line1 ? 'errorMessage text-left' : 'hideMe'
                    }
                  >
                    {formErrors.line1}
                  </p>
                </div>
                <div className='full-width'>
                  {' '}
                  <input
                    name='line2'
                    value={formValues.line2}
                    type='text'
                    placeholder='Line2'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.line2 ? 'errorMessage text-left' : 'hideMe'
                    }
                  >
                    {formErrors.line2}
                  </p>
                </div>
              </div>

              <div className='flex'>
                <div className='full-width mr-8'>
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
                        setFormErrors({
                          ...formErrors,
                          city: 'City is required!',
                        });
                      }
                    }}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.city ? 'errorMessage text-left' : 'hideMe'
                    }
                  >
                    {formErrors.city}
                  </p>
                </div>
                <div className='full-width'>
                  {' '}
                  <input
                    name='postalcode'
                    value={formValues.postalcode}
                    type='number'
                    placeholder='Postal Code'
                    onChange={handleChange}
                    className='full-width'
                  />
                </div>
              </div>

              <div className='flex'>
                <div className='full-width mr-8'>
                  <input
                    name='emergencyName'
                    value={formValues.emergencyName}
                    type='text'
                    placeholder='Emergency Name'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.emergencyName
                        ? 'errorMessage text-left'
                        : 'hideMe'
                    }
                  >
                    {formErrors.emergencyName}
                  </p>
                </div>
                <div className='full-width'>
                  <input
                    name='emergencyRelation'
                    value={formValues.emergencyRelation}
                    type='text'
                    placeholder='Emergency Relation'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.emergencyRelation
                        ? 'errorMessage text-left'
                        : 'hideMe'
                    }
                  >
                    {formErrors.emergencyRelation}
                  </p>
                </div>
              </div>

              <input
                name='emergencyPhone'
                value={formValues.emergencyPhone}
                type='number'
                placeholder='Emergency Phone'
                onChange={handleChange}
                pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
                className='full-width'
              />
              <p
                className={
                  formErrors.emergencyPhone
                    ? 'errorMessage text-left'
                    : 'hideMe'
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
