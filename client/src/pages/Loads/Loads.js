// General Imports
import { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import moment from 'moment';
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
  const [user, setUser] = useState({});
  const [loads, setLoads] = useState([]);
  const [preLoads, setPreLoads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLoad, setSelectedLoad] = useState(false);
  const [loadAmount, setLoadAmount] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState('');
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
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  // Filter loads
  const handleFilterOrigin = async (e) => {
    console.log(e.target.value);
    if (e.target.value !== 'Select') {
      setOrigin(e.target.value);
      const res = await axios.get(`/loads/origin/${e.target.value}`);
      setLoads(res.data.data);
    } else {
      setLoads(preLoads);
    }
  };

  useEffect(() => {
    const loggedUser = getAuth();
    setUser(loggedUser);

    fetch = async () => {
      setLoading(true);

      const res =
        loggedUser.type === 'Management'
          ? await axios.get('/loads')
          : loggedUser.type === 'Dispatch / Tracking'
          ? await axios.get('/loads/dispatchTracking')
          : loggedUser.type === 'Billing / Invoice'
          ? await axios.get('/loads/billingInvoice')
          : loggedUser.type === 'Business'
          ? // Add Carrier ID
            await axios.get('/loads/business')
          : loggedUser.type === 'Carrier'
          ? await axios.get(`/loads/carrier`)
          : // Add Carrier ID
            await axios.get('/loads');

      setLoads(res.data.data);

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
      if (loads.filter((load) => load.id === event.target.value).length === 0) {
        setLoads(preLoads);
        setSearchMessage(<p className='errorMessage m-0'>Load Not Found</p>);
      } else {
        setLoads(loads.filter((load) => load.id === event.target.value));
        setSearchMessage(<p className='success-message m-0'>Load Found</p>);
      }
    } else {
      setSearchMessage('');
      setLoads(preLoads);
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
    const loads = res.data;
    setLoads(loads);
  };

  const handlePrintSelected = () => {
    alert('Print Selected');
  };

  async function acceptLoad(event) {
    event.preventDefault();
    await axios
      .put(`/loads/accept/${selectedLoad.id}`, {
        amount: loadAmount,
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
    const loads = res.data;
    setLoads(loads);
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
        {user.type === 'Business' ? (
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
            className='mb-24'
            onChange={handleFilterOrigin}
          >
            <option>Select</option>
            {preLoads
              .map((load) => load.origin.address.city)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((location, index) => {
                return <option key={index}>{location}</option>;
              })}
          </select>
          <div className='small-title pb-8'>Destination</div>
          <select style={{ backgroundColor: 'White' }} className='mb-24'>
            {preLoads
              .map((load) => load.destination.address.city)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((location, index) => {
                return <option key={index}>{location}</option>;
              })}
          </select>
        </div>
        <div className='p-16 border-bottom-white'>
          <div className='bold pb-16'>Business</div>
          <select style={{ backgroundColor: 'White' }} className='mb-24'>
            {preLoads
              .map((load) => load.other_details.business_name)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((location, index) => {
                return <option key={index}>{location}</option>;
              })}
          </select>
        </div>
        <div className='p-16 border-bottom-white'>
          <div className='bold pb-16'>Carrier</div>
          <select style={{ backgroundColor: 'White' }} className='mb-24'>
            {preLoads
              .map((load) => load.other_details.carrier_name)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((location, index) => {
                return <option key={index}>{location}</option>;
              })}
          </select>
        </div>
        <div className='p-16 border-bottom-white'>
          <div className='bold pb-16'>Vehicle</div>
          <input
            type='checkbox'
            id='container'
            name='Container'
            value='Container'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='container'>
            {' '}
            Container
          </label>
          <br />
          <input
            type='checkbox'
            id='container'
            name='Container'
            value='Container'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='container'>
            {' '}
            Dry Van / Enclosed Trailer{' '}
          </label>
          <br />
          <input
            type='checkbox'
            id='container'
            name='Container'
            value='Container'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='container'>
            {' '}
            Flatbed
          </label>
          <br />
          <input
            type='checkbox'
            id='container'
            name='Container'
            value='Container'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='container'>
            {' '}
            Lowboy Trailer
          </label>
          <br />
          <input
            type='checkbox'
            id='container'
            name='Container'
            value='Container'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='container'>
            {' '}
            Oil Tanker
          </label>
          <br />
          <input
            type='checkbox'
            id='container'
            name='Container'
            value='Container'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='container'>
            {' '}
            Reefer
          </label>
          <br />
        </div>
        <div className='p-16 pb-120 border-bottom-white'>
          <div className='bold pb-16'>Commodity</div>
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            Auto
          </label>
          <br />
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            Beverages
          </label>
          <br />
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            Cement
          </label>
          <br />
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            Chemical
          </label>
          <br />
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            FMCG
          </label>
          <br />
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            General Goods
          </label>
          <br />
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            Oil & Gas
          </label>
          <br />
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            Pharmaceutical
          </label>
          <br />
          <input
            type='checkbox'
            id='auto'
            name='Auto'
            value='Auto'
            style={{ width: 'unset' }}
          />
          <label className='filter-checkbox' htmlFor='auto'>
            {' '}
            Textile
          </label>
          <br />
        </div>
      </div>
      {user.type === 'Management' ? (
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
              <p>Recheck Load ID</p>
              <br />
              <span>Clear search!</span>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Load No.</th>
                  <th>Origin</th>
                  <th>Destination</th>
                  <th>Trailer Type</th>
                  <th>Distance</th>
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
                        <Moment format='ddd d/M'>{load.origin.date}</Moment>
                        <span className='mr-4'></span>
                        {<Moment format='hh:mm'>{load.origin.time}</Moment>}
                        <span> - </span>
                        {
                          <Moment
                            format='hh:mm'
                            add={(10, 'minutes')}
                            date={moment(load.origin.time).add(2, 'hours')}
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
                            <Moment format='ddd d/M'>
                              {load.destination.date}
                            </Moment>
                            <span className='mr-4'></span>
                            {
                              <Moment format='hh:mm'>
                                {load.destination.time}
                              </Moment>
                            }
                            <span> - </span>
                            {
                              <Moment
                                format='hh:mm'
                                add={(10, 'minutes')}
                                date={moment(load.origin.time).add(2, 'hours')}
                              />
                            }
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{load.details.trailer_type}</td>
                    <td>{load.details.distance}</td>
                    <td>
                      <button
                        className='secondary-button'
                        onClick={() => {
                          setPointedLoad(load);
                          setOpenModal(true);
                        }}
                      >
                        Cancel
                      </button>
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
              <p>Recheck Load ID</p>
              <br />
              <span>Clear search!</span>
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
                        <Moment format='ddd d/M'>{load.origin.date}</Moment>
                        <span className='mr-4'></span>
                        {<Moment format='hh:mm'>{load.origin.time}</Moment>}
                        <span> - </span>
                        {
                          <Moment
                            format='hh:mm'
                            add={(10, 'minutes')}
                            date={moment(load.origin.time).add(2, 'hours')}
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
                            <Moment format='ddd d/M'>
                              {load.destination.date}
                            </Moment>
                            <span className='mr-4'></span>
                            {
                              <Moment format='hh:mm'>
                                {load.destination.time}
                              </Moment>
                            }
                            <span> - </span>
                            {
                              <Moment
                                format='hh:mm'
                                add={(10, 'minutes')}
                                date={moment(load.origin.time).add(2, 'hours')}
                              />
                            }
                          </p>
                        </div>
                      </div>
                    </td>
                    <td>{load.details.trailer_type}</td>
                    <td>{load.details.distance}</td>
                    <td>
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
                user.type === 'Management' ? (
                  <div className='py-16 bg-pending flex flex-column px-16'>
                    <div className='white bold pb-16'>Accept Load</div>
                    <div className='white pb-12  uppercase bold'>Amount</div>
                    <div>
                      <form className='flex' onSubmit={acceptLoad}>
                        <div>
                          <input
                            type='number'
                            placeholder='50,000 PKR'
                            onChange={(event) =>
                              setLoadAmount(event.target.value)
                            }
                          />
                        </div>
                        <div>
                          <input
                            type='submit'
                            value='Accept'
                            className='primary-button accept-button'
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
                    {selectedLoad.details.distance}
                  </div>
                </div>
                <div className='flex flex-center'>
                  <div className='white bold pb-8 '>
                    <p className='white '>
                      <Moment format='ddd d/M'>
                        {selectedLoad.origin.date}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='hh:mm'>
                          {selectedLoad.origin.time}
                        </Moment>
                      }
                      <span> - </span>
                      {
                        <Moment
                          format='hh:mm'
                          add={(10, 'minutes')}
                          date={moment(selectedLoad.origin.time).add(
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
                    {selectedLoad.details.distance}
                  </div>
                </div>
                <div className='flex flex-center'>
                  <div className='white bold pb-8 '>
                    <p className='white '>
                      <Moment format='ddd d/M'>
                        {selectedLoad.origin.date}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='hh:mm'>
                          {selectedLoad.origin.time}
                        </Moment>
                      }
                      <span> - </span>
                      {
                        <Moment
                          format='hh:mm'
                          add={(10, 'minutes')}
                          date={moment(selectedLoad.origin.time).add(
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
                    {selectedLoad.details.distance}
                  </div>
                </div>
                <div className='flex flex-center'>
                  <div className='white bold pb-8 '>
                    <p className='white'>
                      <Moment format='ddd d/M'>
                        {selectedLoad.origin.date}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='hh:mm'>
                          {selectedLoad.origin.time}
                        </Moment>
                      }
                      <span> - </span>
                      {
                        <Moment
                          format='hh:mm'
                          add={(10, 'minutes')}
                          date={moment(selectedLoad.origin.time).add(
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
                    <div className='white twenty-four bold py-16'>
                      {`${selectedLoad.amount} PKR`}
                    </div>
                    <div className='white twenty-four bold py-16 uppercase'>
                      {selectedLoad.details.distance}
                    </div>
                  </div>
                  <div className='flex flex-center'>
                    <div className='white twenty-four bold pb-8 '>
                      <p className='white'>
                        <Moment format='ddd d/M'>
                          {selectedLoad.origin.date}
                        </Moment>
                        <span className='mr-4'></span>
                        {
                          <Moment format='hh:mm'>
                            {selectedLoad.origin.time}
                          </Moment>
                        }
                        <span> - </span>
                        {
                          <Moment
                            format='hh:mm'
                            add={(10, 'minutes')}
                            date={moment(selectedLoad.origin.time).add(
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
                <div className='origin-icon'></div>
                <div className='details-left'>
                  <div className=''>
                    <div className='flex space-between pl-12'>
                      <div>
                        {selectedLoad.origin.address.city}
                        <span className='mr-4'>,</span>
                        {selectedLoad.origin.address.province}
                        <br />
                        <p className='small-title'>
                          <Moment format='ddd d/M'>
                            {selectedLoad.origin.date}
                          </Moment>
                          <span className='mr-4'></span>
                          {
                            <Moment format='hh:mm'>
                              {selectedLoad.origin.time}
                            </Moment>
                          }
                          <span> - </span>
                          {
                            <Moment
                              format='hh:mm'
                              add={(10, 'minutes')}
                              date={moment(selectedLoad.origin.time).add(
                                2,
                                'hours'
                              )}
                            />
                          }
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
                      <Moment format='ddd d/M'>
                        {selectedLoad.destination.date}
                      </Moment>
                      <span className='mr-4'></span>
                      {
                        <Moment format='hh:mm'>
                          {selectedLoad.destination.time}
                        </Moment>
                      }
                      <span> - </span>
                      {
                        <Moment
                          format='hh:mm'
                          add={(10, 'minutes')}
                          date={moment(selectedLoad.origin.time).add(
                            2,
                            'hours'
                          )}
                        />
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {selectedLoad.status === 'Active' && user.type === 'Carrier' ? (
              <div className='border-bottom py-40 px-80'>
                <button
                  className='primary-button full-width'
                  onClick={() => setOpenPickModal(true)}
                >
                  PICK LOAD
                </button>
              </div>
            ) : selectedLoad.status === 'Dispatched' ? (
              <div>
                {user.type === 'Dispatch / Tracking' ||
                user.type === 'Management' ? (
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
                </div>
              </div>
              <div className='pb-12'>
                <p className='small-title '>Quantity Description</p>
                <p>{selectedLoad.details.quantity_description}</p>
              </div>
              <div className='pr-32'>
                <p className='small-title'>Comodity Description</p>
                <p>{selectedLoad.details.comodity_description}</p>
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
                  <div className='pr-32'>
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
                    <p className='id-tag'>{`ID - ${selectedLoad.other_details.amount_set_by}`}</p>
                  </div>
                  <div className='details-right'></div>
                </div>
              </div>
            ) : (
              <div></div>
            )}
            {selectedLoad.other_details.tracked_by ? (
              <div className='border-bottom px-32 py-16 '>
                <div className='flex'>
                  <div className='details-left pb-80'>
                    <p className='small-title'>Tracked by</p>
                    <p className='id-tag'>
                      {`ID - ${selectedLoad.other_details.tracked_by}`}
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
