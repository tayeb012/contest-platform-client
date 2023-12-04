import React from "react";
import useUserData from "../../../../Hooks/useUserData";
import { Select } from "flowbite-react";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUser = () => {
  const [allUser, reload] = useUserData();
  const axiosSecure = useAxiosSecure();

  const handleUpdateRole = (id, roleValue) => {
    axiosSecure
      .patch(`/user/admin/${id}`, {
        role: roleValue,
        registeredCount: 0,
      })
      .then((res) => {
        console.log(res);
        reload();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${roleValue}`,
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("Error updating role:", error);
        // Handle error, show a message to the user, etc.
      });
  };

  const handleContestDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You wanna remove this user!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#31C48D",
      cancelButtonColor: "#D61F69",
      confirmButtonText: "Yes, Remove it!",
    })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure.delete(`/user/delete/admin/${id}`).then((result) => {
            // console.log(result.data);
            if (result.data.deletedCount > 0) {
              reload();
              Swal.fire("Removed!", "The User has been removed.", "success");
            }
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="flex justify-evenly">
        <h2 className="text-2xl font-bold">Total Contest {allUser.length}</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Name & Email</th>
              <th>Current Role</th>
              <th>Modify The Role</th>
              <th>Remove The User</th>
            </tr>
          </thead>
          <tbody>
            {allUser?.map((item, idx) => (
              <tr key={idx}>
                <th>
                  <label>{idx + 1}</label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.photoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.name}</div>
                      <div className="text-sm opacity-50">{item.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {item.role}
                  </span>
                </td>
                <td>
                  <Select
                    id="userRole"
                    required
                    defaultValue={item.role}
                    onChange={(e) => handleUpdateRole(item._id, e.target.value)}
                  >
                    <option value="NORMAL_USER">Normal_User</option>
                    <option value="ADMIN">Admin</option>
                    <option value="CREATOR">Creator</option>
                  </Select>
                </td>

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

export default ManageUser;
