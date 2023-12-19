import { useState, useEffect } from 'react';
import axios from 'axios';

function EditUser({ fetchTeam, closeEditUserModal, userID }) {
  const [userInfo, setUserInfo] = useState({
    fullName: { firstName: '', lastName: '' },
    email: '',
    phoneNumber: ''
  });
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');


  useEffect(() => {
    const getUserInfoByID = async (userID) => {
      console.log('User ID to be checked:', userID);
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/user/getById/${userID}`);
        console.log('User data retrieved successfully');
        // console.log(response.data.data);
        setUserInfo(response.data.data);
      } catch (error) {
        console.error('Error retrieving user data: ', error);
      }
    };

    getUserInfoByID(userID);
  }, [userID]);

  const validateInput = () => {

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const editUser = async (userID, userData) => {
    console.log('User ID to be updated:', userID);
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/user/update/${userID}`, userData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('User updated successfully');

    } catch (error) {
      console.error('Error updating team member data: ', error);
      if (error.response) {
        console.log('Error while updating user')
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!role) {
      setError("Please select a role.");
      return;
    }
  
    const updatedFields = {};
  
       if (email !== '' && email !== userInfo.email) {
        updatedFields.email = email;
      } else {
        updatedFields.email = userInfo.email;
      }
    
      if (phoneNumber !== '' && phoneNumber !== userInfo.phoneNumber) {
        updatedFields.phoneNumber = phoneNumber;
      } else {
        updatedFields.phoneNumber = userInfo.phoneNumber;
      }
    
      if (password !== '' && password === confirmPassword && password !== userInfo.password) {
        updatedFields.password = password;
      }
    
      if (role !== userInfo.role) {
        updatedFields.role = role;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return false;
      }
  
    const user = {
      ...updatedFields,
    };
  
    // console.log("Updated user object:", user);
    try {
      await editUser(userID, updatedFields);
      closeEditUserModal();
      fetchTeam();
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  return (
    <div>
      <p className="text-red-700 text-3xl text-center underline my-5">EDIT USER</p>
      <div className="text-center">
        <form className="py-4" onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
              {userInfo.fullName.firstName}
            </p>
            <span className="mx-4"></span>
            <p className="flex-1 px-4 py-2 bg-gray-100 text-lg text-black text-left">
              {userInfo.fullName.lastName}
            </p>
          </div>
          <div className="flex mb-4">
            <input
              type="email"
              placeholder={userInfo.email}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
            <span className="mx-4"></span>
            <input
              type="number" 
              placeholder={userInfo.phoneNumber}
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
          </div>

          <div className="flex mb-4">
            <input
              type="password"
              placeholder="******"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
            <span className="mx-4"></span>
            <input
              type="password"
              placeholder="******"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            />
          </div>
          <div className="flex mb-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className=" px-4 py-2 bg-gray-100 focus:outline-none text-lg text-black"
            >
              <option value="">Select role</option>
              <option value="admin">Admin</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          {error && <p className="text-red-700 text-sm">{error}</p>}
          <div className="flex justify-end">
            <button
              className="text-red-700 border border-red-700 px-4 py-2 hover:bg-red-100"
              disabled={!passwordsMatch}
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
