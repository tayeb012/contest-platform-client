import React from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useEffect } from "react";
import { useState } from "react";
import { Avatar, Card, Carousel } from "flowbite-react";

const BestContestCreator = () => {
  const axiosPublic = useAxiosPublic();
  const [bestCreator, serBestCreator] = useState([]);

  useEffect(() => {
    axiosPublic
      .get("/creator/user")
      .then((res) => {
        serBestCreator(res.data);
      })
      .catch((error) => {
        console.log("serBestCreator error", error);
      });
  }, [axiosPublic]);

  const sortedCreator = [...bestCreator]?.sort(
    (a, b) => b.registeredCount - a.registeredCount
  );

  return (
    <div className=" relative">
      <div className="mx-auto h-56 sm:h-64 xl:h-80 2xl:h-96 w-fit flex flex-col justify-center items-center ">
        <h2 className="text-5xl font-bold bg-white rounded-2xl px-5 py-4 mb-20 inline-block text-[#07A3E6]">
          Best Contest Creator
        </h2>
        <Carousel className="scale-150">
          {sortedCreator?.map((item, idx) => (
            <div
              key={idx}
              className="flex h-full items-center justify-center  dark:text-white"
            >
              <Card className="max-w-lg">
                <div className="flex justify-end px-4 pt-4"></div>
                <div className="flex flex-col items-center pb-10">
                  <Avatar img={item.photoUrl} rounded bordered />
                  <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {item.name}
                  </h5>
                  <span className="text-sm ">{item.email}</span>
                  <span className="text-sm ">
                    Total register users:  {item.registeredCount}
                  </span>
                </div>
              </Card>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default BestContestCreator;
