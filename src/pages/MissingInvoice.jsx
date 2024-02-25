import React, { useState,useEffect } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import Sidebar from "../components/resuseable_components/Sidebar";
import Header from "../components/resuseable_components/Header";
import WelcomeBanner from "../components/dashboard_components/WelcomeBanner";
import { useParams } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {getMissingInvoice} from "../action/action";
import Loader from '../components/utils/Loader';


function MissingInvoice(){
  const dispatch = useDispatch();
  const {id} = useParams();
  const {isLoading} = useSelector(state=>state.centralStore)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const customGreeting = 'Missing Invoices'
    const [data,setData]=useState([])
    const sampleData = [
        { date: '2024-02-23', invoiceNumber: '123' },
        { date: '2024-02-23', invoiceNumber: '124' },
        { date: '2024-02-24', invoiceNumber: '123' },
        { date: '2024-02-24', invoiceNumber: '124' },
        { date: '2024-02-24', invoiceNumber: '125' },
    ]
    useEffect(()=>{
      const fetchData =async()=>{
        if(id==null){
          return
        }
       const a=await dispatch(getMissingInvoice(id));
       setData(a.results);
       console.log(a)
      }
      fetchData();
    },[])
    if(isLoading){
      return <><Loader/></>
    }
    if(data==null){
      return <><h1>No Data</h1></>
    }
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
                        <th className="text-gray-700 dark:text-white font-bold">Total Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((item, index) => (
                        <tr key={index} className="text-center text-gray-700 dark:text-white">
                          {index === 0 || sampleData[index - 1].date !== item.date ? (
                            <td>{item.date}</td>
                          ) : (
                            <td style={{ color: 'transparent'}}>{item.date}</td>
                          )}
                          <td>{item.invoices}</td>
                          <td>{(item.invoices.match(/,/g) || []).length+1}</td>
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