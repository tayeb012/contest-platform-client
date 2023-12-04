import React from "react";
import useAdmin from "../Hooks/useAdmin";
import useAuth from "../Hooks/UseAuth";
import { Navigate, useLocation } from "react-router-dom";
import { CircleLoader } from "react-spinners";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, refetch, isAdminLoading] = useAdmin();
  const location = useLocation();
  if (loading || isAdminLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        {/* <Spinner className="h-96 w-96 my-12 text-[#1575C9]" /> */}
        <CircleLoader color="#36d7b7" size={250} />
      </div>
    );
  }
  if (user && isAdmin) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default AdminRoute;
