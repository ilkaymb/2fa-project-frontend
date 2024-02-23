import { Inter } from "next/font/google";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
import { useCookies } from "react-cookie";
import Step1PrivateRoute from "@/components/Step1PrivateRoute";

export default function Home() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState(""); // Hata mesajları için durum

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies([
    "STEP1_TOKEN",
    "STEP2_TOKEN",
  ]); // userToken adında bir cookie yönetmek istiyorsunuz
  useEffect(() => {
    if (!cookies.STEP1_TOKEN) {
      router.push("/");
    }
    if (cookies.STEP2_TOKEN) {
      router.push("/");
    }
  }, [cookies, router]);

  const verifyOTP = async (e) => {
    try {
      console.log(cookies);
      const response = await axios.post(
        "http://localhost:3001/api/auth/verifyOTP",
        {
          otp: otp,
          STEP1_TOKEN: cookies.STEP1_TOKEN,
        }
      );
      let token = response.data.token;

      setCookie("STEP2_TOKEN", token, { path: "/", maxAge: 3600 }); // Cookie olarak kaydet

      removeCookie("STEP1_TOKEN");
      alert(response.data.message);

      router.push("/profile");
    } catch (error) {
      setError("OTP is incorrect. Please try again."); // Hata mesajını güncelle
    }
  };

  return (
    <Step1PrivateRoute>
      <main className={`${inter.className}`}>
        <div className="bg-indigo-950 text-white h-[100vh] flex justify-center items-center">
          <div className="bg-indigo-900 border border-indigo-600 rounded-md px-6 py-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
            <form className="otp-form w-full sm:w-[300px] md:w-[300px] lg:w-[300px]">
              <h1 className="text-2xl text-center mb-4 font-bold capitalize">
                OTP has been sent to your email
              </h1>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                required
                className="w-full p-3  mb-6 rounded-t-md  text-black  border-0 border-b-2 border-white appearance-none dark:text-black dark:border-white dark:focus:border-indigo-500 focus:outline-none focus:right-0 focus:text-black focus:border-indigo-600 peer"
              />
              <p className="text-sm text-gray-200">
                {" "}
                *Please check your spam folder if you don{"'"}t see the email in
                your inbox.
              </p>

              <button
                type="button"
                className="w-full mb-4 text-[18px] mt-6 rounded-lg bg-white text-indigo-900 hover:bg-indigo-600 hover:text-white py-2 transition-colors duration-300"
                onClick={verifyOTP}
              >
                Verify OTP
              </button>
              {error && <p className="error-msg">{error}</p>}
            </form>
          </div>
        </div>
      </main>
    </Step1PrivateRoute>
  );
}
