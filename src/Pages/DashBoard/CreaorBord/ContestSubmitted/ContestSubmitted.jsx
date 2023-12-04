import { Link } from "react-router-dom";
import useRegisteredUserOfCreator from "../../../../Hooks/useregisteredUserOfCreator";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ContestSubmitted = () => {
  const axiosSecure = useAxiosSecure();
  const [registeredContestOFCreator, refetch, isLoading] =
    useRegisteredUserOfCreator();
  //   console.log("registeredContestOFCreator", registeredContestOFCreator);

  const handleDeclareWinner = (id, oldId, winnerName, winnerPhoto) => {
    console.log(id, oldId, winnerName, winnerPhoto)
    const updateContestValue = {
      states: "Winner",
    };
    axiosSecure
      .put(`/registeredContestWinnerDeclare/id/${id}`, updateContestValue)
      .then((card) => {
        console.log(card.data.modifiedCount);
        if (card.data.modifiedCount) {
          refetch();
          axiosSecure
            .put(`/updateWinnerDeclare/id/${oldId}`, {
              contestWinner: {
                name: { winnerName },
                avatarImage: { winnerPhoto },
              },
            })
            .then((card) => {
              console.log(card.data.modifiedCount);
              if (card.data.modifiedCount) {
                console.log("updateSuccessFully");
              }
            })
            .catch((error) => {
              console.log(error);
            });

          Swal.fire({
            position: "center",
            icon: "success",
            title: "Declared The Contest Winner SUCCESSFULLY",
            showConfirmButton: false,
            timer: 1500,
          });
          refetch();
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          position: "center",
          icon: "error",
          title: error.message,
          showConfirmButton: false,
          timer: 2000,
        });
      });
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-2xl font-bold">
          Total User Attend Contest {registeredContestOFCreator.length}
        </h2>
        <h2 className="text-2xl font-bold">
          {/* Total Register Cost {totalRegisterPrice} */}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Participant Name & Email</th>
              <th>Submission Details</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {registeredContestOFCreator?.map((item, idx) => (
              <tr key={idx}>
                <th>
                  <label>{idx + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.registerPhotoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.registerName}</div>
                      <div className="text-sm opacity-50">
                        {item.registerEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="text-red-400"> Contest Name</span>{" "}
                  {item.contestName}{" "}
                  <span className="text-purple-500"> Contest Category </span>
                  {item.contestType}
                  <span className="badge badge-ghost badge-sm">
                    {item.taskSubmissionText}
                  </span>
                </td>
                {item?.states !== "Winner" ? (
                  <td
                    onClick={() =>
                      handleDeclareWinner(
                        item._id,
                        item.oldId,
                        item.registerName,
                        item.registerPhotoUrl
                      )
                    }
                    className="btn  text-center bg-yellow-300"
                  >
                    Make Winner
                  </td>
                ) : (
                  <td>Winned</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContestSubmitted;
