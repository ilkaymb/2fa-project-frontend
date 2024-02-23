import { Inter } from "next/font/google";
import { BiUser } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const [cookies, setCookie, removeCookie] = useCookies(["STEP1_TOKEN"]); // userToken adında bir cookie yönetmek istiyorsunuz

  // Form submit fonksiyonu
  const handleSubmit = async () => {
    try {
      // Axios POST isteği ile login endpoint'ine kullanıcı bilgilerini gönder
      const response = await axios.post(
        "http://localhost:3001/api/auth/login",
        {
          username: userName,
          password: password,
        }
      );

      // API'den dönen yanıtı al ve kullan
      alert(response.data.message);
      let token = response.data.token;
      console.log(token);
      setCookie("STEP1_TOKEN", token, { path: "/", maxAge: 600 }); // Cookie olarak kaydet

      router.push("/verifyOTP");
    } catch (error) {
      // Hata yakalama
      alert(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <>
      <Header />
      <main className={`${inter.className}`}>
        <div className="bg-indigo-950 text-white h-[100vh] flex justify-center items-center">
          <div className="bg-indigo-900 border border-indigo-600 rounded-md px-6 py-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200 ">
            <h1 className="text-4xl text-white font-bold text-center mb-6">
              Login
            </h1>

            <form action="">
              <div className="relative my-4">
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  type="email"
                  className="block  w-full md:w-72 lg:w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent  select:bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-indigo-500 focus:outline-none focus:right-0 focus:text-white focus:border-indigo-600 peer"
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  placeholder=""
                >
                  Your Email
                </label>
                <BiUser className="absolute top-4 right-4" />
              </div>
              <div className="relative my-4">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="block  w-full md:w-72 lg:w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-white appearance-none dark:text-white dark:border-white dark:focus:border-indigo-500 focus:outline-none focus:right-0 focus:text-white focus:border-indigo-600 peer"
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  placeholder=""
                >
                  Your Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
              </div>
              <div className="flex justify-end items-center">
                <Link
                  href=""
                  className="hover:text-indigo-500 transition-colors duration-300"
                >
                  Forgot Password?
                </Link>
              </div>
              <button
                onClick={handleSubmit} //
                className="w-full mb-4 text-[18px] mt-6 rounded-lg bg-white text-indigo-900 hover:bg-indigo-600 hover:text-white py-2 transition-colors duration-300"
                type="button"
              >
                Login
              </button>
              <div className=" w-full text-center">
                <span className="m-4 text-gray-400">
                  New Here?{" "}
                  <Link
                    href="/register"
                    className="hover:text-indigo-500 transition-colors duration-300 text-white"
                  >
                    Create an Account
                  </Link>{" "}
                </span>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
