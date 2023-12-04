import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/UseAuth";
import useCreator from "../Hooks/useCreator";
import { CircleLoader } from "react-spinners";

const CreatorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isCreator, refetch, isCreatorLoading] = useCreator();
  const location = useLocation();
  if (loading || isCreatorLoading) {
    return (
      <div className=" flex justify-center items-center h-screen">
        {/* <Spinner className="h-96 w-96 my-12 text-[#1575C9]" /> */}
        <CircleLoader color="#36d7b7" size={250} />
      </div>
    );
  }
  if (user && isCreator) {
    return children;
  }

  return <Navigate state={location.pathname} to="/login"></Navigate>;
};

export default CreatorRoute;
