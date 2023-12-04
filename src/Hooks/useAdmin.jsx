import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: isAdmin,
    refetch,
    isPending: isAdminLoading,
  } = useQuery({
    queryKey: ["isAdmin", user?.email], // Corrected the queryKey
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/admin/${user?.email}`);
      console.log(res.data);
      return res.data?.admin;
    },
  });

  return [isAdmin, refetch, isAdminLoading];
};

export default useAdmin;
