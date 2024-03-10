import React,{useState,useEffect} from 'react'; 

import {
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useNavigate,useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
const Footer = ({total,string="dashboard"}) => {
  const navigate=useNavigate();
  const query = useQuery();
  const page = parseInt(query.get("page")) || 1;
  const date = query.get("date") || "None";
  const ntn = query.get("ntn") || "None";
  const pos = query.get("pos") || "None";
  const anomalyParam = query.get("anomaly");
  const anomaly = isNaN(parseInt(anomalyParam)) ? 10 : parseInt(anomalyParam);
  const location = query.get("location") || "None";
const previous=()=>{
  if(page===1){
    return 
  }
  if(date!="None"){
  
    navigate(`/${string}/?ntn=${ntn}&pos=${pos}&page=${page-1}&date=${date}&location=${location}&anomaly=${anomaly}`)
    return
  }
    navigate(`/${string}/?ntn=${ntn}&pos=${pos}&page=${page-1}&location=${location}&anomaly=${anomaly}`)
  return
}
const next=()=>{
  if(page==total){
    return 
  }
  if(date!="None"){

    navigate(`/${string}/?ntn=${ntn}&pos=${pos}&page=${page+1}&date=${date}&location=${location}&anomaly=${anomaly}`)
    return
  }
  navigate(`/${string}/?ntn=${ntn}&pos=${pos}&page=${page+1}&location=${location}&anomaly=${anomaly}`)
}
return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {page} of {total}
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm" onClick={()=>{
            previous()
          }
          }>
            Previous
          </Button>
          <Button variant="outlined" size="sm" onClick={()=>{
            next()
          }
          } >
            Next
          </Button>
        </div>
      </CardFooter>
      )
    }
export default Footer;