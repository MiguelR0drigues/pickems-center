"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import "../../globals.css";

export default function Loading() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => {
      setTimeout(() => setLoading(false), 700); // Adjust the delay as needed
    };

    // Simulate route change start and complete
    handleStart();
    handleComplete();

    // Cleanup function to handle component unmount
    return () => {
      handleComplete();
    };
  }, [pathname]);

  return (
    <div className={`fullscreen-loader ${loading ? "" : "hidden"}`}>
      <PulseLoader color="#36d7b7" size={30} />
    </div>
  );
}
