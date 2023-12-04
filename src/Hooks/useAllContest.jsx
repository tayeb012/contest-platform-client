import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllContest = () => {
  const axiosPublic = useAxiosPublic();
  // tanStack query
  const {
    data: allContest = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: [`allContestData`],
    queryFn: () => {
      const res = axiosPublic.get(`/allContest`).then((result) => {
        const data = result.data;
        return data;
      });
      //   console.log(res)
      return res;
    },
  });
  return [allContest, refetch, isLoading];
};

export default useAllContest;
