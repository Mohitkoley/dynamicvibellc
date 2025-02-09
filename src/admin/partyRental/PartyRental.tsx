import { useState, useEffect } from "react";
import "./PartyRental.css";
import { FaBars, FaCar, FaUsers, FaGlassCheers, FaUserCircle } from "react-icons/fa";
import dynamicmainpagelogo from '../../assets/adminImages/dynamicmainpagelogo.png'
import { Link, useLocation } from "react-router-dom";
import Modal from 'react-modal';
import Select from 'react-select';


const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [contactData, setContactData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [salespersonOptions, setSalespersonOptions] = useState([]);
  const [selectedSalesperson, setSelectedSalesperson] = useState(null);
  const [error, setError] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContactId, setSelectedContactId] = useState(null);
  const [salespersonId, setSalespersonId] = useState('');

  const tokenString = localStorage.getItem('token');
  let token;
  if (!tokenString) {
    throw new Error('Authorization token not found');
  }
  // eslint-disable-next-line prefer-const
  token = JSON.parse(tokenString);

  const fetchSalespersons = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dynamicvibellc.com/api/v1/admin/user?role=SALESMAN', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.Authorization}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch salesperson data');
      }
      const data = await response.json();
      const options = data.data.map((salesperson) => ({
        value: salesperson.id,
        label: salesperson.username,
      }));
      setSalespersonOptions(options);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const UserProfile = () => {
    window.location.href = '/admin/dashboard/user-profile';
  }


  const openModal = (contactId) => {
    fetchSalespersons();
    setSelectedContactId(contactId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContactId(null);
    setSalespersonId('');
    fetchContactData();
  };

  const handleAssign = async () => {
    if (selectedSalesperson) {
      try {
        const response = await fetch('https://dynamicvibellc.com/api/v1/admin/rental-assign-user', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.Authorization}`,
          },
          body: JSON.stringify({
            userId: selectedSalesperson.value,
            contactId: selectedContactId, // Replace with the actual target ID
          }),
        });
        if (!response.ok) {
          throw new Error('Failed to assign salesperson');
        }
        const result = await response.json();
        closeModal();
      } catch (err) {
        alert(err.message);
      }
    } else {
      alert('Please select a salesperson');
    }
  };

  const getPageTitle = () => {
    if (location.pathname === "/admin/dashboard/car-rental") return "Car Rental Dashboard";
    if (location.pathname === "/admin/dashboard/party-rental") return "Party Rental Dashboard";
    if (location.pathname === "/admin/dashboard/users") return "Users Management";
    return "Dashboard";
  };

  const fetchContactData = async () => {
    try {
      const response = await fetch('https://dynamicvibellc.com/api/v1/admin/rental', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.Authorization}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contact data');
      }
      const data = await response.json();
      setContactData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedContact, setSelectedContact] = useState(null);
  const [isPartyModalOpen, setIsPartyModalOpen] = useState(false);

  const openContactModal = (contact) => {
    setSelectedContact(contact);
    setIsModalOpen(true);
  };

  const closePartyModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  }

  const handleStatusChange = async (contactId, newStatus) => {
    try {
      // Update status on the server
      const response = await fetch('https://dynamicvibellc.com/api/v1/admin/car-status', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.Authorization}`,
        },
        body: JSON.stringify({
          id: contactId,
          status: newStatus, // Replace with the actual target ID
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update status');
      }

      // Update status locally
      setContactData((prevData) =>
        prevData.map((contact) =>
          contact.id === contactId ? { ...contact, status: newStatus } : contact
        )
      );
    } catch (err) {
      alert(err.message);
    }
  };


  const statusOptions = [
    { value: 'New', label: 'New' },
    { value: 'Contacted', label: 'Contacted' },
    { value: 'Pending', label: 'Pending' },
    { value: 'Converted', label: 'Converted' },
    { value: 'Rejected', label: 'Rejected' },
  ];

  return (
    <div className="dashboard-container">
      {/* Overlay */}
      {isSidebarOpen && <div className="overlay" onClick={toggleSidebar}></div>}

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
        {/* Toggle Button */}
        <button className={`toggle-btn ${isSidebarOpen ? "open" : "closed"}`} onClick={toggleSidebar}>
          {<FaBars />}
        </button>

        {/* Logo Section */}
        <div className="logo-container">
          <img
            src={isSidebarOpen
              ? dynamicmainpagelogo
              : dynamicmainpagelogo}
            alt="Logo"
            className="logo"
          />
        </div>

        {/* Menu Items */}
        {/* Menu Items */}
        <ul>
          {/* <li className={location.pathname === "/admin/dashboard/car-rental" ? "active" : ""}>
            <Link to="/admin/dashboard/car-rental">
              <FaCar className="icon" />
              {isSidebarOpen && <span>Car Rental</span>}
            </Link>
          </li> */}
          <li className={location.pathname === "/admin/dashboard/party-rental" ? "active" : ""}>
            <Link to="/admin/dashboard/party-rental">
              <FaGlassCheers className="icon" />
              {isSidebarOpen && <span>Party Rental</span>}
            </Link>
          </li>
          {token && token.role && token.role.toUpperCase() === 'ADMIN' ? (
            <li className={location.pathname === "/admin/dashboard/users" ? "active" : ""}>
              <Link to="/admin/dashboard/users">
                <FaUsers className="icon" />
                {isSidebarOpen && <span>Users</span>}
              </Link>
            </li>
          ) : ''}
        </ul>
      </aside>

      {/* Main Content */}
      <main className={`main-content ${isSidebarOpen ? "" : "shrink"}`}>
        <div className="top-bar">
          <h1>{getPageTitle()}</h1>
          <div className="top-bar-right">
            <FaUserCircle onClick={UserProfile} className="profile-icon" />
            <button onClick={logout} className="logout-button">Logout</button>
          </div>
        </div>

        <div className="page-content">
          {loading ? (
            <div className="flex justify-center items-center min-h-[200px]">
              <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
          ) : (
            <table className="contact-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone No</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* Repeat the tr for each contact */}
                {contactData.map((contact) => (
                  <tr key={contact.id}>
                    <td className="cursor-pointer hover:text-blue-600" onClick={() => openContactModal(contact)}>{contact.name}</td>
                    <td>{contact.phone_number}</td>
                    <td>{contact.email}</td>
                    <td>{contact.tent_types}</td>
                    <td>{contact.additional_info}</td>
                    <td>{contact.status}</td>
                    <td style={{ display: 'flex', alignItems: 'center' }}>

                      <Select
                        options={statusOptions}
                        value={statusOptions.find((option) => option.value === contact.status)}
                        onChange={(selectedOption) => handleStatusChange(contact.id, selectedOption.value)}
                        placeholder="Select Status"
                        isClearable={false}
                        styles={{
                          container: (provided) => ({
                            ...provided,
                            width: '150px',
                          }),
                        }}
                      />

                      <button onClick={() => openModal(contact.id)}>{contact.user_id ? contact.username : 'Assign to Salesperson'}</button>

                    </td>
                  </tr>
                ))}
                {/* Add more rows here as needed */}
              </tbody>
            </table>
          )}

          {/* Modal */}
          {isModalOpen && selectedContact && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <p><span className="font-semibold">Name:</span> {selectedContact.name}</p>
                  <p><span className="font-semibold">Phone:</span> {selectedContact.phone_number}</p>
                  <p><span className="font-semibold">Email:</span> {selectedContact.email}</p>
                  <p><span className="font-semibold">Service:</span> {selectedContact.service}</p>
                  <p><span className="font-semibold">Message:</span> {selectedContact.message}</p>
                  <p><span className="font-semibold">Status:</span> {selectedContact.status}</p>
                  <p><span className="font-semibold">Location:</span> {selectedContact.location}</p>
                  <p><span className="font-semibold">Event Date:</span> {new Date(selectedContact.event_date).toLocaleDateString()}</p>
                  <p><span className="font-semibold">Guest Count:</span> {selectedContact.guest_count}</p>
                  <p><span className="font-semibold">Event Type:</span> {selectedContact.event_type}</p>
                  <p><span className="font-semibold">Tent Types:</span> {selectedContact.tent_types.join(", ")}</p>
                  <p><span className="font-semibold">Table Types:</span> {selectedContact.table_types.join(", ")}</p>
                  <p><span className="font-semibold">Chair Types:</span> {selectedContact.chair_types.join(", ")}</p>
                  <p><span className="font-semibold">Lighting Types:</span> {selectedContact.lighting_types.join(", ")}</p>
                  <p><span className="font-semibold">Dance Floor Types:</span> {selectedContact.dance_floor_types.join(", ")}</p>
                  <p><span className="font-semibold">Bar Types:</span> {selectedContact.bar_types.join(", ")}</p>
                  <p><span className="font-semibold">Accessory Types:</span> {selectedContact.accessory_types.join(", ")}</p>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Assign Salesperson"
          ariaHideApp={false}
          style={{
            overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            },
            content: {
              position: 'relative',
              width: '500px',
              padding: '20px',
              borderRadius: '8px',
              background: 'white',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            },
          }}
        >
          <h2>Assign Salesperson</h2>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Select
              options={salespersonOptions}
              value={selectedSalesperson}
              onChange={setSelectedSalesperson}
              placeholder="Select a salesperson"
              isClearable
              styles={{
                container: (provided) => ({
                  ...provided,
                  width: '100%',
                  marginBottom: '10px',
                }),
              }}
            />
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <button
              onClick={handleAssign}
              style={{
                padding: '8px 16px',
                marginRight: '10px',
                borderRadius: '4px',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                flex: 1,
              }}
            >
              Assign
            </button>
            <button
              onClick={closeModal}
              style={{
                padding: '8px 16px',
                borderRadius: '4px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                cursor: 'pointer',
                flex: 1,
                marginLeft: '5px',
              }}
            >
              Cancel
            </button>
          </div>
        </Modal>
      </main>
    </div>
  );
};

export default Dashboard;
