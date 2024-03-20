import React, { useState } from 'react';
import {useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import {addGoToGraph} from "../../redux_store/reducer.js"
import SearchModal from '../resuseable_components/ModalSearch';
import Notifications from '../resuseable_components/DropdownNotifications';
import Help from '../resuseable_components/DropdownHelp';
import UserMenu from '../resuseable_components/DropdownProfile';
import ThemeToggle from '../resuseable_components/ThemeToggle';

function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const dispatch=useDispatch()
  const navigate =useNavigate()
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 bg-white dark:bg-[#182235] border-b border-slate-200 dark:border-slate-700 z-30">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          {pathname === '/Analytics' && (
          <div className="flex">
            <div className="pt-3 lg:inline-flex justify-end mt-auto">
              <div className="px-3 py-2">
                <button onClick={() => navigate(-1)}>
                <span className="sr-only">Back Button</span>
                <div className='flex items-center justify-center'>

                  <svg className="w-6 h-6 fill-current sidebar-expanded:rotate-180" viewBox="0 0 24 24">
                    <path className="text-slate-400" d="M19.586 11l-5-5L16 4.586 23.414 12 16 19.414 14.586 18l5-5H7v-2z" />
                    <path className="text-slate-600" d="M3 23H1V1h2z" />
                  </svg>
                  <span className="ml-2">
                    back to Dashboard
                    </span>
                </div>
                </button>
              </div>
            </div>
          </div>)}

          {/* Header: Right side */}
          <div className="flex items-center space-x-3 ml-auto">
            <div>
              <button
                className={`w-8 h-8 flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-full ml-3 font-bold`}
                onClick={(e) => {
                  if(pathname === '/Analytics'){
                    dispatch(addGoToGraph(true))
                    navigate("/dashboard")
                  }else{
                    navigate(pathname)
                  }
                  // e.stopPropagation();
                  // setSearchModalOpen(true);
                }}
                aria-controls="search-modal"
              >
                <span className="sr-only">⟳</span>
                <span className='fill-current text-slate-500 dark:text-slate-400 font-bold'>⟳</span>
                {/* <svg className="w-4 h-4" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path
                    className="fill-current text-slate-500 dark:text-slate-400"
                    d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"
                  />
                  <path
                    className="fill-current text-slate-400 dark:text-slate-500"
                    d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z"
                  />
                </svg> */}
              </button>
              {/* <SearchModal id="search-modal" searchId="search" modalOpen={searchModalOpen} setModalOpen={setSearchModalOpen} /> */}
            </div>
            <Notifications align="right" />
            <Help align="right" />
            <ThemeToggle />
            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 dark:bg-slate-700 border-none" />
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
