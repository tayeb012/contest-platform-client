import React from "react";
import useRegisterContest from "../../../Hooks/useRegisterContest";
import { useEffect } from "react";
import { useState } from "react";
import { textColor } from "../../../Component/Shared/Navbar/Navbar";
import { RiPaypalLine } from "react-icons/ri";
import { MdRepartition } from "react-icons/md";

const MyWinningContest = () => {
  const [registerContest] = useRegisterContest();
  // const [WinnedContest, setWinnedContest] = useState();

  const WinnedContest = registerContest?.filter(
    (item) => item?.states === "Winner"
  );
  const totalRegisterPrize = WinnedContest.reduce(
    (accumulator, currentItem) =>
      parseInt(accumulator) + parseInt(currentItem.prizeMoney),
    0
  );

  console.log(WinnedContest);

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-2xl font-bold">
          Total Register {WinnedContest.length}
        </h2>
        <h2 className="text-2xl font-bold">
          Total Winning Prize {totalRegisterPrize}
        </h2>
      </div>
      <div>
        {WinnedContest?.map((item, idx) => (
          <div
            key={idx}
            className="card glass bg-opacity-5 backdrop-blur-sm transition-colors rounded-md bg-base-100 shadow-xl h-full"
          >
            <figure className="px-10 pt-10">
              <img
                src={item.image}
                alt={item.contestName}
                className="rounded-xl"
              />
            </figure>
            <div className=" card-body ">
              <h2 className="card-title">{item.contestName}</h2>
              <h2 className="text-emerald-600 underline decoration-sky-500 font-bold">
                {item.contestType}
              </h2>
              <p>{item.shortDescription}................</p>
              <div className="flex justify-between">
                <h2
                  className={`text-2xl font-bold flex items-center text-red-400`}
                >
                  COST <RiPaypalLine />{" "}
                  <span className={`${textColor}`}>${item.contestPrice}</span>
                </h2>
                <div
                  className={`text-5xl flex flex-col items-center font-bold  text-purple-500`}
                >
                  <span className="flex text-emerald-600 underline decoration-sky-500 font-bold">
                    {item.prizeMoney}
                    <RiPaypalLine />
                  </span>
                  Winning Price
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyWinningContest;
