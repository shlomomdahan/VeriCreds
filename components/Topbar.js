import React from 'react';

const TopBar = () => {
    return (
        <div style={{
            backgroundColor: '#274C77',
            zIndex: 9999, // Set a high z-index value to ensure it appears on top
        }} className="topbar bg-blue-900 flex items-center justify-between h-12">
        <div className="logo-container">
          <img src="/topbar-logo.png" alt="Logo" className="w-10 h-10 mt-1 ml-4" />
        </div>
        <div className="search-container ml-auto mr-4 flex items-center">
          <input type="text" placeholder="Search" className="w-64 h-8 px-2 mr-2 rounded" />
          {/* <button className="h-8 px-4 bg-blue-500 text-white rounded">Search</button> */}
        </div>
        <div className="profile-container">
          <img src="/profile.png" alt="Profile" className="w-8 h-8 mr-4 rounded-full" />
        </div>
      </div>
    );
}

export default TopBar;
