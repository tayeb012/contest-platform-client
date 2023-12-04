import { Link } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useRegisterContest from "../../../Hooks/useRegisterContest";
import Swal from "sweetalert2";

const MyRegisterContest = () => {
  const axiosPublic = useAxiosPublic();
  const [registerContest, reLoad] = useRegisterContest();

  const totalRegisterPrice = registerContest.reduce(
    (accumulator, currentItem) =>
      parseInt(accumulator) + parseInt(currentItem.contestPrice),
    0
  );

  const handleParticipate = (id) => {
    // update contest to server site
    const updateContestValue = {
      participate: "Attend",
    };
    axiosPublic
      .put(`/registeredContest/id/${id}`, updateContestValue)
      .then((card) => {
        console.log(card.data.modifiedCount);
        if (card.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Attend The Contest SUCCESSFULLY",
            showConfirmButton: false,
            timer: 1500,
          });
          reLoad();
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
          Total Register {registerContest.length}
        </h2>
        <h2 className="text-2xl font-bold">
          Total Register Cost {totalRegisterPrice}
        </h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name & Category</th>
              <th>Prize & Deadline</th>
              <th>Action</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {registerContest?.map((item, idx) => (
              <tr key={idx}>
                <th>
                  <label>{idx + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.contestName}</div>
                      <div className="text-sm opacity-50">
                        {item.contestType}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  ${item.prizeMoney}
                  <br />
                  <span className="badge badge-ghost badge-sm">
                    {item.contestDeadline}
                  </span>
                </td>
                {item?.participate == "Participate" ? (
                  <td
                    onClick={() => handleParticipate(item._id)}
                    className="btn btn-sm text-center flex items-center justify-center"
                  >
                    {item.participate}
                  </td>
                ) : (
                  <td>{item.participate}</td>
                )}

                <th>
                  <Link to={`/contest-details/${item.oldId}`}>
                    <button className="btn btn-ghost btn-xs">details</button>
                  </Link>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRegisterContest;
