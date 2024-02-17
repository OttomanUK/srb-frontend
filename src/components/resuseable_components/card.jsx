import React from 'react';

const MyCard = ({ title, content }) => {
  return (
    <div className="max-w-xs mx-auto p-4 bg-white rounded-md shadow-md">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{title}</h1>
        <h4 className="text-lg">{content}</h4>
      </div>
    </div>
  );
};

export default MyCard;
