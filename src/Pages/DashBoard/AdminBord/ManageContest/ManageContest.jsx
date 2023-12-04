import React from "react";
import useAllContest from "../../../../Hooks/useAllContest";
import useCreatorAllContest from "../../../../Hooks/useCreatorAllContest";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const ManageContest = () => {
  const axiosSecure = useAxiosSecure();
  const [allContest, refetch] = useAllContest();

  const handleContestDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#31C48D",
      cancelButtonColor: "#D61F69",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/id/${id}`).then((result) => {
          // console.log(result.data);
          if (result.data.deletedCount > 0) {
            refetch();
            Swal.fire("Removed!", "The Contest has been removed.", "success");
          }
        });
      }
    });
  };

  const handleContestConfirm = (id) => {
    axiosSecure
      .put(`/acceptSubmission/id/${id}`, {
        submission: "Accepted",
      })
      .then((card) => {
        console.log(card.data.modifiedCount);
        if (card.data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Confirm SUCCESSFULLY",
            showConfirmButton: false,
            timer: 1500,
          });
        }
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
      {" "}
      <div className="flex justify-evenly">
        <h2 className="text-2xl font-bold">
          Total Contest {allContest.length}
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
              <th>Status</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allContest?.map((item, idx) => (
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
                <td>
                  {item.submission == "Pending" ? (
                    <button
                      onClick={() => handleContestConfirm(item._id)}
                      className="btn bg-blue-400 btn-ghost btn-xs"
                    >
                      Confirm
                    </button>
                  ) : (
                    "Accepted"
                  )}
                </td>
                <th>
                  <Link to={`/update/id/${item._id}`}>
                    <button className="btn bg-blue-400 btn-ghost btn-xs">
                      Update
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleContestDelete(item._id)}
                    className="btn bg-pink-300 btn-ghost btn-xs"
                  >
                    Delete
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageContest;
