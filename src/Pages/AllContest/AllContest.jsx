import { Helmet } from "react-helmet-async";
import useAllContest from "../../Hooks/useAllContest";
import ForMap from "../../Component/ForMap/ForMap";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { useState } from "react";
import "react-tabs/style/react-tabs.css";
import { useParams } from "react-router-dom";

const AllContest = () => {
  const Categories = [
    "all",
    "business contest",
    "article writing",
    "medical contest",
    "gaming",
    "coding challenge",
  ];
  const [allContest] = useAllContest();
  const { category } = useParams();
  const initialIndex = Categories.indexOf(category);
  const [tabIndex, setTabIndex] = useState(initialIndex || 0);
  // console.log(allContest);

  const withoutPending = allContest?.filter(
    (item) => item?.submission !== "Pending"
  );

  // console.log("withoutPending", withoutPending);

  const Business = withoutPending?.filter(
    (item) => item.contestType === "Business Contest"
  );
  const Article = withoutPending?.filter(
    (item) => item.contestType === "Article Writing"
  );
  const Medical = withoutPending?.filter(
    (item) => item.contestType === "Medical Contest"
  );
  const Gaming = withoutPending?.filter(
    (item) => item.contestType === "Gaming"
  );
  const Coding = withoutPending?.filter(
    (item) => item.contestType === "Coding Challenge"
  );

  return (
    <div className="py-20">
      <div className="mx-28">
        <Helmet>
          <title>All Contest - ContestCraft</title>
        </Helmet>{" "}
        <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
          <TabList className="rounded-md bg-purple-400 w-fit place-items-center justify-center">
            <Tab>All</Tab>
            <Tab>Business</Tab>
            <Tab>Article</Tab>
            <Tab>Medical</Tab>
            <Tab>Gaming</Tab>
            <Tab>Coding</Tab>
          </TabList>
          <TabPanel>
            {withoutPending && <ForMap items={withoutPending}></ForMap>}
          </TabPanel>
          <TabPanel>
            {withoutPending && <ForMap items={Business}></ForMap>}
          </TabPanel>
          <TabPanel>
            {withoutPending && <ForMap items={Article}></ForMap>}
          </TabPanel>
          <TabPanel>
            {withoutPending && <ForMap items={Medical}></ForMap>}
          </TabPanel>
          <TabPanel>
            {withoutPending && <ForMap items={Gaming}></ForMap>}
          </TabPanel>
          <TabPanel>
            {withoutPending && <ForMap items={Coding}></ForMap>}
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

export default AllContest;
