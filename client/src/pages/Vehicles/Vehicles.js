import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import AddVehicle from './AddVehicle';
import EditVehicle from './EditVehicle';
import NotSelected from '../../assets/images/empty-state/not-selected.svg';
import Loading from '../../assets/images/loading.svg';
import getAuth from '../../services/auth.service';
import { useNavigate } from 'react-router-dom';
import './Vehicles.css';
import { toast } from 'react-toastify';

toast.configure();

export default function Vehicles() {
  const user = getAuth();
  const navigate = useNavigate();
  // States
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [vehicles, setVehicles] = useState([]);
  const [preVehicles, setPreVehicles] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Pending');
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage, setVehiclesPerPage] = useState(6);
  const indexOfLastVehicle = currentPage * vehiclesPerPage;
  const indexOfFirstVehicle = indexOfLastVehicle - vehiclesPerPage;
  const currentVehicle = vehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );

  const pendingVehicles = preVehicles.filter(
    (vehicle) => vehicle.status === 'Pending'
  );
  const activeVehicles = preVehicles.filter(
    (vehicle) => vehicle.status === 'Active'
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
        const res = await axios.get(`/vehicles/client/${user.company_id}`);
        console.log(res.data.data);
        if (res.data.data !== null) {
          setPreVehicles(res.data.data);
          setVehicles(
            res.data.data.filter((vehicle) => vehicle.status === 'Pending')
          );
        }
      } else {
        const res = await axios.get('/vehicles');
        setPreVehicles(res.data.data);
        setVehicles(
          res.data.data.filter((vehicle) => vehicle.status === 'Pending')
        );
      }
      setLoading(false);
    };
    fetch();
  }, []);
  async function approveVehicle(vehicle) {
    const res = await axios
      .put(`/vehicles/approve/${vehicle._id}`)
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
      });
  }

  async function rejectVehicle(vehicle) {
    const res = await axios
      .put(`/vehicles/reject/${vehicle._id}`)
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
      });
  }
  async function deleteVehicle(vehicle) {
    await axios.delete(`/vehicles/${vehicle._id}`).then((response) => {
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
    });
  }
  function handleClick(newValue) {
    setSelectedVehicle(newValue);
  }

  function openAddVehicle() {
    setOpenModal(true);
  }

  function getFilterClass(type) {
    if (type === selectedFilter) return 'filter-card-active';
    return 'filter-card';
  }

  function filterVehicles(type) {
    console.log(preVehicles);
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
    <div className='flex pt-24 scroll-no'>
      {openModal && <AddVehicle closeModal={setOpenModal} />}
      {openEditModal && (
        <EditVehicle
          closeEditModal={setOpenEditModal}
          thisVehicle={selectedVehicle}
        />
      )}
      <div className='table' style={{ flex: '1' }}>
        <div className='flex space-between'>
          <div className='flex-item'>
            <div
              className={`${getFilterClass('Pending')}  mr-16`}
              onClick={() => {
                setSelectedFilter('Pending');
                setVehicles(pendingVehicles);
              }}
            >
              <h2 className='my-2'>{pendingVehicles.length}</h2>
              <p className='bold my-4'>Pending Vehicles</p>
            </div>
            <div
              className={`${getFilterClass('Active')} `}
              onClick={() => {
                setSelectedFilter('Active');
                setVehicles(activeVehicles);
              }}
            >
              <h2 className='my-2'>{activeVehicles.length}</h2>
              <p className='bold my-4'>Active Vehicles</p>
            </div>
          </div>
          <div className='flex-item'>
            {user.type === 'Carrier' || user.type === 'Super Admin' ? (
              <button
                className='primary-button unset-width'
                onClick={openAddVehicle}
              >
                Add Vehicle
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
        <div className='flex space-between'>
          <div className='flex-item'>
            <h1>Vehicles</h1>
          </div>
          <div className='flex-item'></div>
        </div>
        {selectedFilter === 'Pending' && user.type !== 'Carrier' ? (
          <Table
            page={'vehicles'}
            loading={loading}
            items={currentVehicle}
            names={[
              'registeration_number',
              'make',
              'year',
              'trailer_axle',
              'chasis_number',
              'status',
            ]}
            titles={[
              'Registeration #',
              'Make',
              'Year',
              'Trailer Axle',
              'Chasis Number',
              'Status',
              '',
              'Manage',
            ]}
            buttons={[
              {
                name: 'Approve',
                class: 'primary-button',
                onClick: approveVehicle,
              },
            ]}
            selectedItem={selectedVehicle}
            setItem={setSelectedVehicle}
          />
        ) : selectedFilter === 'Active' && user.type !== 'Carrier' ? (
          <Table
            page={'vehicles'}
            loading={loading}
            items={currentVehicle}
            names={[
              'registeration_number',
              'make',
              'year',
              'trailer_axle',
              'chasis_number',
              'status',
            ]}
            titles={[
              'Registeration #',
              'Make',
              'Year',
              'Trailer Axle',
              'Chasis Number',
              'Status',
              '',
              'Manage',
            ]}
            buttons={[
              {
                name: 'Reject',
                class: 'secondary-button',
                onClick: rejectVehicle,
              },
            ]}
            selectedItem={selectedVehicle}
            setItem={setSelectedVehicle}
          />
        ) : (
          <Table
            page={'vehicles'}
            loading={loading}
            items={currentVehicle}
            names={[
              'registeration_number',
              'make',
              'year',
              'trailer_axle',
              'chasis_number',
              'status',
              '',
            ]}
            titles={[
              'Registeration #',
              'Make',
              'Year',
              'Trailer Axle',
              'Chasis Number',
              'Status',
              '',
              'Carrier',
              'Manage',
            ]}
            buttons={[
              {
                name: 'Edit',
                class: 'primary-button',
                onClick: () => setOpenEditModal(true),
              },
              {
                name: 'Delete',
                class: 'secondary-button',
                onClick: deleteVehicle,
              },
            ]}
            selectedItem={selectedVehicle}
            setItem={setSelectedVehicle}
          />
        )}
        <Pagination
          totalItems={vehicles.length}
          itemsPerPage={vehiclesPerPage}
          paginate={paginate}
          currentPage={currentPage}
          itemsOnPage={currentVehicle.length}
        />
      </div>
      <div className='sidebar-right'>
        {selectedVehicle === false ? (
          <div className='flex flex-item' style={{ height: '100%' }}>
            <img src={NotSelected} alt='Not Selected' />
          </div>
        ) : (
          <div className='pb-64'>
            <div className='p-48 border-bottom'>
              <div className='pb-24'>
                <div className='small-title pb-8'>Vehicle Pic</div>
                <div>
                  <a href={selectedVehicle.upload_images[0]} target='_blank'>
                    View Image
                  </a>
                </div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Registeration Number</div>
                <div>{selectedVehicle.registeration_number}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Registeration Document</div>
                <div>
                  <a href={selectedVehicle.upload_documents[0]} target='_blank'>
                    View Image
                  </a>
                </div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Make</div>
                <div>{selectedVehicle.make}</div>
              </div>

              <div className='pb-24'>
                <div className='small-title pb-8'>Engine Number</div>
                <div>{selectedVehicle.engine_number}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Chasis Number</div>
                <div>{selectedVehicle.chasis_number}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Insurance Policy</div>
                <div>{selectedVehicle.insurance_policy}</div>
              </div>
              <div className='small-title pb-8'>Carrier</div>
              <div className='id-tag' style={{ width: 'fit-content' }}>
                {selectedVehicle.client.name}
              </div>
            </div>

            {selectedVehicle.approved_by !== '0' ? (
              <div className='p-48'>
                <div className='small-title pb-8'>Approved By</div>
                <div className='id-tag' style={{ width: 'fit-content' }}>
                  {selectedVehicle.approved_by}
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
