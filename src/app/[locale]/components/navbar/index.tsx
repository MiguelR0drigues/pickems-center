"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { NavLink, useLocation } from "react-router-dom";
import Combobox from "../ui/combobox";

const Navbar = (): JSX.Element => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  const { locale } = useParams();
  return (
    <div className="flex flex-row items-center justify-between gap-0 w-11/12 md:gap-9">
      <Image
        src="/logo.png"
        alt="Logo"
        width={100}
        height={100}
        className="rounded"
      />
      <ul className="flex flex-row items-center justify-center gap-4 text-white text-lg font-bold mt-8 mb-8">
        <li>
          <NavLink
            to={`${locale}/`}
            className={`hover:text-green-400 ${
              isActive("/") ? "border-b-2 border-green-500" : ""
            }`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${locale}/leaderboard`}
            className={`hover:text-green-400 ${
              isActive("/leaderboard") ? "border-b-2 border-green-500" : ""
            }`}
          >
            Leaderboard
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`${locale}/pickems`}
            className={`hover:text-green-400 ${
              isActive("/pickems") ? "border-b-2 border-green-500" : ""
            }`}
          >
            Pickems
          </NavLink>
        </li>
      </ul>
      <Combobox key={"languages"} />
    </div>
  );
};

export default Navbar;
