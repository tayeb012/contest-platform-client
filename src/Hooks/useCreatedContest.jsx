import { useQuery } from "@tanstack/react-query";
import useAuth from "./UseAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCreatedContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: createdContest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`addedContestData`, user?.email],
    queryFn: () => {
      const res = axiosSecure
        .get(`/addedContest?email=${user.email}`)
        .then((result) => {
          const data = result.data;
          return data;
        });
        // console.log(res)
      return res;
    },
  });
  return [createdContest, refetch, isLoading];
};

export default useCreatedContest;
