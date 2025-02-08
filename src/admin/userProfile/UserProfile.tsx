import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

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
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Profile</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <input
                    defaultValue={userData?.username}
                    {...register('username', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  />
                  {errors.username && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    defaultValue={userData?.first_name}
                    {...register('first_name', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  />
                  {errors.first_name && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    defaultValue={userData?.last_name}
                    {...register('last_name', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  />
                  {errors.last_name && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    defaultValue={userData?.email}
                    {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  />
                  {errors.email && <span className="text-red-500 text-sm mt-1">Please enter a valid email</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    defaultValue={userData?.phone_number}
                    {...register('phone_number', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  />
                  {errors.phone_number && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    defaultValue={userData?.password}
                    {...register('password', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                  />
                  {errors.password && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <input
                    defaultValue={userData?.role}
                    {...register('role', { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
                    disabled
                  />
                  {errors.role && <span className="text-red-500 text-sm mt-1">This field is required</span>}
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
