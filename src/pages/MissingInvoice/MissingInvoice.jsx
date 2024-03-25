import React, { useState,useEffect, useRef } from "react";
import { Card, CardBody } from "@material-tailwind/react";
import Sidebar from "../../components/resuseable_components/Sidebar";
import Header from "../../components/resuseable_components/Header";
import WelcomeBanner from "../../components/dashboard_components/WelcomeBanner";
import { useParams,useLocation, useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import {getMissingInvoice} from "../../action/action";
import Loader from '../../components/utils/Loader';
import Footer from "../../components/dashboard_components/DashboardFooter";
import './MissingInvoice.css'
import {pageLimit} from "../../api/data"
import PleaseReload from '../PleaseReload'
import Datepicker from "../../components/resuseable_components/Datepicker";

function useQuery() {
  return new URLSearchParams(useLocation().search);}


function MissingInvoice(){
  const navigate = useNavigate();
  const query=useQuery()
  const page=parseInt(query.get('page'))||1
  const date=(query.get('date'))||"None"
  const ntn=query.get('ntn')||"all"
  const pos_id=query.get('pos_id')||"None"
  const location=query.get('location')||"None"
  const dispatch = useDispatch();
  const {allLocation,allNtn} =useSelector(state=>state.centralStore)

  const {id} = useParams();
  const {isLoading} = useSelector(state=>state.centralStore)
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const customGreeting = 'Missing Invoices'
    const [data,setData]=useState([])
    const [error,setError]=useState(false)
    const [count,setCount]=useState([])
    const [searchInput, setSearchInput] = useState('');
    const [selectedLocation,setSelectedLocation ] = useState('');
    const [selectedNtn,setSelectedNtn ] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setError(false)
          const a = await dispatch(getMissingInvoice(ntn, page,date,pos_id,location));
          setData(a.results);
          setCount(a.count);
          console.log(a);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError(true)
        }
      };
      
      fetchData()
    }, [page, ntn,date,pos_id,location]);

    useEffect(() => {

      try{
        setError(false)
        
        const filteredResults = data.filter((item) => {
          const dateString = String(item.date); // Convert ntn to string
          return (
            (dateString.toLowerCase().includes(searchInput.toLowerCase()))
            );
          } );
          setFilteredData(filteredResults);
        }
        catch (error) {
          setError(true)
        }
    }, [searchInput, data,]);

    if(error){
      return <PleaseReload/>
    }
    if(isLoading){
      return <Loader/>
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
              <div className="mb-4">
              
              <Datepicker string={"Missing"}/>
               <div className='flex flex-col px-2'>
          <label className="text-gray-700 dark:text-white ">Filter by Location</label>
          <select
              value={selectedLocation}
              onChange={(e) => {
                console.log(e)
                setSelectedLocation(e.target.value)
                navigate(`/Missing?&ntn=${ntn}&pos_id=${pos_id}&page=${page}&date=${date}&location=${e.target.value}`)
              }
            }
              className="border rounded  dark:text-black"
            >
              {allLocation.map((location, index) => (
                <option key={index} value={location.location} className="rounded  font-bold italic bg-grey-300 text-grey-100 hover:bg-darkblue  border border-grey-500 border-solid">
                  {location.location}
                </option>
              ))}
            </select>
          </div>
          <label className="text-gray-700 dark:text-white ">Filter by Location</label>
          <select
              value={selectedNtn}
              onChange={(e) => {
                console.log(e)
                setSelectedNtn(e.target.value)
                navigate(`/Missing?&ntn=${e.target.value}&pos_id=${pos_id}&page=${page}&date=${date}&location=${location}`)
              }
            }
              className="border rounded  dark:text-black"
            >
              {allNtn.map((ntn, index) => (
                <option key={index} value={ntn} className="rounded  font-bold italic bg-grey-300 text-grey-100 hover:bg-darkblue  border border-grey-500 border-solid">
                  {ntn}
                </option>
              ))}
            </select>
          
            </div>
              <Card className='dark:border-slate-700 dark:bg-slate-800'>
              <CardBody className="overflow-auto px-0 dark:border-slate-700 dark:bg-slate-800">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-gray-700 dark:text-white font-bold">Date</th>
              <th className="text-gray-700 dark:text-white font-bold">NTN </th>
              <th className="text-gray-700 dark:text-white font-bold">Pos</th>
              <th className="text-gray-700 dark:text-white font-bold">Location</th>
              <th className="text-gray-700 dark:text-white font-bold">Invoices</th>
              <th className="text-gray-700 dark:text-white font-bold">Count</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, index) => (
              <tr key={index} className="text-center text-gray-700 dark:text-white border ">

                  <td>{item.date}</td>
                
                <td>{item.ntn}</td>
                <td>{item.pos_id}</td>
                <td>{item.location}</td>
                <td>{item.invoices}</td>
                <td>{(item.invoices.match(/,/g) || []).length + 1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardBody>
              </Card>
          <Footer  string="missing"  total={ Math.ceil(count/pageLimit)}/>
            </div>
          </div>
        </div>
        
      );
}

export default MissingInvoice