import Image from "next/image";
import Link from "next/link";
import Combobox from "../ui/combobox";

const Navbar = ({
  locale,
  currentPath,
}: {
  locale: string;
  currentPath: string;
}): JSX.Element => {
  const isActive = (path: string) => currentPath === path;

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
              isActive(`/leaderboard`) ? "border-b-2 border-green-500" : ""
            }`}
          >
            Leaderboard
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/pickems`}
            className={`hover:text-green-400 ${
              isActive(`/pickems`) ? "border-b-2 border-green-500" : ""
            }`}
          >
            Pickems
          </Link>
        </li>
        <li>
          <Link
            href={`/${locale}/login`}
            className={`hover:text-green-400 ${
              isActive(`/login`) ? "border-b-2 border-green-500" : ""
            }`}
          >
            Login
          </Link>
        </li>
      </ul>
      <Combobox key={"languages"} />
    </div>
  );
};

export default Navbar;
