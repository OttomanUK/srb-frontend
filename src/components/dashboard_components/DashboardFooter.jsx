import React,{useState,useEffect} from 'react'; 

import {
  Typography,
  Button,
  CardFooter,
} from "@material-tailwind/react";


const Footer = () => {

return (
    <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      )
    }
export default Footer;