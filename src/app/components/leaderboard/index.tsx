"use client";
import { GroupData } from "@/app/types";
import jwt from "jsonwebtoken";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import UserPicksSheet from "../user-picks-sheet";

export type Placement = {
  id: number;
  userUUID: string;
  username: string;
  points: number;
};

const LeaderboardTable = (): JSX.Element => {
  const [tableData, setTableData] = useState<Placement[]>([]);
  const [tablePage, setTablePage] = useState<number>(1);
  const [userPickems, setUserPickems] = useState<{
    groups: GroupData;
    thirdsToAdvance: GroupData;
  }>({ groups: {}, thirdsToAdvance: {} });
  const [selectedUserName, setSelectedUserName] = useState<string>("");
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const t = useTranslations("LeaderboardScreen");

  const jwtToken = process.env.NEXT_PUBLIC_JWT_SECRET;
  const token = jwt.sign({}, jwtToken!, {
    algorithm: "HS256",
  });

  useEffect(() => {
    fetch(
      `https://zpafftlifxzqrzuafugi.supabase.co/functions/v1/getLeaderboard?page=${tablePage}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setTableData(res);
      })
      .catch((e) => {
        console.error(e);
      });
  }, [tablePage]);

  const fetchUserPickems = (userUUID: string) => {
    fetch(
      `https://zpafftlifxzqrzuafugi.supabase.co/functions/v1/getGroupsScores?userUUID=${userUUID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        setUserPickems(res);
        setIsSheetOpen(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const handlePageChange = (page: number) => {
    setTablePage(page);
  };

  const handleTableRowClick = (userUUID: string, userName: string) => {
    setSelectedUserName(userName);
    fetchUserPickems(userUUID);
  };

  const podiumColor = (position: number): string => {
    if (tablePage === 1) {
      if (position === 1) return `yellow-500 text-2xl`;
      if (position === 2) return `neutral-400 text-2xl`;
      if (position === 3) return `amber-600 text-2xl`;
    }
    return "white text-xl";
  };

  const podiumEmoji = (position: number): string | number => {
    if (tablePage === 1) {
      if (position === 1) return `🥇`;
      if (position === 2) return `🥈`;
      if (position === 3) return `🥉`;
    }
    return position + ".";
  };

  return (
    <div className="rounded-xl border p-8 w-full sm:w-2/3">
      <table className="w-full ">
        <thead>
          <tr>
            <th className="w-1/6 text-green-400 font-semibold">#</th>
            <th className="w-4/6 text-green-400 font-semibold">
              {t("table.name")}
            </th>
            <th className="w-1/6 text-right text-green-400 font-semibold">
              {t("table.points")}
            </th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((place, i) => (
            <tr
              key={place.id}
              onClick={() =>
                handleTableRowClick(place.userUUID, place.username)
              }
              className={`hover:bg-neutral-700 cursor-pointer select-none ${
                i !== tableData.length - 1
                  ? "border-b border-neutral-600"
                  : null
              }`}
            >
              <td className={`text-center ${podiumColor(i + 1)} leading-loose`}>
                {podiumEmoji(i + 1)}
              </td>
              <td className="text-white">{place.username}</td>
              <td className={`text-right font-bold text-${podiumColor(i + 1)}`}>
                {place.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination className="justify-end">
        <PaginationContent>
          {tablePage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(tablePage - 1)}
                label={t("pagination.previous")}
              />
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationLink
              isActive={tablePage === 1}
              onClick={() => handlePageChange(1)}
            >
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              isActive={tablePage === 2}
              onClick={() => handlePageChange(2)}
            >
              2
            </PaginationLink>
          </PaginationItem>
          {tablePage !== 2 && (
            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(tablePage + 1)}
                label={t("pagination.next")}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
      <UserPicksSheet
        key={`user-picks-sheet`}
        isSheetOpen={isSheetOpen}
        setIsSheetOpen={setIsSheetOpen}
        pickems={userPickems}
        userName={selectedUserName}
      />
    </div>
  );
};

export default LeaderboardTable;
