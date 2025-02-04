import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [userData, setUserData] = useState(null);

  const tokenString = localStorage.getItem('token');
  let token;
  if (!tokenString) {
    throw new Error('Authorization token not found');
  }
  // eslint-disable-next-line prefer-const
  token = JSON.parse(tokenString);

  useEffect(() => {
    // Fetch user data from the server
    axios.get(`https://dynamicvibellc.com/api/v1/admin/user?login=true`, {
      headers: {
        'Authorization': `Bearer ${token.Authorization}`
      }
    })
      .then(response => {
        setUserData(response.data.data[0]);
        // Populate form fields with user data
        console.log(response.data.data[0]);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setValue]);

  const onSubmit = data => {
    // Update user data on the server'
    const updatedData = { ...data, id: userData.id };
    console.log(updatedData);
    axios.post('https://dynamicvibellc.com/api/v1/admin/user', updatedData, {
      headers: {
        'Authorization': `Bearer ${token.Authorization}`
      }
    })
      .then(response => {
        alert('Profile updated successfully!');
        window.location.href = '/admin/dashboard/car-rental';

      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input defaultValue={userData.username}
            {...register('username', { required: 'Username is required' })}

          />
          {errors.username && <p>{errors.username.message as string}</p>}
        </div>
        <div>
          <label>Email</label>
          <input defaultValue={userData.email}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address'
              }
            })}
          />
          {errors.email && <p>{errors.email.message as string}</p>}
        </div>
        <div>
          <label>First Name</label>
          <input defaultValue={userData.first_name} {...register('first_name')} />
        </div>
        <div>
          <label>Last Name</label>
          <input defaultValue={userData.last_name} {...register('last_name')} />
        </div>
        <div>
          <label>Phone Number</label>
          <input defaultValue={userData.phone_number} {...register('phone_number')} />
        </div>
        <div>
          <label>Password</label>
          <input defaultValue={userData.password} {...register('password')} />
        </div>
        <div>
          <label>Role</label>
          <input defaultValue={userData.role} {...register('role')} disabled />
        </div>



        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
