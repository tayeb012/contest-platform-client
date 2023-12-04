import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import AllContest from "../Pages/AllContest/AllContest";
import OneContestDetails from "../Component/OneContestDetails/OneContestDetails";
import UpDateContest from "../Pages/UpDateContest/UpDateContest";
import DashBoard from "../Pages/DashBoard/DashBoard";
import MyRegisterContest from "../Pages/DashBoard/MyRegisterContest/MyRegisterContest";
import MyWinningContest from "../Pages/DashBoard/MyWinningContest/MyWinningContest";
import MyProfile from "../Pages/DashBoard/MyProfile/MyProfile";
import AddContest from "../Pages/DashBoard/CreaorBord/AddContest/AddContest";
import CreatedContest from "../Pages/DashBoard/CreaorBord/CreatedContest/CreatedContest";
import ContestSubmitted from "../Pages/DashBoard/CreaorBord/ContestSubmitted/ContestSubmitted";
import ManageUser from "../Pages/DashBoard/AdminBord/ManageUser/ManageUser";
import ManageContest from "../Pages/DashBoard/AdminBord/ManageContest/ManageContest";
import PrivetRoute from "./PrivetRoute";
import AdminRoute from "./AdminRoute";
import CreatorRoute from "./CreatorRoute";
import Payment from "../Component/Payment/Payment";
import DashBoardEnjoy from "../Pages/DashBoard/DashBoardEnjoy/DashBoardEnjoy";

const MainRoute = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/all-contest/:category",
        element: <AllContest />,
      },
      {
        path: "/contest-details/:id",
        element: (
          <PrivetRoute>
            {" "}
            <OneContestDetails />
          </PrivetRoute>
        ),
      },
      {
        path: "/update/id/:id",
        element: (
          <PrivetRoute>
            {" "}
            <UpDateContest />
          </PrivetRoute>
        ),
      },
    ],
  },
  {
    path: "/dashBoard",
    element: (
      <PrivetRoute>
        <DashBoard />
      </PrivetRoute>
    ),
    children: [
      {
        path: "DashBoardEnjoy",
        element: <DashBoardEnjoy />,
      },
      {
        path: "registeredContest",
        element: <MyRegisterContest />,
      },
      {
        path: "payment/:contestPrice",
        element: <Payment />,
      },
      {
        path: "winningContest",
        element: <MyWinningContest />,
      },
      {
        path: "profile",
        element: <MyProfile />,
      },

      {
        path: "addContest",
        element: (
          <CreatorRoute>
            {" "}
            <AddContest />
          </CreatorRoute>
        ),
      },
      {
        path: "createdContest",
        element: (
          <CreatorRoute>
            {" "}
            <CreatedContest />
          </CreatorRoute>
        ),
      },
      {
        path: "contestSubmitted",
        element: (
          <CreatorRoute>
            {" "}
            <ContestSubmitted />
          </CreatorRoute>
        ),
      },
      {
        path: "manageUser",
        element: (
          <AdminRoute>
            <ManageUser />
          </AdminRoute>
        ),
      },
      {
        path: "manageContest",
        element: (
          <AdminRoute>
            {" "}
            <ManageContest />
          </AdminRoute>
        ),
      },
    ],
  },
]);

export default MainRoute;
