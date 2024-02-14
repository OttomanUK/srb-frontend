// import DashboardCard01 from '../components/dashboard_components/DashboardCard01';
// import DashboardCard02 from '../components/dashboard_components/DashboardCard02';
// import DashboardCard03 from '../components/dashboard_components/DashboardCard03';
// import DashboardCard04 from '../components/dashboard_components/DashboardCard04';
// import DashboardCard05 from '../components/dashboard_components/DashboardCard05';
// // import DashboardCard06 from '../components/dashboard_components/DashboardCard06';
// import DashboardCard07 from '../components/dashboard_components/DashboardCard07';

import Sidebar from '../components/resuseable_components/Sidebar';
import Analytics from './Analytics';

function Settings(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div className="flex h-screen overflow-hidden">

        {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            {/* Content area */}
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <BarPlot data={dummyData} chartBy="ntn" />
            </div> 
        </div>
    );


};

export default Settings