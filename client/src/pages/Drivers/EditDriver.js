import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import getAuth from '../../services/auth.service';

toast.configure();

export default function ({ closeModal }) {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(getAuth());
  }, []);

  const initialData = {
    cnic: '',
    name: '',
    father_name: '',
    phone: '',
    licence_category: 'HTV',
    licence_expiry: '',
    insurance_policy: '',
    health_condition: '',
    upload_cnic: [''],
    upload_licence: [''],
    client: {
      id: '',
      name: '',
    },
    approved_by: '',
    rejected_by: '',
  };
  const [formValues, setFormValues] = useState(initialData);
  const [formErrors, setFormErrors] = useState({});

  const validate = (driver) => {
    const errors = {};
    if (!driver.name) {
      errors.name = 'Name is required';
    }

    return errors;
  };

  async function registerDriver(e) {
    e.preventDefault();
    setFormErrors(validate(formValues));
    const driver = {
      cnic: formValues.cnic,
      name: formValues.name,
      father_name: formValues.father_name,
      phone: formValues.phone,
      licence_category: formValues.licence_category,
      licence_expiry: formValues.licence_expiry,
      insurance_policy: formValues.insurance_policy,
      health_condition: formValues.health_condition,
      upload_cnic: formValues.upload_cnic,
      upload_licence: formValues.upload_licence,
      client: {
        id: user.company_id,
        name: user.company_name,
      },
      approved_by: formValues.approved_by,
      rejected_by: formValues.rejected_by,
    };
    console.log(driver);
    const res = await axios.post('/drivers', driver);
    if (
      res.data.status === 'no' &&
      res.data.message === 'CNIC is already registered!'
    ) {
      setFormErrors({
        ...formErrors,
        cnic: 'CNIC is already registered!',
      });
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
      window.location.reload(false);
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(e.target.value);
    if (!e.target.value) {
      setFormErrors({ ...formErrors, [name]: `Field is required` });
    }
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  return (
    <div className='modal-background flex flex-item bg-pending modal-animation'>
      <div
        className='modal-container mx-144 flex-item text-left modal-container-animation unset-height absolute modal-container-scroll'
        style={{ backgroundColor: 'none', width: '580px' }}
      >
        <div className='pt-8 pb-16 modal-content'>
          <div className='flex flex-item space-between px-40 py-16'>
            <div>
              <h2>Add New Driver</h2>
            </div>
            <button
              onClick={() => closeModal(false)}
              className='secondary-button'
            >
              Close
            </button>
          </div>
          <div>
            <form onSubmit={registerDriver} className='px-40'>
              <div className='flex pb-16'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    Name
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='name'
                    value={formValues.name}
                    type='text'
                    placeholder='Enter driver’s name'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p className={formErrors.name ? 'errorMessage' : 'hideMe'}>
                    {formErrors.name}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Father Name
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='father_name'
                    value={formValues.father_name}
                    type='text'
                    placeholder='Enter driver’s father name'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.father_name ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.father_name}
                  </p>
                </div>
              </div>
              <div className='flex pb-24'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    CNIC
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='cnic'
                    value={formValues.cnic}
                    type='text'
                    placeholder='00000-0000000-0'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p className={formErrors.cnic ? 'errorMessage' : 'hideMe'}>
                    {formErrors.cnic}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Phone Number
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='phone'
                    value={formValues.phone}
                    type='number'
                    placeholder='0000-000-000-0000'
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p className={formErrors.phone ? 'errorMessage' : 'hideMe'}>
                    {formErrors.phone}
                  </p>
                </div>
              </div>
              <div className='flex pb-24'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    Driver's Licence Category
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <select
                    name='licence_category'
                    value={formValues.licence_category}
                    onChange={handleChange}
                    className='full-width'
                  >
                    <option>HTV</option>
                    <option>LTV</option>
                  </select>
                  <p
                    className={
                      formErrors.licence_category ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.licence_category}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Driver's Licence Expiry
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='licence_expiry'
                    value={formValues.licence_expiry}
                    type='month'
                    min={new Date()}
                    onChange={handleChange}
                    className='full-width'
                  />
                  <p
                    className={
                      formErrors.licence_expiry ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.licence_expiry}
                  </p>
                </div>
              </div>
              <div className='flex pb-24'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    Insurance Policy
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <textarea
                    name='insurance_policy'
                    value={formValues.insurance_policy}
                    type='text'
                    placeholder='Add insurance details'
                    onChange={handleChange}
                  />
                  <p
                    className={
                      formErrors.insurance_policy ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.insurance_policy}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Health Condition
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <textarea
                    name='health_condition'
                    value={formValues.health_condition}
                    type='text'
                    placeholder='Add your comments'
                    onChange={handleChange}
                  />
                  <p
                    className={
                      formErrors.health_condition ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.health_condition}
                  </p>
                </div>
              </div>

              <div className='flex pb-24'>
                <div className='full-width pr-16'>
                  <div className='text-left head-label pb-8'>
                    CNIC Pictures
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='upload_cnic'
                    value={formValues.upload_cnic}
                    type='file'
                    onChange={handleChange}
                    className='full-width'
                    multiple
                    accept='image/png, image/jpg, image/jpeg'
                  />
                  <p
                    className={
                      formErrors.upload_cnic ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.upload_cnic}
                  </p>
                </div>
                <div className='full-width'>
                  <div className='text-left head-label pb-8'>
                    Driver's Licence Pictures
                    <sup>
                      <span className='red ten'> ✸</span>
                    </sup>
                  </div>
                  <input
                    name='upload_licence'
                    value={formValues.upload_licence}
                    type='file'
                    onChange={handleChange}
                    className='full-width'
                    multiple
                    accept='document/pdf'
                  />
                  <p
                    className={
                      formErrors.upload_licence ? 'errorMessage' : 'hideMe'
                    }
                  >
                    {formErrors.upload_licence}
                  </p>
                </div>
              </div>
              <input type='submit' value='Submit' className='primary-button' />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
