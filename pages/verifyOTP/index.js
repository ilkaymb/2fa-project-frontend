import { Inter } from "next/font/google";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
const inter = Inter({ subsets: ["latin"] });
import { useCookies } from "react-cookie";

export default function Home() {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies([
    "STEP1_TOKEN",
    "STEP2_TOKEN",
  ]);
  const verifyOTP = async (e) => {
    try {
      console.log(cookies);
      const response = await axios.post(
        "http://localhost:3001/api/auth/verifyOTP",
        {
          otp: otp,
          token: cookies.STEP1_TOKEN,
        }
      );
      let token = response.data.token;

      setCookie("STEP2_TOKEN", token, { path: "/", maxAge: 3600 }); // Cookie olarak kaydet

      removeCookie("STEP1_TOKEN");
      // alert(response.data.message);
      console.error("response", response.data.message);
      router.push("/profile");
    } catch (error) {
      setError("OTP is incorrect. Please try again."); // Hata mesajını güncelle
    }
  };
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // verifyUser API endpoint'ine istek at
        const response = await axios.post(
          "http://localhost:3001/api/auth/verifyUser",
          {
            token: cookies["STEP1_TOKEN"],
          }
        );
        // Başarılı yanıt alınırsa, token geçerlidir
        if (response.status === 200) {
          //   alert("Token doğrulandı");
          setVerified(true);
        } else {
          console.error(response.status);
          //  alert("Response status:", response.status);
          router.push("/");
        }
      } catch (error) {
        console.error("Token doğrulama hatası:", error);
        router.push("/");
      }
    };

    if (cookies["STEP1_TOKEN"]) {
      verifyToken();
    } else {
      router.push("/");
    }
  }, []);

  return verified ? (
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
  ) : null;
}
