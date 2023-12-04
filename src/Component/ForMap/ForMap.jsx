import React from "react";
import OneContest from "../Shared/Navbar/OneContest/OneContest";

const ForMap = ({ items }) => {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {items && items.length > 0 ? ( // Check if 'allContest' exists and has data
          items.map((oneContest, idx) => (
            <OneContest key={idx} oneContest={oneContest} />
          ))
        ) : (
          <div className="h-screen">
            {" "}
            <p>No data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForMap;
