import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useCreatorAllContest = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: creatorAllContest = [],
    refetch: reload,
    isLoading,
  } = useQuery({
    queryKey: [`allContestCreatorData`],
    queryFn: () => {
      const res = axiosSecure.get(`/addedContest/admin`).then((result) => {
        const data = result.data;
        return data;
      });
      //   console.log(res)
      return res;
    },
  });
  return [creatorAllContest, reload, isLoading];
};

export default useCreatorAllContest;
