import React from "react";
import { Inter } from "next/font/google";
import Step2PrivateRoute from "@/components/Step2PrivateRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });

export default function index() {
  return (
    <Step2PrivateRoute>
      <Header />
      <main className={`${inter.className}`}>
        <div className="bg-indigo-950 text-white h-[100vh] flex justify-center items-center">
          <div className="bg-indigo-800 border border-indigo-600 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
            <h1 className="text-4xl text-white font-bold text-center ">
              Profile Page
            </h1>
          </div>{" "}
        </div>
      </main>
      <Footer />
    </Step2PrivateRoute>
  );
}
