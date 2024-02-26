import React from "react";
import { Inter } from "next/font/google";
import Step2PrivateRoute from "@/components/Step2PrivateRoute";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const inter = Inter({ subsets: ["latin"] });
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios"; // Axios'u import et

export default function Page() {
  const [cookies] = useCookies(["STEP2_TOKEN"]); // Dinamik cookie ismi
  const router = useRouter();

  // Client-side kontrol için bir state
  const [isClient, setIsClient] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // verifyUser API endpoint'ine istek at
        const response = await axios.post(
          "http://localhost:3001/api/auth/verifyUser",
          {
            token: cookies["STEP2_TOKEN"],
          }
        );
        // Başarılı yanıt alınırsa, token geçerlidir
        if (response.status === 200) {
          alert("Token doğrulandı");
          setVerified(true);
        } else {
          console.error(response.status);
          alert("Response status:", response.status);
          router.push("/");
        }
      } catch (error) {
        console.error("Token doğrulama hatası:", error);
        router.push("/"); // Hata durumunda ana sayfaya yönlendir
      }
    };

    // Cookie varsa ve client-side'daysak, token'ı doğrula
    if (cookies["STEP2_TOKEN"]) {
      verifyToken();
    } else {
      router.push("/");
    }
  }, []);

  return verified ? (
    <>
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
    </>
  ) : null;
}
