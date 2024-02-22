import React, { useState } from 'react';
import "./UserProfile.css";
import Sidebar from '../../components/resuseable_components/Sidebar';
import Header from '../../components/resuseable_components/Header';
import WelcomeBanner from '../../components/dashboard_components/WelcomeBanner';



function UserProfile(){
  // State variables for user data
  const customGreeting = 'User Profile'
  const customText = ''
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [designation, setDesignation] = useState('Software Engineer');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState('user-icon.jpg');
  const [accessLevel, setAccessLevel] = useState('User');

  // Function to handle profile update
  const handleUpdateProfile = () => {
    // Perform update logic here (e.g., send data to server)
    console.log('Profile updated successfully!');
  };

  // Function to handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoName(file.name);
    }
  };
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
          <WelcomeBanner greeting = {customGreeting} text = {customText}/>
            <div className="container"> 
              <form className="form-container dark:border-slate-700 dark:bg-slate-800">
              <div className="profile-image-container">
                  <img
                  src={photo ? URL.createObjectURL(photo) : 'https://via.placeholder.com/150'}
                  alt="User Photo"
                  className="profile-image"
                  style={{ width: '150px', height: '150px' }}
              />
              </div>
              <div className='file-container'>Current Photo: {photoName}</div>
              <input className='file-container' type="file" accept="image/*" onChange={handlePhotoChange} />
              <input
                type="text"
                className="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <input
                type="email"
                className="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full"
                placeholder="Change Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                className="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <input
                type="text"
                className="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full"
                placeholder="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />
              <input
                type="text"
                className="input-field bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <div>
                  <label>Access Level:</label>
                  <input
                      className='bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full'
                      type="text"
                      value={accessLevel}
                      onChange={(e) => setAccessLevel(e.target.value)}
                      readOnly // Adding the readOnly attribute
              />
              </div>
              <button className="update-button" onClick={handleUpdateProfile}>Update Profile</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;