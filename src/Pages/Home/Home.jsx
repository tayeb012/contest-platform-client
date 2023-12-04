import React from "react";
import { Helmet } from "react-helmet-async";
import PopularSection from "./PopularSection/PopularSection";
import Banner from "./Banner/Banner";
import BestContestCreator from "./bestContestCreator/bestContestCreator";

const Home = () => {
  return (
    <div className="py-10">
      <Helmet>
        <title>Home - ContestCraft</title>
      </Helmet>
      <Banner></Banner>
      <PopularSection></PopularSection>
      <BestContestCreator></BestContestCreator>
    </div>
  );
};

export default Home;
