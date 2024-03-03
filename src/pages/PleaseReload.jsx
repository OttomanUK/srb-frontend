import React, { useEffect, useState } from 'react';
import Sidebar from '../components/resuseable_components/Sidebar';
import Header from '../components/resuseable_components/Header';
import error from '../images/error.png'


function PleaseReload(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return(
        <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto flex flex-col items-center justify-center">
            <img  src={error} alt="Please Reload " />
            <h1 className='pt-4 text-6xl'>Oops, we encountered an error. Please try reloading.</h1>
            </div>
          </div>
        </div>
    );
}

export default PleaseReload;