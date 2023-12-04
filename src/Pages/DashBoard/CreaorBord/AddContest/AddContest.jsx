import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/UseAuth";
import { Datepicker, FileInput, Label } from "flowbite-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
// import useAxiosPublic from "../../../../Hooks/useAxiosPublic";
// const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddContest = () => {
  const axiosSecure = useAxiosSecure();
  // const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { user } = useAuth();
  const userEmail = user?.email || "";
  //   const [Deadline, setContestDeadline] = useState(null);

  //   // Handler for date change
  //   const handleDateChange = (date) => {
  //     setContestDeadline(date);
  //   };

  const handleAddContest = (e) => {
    e.preventDefault();
    const image = e.target.image.value;
    // const uploadImg = e.target.uploadImg.value;
    const contestName = e.target.contestName.value;
    const contestDescription = e.target.contestDescription.value;
    const contestPrice = e.target.contestPrice.value;
    const prizeMoney = e.target.prizeMoney.value;
    const taskSubmissionText = e.target.taskSubmissionText.value;
    const contestType = e.target.contestType.value;
    const contestDeadline = e.target.contestDeadline.value;

    const newContest = {
      image,
      contestName,
      contestDescription,
      contestPrice,
      prizeMoney,
      taskSubmissionText,
      contestType,
      contestDeadline,
      attemptedCount: 0,
      submission: "Pending",
      contestWinner: {
        name: "",
        avatarImage: "",
      },
      creatorEmail: userEmail,
    };

    console.log(newContest);

    // add product to server site
    axiosSecure
      .post("/addContest", newContest)
      .then((card) => {
        // console.log(card.data.acknowledged);
        if (card.data.acknowledged) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Added Contest SUCCESSFULLY",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate("/dashBoard/createdContest");
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div>
      <div className=" flex justify-center ">
        <Helmet>
          <title>Add Contest - SavorSphere Eatery</title>
        </Helmet>
        <div className="p-4 w-3/5">
          <h2 className="text-2xl font-semibold text-center text-pink-200 mb-4">
            Add Context
          </h2>
          <form onSubmit={handleAddContest} className=" p-4 rounded shadow-md ">
            {/* <div className="mb-2">
              <div>
                <Label htmlFor="small-file-upload" value="Small file input" />
              </div>
              <FileInput name="uploadImg" id="small-file-upload" sizing="sm" />
            </div> */}

            <div className="mb-4">
              <label
                htmlFor="contestName"
                className="block text-sm font-medium text-blue-500"
              >
                Contest Name
              </label>
              <input
                type="text"
                name="contestName"
                className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-blue-500"
              >
                Contest Image
              </label>
              <input
                type="text"
                name="image"
                className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="contestType"
                className="block text-sm font-medium text-blue-500"
              >
                Contest Category:
              </label>
              <select
                name="contestType"
                className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              >
                <option value="Business Contest" className="text-blue-500">
                  Business Contest
                </option>
                <option value="Medical Contest" className="text-blue-500">
                  Medical Contest
                </option>
                <option value="Article Writing" className="text-blue-500">
                  Article Writing
                </option>
                <option value="Gaming" className="text-blue-500">
                  Gaming
                </option>
                <option value="Coding Challenge" className="text-blue-500">
                  Coding Challenge
                </option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-blue-500"
              >
                Contest Price
              </label>
              <input
                type="number"
                name="contestPrice"
                className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-blue-500"
              >
                Prize Money
              </label>
              <input
                type="number"
                name="prizeMoney"
                className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="contestDeadline"
                className="block text-sm font-medium text-blue-500"
              >
                Contest Dead Line
              </label>
              <Datepicker
                name="contestDeadline"
                minDate={new Date(2023, 11, 1)}
                maxDate={new Date(2025, 1, 30)}
                // onChange={handleDateChange} // Make sure to handle date changes
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="shortDescription"
                className="block text-sm font-medium text-blue-500"
              >
                Contest Description
              </label>
              <textarea
                name="contestDescription"
                className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="taskSubmissionText"
                className="block text-sm font-medium text-blue-500"
              >
                Task Submission Text
              </label>
              <textarea
                name="taskSubmissionText"
                className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
                required
              ></textarea>
            </div>

            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="btn-wide text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Add Contest
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddContest;
