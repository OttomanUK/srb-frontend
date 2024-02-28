import React, { useState, useEffect } from 'react';
import Sidebar from '../components/resuseable_components/Sidebar';
import WelcomeBanner from '../components/dashboard_components/WelcomeBanner';
import Header from '../components/resuseable_components/Header';
import { Card, CardBody } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllNtn } from '../action/action';
import Loader from '../components/utils/Loader';

function NtnList() {
  const customGreeting = 'NTN Lookup';
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isLoading } = useSelector(state => state.centralStore);
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { results } = await dispatch(getAllNtn());
      setData(results);
      setFilteredData(results);
    };
    fetchData();
  }, []);

    // Filter data based on searchInput
    useEffect(() => {
        // Filter data based on searchInput
        const filteredResults = data.filter((item) => {
          const ntnString = String(item.ntn); // Convert ntn to string
          return (
            (ntnString.toLowerCase().includes(searchInput.toLowerCase())) ||
            (typeof item.name === 'string' && item.name.toLowerCase().includes(searchInput.toLowerCase()))
          );
        });
        setFilteredData(filteredResults);
      }, [searchInput, data]);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            {/* Welcome banner */}
            <WelcomeBanner greeting={customGreeting} />
            {/* Dashboard actions */}
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search by NTN or Name"
                className="px-3 py-2 border rounded-md w-full"
                value={searchInput}
                onChange={e => setSearchInput(e.target.value)}
              />
            </div>
            <Card className="dark:border-slate-700 dark:bg-slate-800">
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
                    {filteredData.map((item, index) => (
                      <tr key={index} className="text-center text-gray-700 dark:text-white hover:bg-gray-100 hover:cursor-pointer">
                        <td
                          className="py-2 px-4 border-b cursor-pointer"
                          onClick={() => navigate(`/dashboard?ntn=${item.ntn}`)}
                        >
                          {item.ntn}
                        </td>
                        <td className="py-2 px-4 border-b">{item.name}</td>
                        <td className="py-2 px-4 border-b">{item.location}</td>
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

export default NtnList;
