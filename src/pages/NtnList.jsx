import React, { useState,useEffect } from 'react';
import Sidebar from '../components/resuseable_components/Sidebar';
import WelcomeBanner from '../components/dashboard_components/WelcomeBanner';
import Header from '../components/resuseable_components/Header';
import { Card, CardBody } from '@material-tailwind/react';



function NtnList(){
    const customGreeting = 'NTN Lookup'
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sampleData = [
        { ntnNo: '123456', name: 'John Doe', address: '123 Main Street', posNumber: 'POS-001' },
        { ntnNo: '789012', name: 'Jane Doe', address: '456 Oak Avenue', posNumber: 'POS-002' },
        { ntnNo: '345678', name: 'Bob Smith', address: '789 Pine Lane', posNumber: 'POS-003' },
        { ntnNo: '901234', name: 'Alice Johnson', address: '101 Cedar Road', posNumber: 'POS-004' },
        { ntnNo: '567890', name: 'Charlie Brown', address: '202 Elm Street', posNumber: 'POS-005' },
        { ntnNo: '112233', name: 'Eva Martinez', address: '303 Maple Avenue', posNumber: 'POS-006' },
        // Add more data as needed
    ];

    return(
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
                        <WelcomeBanner greeting={customGreeting}/>
                        {/* Dashboard actions */}
                        <Card className='dark:border-slate-700 dark:bg-slate-800'>
                            <CardBody className="overflow-auto px-0 dark:border-slate-700 dark:bg-slate-800">
                            <table className="w-full">
                                <thead>
                                <tr>
                                    <th className="text-gray-700 dark:text-white font-bold mr-2">Ntn Number</th>
                                    <th className="text-gray-700 dark:text-white font-bold mr-2">Company Name</th>
                                    <th className="text-gray-700 dark:text-white font-bold mr-2">Address</th>
                                    <th className="text-gray-700 dark:text-white font-bold">POS Number</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {sampleData.map((item, index) => (
                                        <tr key={index} className='text-center text-gray-700 dark:text-white'>
                                        <td className="py-2 px-4 border-b">{item.ntnNo}</td>
                                        <td className="py-2 px-4 border-b">{item.name}</td>
                                        <td className="py-2 px-4 border-b">{item.address}</td>
                                        <td className="py-2 px-4 border-b">{item.posNumber}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            </CardBody>
                        </Card>
                    </div>
                </main>
            </div>
        </div>    
    );
}

export default NtnList