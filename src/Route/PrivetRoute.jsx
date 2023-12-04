import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import { CircleLoader } from "react-spinners";

const PrivetRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        {/* <Spinner className="h-96 w-96 my-12 text-[#1575C9]" /> */}
        <CircleLoader color="#36d7b7" size={250} />
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default PrivetRoute;
