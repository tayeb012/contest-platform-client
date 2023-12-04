import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./UseAuth";
import { useQuery } from "@tanstack/react-query";

const useRegisteredUserOfCreator = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const {
    data: registeredContestOFCreator = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`registerContesUserData`, user?.email],
    queryFn: () => {
      const res = axiosSecure
        .get(`/registeredUserOfCreator?email=${user.email}`)
        .then((result) => {
          const data = result.data;
          return data;
        });
      console.log("registerContestData response", res);
      return res;
    },
  });
  return [registeredContestOFCreator, refetch, isLoading];
};

export default useRegisteredUserOfCreator;
