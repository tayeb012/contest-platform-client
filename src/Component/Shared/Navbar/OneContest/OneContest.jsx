import React from "react";
import { RiPaypalLine } from "react-icons/ri";
import { textColor } from "../Navbar";
import { Button } from "flowbite-react";
import { MdRepartition } from "react-icons/md";
import { Link } from "react-router-dom";
const OneContest = ({ oneContest }) => {
  const {
    contestName,
    attemptedCount,
    image,
    contestDescription,
    contestDetails,
    contestPrice,
    contestWinner,
    deadline,
    contestType,
    _id,
  } = oneContest || "";
  //   console.log(oneContest);

  const shortDescription = contestDescription?.slice(0, 50);

  return (
    <div>
      <div className="card glass bg-opacity-5 backdrop-blur-sm transition-colors rounded-md bg-base-100 shadow-xl h-full">
        <figure className="px-10 pt-10">
          <img src={image} alt={contestName} className="rounded-xl" />
        </figure>
        <div className=" card-body ">
          <h2 className="card-title">{contestName}</h2>
          <h2 className="text-emerald-600 underline decoration-sky-500 font-bold">
            {contestType}
          </h2>
          <p>{shortDescription}................</p>
          <div className="flex justify-between">
            <h2 className={`text-2xl font-bold flex items-center text-red-400`}>
              <RiPaypalLine />{" "}
              <span className={`${textColor}`}> ${contestPrice}</span>
            </h2>
            <div
              className={`text-2xl font-bold flex items-center text-purple-500`}
            >
              <MdRepartition />
              {attemptedCount}
            </div>
          </div>
          <div className="card-actions w-full">
            <Link className="w-full" to={`/contest-details/${_id}`}>
              <Button outline className="w-full" gradientDuoTone="purpleToBlue">
                Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneContest;
