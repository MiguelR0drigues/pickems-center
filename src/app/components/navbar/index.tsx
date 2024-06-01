"use client";
import { useUser } from "@/app/contexts/UserContext";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AuthPopover from "../auth-popover";
import LogoutPopover from "../logout-popover";
import Combobox from "../ui/combobox";

const Navbar = ({ locale }: { locale: string }): JSX.Element => {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const { user } = useUser();

  console.log(user);

  return (
    <div className="flex flex-row items-center justify-between gap-2 w-max mr-2 ml-2 sm:gap-9 sm:w-11/12">
      <Link href={`/${locale}`}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="rounded max-w-12 sm:max-w-max"
        />
      </Link>

      <ul className="flex flex-row items-center justify-center gap-4 text-white text-sm sm:text-lg font-bold mt-8 mb-8">
        <li>
          <Link
            href={`/${locale}`}
            className={`hover:text-green-400 ${
              isActive(`/${locale}`) ? "border-b-2 border-green-500" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/leaderboard`}
            className={`hover:text-green-400 ${
              isActive(`/${locale}/leaderboard`)
                ? "border-b-2 border-green-500"
                : ""
            }`}
          >
            Leaderboard
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/pickems`}
            className={`hover:text-green-400 ${
              isActive(`/${locale}/pickems`)
                ? "border-b-2 border-green-500"
                : ""
            }`}
          >
            Pickems
          </Link>
        </li>
      </ul>
      <div className="flex gap-2 items-center">
        {user && user.email ? <LogoutPopover /> : <AuthPopover />}
        <Combobox key={"languages"} />
      </div>
    </div>
  );
};

export default Navbar;
