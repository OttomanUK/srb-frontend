import { Card, CardBody } from '@material-tailwind/react';
import React from 'react';

function DashboardCard({ title, value }) {
  // Check if the value is a valid number
  const isValidNumber = !isNaN(parseFloat(value)) && isFinite(value);

  // Display an error message if the value is not a valid number
  if (!isValidNumber) {
    return (
      <Card className='dark:border-slate-700 dark:bg-slate-800 w-full min-w-max '>
        <CardBody className="dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center h-24">
          <div className="text-sm font-bold text-red-500">
            Error: Null Value
          </div>
        </CardBody>
      </Card>
    );
  }

  // Render the card with the valid value
  return (
    <Card className='dark:border-slate-700 dark:bg-slate-800 w-full min-w-max '>
      <CardBody className="dark:border-slate-700 dark:bg-slate-800 flex items-center justify-center h-24">
        <div className="text-xl font-bold flex flex-row">
          <h1 className='text-gray-700 dark:text-white'>{title}:</h1>
          <h1 className='text-gray-700 dark:text-white'>{value}</h1>
        </div>
      </CardBody>
    </Card>
  );
}

export default DashboardCard;
