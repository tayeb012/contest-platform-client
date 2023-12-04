import React from "react";
import useAllContest from "../../../Hooks/useAllContest";
import OneContest from "../../../Component/Shared/Navbar/OneContest/OneContest";

const PopularSection = () => {
  const [allContest] = useAllContest();
  // console.log(allContest);
  const sortedContest = [...allContest].sort(
    (a, b) => b.attemptedCount - a.attemptedCount
  );
  // console.log(sortedContest);
  return (
    <div className="mx-20 py-20 flex flex-col items-center">
      <h2 className="text-5xl font-bold bg-white rounded-2xl px-5 py-4 my-10 inline-block text-[#07A3E6]">
        Most Popular Contest
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {sortedContest && allContest.length > 0 ? ( // Check if 'allContest' exists and has data
          sortedContest
            .slice(0, 6)
            .map((oneContest, idx) => (
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

export default PopularSection;
