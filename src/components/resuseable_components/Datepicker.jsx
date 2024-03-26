import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Input,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addGoToGraph } from '../../redux_store/reducer';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Datepicker({
  align, string, reduxNtn = "None", reduxLocation = "None", reduxPos = "None", reduxAnomalous = 10
}) {
  const dispatch = useDispatch();
  
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const ntn = query.get("ntn") || "None";
  const pos_id = query.get("pos_id") || "None";
  const anomalyParam = query.get("anomaly");
  const date = query.get("date")|| new Date();
  const [selectedDate, setSelectedDate] = useState('');
  const anomaly = isNaN(parseInt(anomalyParam)) ? 10 : parseInt(anomalyParam);
  const location = query.get("location") || "None";
  const navigate = useNavigate();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];
    if (string === "analytics") {
      dispatch(addGoToGraph(true));
      navigate(`/$dashboard/?ntn=${reduxNtn}&pos_id=${reduxPos}&date=${formattedDate}&location=${reduxLocation}&anomaly=${reduxAnomalous}`);
    } else {
      navigate(`/${string}/?ntn=${ntn}&pos_id=${pos_id}&date=${formattedDate}&location=${location}&anomaly=${anomaly}&page=${page}`);
    }
  };

  return (
    <div className="relative">
        <DatePicker
      selected={date}
      onChange={handleDateChange}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      dateFormat="yyyy-MM-dd"
      className="text-blue-700 border border-blue-500 rounded-md px-3 py-2 focus:outline-none"
      calendarClassName="bg-blue-900 text-gray-200 shadow-lg rounded-md p-4"
      style={{ fontSize: '1rem', fontFamily: 'Mulish' }}
      dayClassName={() => 'text-blue-700'}
      monthClassName={() => 'text-blue-700'}
      yearClassName={() => 'text-blue-700'}
    />
    </div>
  );
}

export default Datepicker;
