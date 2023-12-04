import React from "react";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useUserData = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: allUser = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`usersData`],
    queryFn: () => {
      const res = axiosSecure
        .get(`/users`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem("access-token")}`,
          },
        })
        .then((result) => {
          const data = result.data;
          return data;
        });
      //   console.log(res)
      return res;
    },
  });
  return [allUser, reload, isLoading];
};

export default useUserData;
