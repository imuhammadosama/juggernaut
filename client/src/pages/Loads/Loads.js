// General Imports
import { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';
import Countdown from 'react-countdown';
import getAuth from '../../services/auth.service.js';
import { toast } from 'react-toastify';

// Component Imports
import Modal from '../../components/Modal/Modal';
import Pagination from '../../components/Pagination/Pagination';
import Dropdown from '../../components/Dropdown/Dropdown.js';

// Modal Imports
import TrackLoad from './TrackLoad.js';
import UpdateTracking from './UpdateTracking.js';
import Print from '../Print.js';
import PickLoad from './PickLoad.js';
import AddLoad from './AddLoad.js';

// Images Import
import NotSelected from '../../assets/images/empty-state/not-selected.svg';
import searchIcon from '../../assets/images/search-icon.svg';
import Loading from '../../assets/images/loading.svg';

import pendingIcon from '../../assets/loads/pending-icon.svg';
import activeIcon from '../../assets/loads/active-icon.svg';
import dispatchedIcon from '../../assets/loads/dispatched-icon.svg';
import completedIcon from '../../assets/loads/completed-icon.svg';

import './Load.css';

toast.configure();

const Loads = () => {
  // Modals
  const [openModal, setOpenModal] = useState(false);
  const [openAddLoadModal, setOpenAddLoadModal] = useState(false);
  const [openPrintModal, setOpenPrintModal] = useState(false);
  const [openTrackModal, setOpenTrackModal] = useState(false);
  const [openUpdateTrackingModal, setOpenUpdateTrackingModal] = useState(false);
  const [openPickModal, setOpenPickModal] = useState(false);

  // General States
  const user = getAuth();
  const [loads, setLoads] = useState([]);
  const [preLoads, setPreLoads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(false);
  const [loadAmount, setLoadAmount] = useState(0);
  const [loadDistance, setLoadDistance] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('pending');
  const [printType, setPrintType] = useState('');

  // Pagination
  const [pointedLoad, setPointedLoad] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const loadsPerPage = 8;
  const indexOfLastLoad = currentPage * loadsPerPage;
  const indexOfFirstLoad = indexOfLastLoad - loadsPerPage;
  const currentLoads = loads.slice(indexOfFirstLoad, indexOfLastLoad);

  // Search
  const [search, setSearch] = useState(false);
  const [searchMessage, setSearchMessage] = useState('');

  // Filters
  const [filters, setFilters] = useState({});

  // Filter loads
  const handleOriginFilter = async (e) => {
    setFilters({ ...filters, origin: e.target.value });
    if (e.target.value !== 'All') {
      const res = await axios.get(`/loads/origin/${e.target.value}`);
      setLoads(res.data.data);
    } else {
      setLoads(preLoads);
    }
  };

  // Filter loads
  const handleDestinationFilter = async (e) => {
    setFilters({ ...filters, destination: e.target.value });
    if (e.target.value !== 'All') {
      const res = await axios.get(`/loads/destination/${e.target.value}`);
      setLoads(res.data.data);
    } else {
      setLoads(preLoads);
    }
  };

  // Filter loads
  const handleVehicleFilter = async (e) => {
    console.log(e.target.value);
    setFilters({ ...filters, vehicle: e.target.value });
    if (e.target.value !== 'All') {
      const res = await axios.get(`/loads/vehicle/${e.target.value}`);
      setLoads(res.data.data);
    } else {
      setLoads(preLoads);
    }
  };

  // Filter loads
  const handleComodityFilter = async (e) => {
    console.log(e.target.value);
    setFilters({ ...filters, comodity: e.target.value });
    if (e.target.value !== 'All') {
      const res = await axios.get(`/loads/comodity/${e.target.value}`);
      setLoads(res.data.data);
    } else {
      setLoads(preLoads);
    }
  };

  useEffect(() => {
    // filterPending();
    getAuth();
    console.log(user);
    fetch = async () => {
      setLoading(true);

      const res =
        user.type === 'Management' || user.type === 'Super Admin'
          ? await axios.get('/loads')
          : user.type === 'Dispatch / Tracking'
          ? await axios.get('/loads/dispatchTracking')
          : user.type === 'Billing / Invoice'
          ? await axios.get('/loads/billingInvoice')
          : user.type === 'Business'
          ? // Add Carrier ID
            await axios.get(`loads/business/${user.company}`)
          : user.type === 'Carrier'
          ? await axios.get(`/loads/carrier/${user.company}`)
          : // Add Carrier ID
            await axios.get('/loads');
      const l = res.data.data;
      if (user.type === 'Management' || user.type === 'Super Admin') {
        const p = l.filter((load) => load.status === 'Pending');
        setLoads(p);
      } else {
        setLoads(l);
      }

      setPreLoads(res.data.data);

      setLoading(false);
    };
    fetch();
  }, []);

  const pendingLoads = preLoads.filter((load) => load.status === 'Pending');
  const activeLoads = preLoads.filter((load) => load.status === 'Active');
  const dispatchedLoads = preLoads.filter(
    (load) => load.status === 'Dispatched'
  );
  const completedLoads = preLoads.filter((load) => load.status === 'Completed');

  // Filters for the Users
  const billingInvoiceLoads = preLoads.filter(
    (load) => load.status === 'Completed' || 'Pending'
  );
  const dispatchedTrackingLoads = preLoads.filter(
    (load) => load.status === 'Dispatched'
  );
  const carrierLoads = preLoads.filter(
    (load) => load.status === 'Completed' || 'Active' || 'Dispatched'
  );

  const handleSearch = (event) => {
    setSearch(true);
    if (event.target.value) {
      if (
        preLoads.filter((load) => load.id === event.target.value).length === 0
      ) {
        if (selectedFilter === 'pending') {
          filterPending();
        }
        if (selectedFilter === 'active') {
          filterActive();
        }
        if (selectedFilter === 'dispatched') {
          filterDispatched();
        }
        if (selectedFilter === 'completed') {
          filterCompleted();
        }
        setSearchMessage(<p className='errorMessage m-0'>Load Not Found</p>);
      } else {
        setLoads(preLoads.filter((load) => load.id === event.target.value));
        setSearchMessage(<p className='success-message m-0'>Load Found</p>);
      }
    } else {
      setSearchMessage('');
      if (selectedFilter === 'pending') {
        filterPending();
      }
      if (selectedFilter === 'active') {
        filterActive();
      }
      if (selectedFilter === 'dispatched') {
        filterDispatched();
      }
      if (selectedFilter === 'completed') {
        filterCompleted();
      }
      // setLoads(preLoads);
      setSearch(false);
    }
  };

  // Pagination
  const paginate = (number) => setCurrentPage(number);

  const getRowClass = (load) => {
    const status = load.status;
    if (status === 'Pending') {
      return 'pending-load';
    } else if (status === 'Active') {
      return 'active-load';
    } else if (status === 'Dispatched') {
      return 'dispatched-load';
    } else if (status === 'Completed') {
      return 'completed-load';
    } else {
      return 'cancelled-load';
    }
  };

  const getFilterClass = (status) => {
    if (selectedFilter === status) {
      return `filter-${status} filter-${status}-active pr-32 mr-16`;
    } else return `filter-${status} pr-32 mr-16`;
  };

  const updateDetails = (load) => {
    setSelectedLoad({ ...load });
  };

  const cancelLoad = async (load) => {
    await axios.put(`/loads/cancel/${load.id}`).then((response) => {
      setSelectedLoad(false);
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
    await axios
      .delete(`/loads/cancel/${load._id}`, {
        method: 'DELETE',
      })
      .then((response) => {
        setSelectedLoad(false);
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
    const res = await axios.get(`/loads`, {
      method: 'GET',
    });
    const loads = res.data.data;
    setPreLoads(loads);
  };

  const handlePrintSelected = () => {
    alert('Print Selected');
  };

  async function acceptLoad(event) {
    event.preventDefault();
    await axios
      .put(`/loads/accept/${selectedLoad._id}`, {
        amount: loadAmount,
        distance: loadDistance,
        amount_set_by: user.id,
      })
      .then((response) => {
        setSelectedLoad(false);
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
    const res = await axios.get(`/loads`, {
      method: 'GET',
    });

    const loads = res.data.data;
    setLoads(loads);
    setPreLoads(loads);
  }

  const filterPending = () => {
    setSelectedLoad(false);
    setSelectedFilter('pending');
    const pendingLoads = preLoads.filter((load) => load.status === 'Pending');
    setLoads(pendingLoads);
  };

  const filterActive = () => {
    setSelectedLoad(false);
    setSelectedFilter('active');
    const activeLoads = preLoads.filter((load) => load.status === 'Active');
    setLoads(activeLoads);
  };

  const filterDispatched = () => {
    setSelectedLoad(false);
    setSelectedFilter('dispatched');
    const dispatchedLoads = preLoads.filter(
      (load) => load.status === 'Dispatched'
    );
    setLoads(dispatchedLoads);
  };

  const filterCompleted = () => {
    setSelectedLoad(false);
    setSelectedFilter('completed');
    const completedLoads = preLoads.filter(
      (load) => load.status === 'Completed'
    );
    setLoads(completedLoads);
  };

  const filterCancelled = () => {
    setSelectedLoad(false);
    setSelectedFilter('cancelled');
    const cancelledLoads = preLoads.filter(
      (load) => load.status === 'Cancelled'
    );
    setLoads(cancelledLoads);
  };

  if (loading)
    return (
      <div className='flex loader'>
        <div className='flex-item'>
          <img src={Loading} className='flex' alt='Loading' />
        </div>
      </div>
    );

  return (
    <div className='flex'>
      {openAddLoadModal && (
        <AddLoad
          closeOpenAddLoadModal={setOpenAddLoadModal}
          selectedLoad={selectedLoad}
        />
      )}
      {openPickModal && (
        <PickLoad
          closePickModal={setOpenPickModal}
          selectedLoad={selectedLoad}
        />
      )}
      {openPrintModal && (
        <Print
          closePrintModal={setOpenPrintModal}
          selectedLoad={selectedLoad}
          printType={printType}
        />
      )}
      {openTrackModal && (
        <TrackLoad closeTrackModal={setOpenTrackModal} load={selectedLoad} />
      )}
      {openUpdateTrackingModal && (
        <UpdateTracking
          closeUpdateTrackingModal={setOpenUpdateTrackingModal}
          load={selectedLoad}
        />
      )}
      {openModal && (
        <Modal
          closeModal={setOpenModal}
          executeFunction={cancelLoad}
          data={pointedLoad}
        />
      )}

      {/* <Table data={loads} columns={4} buttons={['Delete']} /> */}
      <div className='sidebar-left no-scrolls pb-120'>
        {/* <div className='p-16 border-bottom-white'>
          <div className='bold pb-16'>Date</div>
          <input type='date' />
          <input type='date' />
        </div> */}
        <div
          className='brand-bg uppercase bold text-center pt-8 pb-8 clickable'
          onClick={() => filterCancelled()}
        >
          Cancelled Loads
        </div>
        {user.type === 'Business' || user.type === 'Super Admin' ? (
          <div className='p-16 border-bottom-white flex flex-item bg-white border-right-grey'>
            <button
              onClick={() => setOpenAddLoadModal(true)}
              className='primary-button'
            >
              Add Load
            </button>
          </div>
        ) : (
          <div></div>
        )}
        <div className='p-16 border-bottom-white'>
          <div className='bold pb-16'>Locations</div>
          <div className='small-title pb-8'>Origin</div>
          <select
            style={{ backgroundColor: 'White' }}
            className='mb-24 full-width'
            onChange={handleOriginFilter}
          >
            <option value='All'>All</option>
            {preLoads
              .map((load) => load.origin.address.city)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((location, index) => {
                return <option key={index}>{location}</option>;
              })}
          </select>
          <div className='small-title pb-8'>Destination</div>
          <select
            style={{ backgroundColor: 'White' }}
            className='mb-24 full-width'
            onChange={handleDestinationFilter}
          >
            <option value='All'>All</option>
            {preLoads
              .map((load) => load.destination.address.city)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((location, index) => {
                return <option key={index}>{location}</option>;
              })}
          </select>
        </div>
        <div className='p-16 border-bottom-white'>
          <div className='bold pb-16'>Clients</div>
          <div className='small-title pb-8'>Business</div>
          <select
            style={{ backgroundColor: 'White' }}
            className='mb-24 full-width'
            onChange={handleOriginFilter}
          >
            <option value='All'>All</option>
            {preLoads
              .map((load) => load.origin.address.city)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((location, index) => {
                return <option key={index}>{location}</option>;
              })}
          </select>
          <div className='small-title pb-8'>Carrier</div>
          <select
            style={{ backgroundColor: 'White' }}
            className='mb-24 full-width'
            onChange={handleDestinationFilter}
          >
            <option value='All'>All</option>
            {preLoads
              .map((load) => load.destination.address.city)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((location, index) => {
                return <option key={index}>{location}</option>;
              })}
          </select>
        </div>
        <div className='p-16 border-bottom-white'>
          <div className='bold pb-16'>Vehicle</div>
          <input
            type='radio'
            value='All'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          All
          <br />
          <input
            type='radio'
            value='Container'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Container
          <br />
          <input
            type='radio'
            value='Tanker'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Tanker
          <br />
          <input
            type='radio'
            value='Flat-bed'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Flat-bed
          <br />
          <input
            type='radio'
            value='Cement Truck'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Cement Truck
          <br />
          <input
            type='radio'
            value='Reefer Truck'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Reefer Truck
          <br />
          <input
            type='radio'
            value='Car Carrier'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Car Carrier
          <br />
          <input
            type='radio'
            value='Dry Van'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Dry Van
          <br />
          <input
            type='radio'
            value='Lowboy Trailer'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Lowboy Trailer
          <br />
          <input
            type='radio'
            value='Enclosed Trailer'
            name='Vehicle'
            onChange={handleVehicleFilter}
          />
          Enclosed Trailer
          <br />
        </div>
        <div className='p-16 '>
          <div className='bold pb-16'>Commodity</div>
          <input
            type='radio'
            value='All'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          All
          <br />
          <input
            type='radio'
            value='Oil & Gas'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          Oil & Gas
          <br />
          <input
            type='radio'
            value='Textile'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          Textile
          <br />
          <input
            type='radio'
            value='FMCG'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          FMCG
          <br />
          <input
            type='radio'
            value='Chemical'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          Chemical
          <br />
          <input
            type='radio'
            value='Auto'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          Auto
          <br />
          <input
            type='radio'
            value='Beverages'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          Beverages
          <br />
          <input
            type='radio'
            value='Cement'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          Cement
          <br />
          <input
            type='radio'
            value='General Goods'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          General Goods
          <br />
          <input
            type='radio'
            value='Pharmaceutical'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          Pharmaceutical
          <br />
          <input
            type='radio'
            value='Agriculture'
            name='Comodity'
            onChange={handleComodityFilter}
          />
          Agriculture
          <br />
        </div>
      </div>
      {user.type === 'Management' || user.type === 'Super Admin' ? (
        <div className='table all-loads no-scroll'>
          <div className='flex py-32'>
            <div
              className={getFilterClass('pending')}
              onClick={() => filterPending()}
            >
              <div className='filter-title'>Pending</div>
              <div className='pb-24'>Loads</div>
              <div className='flex space-between'>
                <div className='filter-title'>{pendingLoads.length}</div>
                <div className='filter-title'>
                  <img src={pendingIcon} />
                </div>
              </div>
            </div>
            <div
              className={getFilterClass('active')}
              onClick={() => filterActive()}
            >
              <div className='filter-title'>Active</div>
              <div className='pb-24'>Loads</div>
              <div className='flex space-between'>
                <div className='filter-title'>{activeLoads.length}</div>
                <div className='filter-title'>
                  <img src={activeIcon} />
                </div>
              </div>
            </div>
            <div
              className={getFilterClass('dispatched')}
              onClick={() => filterDispatched()}
            >
              <div className='filter-title'>Dispatched</div>
              <div className='pb-24'>Loads</div>
              <div className='flex space-between'>
                <div className='filter-title'>{dispatchedLoads.length}</div>
                <div className='filter-title'>
                  <img src={dispatchedIcon} />
                </div>
              </div>
            </div>
            <div
              className={getFilterClass('completed')}
              onClick={() => filterCompleted()}
            >
              <div className='filter-title'>Completed</div>
              <div className='pb-24'>Loads</div>
              <div className='flex space-between'>
                <div className='filter-title'>{completedLoads.length}</div>
                <div className='filter-title'>
                  <img src={completedIcon} />
                </div>
              </div>
            </div>
          </div>
          <div className='flex space-between'>
            <div className='flex-item'>
              <h1 className='pr-24'>Loads</h1>
              <div className='flex-item'>
                <div className='flex-item input-box'>
                  <input
                    className='mb-0 width-350 search-input'
                    id='search'
                    type='text'
                    onChange={handleSearch}
                    placeholder='Search by load number'
                  />
                  <span className='unit'>
                    <img src={searchIcon} alt='Search Icon' />
                  </span>
                </div>
                <div className='pl-16 flex-item '>
                  {search ? searchMessage : ''}
                </div>
              </div>
            </div>

            <div className='flex-item'>
              <Dropdown
                items={[
                  { name: 'Print All', function: handlePrintSelected },
                  { name: 'Print Selected', function: handlePrintSelected },
                ]}
                title={{ name: 'Print', class: 'droper clickable' }}
              />
            </div>
          </div>
          {loads.length === 0 ? (
            <div className='text-center'>
              <h1>Load not found!</h1>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Load No.</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Trailer Type</th>
                  <th>Timer</th>
                  <th>Cancellation</th>
                </tr>
              </thead>
              <tbody>
                {currentLoads.map((load, index) => (
                  <tr
                    className={
                      load._id === selectedLoad._id
                        ? `${getRowClass(load)}-selected`
                        : getRowClass(load)
                    }
                    onClick={() => updateDetails(load)}
                    key={index}
                  >
                    <td>{load.id}</td>
                    <td>
                      {load.origin.address.city}
                      <span className='mr-4'>,</span>
                      {load.origin.address.province}
                      <br />
                      <p className='time'>
                        <Moment format='ddd D/M'>
                          {load.origin.date_and_time}
                        </Moment>
                        <span className='mr-4'></span>
                        {
                          <Moment format='HH:mm'>
                            {load.origin.date_and_time}
                          </Moment>
                        }
                        <span> - </span>
                        {
                          <Moment
                            format='HH:mm'
                            add={(10, 'minutes')}
                            date={moment(load.origin.date_and_time).add(
                              2,
                              'hours'
                            )}
                          />
                        }
                        &nbsp;HRS
                      </p>
                    </td>
                    <td>
                      <div className='flex destination'>
                        <div className='mr-16'>→</div>
                        <div>
                          {load.destination.address.city}
                          <span className='mr-4'>,</span>
                          {load.destination.address.province}
                          <br />
                          <p className='time'>
                            <Moment format='ddd D/M'>
                              {load.destination.date_and_time}
                            </Moment>
                            <span className='mr-4'></span>
                            <Moment format='HH:mm'>
                              {load.destination.date_and_time}
                            </Moment>{' '}
                            <span> - </span>
                            {
                              <Moment
                                format='HH:mm'
                                add={(10, 'minutes')}
                                date={moment(load.origin.date_and_time).add(
                                  2,
                                  'hours'
                                )}
                              />
                            }
                            &nbsp;HRS
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{load.details.trailer_type}</td>
                    <td>
                      <Countdown date={Date.now() + 400000}>
                        {<span>Expired!</span>}
                      </Countdown>
                    </td>
                    <td>
                      {load.status === 'Cancelled' ? (
                        <p className='pending uppercase'>Cancelled</p>
                      ) : (
                        <button
                          className='secondary-button'
                          onClick={() => {
                            setPointedLoad(load);
                            setOpenModal(true);
                          }}
                        >
                          Cancel
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Pagination
            totalItems={loads.length}
            itemsPerPage={loadsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            itemsOnPage={currentLoads.length}
          />
          <div className='pb-120'></div>
        </div>
      ) : (
        <div className='table all-loads no-scroll'>
          <div className='flex space-between'>
            <div className='flex-item'>
              <h1 className='pr-24'>Loads</h1>
              <div className='flex-item'>
                <div className='flex-item input-box'>
                  <input
                    className='mb-0 width-350 search-input'
                    id='search'
                    type='text'
                    onChange={handleSearch}
                    placeholder='Search by load number'
                  />
                  <span className='unit'>
                    <img src={searchIcon} alt='Search Icon' />
                  </span>
                </div>
                <div className='pl-16 flex-item '>
                  {search ? searchMessage : ''}
                </div>
              </div>
            </div>

            <div className='flex-item'>
              <Dropdown
                items={[
                  { name: 'Print Selected', function: handlePrintSelected },
                ]}
                title={{ name: 'Print', class: 'droper clickable' }}
              />
            </div>
          </div>
          <div>
            <div className='flex space-between'>
              <div className='flex '></div>
            </div>
          </div>
          {loads.length === 0 ? (
            <div className='text-center'>
              <h1>Load not found!</h1>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Load Number</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Trailer Type</th>
                  <th>Distance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentLoads.map((load, index) => (
                  <tr
                    className={
                      load._id === selectedLoad._id
                        ? `${getRowClass(load)}-selected`
                        : getRowClass(load)
                    }
                    onClick={() => updateDetails(load)}
                    key={index}
                  >
                    <td>{load.id}</td>
                    <td>
                      {load.origin.address.city}
                      <span className='mr-4'>,</span>
                      {load.origin.address.province}
                      <br />
                      <p className='time'>
                        <Moment format='ddd D/M'>
                          {load.origin.date_and_time}
                        </Moment>
                        <span className='mr-4'></span>
                        {
                          <Moment format='HH:mm'>
                            {load.origin.date_and_time}
                          </Moment>
                        }
                        <span> - </span>
                        {
                          <Moment
                            format='HH:mm'
                            add={(10, 'minutes')}
                            date={moment(load.origin.date_and_time).add(
                              2,
                              'hours'
                            )}
                          />
                        }
                      </p>
                    </td>
                    <td>
                      <div className='flex destination'>
                        <div className='mr-16'>→</div>
                        <div>
                          {load.destination.address.city}
                          <span className='mr-4'>,</span>
                          {load.destination.address.province}
                          <br />
                          <p className='time'>
                            <Moment format='ddd D/M'>
                              {load.destination.date_and_time}
                            </Moment>
                            <span className='mr-4'></span>
                            {
                              <Moment format='HH:mm'>
                                {load.destination.date_and_time}
                              </Moment>
                            }
                            <span> - </span>
                            {
                              <Moment
                                format='HH:mm'
                                add={(10, 'minutes')}
                                date={moment(load.origin.date_and_time).add(
                                  2,
                                  'hours'
                                )}
                              />
                            }
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{load.details.trailer_type}</td>
                    <td>{load.distance}</td>
                    <td className='table-status'>
                      <div
                        className={`load-tag ${
                          load.status === 'Pending'
                            ? 'load-tag-pending'
                            : load.status === 'Active'
                            ? 'load-tag-active'
                            : load.status === 'Dispatched'
                            ? 'load-tag-dispatched'
                            : load.status === 'Completed'
                            ? 'load-tag-completed'
                            : ''
                        }`}
                      >
                        {load.status}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <Pagination
            totalItems={loads.length}
            itemsPerPage={loadsPerPage}
            paginate={paginate}
            currentPage={currentPage}
            itemsOnPage={currentLoads.length}
          />
          <div className='pb-120'></div>
        </div>
      )}
      <div className='sidebar-right no-scrolls'>
        {selectedLoad ? (
          <div>
            {selectedLoad.status === 'Pending' ? (
              <div>
                {user.type === 'Billing / Invoice' ||
                user.type === 'Management' ||
                user.type === 'Super Admin' ? (
                  <div className='py-16 bg-pending flex flex-column px-16'>
                    <div className='white bold pb-16'>Accept Load</div>
                    <div>
                      <form onSubmit={acceptLoad}>
                        <div>
                          <div>
                            <input
                              type='number'
                              placeholder='Amount'
                              onChange={(event) =>
                                setLoadAmount(event.target.value)
                              }
                              className='full-width'
                            />
                          </div>
                          <div>
                            <input
                              type='number'
                              placeholder='Distance'
                              onChange={(event) =>
                                setLoadDistance(event.target.value)
                              }
                              className='full-width'
                            />
                          </div>
                        </div>
                        <div>
                          <input
                            type='submit'
                            value='Accept'
                            className='primary-button full-width'
                          />
                        </div>
                      </form>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            ) : selectedLoad.status === 'Active' ? (
              <div className='bg-active'>
                <div className='flex space-between border-bottom-white px-16'>
                  <div className='white bold py-16 amount-distance'>
                    {`${selectedLoad.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} PKR`}
                  </div>
                  <div className='white bold py-16 amount-distance uppercase'>
                    {selectedLoad.distance}
                  </div>
                </div>
                <div className='flex flex-center'>
                  <div className='white bold pb-8 '>
                    <p className='white '>
                      <Moment format='ddd D/M'>
                        {selectedLoad.origin.date_and_time}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='HH:mm'>
                          {selectedLoad.origin.date_and_time}
                        </Moment>
                      }
                      <span> - </span>
                      {
                        <Moment
                          format='HH:mm'
                          add={(10, 'minutes')}
                          date={moment(selectedLoad.origin.date_and_time).add(
                            2,
                            'hours'
                          )}
                        />
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedLoad.status === 'Dispatched' ? (
              <div className='bg-dispatched'>
                <div className='flex space-between border-bottom-white px-16'>
                  <div className='white bold py-16 amount-distance'>
                    {`${selectedLoad.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} PKR`}
                  </div>
                  <div className='white bold py-16 amount-distance uppercase'>
                    {selectedLoad.distance}
                  </div>
                </div>
                <div className='flex flex-center'>
                  <div className='white bold pb-8 '>
                    <p className='white '>
                      <Moment format='ddd D/M'>
                        {selectedLoad.origin.date_and_time}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='HH:mm'>
                          {selectedLoad.origin.date_and_time}
                        </Moment>
                      }
                      <span> - </span>
                      {
                        <Moment
                          format='HH:mm'
                          add={(10, 'minutes')}
                          date={moment(selectedLoad.origin.date_and_time).add(
                            2,
                            'hours'
                          )}
                        />
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedLoad.status === 'Completed' ? (
              <div className='bg-completed'>
                <div className='flex space-between border-bottom-white px-16'>
                  <div className='white bold py-16 amount-distance'>
                    {`${selectedLoad.amount
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} PKR`}
                  </div>
                  <div className='white bold py-16 amount-distance uppercase'>
                    {selectedLoad.distance}
                  </div>
                </div>
                <div className='flex flex-center'>
                  <div className='white bold pb-8 '>
                    <p className='white'>
                      <Moment format='ddd D/M'>
                        {selectedLoad.origin.date_and_time}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='HH:mm'>
                          {selectedLoad.origin.date_and_time}
                        </Moment>
                      }
                      <span> - </span>
                      {
                        <Moment
                          format='HH:mm'
                          add={(10, 'minutes')}
                          date={moment(selectedLoad.origin.date_and_time).add(
                            2,
                            'hours'
                          )}
                        />
                      }
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedLoad.status === 'Cancelled' ? (
              selectedLoad.amount === 0 ? (
                <div></div>
              ) : (
                <div className='bg-cancelled'>
                  <div className='flex space-between border-bottom-white px-16'>
                    <div className='white bold py-16 amount-distance'>
                      {`${selectedLoad.amount
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} PKR`}
                    </div>
                    <div className='white bold py-16 amount-distance uppercase'>
                      {selectedLoad.distance}
                    </div>
                  </div>
                  <div className='flex flex-center'>
                    <div className='white bold pb-8 '>
                      <p className='white '>
                        <Moment format='ddd D/M'>
                          {selectedLoad.origin.date_and_time}
                        </Moment>
                        <span className='mr-4'></span>
                        {
                          <Moment format='HH:mm'>
                            {selectedLoad.origin.date_and_time}
                          </Moment>
                        }
                        <span> - </span>
                        {
                          <Moment
                            format='HH:mm'
                            add={(10, 'minutes')}
                            date={moment(selectedLoad.origin.date_and_time).add(
                              2,
                              'hours'
                            )}
                          />
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <div></div>
            )}
            <div className='border-bottom px-32 pt-32 pb-16'>
              <div className='flex '>
                <div
                  className={
                    selectedLoad.status === 'Completed'
                      ? 'completed-icon'
                      : selectedLoad.status === 'Cancelled'
                      ? 'cancelled-icon'
                      : 'origin-icon'
                  }
                ></div>
                <div className='details-left'>
                  <div className=''>
                    <div className='flex space-between pl-12'>
                      <div>
                        {selectedLoad.origin.address.city}
                        <span className='mr-4'>,</span>
                        {selectedLoad.origin.address.province}
                        <br />
                        <p className='small-title'>
                          <Moment format='ddd D/M'>
                            {selectedLoad.origin.date_and_time}
                          </Moment>
                          <span className='mr-4'></span>
                          {
                            <Moment format='HH:mm'>
                              {selectedLoad.origin.date_and_time}
                            </Moment>
                          }
                          <span> - </span>
                          {
                            <Moment
                              format='HH:mm'
                              add={(10, 'minutes')}
                              date={moment(
                                selectedLoad.origin.date_and_time
                              ).add(2, 'hours')}
                            />
                          }
                          &nbsp;HRS
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className='route-spacer'></div>
                  <div className='pt-32 pl-12'>
                    {selectedLoad.destination.address.city}
                    <span className='mr-4'>,</span>
                    {selectedLoad.destination.address.province}
                    <br />
                    <p className='small-title'>
                      <Moment format='ddd D/M'>
                        {selectedLoad.destination.date_and_time}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='HH:mm'>
                          {selectedLoad.destination.date_and_time}
                        </Moment>
                      }
                      <span> - </span>
                      {
                        <Moment
                          format='HH:mm'
                          add={(10, 'minutes')}
                          date={moment(selectedLoad.origin.date_and_time).add(
                            2,
                            'hours'
                          )}
                        />
                      }
                      &nbsp;HRS
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {(selectedLoad.status === 'Active' && user.type === 'Carrier') ||
            (selectedLoad.status === 'Active' &&
              user.type === 'Super Admin') ? (
              <div className='border-bottom py-16 flex-item'>
                <button
                  className='primary-button'
                  onClick={() => setOpenPickModal(true)}
                >
                  PICK LOAD
                </button>
              </div>
            ) : selectedLoad.status === 'Dispatched' ? (
              <div>
                {user.type === 'Dispatch / Tracking' ||
                user.type === 'Management' ||
                user.type === 'Super Admin' ? (
                  <div className='border-bottom py-12 px-32 flex-item'>
                    <a
                      className='primary-button'
                      onClick={() => setOpenUpdateTrackingModal(true)}
                      style={{
                        backgroundColor: '#31A02F',
                      }}
                    >
                      Update Tracking
                    </a>
                  </div>
                ) : (
                  <div></div>
                )}
                {user.type !== 'Dispatch / Tracking' ? (
                  <div className='border-bottom py-12 px-32 flex-item'>
                    <a
                      className='primary-button'
                      style={{
                        backgroundColor: '#31A02F',
                      }}
                      onClick={() => {
                        setOpenTrackModal(true);
                      }}
                    >
                      Track Load
                    </a>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className='border-bottom py-16'>
                  <div className='flex flex-item'>
                    Dispatch Document
                    <a
                      className='primary-button ml-16'
                      onClick={() => {
                        setPrintType('Dispatch');
                        setOpenPrintModal(true);
                      }}
                    >
                      PRINT
                    </a>
                  </div>
                </div>
              </div>
            ) : selectedLoad.status === 'Completed' ? (
              <div className='border-bottom py-16'>
                <div className='flex flex-item'>
                  Load Invoice
                  <button
                    className='primary-button ml-16'
                    onClick={() => {
                      setPrintType('Invoice');
                      setOpenPrintModal(true);
                    }}
                  >
                    PRINT
                  </button>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            <div className='border-bottom px-32 py-16'>
              <div className='flex'>
                <div className='details-left'>
                  <div className='pr-32 pb-12'>
                    <p className='small-title'>Trailer Type</p>
                    <p>{selectedLoad.details.trailer_type}</p>
                  </div>
                  <div className='pr-32 pb-12'>
                    <p className='small-title'>Full or Partial</p>
                    <p>{selectedLoad.details.full_or_partial}</p>
                  </div>
                  <div className='pr-32'>
                    <div className='pb-12'>
                      <p className='small-title'>Weight</p>
                      <p>
                        {selectedLoad.details.weight.value}
                        <span>{selectedLoad.details.weight.unit}</span>
                      </p>
                    </div>
                    <div className='pr-32 pb-12'>
                      <p className='small-title'>Capacity</p>
                      <p>
                        {selectedLoad.details.capacity.value}
                        <span>{selectedLoad.details.capacity.unit}</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className='details-right'>
                  <div className='pb-12'>
                    <p className='small-title'>Trailer Axles</p>
                    <p>{selectedLoad.details.trailer_axle}</p>
                  </div>
                  <div className='pb-12'>
                    <p className='small-title '>Quantity</p>
                    <p>{selectedLoad.details.quantity}</p>
                  </div>
                  <div className='pb-12'>
                    <p className='small-title '>Volume</p>
                    <p>
                      {selectedLoad.details.volume.value}
                      <span>{selectedLoad.details.volume.unit}</span>
                    </p>
                  </div>
                  <div className='pb-12'>
                    <p className='small-title '>Commodity</p>
                    <p>{selectedLoad.commodity}</p>
                  </div>
                </div>
              </div>
              <div className='pb-12'>
                <p className='small-title '>Quantity Description</p>
                <p>{selectedLoad.details.quantity_description}</p>
              </div>
              <div className='pr-32'>
                <p className='small-title'>Comodity Description</p>
                <p>{selectedLoad.details.commodity_description}</p>
              </div>
              <div className='flex'>
                <div className='pr-32'>
                  <p className='small-title'>Notes</p>
                  <p>{selectedLoad.details.notes}</p>
                </div>
              </div>
            </div>
            <div className='border-bottom px-32  py-16'>
              <div className='flex'>
                <div className='details-left'>
                  <div className='pr-32'>
                    <p className='small-title'>Pickup Address</p>
                    <div>
                      {selectedLoad.origin.address.line1}
                      <span className='mr-4'>,</span>
                      {selectedLoad.origin.address.line2}
                      <span className='mr-4'>,</span>
                      {selectedLoad.origin.address.city}
                      <span className='mr-4'>,</span>
                      {selectedLoad.origin.address.province}
                      <br />
                      <div className='mt-16 small-title brand'>
                        {selectedLoad.consignor.name}
                      </div>
                      <div className='small-title brand'>
                        {selectedLoad.consignor.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='flex mt-16'>
                <div className='details-left'>
                  <div className='pr-32 pb-64'>
                    <p className='small-title'>Delivery Address</p>
                    <div>
                      {selectedLoad.destination.address.line1}
                      <span className='mr-4'>,</span>
                      {selectedLoad.destination.address.line2}
                      <span className='mr-4'>,</span>
                      {selectedLoad.destination.address.city}
                      <span className='mr-4'>,</span>
                      {selectedLoad.destination.address.province}
                      <br />
                      <div className='mt-16 small-title brand'>
                        {selectedLoad.consignee.name}
                      </div>
                      <div className='small-title brand'>
                        {selectedLoad.consignee.phone}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {selectedLoad.amount ? (
              <div className='border-bottom px-32 py-16'>
                <div className='flex'>
                  <div className='details-left'>
                    <p className='small-title'>Amount set</p>
                    <p className='id-tag'>{`ID - ${selectedLoad.amount_set_by}`}</p>
                  </div>
                  <div className='details-right'></div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {selectedLoad.tracked_by !== 'Not set yet!' ? (
              <div className='border-bottom px-32 py-16 '>
                <div className='flex'>
                  <div className='details-left pb-80'>
                    <p className='small-title'>Tracked by</p>
                    <p className='id-tag'>
                      {`ID - ${selectedLoad.tracked_by}`}
                    </p>
                  </div>
                  <div className='details-right'></div>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className='flex flex-item' style={{ height: '100%' }}>
            <img src={NotSelected} alt='Not Selected' />
          </div>
        )}
      </div>
    </div>
  );
};

export default Loads;
