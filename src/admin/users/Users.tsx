import { useEffect, useState } from "react";
import "./Users.css";
import { FaBars, FaCar, FaUsers, FaUserCircle, FaGlassCheers } from "react-icons/fa";
import dynamicmainpagelogo from '../../assets/adminImages/dynamicmainpagelogo.png'
import { Link, useLocation } from "react-router-dom";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const tokenString = localStorage.getItem('token');
  let token;
  if (!tokenString) {
    throw new Error('Authorization token not found');
  }
  // eslint-disable-next-line prefer-const
  token = JSON.parse(tokenString);

  const getPageTitle = () => {
    if (location.pathname === "/admin/dashboard/car-rental") return "Car Rental Dashboard";
    if (location.pathname === "/admin/dashboard/party-rental") return "Party Rental Dashboard";
    if (location.pathname === "/admin/dashboard/users") return "Users Management";
    return "Dashboard";
  };

  const UserProfile = () => {
    window.location.href = '/admin/dashboard/user-profile';
  }

  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  }

  const openUserModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  }

  const openNewUserModal = () => {
    setIsNewUserModalOpen(true);
  };

  const closeNewUserModal = () => {
    setIsNewUserModalOpen(false);
    setNewUserData({
      name: '',
      email: '',
      phone: '',
      password: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://dynamicvibellc.com/api/v1/admin/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.Authorization}`,
        },
        body: JSON.stringify(newUserData)
      });

      if (!response.ok) {
        throw new Error('Failed to create user');
      }

      await fetchUserData();
      closeNewUserModal();
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await fetch('https://dynamicvibellc.com/api/v1/admin/user', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.Authorization}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contact data');
      }
      const data = await response.json();
      setUserData(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    fetchUserData();
  }

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <li className={location.pathname === "/admin/dashboard/users" ? "active" : ""}>
            <Link to="/admin/dashboard/users">
              <FaUsers className="icon" />
              {isSidebarOpen && <span>Users</span>}
            </Link>
          </li>
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
            <div>
              <table className="contact-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((user) => (
                    <tr key={user.id}>
                      <td className="cursor-pointer hover:text-blue-600" onClick={() => openUserModal(user)}>{user.username}</td>
                      <td>{user.email}</td>
                      <td>{user.phone_number}</td>
                      <td>{user.role}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="button-container">
                <button onClick={openNewUserModal} className="add-user-btn">
                  Add User
                </button>
              </div>
            </div>
          )}

          {/* {Modal} */}
          { isModalOpen && selectedUser && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Contact Details</h2>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <p><span className="font-semibold">Name:</span> {selectedUser.username}</p>
                <p><span className="font-semibold">First Name:</span> {selectedUser.first_name}</p>
                <p><span className="font-semibold">Last Name:</span> {selectedUser.last_name}</p>
                <p><span className="font-semibold">Phone:</span> {selectedUser.phone_number}</p>
                <p><span className="font-semibold">Email:</span> {selectedUser.email}</p>
                <p><span className="font-semibold">Role:</span> {selectedUser.role}</p>
                <p><span className="font-semibold">Active User:</span> {selectedUser.is_active}</p>
                <p><span className="font-semibold">Created At:</span> {selectedUser.created_at}</p>
                <p><span className="font-semibold">Updated At:</span> {selectedUser.updated_at}</p>
              </div>
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => closeModal()}
                  className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          )}
          {/* Add User Modal */}
          {isNewUserModalOpen && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Add New User</h2>
                <form onSubmit={handleCreateUser}>
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={newUserData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={newUserData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone:</label>
                    <input
                      type="tel"
                      name="phone"
                      value={newUserData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Password:</label>
                    <input
                      type="password"
                      name="password"
                      value={newUserData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="modal-buttons">
                    <button type="submit" className="submit-btn">Create User</button>
                    <button type="button" onClick={closeNewUserModal} className="cancel-btn">Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
