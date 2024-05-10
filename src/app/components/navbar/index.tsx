"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import Combobox from "../ui/combobox";

const Navbar = (): JSX.Element => {
  const location = usePathname();
  const isActive = (path: string) => location === path;
  const { locale } = useParams();
  return (
    <div className="flex flex-row items-center justify-between gap-0 w-11/12 md:gap-9">
      <Link href={`${locale}`}>
        <Image
          src="/logo.png"
          alt="Logo"
          width={100}
          height={100}
          className="rounded"
        />
      </Link>
      <ul className="flex flex-row items-center justify-center gap-4 text-white text-lg font-bold mt-8 mb-8">
        <li>
          <Link
            href={`/`}
            className={`hover:text-green-400 ${
              isActive(`/${locale}`) ? "border-b-2 border-green-500" : ""
            }`}
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            href={`${locale}/leaderboard`}
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
            href={`/pickems`}
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
      <Combobox key={"languages"} />
    </div>
  );
};

export default Navbar;
