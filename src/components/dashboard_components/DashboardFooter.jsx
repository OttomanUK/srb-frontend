import React,{useState,useEffect} from 'react'; 

import {
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";
import { useNavigate } from 'react-router-dom';


const Footer = ({pos,ntn,offset,total}) => {
  const navigate=useNavigate();
const previous=()=>{
  if(offset===1){
    return 
  }
  if(pos!=null){
    navigate(`/dashboard/?ntn=${ntn}&pos=${pos}&offset=${offset-1}`)
  return }
  if(ntn!=null){
    navigate(`/dashboard/?ntn=${ntn}&pos=${pos}&offset=${offset-1}`)
    return }
  if(ntn==null){
    navigate(`/dashboard/?offset=${offset-1}`)
    return  } 
}
const next=()=>{
  if(offset==total){
    return 
  }
  // console.log("kjer")
  if(pos!=null){
    navigate(`/dashboard/?ntn=${ntn}&pos=${pos}&offset=${offset+1}`)
  return }
  if(ntn!=null){
    navigate(`/dashboard/?ntn=${ntn}&pos=${pos}&offset=${offset+1}`)
    return 
  }
  if(ntn==null){
    navigate(`/dashboard/?offset=${offset+1}`)
    return 
  }
}
return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {offset} of {total}
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