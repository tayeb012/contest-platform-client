import useAuth from "../../../Hooks/UseAuth";
import { Link, NavLink } from "react-router-dom";
import Swal from "sweetalert2";
import { RiCloseCircleLine } from "react-icons/ri";
import { BiMenuAltRight } from "react-icons/bi";
import { Dropdown } from "flowbite-react";
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from "react-icons/hi";

export const textColor =
  "bg-gradient-to-r from-[#4C53E8] to-[#04B1F3] text-transparent bg-clip-text";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("Sign-out successful.");
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "SIGN OUT SUCCESSFULLY",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const links = (
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

  const avatar = (
    <img
      className="relative inline-block h-6 w-6 rounded-md object-cover object-center border border-red-300"
      alt="User Avatar"
      src={user?.photoURL}
    />
  );

  return (
    <div className="fixed z-50 w-full">
      <div
        className={`glass text-purple-400 bg-blue-200 bg-opacity-20 backdrop-blur-lg transition-colors hover:text-scale-105 px-6 sm:px-10 py-2 relative`}
      >
        <div className="z-20 flex justify-between items-center">
          <h1 className={`${textColor} flex text-lg sm:text-2xl font-bold`}>
            <img
              className="w-8"
              src="https://as2.ftcdn.net/v2/jpg/06/61/85/79/1000_F_661857964_cTPW88FBKjiVKzIBMLQPpM761J1IsZtA.webp"
              alt="logo"
            />
            ContestCraft
          </h1>
          <div className="flex">
            <ul
              className={`z-20 absolute duration-12002
          
          ${open ? "top-12" : "-top-60"}
          right-6
            p-4 bg-[#F7E7CE] md:bg-transparent md:static flex flex-col md:flex-row gap-3 rounded-md sm:gap-8 list-none`}
            >
              {links}
            </ul>
          </div>
          <div className="z-50 flex gap-2 items-center">
            {user ? (
              <>
                <Dropdown
                  label={avatar}
                  color=""
                  className="z-20 text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                >
                  <Dropdown.Header
                    className="z-50
                  read-only text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    <span className="block text-sm">{user.displayName}</span>
                    <span className="block truncate text-sm font-medium">
                      {user.email}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item icon={HiViewGrid}>
                    <NavLink
                      to="/dashBoard/DashBoardEnjoy"
                      className={({ isActive, isPending }) =>
                        isPending
                          ? "pending"
                          : isActive
                          ? "text-[#FFFFFF] underline"
                          : ""
                      }
                    >
                      Dashboard
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    icon={HiLogout}
                    onClick={handleSignOut}
                    className=" text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    SING IN
                  </button>
                </Link>
              </>
            )}
            <div
              className="text-4xl md:hidden z-40"
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <RiCloseCircleLine></RiCloseCircleLine>
              ) : (
                <BiMenuAltRight></BiMenuAltRight>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
