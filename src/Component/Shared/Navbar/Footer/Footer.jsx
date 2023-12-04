import React from "react";
import { Link, NavLink } from "react-router-dom";
import { textColor } from "../Navbar";

const Footer = () => {
  return (
    <div>
      <footer className="glass text-purple-400 bg-blue-200 bg-opacity-20 backdrop-blur-lg transition-colors shadow mt-10">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <h1 className={`${textColor} flex text-lg sm:text-2xl font-bold`}>
              <img
                className="w-8"
                src="https://as2.ftcdn.net/v2/jpg/06/61/85/79/1000_F_661857964_cTPW88FBKjiVKzIBMLQPpM761J1IsZtA.webp"
                alt="logo"
              />
              ContestCraft
            </h1>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <NavLink
                  to="/all-contest/all"
                  className={({ isActive, isPending }) =>
                    isPending
                      ? "pending"
                      : isActive
                      ? `${textColor} font-bold `
                      : ""
                  }
                >
                  All Contest
                </NavLink>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              ContestCraft
            </Link>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
