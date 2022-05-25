import axios from 'axios';
import { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import Pagination from '../../components/Pagination/Pagination';
import AddUser from './AddUser';
import NotSelected from '../../assets/images/empty-state/not-selected.svg';
import Loading from '../../assets/images/loading.svg';
import getAuth from '../../services/auth.service';
import './User.css';
import emailjs from 'emailjs-com';

export default function Users() {
  // States
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Users
  const [users, setUsers] = useState([]);
  const [preUsers, setPreUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Pending');

  // Clients
  const [clients, setClients] = useState([]);
  const [preClients, setPreClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(false);

  // Filter Users
  const usersPending = preClients.filter(
    (client) => client.status === 'Pending'
  );
  const usersActive = preClients.filter((client) => client.status === 'Active');
  const usersSuspended = preClients.filter(
    (client) => client.status === 'Suspended'
  );
  const usersBlacklisted = preClients.filter(
    (client) => client.status === 'Blacklisted'
  );
  const usersManagement = preUsers.filter((user) => user.type === 'Management');
  const usersBillingInvoice = preUsers.filter(
    (user) => user.type === 'Billing / Invoice'
  );
  const usersDispatchTracking = preUsers.filter(
    (user) => user.type === 'Dispatch / Tracking'
  );

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const [currentClientPage, setCurrentClientPage] = useState(1);
  const clientsPerPage = 6;
  const indexOfLastClients = currentPage * clientsPerPage;
  const indexOfFirstClients = indexOfLastUser - clientsPerPage;
  const currentClients = clients.slice(indexOfFirstClients, indexOfLastClients);

  // Pagination
  const paginate = (number) => setCurrentPage(number);

  const paginateClients = (number) => setCurrentClientPage(number);

  useEffect(() => {
    getAuth();

    setLoading(true);
    fetch = async () => {
      const users = await axios.get('/users');
      setUsers(users.data);
      setPreUsers(users.data);

      const clients = await axios.get('/clients');
      setPreClients(clients.data);
      const pendingUsers = clients.data.filter(
        (client) => client.status === 'Pending'
      );
      setClients(pendingUsers);
      setLoading(false);
    };
    fetch();
  }, []);

  // Users Actions
  const deleteUser = () => {};
  const editUser = () => {};

  // Client Actions
  async function acceptClient(client) {
    await axios.put(`/clients/accept/${client._id}`).then(async (response) => {
      if (response.data.status === 'ok') {
        const updatedClients = await axios.get('/clients');
        setLoading(true);
        setPreClients(updatedClients.data);
        const pendingUsers = updatedClients.data.filter(
          (client) => client.status === 'Pending'
        );
        setClients(pendingUsers);
        setLoading(false);

        function uniqid(random = false) {
          const sec = Date.now() * 1000 + Math.random() * 1000;
          const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
          return `${id}${
            random ? `.${Math.trunc(Math.random() * 100000000)}` : ''
          }`;
        }

        const password = uniqid();

        // Add Client's User
        await axios.post('/users/register', {
          id: 'N/A',
          company: {
            id: client._id,
            name: client.name,
          },
          name: client.name,
          cnic: 0,
          father_name: 'N/A',
          phone: 0,
          email: client.email,
          password: password,
          type: client.type,
          designation: 'N/A',
          address: {
            line1: 'N/A',
            line2: 'N/A',
            city: 'N/A',
            province: 'N/A',
            postalcode: 'N/A',
          },
          emergency: {
            name: 'N/A',
            relation: 'N/A',
            phone: 'N/A',
          },
          other_details: { added_by: 'N/A' },
        });

        sendEmail(client.email, password);
      }
    });
  }

  // Send Email
  const sendEmail = (email, password) => {
    console.log('Send Email is Working');
    const templateParams = {
      email: email,
      password: password,
    };
    emailjs
      .send(
        'service_4gjyi7p',
        'juggernaut',
        templateParams,
        'VdSVobMfhmKrcOFN4'
      )
      .then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (error) => {
          console.log('FAILED...', error);
        }
      );
  };

  const rejectClient = (client) => {
    console.log('reject');
  };
  const suspendClient = (client) => {
    console.log(client);
  };
  const blacklistClient = (client) => {};

  function handleClick(newValue) {
    setSelectedUser(newValue);
  }
  function openAddUser() {
    setOpenModal(true);
  }

  const filterUsers = (filterType) => {
    setSelectedUser(false);
    setSelectedFilter(filterType);
    if (filterType === 'Pending') {
      setClients(usersPending);
      setSelectedClient(false);
    }
    if (filterType === 'Active') {
      setClients(usersActive);
      setSelectedClient(false);
    }
    if (filterType === 'Suspended') {
      setClients(usersSuspended);
      setSelectedClient(false);
    }
    if (filterType === 'Blacklisted') {
      setClients(usersBlacklisted);
      setSelectedClient(false);
    }
    if (filterType === 'Management') {
      setUsers(usersManagement);
      setSelectedUser(false);
    }
    if (filterType === 'DispatchTracking') {
      setUsers(usersDispatchTracking);
      setSelectedUser(false);
    }
    if (filterType === 'BillingInvoice') {
      setUsers(usersBillingInvoice);
      setSelectedUser(false);
    }
  };

  const getFilterClass = (filterType) => {
    if (selectedFilter === filterType) return 'filter-card-active';
    return 'filter-card';
  };

  const getFilters = () => {
    const userFilters = [
      'Pending',
      'Active',
      'Suspended',
      'Blacklisted',
      'Management',
      'DispatchTracking',
      'BillingInvoice',
    ];
    return (
      <div>
        <div className='flex space-between py-24 align-center'>
          <div className='flex'>
            {userFilters.map((filter) => {
              return (
                <div
                  className={`${getFilterClass(filter)} mr-16`}
                  onClick={
                    filter === 'Pending'
                      ? () => {
                          filterUsers(filter);
                        }
                      : filter === 'Active'
                      ? () => {
                          filterUsers(filter);
                        }
                      : filter === 'Suspended'
                      ? () => {
                          filterUsers(filter);
                        }
                      : filter === 'Blacklisted'
                      ? () => {
                          filterUsers(filter);
                        }
                      : filter === 'Management'
                      ? () => {
                          filterUsers(filter);
                        }
                      : filter === 'DispatchTracking'
                      ? () => {
                          filterUsers(filter);
                        }
                      : filter === 'BillingInvoice'
                      ? () => {
                          filterUsers(filter);
                        }
                      : ''
                  }
                >
                  <div className='filter-card-stats'>{}</div>
                  {filter === 'Pending' ? (
                    <div>
                      <div className='filter-card-stats'>
                        {usersPending.length}
                      </div>
                      <div className='filter-card-title'>Pending Users</div>
                    </div>
                  ) : filter === 'Active' ? (
                    <div>
                      <div className='filter-card-stats'>
                        {usersActive.length}
                      </div>
                      <div className='filter-card-title'>Active Users</div>
                    </div>
                  ) : filter === 'Suspended' ? (
                    <div>
                      <div className='filter-card-stats'>
                        {usersSuspended.length}
                      </div>
                      <div className='filter-card-title'>Suspended Users</div>
                    </div>
                  ) : filter === 'Blacklisted' ? (
                    <div>
                      <div className='filter-card-stats'>
                        {usersBlacklisted.length}
                      </div>
                      <div className='filter-card-title'>Blacklisted Users</div>
                    </div>
                  ) : filter === 'Management' ? (
                    <div>
                      <div className='filter-card-stats'>
                        {usersManagement.length}
                      </div>
                      <div className='filter-card-title'>Managers</div>
                    </div>
                  ) : filter === 'DispatchTracking' ? (
                    <div>
                      <div className='filter-card-stats'>
                        {usersDispatchTracking.length}
                      </div>
                      <div className='filter-card-title'>
                        Dispatch / Tracking
                      </div>
                    </div>
                  ) : filter === 'BillingInvoice' ? (
                    <div>
                      <div className='filter-card-stats'>
                        {usersBillingInvoice.length}
                      </div>
                      <div className='filter-card-title'>Billing / Invoice</div>
                    </div>
                  ) : (
                    <div></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
        <div className='flex flex-item space-between'>
          <div>
            <h1>Users</h1>
          </div>
          <div>
            <button className='primary-button' onClick={openAddUser}>
              Add User
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading)
    return (
      <div className='flex loader'>
        <div className='flex-item'>
          <img src={Loading} className='flex' alt='Loading' />
        </div>
      </div>
    );

  if (
    selectedFilter === '' ||
    selectedFilter === 'Pending' ||
    selectedFilter === 'Active' ||
    selectedFilter === 'Suspended' ||
    selectedFilter === 'Blacklisted'
  )
    return (
      <div className='flex'>
        {openModal && <AddUser closeModal={setOpenModal} />}
        <div className='table' style={{ flex: '1' }}>
          {getFilters()}

          {selectedFilter === 'Pending' ? (
            <Table
              page={'users'}
              loading={loading}
              items={currentClients}
              names={[
                'id',
                'type',
                'name',
                'authorize_person_name',
                'authorize_person_phone',
              ]}
              titles={[
                'Client Id',
                'Client Type',
                'Company Name',
                'Authorize Person',
                'Phone Number',
                '',
                '',
                'Update Status',
              ]}
              buttons={[
                {
                  name: 'Accept',
                  class: 'primary-button',
                  onClick: acceptClient,
                },
                {
                  name: 'Reject',
                  class: 'secondary-button',
                  onClick: rejectClient,
                },
              ]}
              selectedItem={selectedClient}
              setItem={setSelectedClient}
            />
          ) : selectedFilter === 'Active' ? (
            <Table
              page={'users'}
              loading={loading}
              items={currentClients}
              names={[
                'id',
                'type',
                'name',
                'authorize_person_name',
                'authorize_person_phone',
              ]}
              titles={[
                'Client Id',
                'Client Type',
                'Company Name',
                'Authorize Person',
                'Phone Number',
                '',
                '',
                'Update Status',
              ]}
              actions={[
                {
                  name: 'Suspend',
                  class: 'suspended-button',
                  onClick: suspendClient,
                },
                {
                  name: '🚩',
                  class: 'blacklist-button',
                  onClick: blacklistClient,
                },
              ]}
              selectedItem={selectedClient}
              setItem={setSelectedClient}
            />
          ) : selectedFilter === 'Suspended' ? (
            <Table
              page={'users'}
              loading={loading}
              items={currentClients}
              names={[
                'id',
                'type',
                'name',
                'authorize_person_name',
                'authorize_person_phone',
              ]}
              titles={[
                'Client Id',
                'Client Type',
                'Company Name',
                'Authorize Person',
                'Phone Number',
                '',
                '',
                'Update Status',
              ]}
              buttons={[
                {
                  name: 'Accept',
                  class: 'primary-button',
                  onClick: editUser,
                },
                {
                  name: 'Reject',
                  class: 'secondary-button',
                  onClick: deleteUser,
                },
              ]}
              selectedItem={selectedClient}
              setItem={setSelectedClient}
            />
          ) : selectedFilter === 'Blacklisted' ? (
            <Table
              page={'users'}
              loading={loading}
              items={currentClients}
              names={[
                'id',
                'type',
                'name',
                'authorize_person_name',
                'authorize_person_phone',
              ]}
              titles={[
                'Client Id',
                'Client Type',
                'Company Name',
                'Authorize Person',
                'Phone Number',
                '',
                '',
                'Update Status',
              ]}
              buttons={[
                {
                  name: 'Accept',
                  class: 'primary-button',
                  onClick: editUser,
                },
                {
                  name: 'Reject',
                  class: 'secondary-button',
                  onClick: deleteUser,
                },
              ]}
              selectedItem={selectedClient}
              setItem={setSelectedClient}
            />
          ) : (
            <div></div>
          )}
          <Pagination
            totalItems={clients.length}
            itemsPerPage={clientsPerPage}
            paginate={paginateClients}
            currentPage={currentClientPage}
            itemsOnPage={currentClients.length}
          />
        </div>
        <div className='sidebar-right'>
          {selectedClient === false ? (
            <div className='flex flex-item' style={{ height: '100%' }}>
              <img src={NotSelected} alt='Not Selected' />
            </div>
          ) : (
            <div className='pb-64'>
              <div className='p-48 border-bottom'>
                <div className='pb-24'>
                  <div className='small-title pb-8'>Name</div>
                  <div>{selectedClient.name}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );

  return (
    <div className='flex'>
      {openModal && <AddUser closeModal={setOpenModal} />}
      <div className='table' style={{ flex: '1' }}>
        {getFilters()}

        <Table
          page={'users'}
          loading={loading}
          items={currentUsers}
          names={['id', 'designation', 'name', 'cnic', 'phone']}
          titles={[
            'User Id',
            'Designation',
            'User Name',
            'CNIC',
            'Phone',
            '',
            '',
            'Edit / Remove Account',
          ]}
          buttons={[
            {
              name: 'Edit',
              class: 'secondary-button',
              onClick: editUser,
            },
            {
              name: 'Remove',
              class: 'primary-button',
              onClick: deleteUser,
            },
          ]}
          selectedItem={selectedUser}
          setItem={setSelectedUser}
        />
        <Pagination
          totalItems={users.length}
          itemsPerPage={usersPerPage}
          paginate={paginate}
          currentPage={currentPage}
          itemsOnPage={currentUsers.length}
        />
      </div>
      <div className='sidebar-right'>
        {selectedUser === false ? (
          <div className='flex flex-item' style={{ height: '100%' }}>
            <img src={NotSelected} alt='Not Selected' />
          </div>
        ) : (
          <div className='pb-64'>
            <div className='p-48 border-bottom'>
              <div className='pb-24'>
                <div className='small-title pb-8'>Name</div>
                <div>{selectedUser.name}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Cnic</div>
                <div>{selectedUser.cnic}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Father Name</div>
                <div>{selectedUser.father_name}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Phone</div>
                <div>{selectedUser.phone}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Email</div>
                <div>{selectedUser.email}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Type</div>
                <div>{selectedUser.type}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Designation</div>
                <div>{selectedUser.designation}</div>
              </div>
              <div className='pb-24'>
                <div className='small-title pb-8'>Address</div>
                <div>{selectedUser.address.line1}</div>
                <div>{selectedUser.address.line2}</div>
                <div>{selectedUser.address.city}</div>
                <div>{selectedUser.address.province}</div>
                <div>{selectedUser.address.postalcode}</div>
              </div>
            </div>
            <div className='border-bottom p-48'>
              <div className='small-title pb-8 pb-24 red'>
                Emergency Contact Details
              </div>
              <div className='flex space-between pb-24'>
                <div>
                  <div className='small-title pb-8'>Name</div>
                  <div>{selectedUser.emergency.name}</div>
                </div>
                <div>
                  <div className='small-title pb-8'>Relation</div>
                  <div>{selectedUser.emergency.relation}</div>
                </div>
              </div>
              <div>
                <div className='small-title pb-8'>Phone Number</div>
                <div>{selectedUser.emergency.phone}</div>
              </div>
            </div>
            <div className='p-48'>
              <div className='small-title pb-8'>Added by</div>
              <div className='id-tag' style={{ width: 'fit-content' }}>
                {selectedUser.other_details.added_by}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
