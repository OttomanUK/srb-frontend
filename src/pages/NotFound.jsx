import React, { useEffect, useState } from 'react';
import Sidebar from '../components/resuseable_components/Sidebar';
import Header from '../components/resuseable_components/Header';
import error from '../images/error.png'

function NotFound(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col items-center justify-center">
            <img  src={error} alt="User" />
            <h1 className='pt-4 text-6xl'>Page Not Found</h1>
            </div>
          </div>
        </div>
    );
}

export default NotFound;