import { useNavigate, useParams } from "react-router-dom";
import useAllContest from "../../Hooks/useAllContest";
import { useEffect, useState } from "react";
import { RiPaypalLine } from "react-icons/ri";
import { textColor } from "../Shared/Navbar/Navbar";
import { MdRepartition } from "react-icons/md";
import { Avatar, Button } from "flowbite-react";
import { Helmet } from "react-helmet-async";
import { FaGifts } from "react-icons/fa";
import useAuth from "../../Hooks/UseAuth";

const OneContestDetails = () => {
  const [allContest] = useAllContest();
  const [oneContest, setOneContest] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();
  const { setForRegisterContestId } = useAuth();

  useEffect(() => {
    const filterContest = allContest?.find((contest) => contest._id == id);
    setOneContest(filterContest);
  }, [allContest, oneContest]);

  const {
    contestName,
    attemptedCount,
    image,
    contestDescription,
    taskSubmissionText,
    contestPrice,
    contestWinner,
    contestDeadline,
    contestType,
    prizeMoney,
    creatorEmail,
    _id,
  } = oneContest || "";

  const handleRegisterContest = () => {
    setForRegisterContestId(id);
    navigate(`/dashBoard/payment/${contestPrice}`);
  };

  return (
    <div className="min-h-screen mx-20 flex justify-center items-center">
      <Helmet>
        <title>Details - ContestCraft</title>
      </Helmet>
      <div className="card  shadow-xl  glass bg-opacity-5 backdrop-blur-sm transition-colors">
        <figure>
          <img src={image} alt={contestName} />
        </figure>
        <div className="card-body flex-row text-center justify-evenly">
          <div className="flex flex-col">
            <h2 className="card-title">{contestName}</h2>
            <p className="font-semibold underline decoration-sky-500">
              Category: {contestType}
            </p>
            <p className="font-semibold underline decoration-red-500">
              Deadline: {contestDeadline}
            </p>
            <div className="flex justify-between">
              <h2
                className={`text-2xl font-bold flex items-center text-red-400`}
              >
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
            <Button
              onClick={handleRegisterContest}
              outline
              className="w-full"
              gradientDuoTone="purpleToBlue"
            >
              Contest Registration
            </Button>
          </div>
          <div className="md:w-2/5 font-bold">
            <p>{taskSubmissionText}</p>
            <div className="divider divider-accent text-red-400">Task</div>
            <p>{contestDescription}</p>
          </div>
          <div>
            <div className="flex flex-col justify-between items-center h-full">
              <h2 className="flex-1 font-bold text-2xl text-purple-800">
                Last Time Winner
              </h2>
              <Avatar img={contestWinner?.avatarImage} rounded bordered />
              <p>{contestWinner?.name}</p>
              <p className="text-4xl font-bold text-purple-950 flex items-center gap-4">
                <FaGifts />{" "}
                <span className={`${textColor} `}> ${prizeMoney} </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneContestDetails;
