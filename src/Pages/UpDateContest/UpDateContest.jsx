import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import useAllContest from "../../Hooks/useAllContest";
import "react-datepicker/dist/react-datepicker.css";
import { Datepicker } from "flowbite-react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/UseAuth";

const UpDateContest = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [allContest] = useAllContest();
  const updatorName = user?.displayName || "";
  const updatorEmail = user?.email || "";
  console.log(user);

  const theContest = allContest?.find((item) => item._id == id);

  const {
    contestName,
    attemptedCount,
    image,
    contestDescription,
    contestPrice,
    contestDeadline,
    prizeMoney,
    contestType,
    _id,
    taskSubmissionText,
  } = theContest || "";

  const handleSubmit = (e) => {
    e.preventDefault();
    const image = e.target.image.value;
    const contestName = e.target.contestName.value;
    const contestDescription = e.target.contestDescription.value;
    const contestPrice = e.target.contestPrice.value;
    const prizeMoney = e.target.prizeMoney.value;
    const taskSubmissionText = e.target.taskSubmissionText.value;
    const contestType = e.target.contestType.value;
    const contestDeadline = e.target.contestDeadline.value;
    const attemptedCount = e.target.attemptedCount.value;

    const updateContestValue = {
      image,
      contestName,
      contestDescription,
      contestPrice,
      prizeMoney,
      taskSubmissionText,
      contestType,
      contestDeadline,
      attemptedCount,
      updatorEmail,
    };

    console.log(updateContestValue);

    axiosSecure
      .put(`/updateContest/id/${_id}`, updateContestValue)
      .then((card) => {
        console.log(card.data.modifiedCount);
        if (card.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Update Contest SUCCESSFULLY",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        navigate(-1);
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
    <div className=" flex justify-center py-20">
      <Helmet>
        <title>Update The Contest - ContestCraft</title>
      </Helmet>
      <div className="p-4 w-3/5 glass text-purple-400 bg-blue-200 bg-opacity-20 backdrop-blur-lg transition-colors">
        <h2 className="text-2xl font-semibold text-center text-pink-200 mb-4">
          Update The Contest
        </h2>
        <form onSubmit={handleSubmit} className=" p-4 rounded shadow-md ">
          <div className="mb-4">
            <label
              htmlFor="updator_Email"
              className="block text-sm font-medium text-blue-500"
            >
              Updator Email
            </label>
            <input
              readOnly
              type="email"
              name="updatorEmail"
              value={updatorEmail}
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
              defaultValue={image}
              className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
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
              defaultValue={contestName}
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
              defaultValue={contestType}
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
              defaultValue={contestPrice}
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
              defaultValue={prizeMoney}
              className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="attemptedCount"
              className="block text-sm font-medium text-blue-500"
            >
              Attempted Count
            </label>
            <input
              type="number"
              name="attemptedCount"
              defaultValue={attemptedCount}
              className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="attemptedCount"
              className="block text-sm font-medium text-blue-500"
            >
              Contest Dead Line
            </label>
            <Datepicker
              name="contestDeadline"
              selected={contestDeadline}
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
              defaultValue={contestDescription}
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
              defaultValue={taskSubmissionText}
              className="w-full border border-blue-300 rounded py-2 px-3 focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="btn-wide text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpDateContest;
