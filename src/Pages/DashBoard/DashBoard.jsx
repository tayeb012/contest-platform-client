import { NavLink, Outlet } from "react-router-dom";
import { textColor } from "../../Component/Shared/Navbar/Navbar";
import useUserData from "../../Hooks/useUserData";
import useRegisterContest from "../../Hooks/useRegisterContest";
import useAdmin from "../../Hooks/useAdmin";
import useCreator from "../../Hooks/useCreator";

const DashBoard = () => {
  const [isAdmin] = useAdmin();
  const [isCreator] = useCreator();
  const [registerContest] = useRegisterContest();

  const WinnedContest = registerContest?.filter(
    (item) => item?.states === "Winner"
  );

  const userLinks = (
    <>
      <li className="relative">
        <NavLink
          to="/dashBoard/registeredContest"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          My Registered Contest
        </NavLink>
        <p className="rounded-full -right-10 bg-red-200 text-purple-600 absolute">
          {registerContest.length}
        </p>
      </li>
      <li>
        <NavLink
          to="/dashBoard/winningContest"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          My Winning Contest
        </NavLink>
        <p className="rounded-full -right-10 bg-red-200 text-purple-600 absolute">
          {WinnedContest.length}
        </p>
      </li>
      <li>
        <NavLink
          to="/dashBoard/profile"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          My Profile
        </NavLink>
      </li>
    </>
  );

  const creatorLinks = (
    <>
      <li>
        <NavLink
          to="/dashBoard/addContest"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          Add Contest
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashBoard/createdContest"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          My Created Contest
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashBoard/contestSubmitted"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          Contest Submitted
        </NavLink>
      </li>
    </>
  );
  const adminLinks = (
    <>
      <li>
        <NavLink
          to="/dashBoard/manageUser"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          Manage User
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashBoard/manageContest"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          Manage Contest
        </NavLink>
      </li>
    </>
  );

  const linksMain = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="DashBoardEnjoy"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          Dash Board
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-contest/all"
          className={({ isActive, isPending }) =>
            isPending ? "pending" : isActive ? `${textColor} font-bold ` : ""
          }
        >
          All Contest
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="flex">
      <div className="drawer lg:drawer-open w-3/12">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side h-screen bg-base-200 pr-10">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 text-base-content text-xl font-bold">
            {isAdmin
              ? adminLinks
              : isCreator
              ? // Render creator links if the user is a creator
                creatorLinks
              : // Render user links if the user is neither an admin nor a creator
                userLinks}
          </ul>

          <div className="divider"></div>
          <ul className="menu p-4 text-base-content text-xl font-bold">
            {/* Sidebar content here */}
            {linksMain}
          </ul>
        </div>
      </div>
      <div className="bg-slate-200 w-9/12">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
