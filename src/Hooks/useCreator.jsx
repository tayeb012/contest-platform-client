import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./UseAuth";
import { useQuery } from "@tanstack/react-query";

const useCreator = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: isCreator,
    refetch,
    isPending: isCreatorLoading,
  } = useQuery({
    queryKey: ["isCreator", user?.email], // Corrected the queryKey
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/creator/${user?.email}`);
      console.log(res.data);
      return res.data?.creator;
    },
  });

  return [isCreator, refetch, isCreatorLoading];
};

export default useCreator;
