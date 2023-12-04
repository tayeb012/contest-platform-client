import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./UseAuth";

const useRegisterContest = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: registerContest = [],
    refetch: reLoad,
    isLoading,
  } = useQuery({
    queryKey: [`registerContestData`, user?.email],
    queryFn: () => {
      const res = axiosSecure
        .get(`/registeredContest?email=${user.email}`)
        .then((result) => {
          const data = result.data;
          return data;
        });
      console.log("registerContestData response", res);
      return res;
    },
  });
  return [registerContest, reLoad, isLoading];
};

export default useRegisterContest;
