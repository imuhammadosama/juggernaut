import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import AddDriver from './AddDriver';
import NotSelected from '../../assets/images/empty-state/not-selected.svg';
import Loading from '../../assets/images/loading.svg';
import getAuth from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import './Drivers.css';
import Moment from 'react-moment';
import moment from 'moment';
import { toast } from 'react-toastify';

toast.configure();

export default function Drivers() {
  const navigate = useNavigate();

  const user = getAuth();
  // States
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [preDrivers, setPreDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Pending');
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage, setDriversPerPage] = useState(6);
  const indexOfLastDriver = currentPage * vehiclesPerPage;
  const indexOfFirstDriver = indexOfLastDriver - vehiclesPerPage;
  const currentDriver = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  const pendingDrivers = preDrivers.filter(
    (driver) => driver.status === 'Pending'
  );
  const activeDrivers = preDrivers.filter(
    (driver) => driver.status === 'Active'
  );

  // Pagination
  const paginate = (number) => setCurrentPage(number);

  useEffect(() => {
    getAuth();

    if (
      user.type === 'Business' ||
      user.type === 'Billing / Invoice' ||
      user.type === 'Dispatch / Tracking'
    ) {
      navigate('/');
    }
    fetch = async () => {
      setLoading(true);
      console.log(user);
      if (user.type === 'Carrier') {
        const res = await axios.get(`/drivers/client/${user.company_id}`);
        if (res.data.data !== null) {
          setDrivers(
            res.data.data.filter((driver) => driver.status === 'Pending')
          );
          setPreDrivers(res.data.data);
        }
      } else {
        const res = await axios.get('/drivers');
        setDrivers(
          res.data.data.filter((driver) => driver.status === 'Pending')
        );
        setPreDrivers(res.data.data);
      }
      setLoading(false);
    };
    fetch();
  }, []);
  const deleteDriver = () => {
    console.log('Delete Driver');
  };
  const editDriver = () => {
    console.log('Edit Driver');
  };

  async function approveDriver(driver) {
    const res = await axios
      .put(`/drivers/approve/${driver._id}`)
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
    console.log(res);
  }

  async function rejectDriver(driver) {
    const res = await axios
      .put(`/drivers/reject/${driver._id}`)
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
    console.log(res);
  }

  function handleClick(newValue) {
    setSelectedDriver(newValue);
  }
  function openAddDriver() {
    setOpenModal(true);
  }

  function getFilterClass(type) {
    if (type === selectedFilter) return 'filter-card-active';
    return 'filter-card';
  }

  function filterDrivers(type) {
    console.log(preDrivers);
  }

  if (loading)
    return (
      <div className='flex loader'>
        <div className='flex-item'>
          <img src={Loading} className='flex' alt='Loading' />
        </div>
      </div>
    );

  return (
    <div className='flex pt-24'>
      {openModal && <AddDriver closeModal={setOpenModal} />}
      <div className='table' style={{ flex: '1' }}>
        <div className='flex space-between'>
          <div className='flex-item'>
            <div
              className={`${getFilterClass('Pending')}  mr-16`}
              onClick={() => {
                setSelectedFilter('Pending');
                setDrivers(pendingDrivers);
              }}
            >
              <h2 className='my-2'>{pendingDrivers.length}</h2>
              <p className='bold my-4'>Pending Drivers</p>
            </div>
            <div
              className={`${getFilterClass('Active')} `}
              onClick={() => {
                setSelectedFilter('Active');
                setDrivers(activeDrivers);
              }}
            >
              <h2 className='my-2'>{activeDrivers.length}</h2>
              <p className='bold my-4'>Active Drivers</p>
            </div>
          </div>
          <div className='flex-item'>
            {user.type === 'Carrier' || user.type === 'Super Admin' ? (
              <button
                className='primary-button unset-width'
                onClick={openAddDriver}
              >
                Add Driver
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex space-between'>
          <div className='flex-item'>
            <h1>Drivers</h1>
          </div>
          <div className='flex-item'></div>
        </div>
        {selectedFilter === 'Pending' && user.type !== 'Carrier' ? (
          <Table
            page={'drivers'}
            loading={loading}
            items={currentDriver}
            names={['cnic', 'name', 'father_name', 'phone', '', 'status']}
            titles={[
              'CNIC',
              'Name',
              'Father Name',
              'Phone Number',
              '',
              'Status',
              '',
              'Manage',
            ]}
            buttons={[
              {
                name: 'Approve',
                class: 'primary-button',
                onClick: approveDriver,
              },
            ]}
            selectedItem={selectedDriver}
            setItem={setSelectedDriver}
          />
        ) : selectedFilter === 'Active' && user.type !== 'Carrier' ? (
          <Table
            page={'drivers'}
            loading={loading}
            items={currentDriver}
            names={['cnic', 'name', 'father_name', 'phone', '', 'status']}
            titles={[
              'CNIC',
              'Name',
              'Father Name',
              'Phone Number',
              '',
              'Status',
              '',
              'Manage',
            ]}
            buttons={[
              {
                name: 'Reject',
                class: 'secondary-button',
                onClick: rejectDriver,
              },
            ]}
            selectedItem={selectedDriver}
            setItem={setSelectedDriver}
          />
        ) : (
          <Table
            page={'drivers'}
            loading={loading}
            items={currentDriver}
            names={['cnic', 'name', 'father_name', 'phone', '', 'status']}
            titles={[
              'CNIC',
              'Name',
              'Father Name',
              'Phone Number',
              '',
              'Status',
              '',
              'Manage',
            ]}
            buttons={[
              {
                name: 'Edit',
                class: 'primary-button',
                onClick: editDriver,
              },
              {
                name: 'Delete',
                class: 'secondary-button',
                onClick: deleteDriver,
              },
            ]}
            selectedItem={selectedDriver}
            setItem={setSelectedDriver}
          />
        )}
        <Pagination
          totalItems={drivers.length}
          itemsPerPage={vehiclesPerPage}
          paginate={paginate}
          currentPage={currentPage}
          itemsOnPage={currentDriver.length}
        />
      </div>
      <div className='sidebar-right'>
        {selectedDriver === false ? (
          <div className='flex flex-item' style={{ height: '100%' }}>
            <img src={NotSelected} alt='Not Selected' />
          </div>
        ) : (
          <div className='pb-64'>
            <div className='p-48 border-bottom'>
              <div className='pb-24'>
                <div className='small-title pb-8'>Driver's CNIC</div>
                <div>{selectedDriver.cnic}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Driver's Name</div>
                <div>{selectedDriver.name}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Father's Name</div>
                <div>{selectedDriver.father_name}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Phone Number</div>
                <div>{selectedDriver.phone}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>
                  Driver's Licence Category
                </div>
                <div>{selectedDriver.licence_category}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Driver's Licence Expiry</div>
                <p>
                  <Moment format='d MMMM Y'>
                    {selectedDriver.licence_expiry}
                  </Moment>
                  <span className='mr-4'></span>
                </p>
              </div>

              <div className='small-title pb-8'>Carrier</div>
              <div className='id-tag' style={{ width: 'fit-content' }}>
                {selectedDriver.client.name}
              </div>
            </div>

            {selectedDriver.approved_by !== '0' ? (
              <div className='p-48'>
                <div className='small-title pb-8'>Approved By</div>
                <div className='id-tag' style={{ width: 'fit-content' }}>
                  {selectedDriver.approved_by}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
