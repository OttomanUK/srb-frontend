import React,{useState,useEffect} from 'react'; 

import {
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


const Footer = ({pos="None",ntn="None",page=1,total,string="dashboard", date="None",location="None"}) => {
  const navigate=useNavigate();
const previous=()=>{
  if(page===1){
    return 
  }
  if(date!="None"){
  
    navigate(`/${string}/?ntn=${ntn}&pos=${pos}&page=${page-1}&date=${date}&location=${location}`)
    return
  }
    navigate(`/${string}/?ntn=${ntn}&pos=${pos}&page=${page-1}&location=${location}`)
  return
}
const next=()=>{
  if(page==total){
    return 
  }
  if(date!="None"){

    navigate(`/${string}/?ntn=${ntn}&pos=${pos}&page=${page+1}&date=${date}&location=${location}`)
    return
  }
  navigate(`/${string}/?ntn=${ntn}&pos=${pos}&page=${page+1}&location=${location}`)
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