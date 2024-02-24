import React, { useState } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import Sidebar from "../components/resuseable_components/Sidebar";
import Header from "../components/resuseable_components/Header";
import WelcomeBanner from "../components/dashboard_components/WelcomeBanner";



function MissingInvoice(){
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const customGreeting = 'Missing Invoices'
    const sampleData = [
        { date: '2024-02-23', invoiceNumber: '123' },
        { date: '2024-02-23', invoiceNumber: '124' },
        { date: '2024-02-23', invoiceNumber: '125' },
        { date: '2024-02-23', invoiceNumber: '123' },
        { date: '2024-02-23', invoiceNumber: '124' },
        { date: '2024-02-23', invoiceNumber: '125' },
        { date: '2024-02-23', invoiceNumber: '123' },
        { date: '2024-02-23', invoiceNumber: '124' },
        { date: '2024-02-23', invoiceNumber: '125' },
        { date: '2024-02-24', invoiceNumber: '123' },
        { date: '2024-02-24', invoiceNumber: '124' },
        { date: '2024-02-24', invoiceNumber: '125' },
    ]
    return (
        <div className="flex h-screen">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-col flex-1">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
              <WelcomeBanner greeting={customGreeting} />
              <Card className='dark:border-slate-700 dark:bg-slate-800'>
                <CardBody className="overflow-auto px-0 dark:border-slate-700 dark:bg-slate-800">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-gray-700 dark:text-white font-bold">Date</th>
                        <th className="text-gray-700 dark:text-white font-bold">Invoice Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sampleData.map((item, index) => (
                        <tr key={index} className="text-center text-gray-700 dark:text-white">
                          {index === 0 || sampleData[index - 1].date !== item.date ? (
                            <td>{item.date}</td>
                          ) : (
                            <td style={{ color: 'transparent'}}>{item.date}</td>
                          )}
                          <td>{item.invoiceNumber}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      );
}

export default MissingInvoice