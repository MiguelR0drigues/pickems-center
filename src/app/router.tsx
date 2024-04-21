"use client";
import Footer from "@/components/footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "../components/navbar";
import Home from "./screens/Home";
import Leaderboard from "./screens/Leaderboard";
import Pickems from "./screens/Pickems";
export default function Router() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-black ">
      <BrowserRouter>
        <Navbar />
        <div className="bg-neutral-800 w-11/12 min-h-full flex justify-center items-center p-20 rounded">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/pickems" element={<Pickems />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </main>
  );
}
