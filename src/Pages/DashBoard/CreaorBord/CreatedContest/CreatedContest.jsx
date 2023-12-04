import React from "react";
import useCreatedContest from "../../../../Hooks/useCreatedContest";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const CreatedContest = () => {
  const [createdContest, refetch] = useCreatedContest();
  const axiosSecure = useAxiosSecure();

  const handleDeleteCreatedContest = (id) => {
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
        axiosSecure.delete(`/deleteCreatedContest/id/${id}`).then((result) => {
          // console.log(result.data);
          if (result.data.deletedCount > 0) {
            refetch();
            Swal.fire("Removed!", "The Contest has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-2xl font-bold">
          Total Register {createdContest.length}
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
            {createdContest?.map((item, idx) => (
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
                <td>{item.submission}</td>
                <th>
                  <Link
                    to={
                      item.submission === "Accepted"
                        ? ""
                        : `/update/id/${item._id}`
                    }
                  >
                    <button
                      disabled={item.submission === "Accepted"}
                      className="btn bg-blue-400 btn-ghost btn-xs"
                    >
                      Update
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    disabled={item.submission === "Accepted"}
                    onClick={() => handleDeleteCreatedContest(item._id)}
                    className="btn bg-red-400 btn-ghost btn-xs"
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

export default CreatedContest;
