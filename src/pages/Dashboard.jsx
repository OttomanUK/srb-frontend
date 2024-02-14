import React, { useState } from 'react';

import Sidebar from '../components/resuseable_components/Sidebar';
import Header from '../components/resuseable_components/Header';
import WelcomeBanner from '../components/dashboard_components/WelcomeBanner';
import DashboardAvatars from '../components/dashboard_components/DashboardAvatars';
import FilterButton from '../components/resuseable_components/DropdownFilter';
import Datepicker from '../components/resuseable_components/Datepicker';
import MembersTable from '../components/dashboard_components/DashboardTable';





function Dashboard() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner />
            {/* Dashboard actions */}
            <div className="sm:flex sm:justify-between sm:items-center mb-8">
              {/* Right: Actions */}
              <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
                {/* Filter button */}
                <FilterButton />
                <Datepicker />
              </div>

            </div>

            <div></div>

            {/* Cards */}
            <div>

              {/* Line chart (Acme Plus) */}
              <MembersTable/>
            
              {/* Line chart (Acme Advanced) */}
         
             
              
            </div>

          </div>
        </main>

      

      </div>
    </div>
  );
}

export default Dashboard;