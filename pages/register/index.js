import Image from "next/image";
import { Inter } from "next/font/google";
import { BiUser, BiMailSend } from "react-icons/bi";
import { AiOutlineUnlock } from "react-icons/ai";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = axios.post("http://localhost:3001/api/auth/register", {
        username: userName,
        email: email,
        password: password,
      });
      const data = await response;
      alert(data.data.message);
      router.push("/");

      // Burada başarılı kayıt sonrası işlemler yapılabilir, örneğin login sayfasına yönlendirme
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <Header />
      <main className={`${inter.className}`}>
        <div className="bg-indigo-950  text-white h-[100vh] flex justify-center items-center">
          <div className="bg-indigo-800 border border-indigo-600 rounded-md px-6 py-8 shadow-lg backdrop-filter backdrop-blur-lg bg-opacity-30 relative transition-all duration-200">
            <h1 className="text-4xl text-white font-bold text-center mb-6">
              Register
            </h1>
            <form action="">
              <div className="relative my-4">
                <input
                  onChange={(e) => setUserName(e.target.value)}
                  type="email"
                  className="block w-full md: w-full md:w-72 lg:w-72 lg: w-full md:w-72 lg:w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-indigo-500  focus:outline-none focus:right-0 focus:text-white focus:border-indigo-600 peer"
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  placeholder=""
                >
                  Username
                </label>
                <BiUser className="absolute top-4 right-4" />
              </div>
              <div className="relative my-4">
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="block w-full md: w-full md:w-72 lg:w-72 lg: w-full md:w-72 lg:w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-indigo-500  focus:outline-none focus:right-0 focus:text-white focus:border-indigo-600 peer"
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  placeholder=""
                >
                  Your Email
                </label>
                <BiMailSend className="absolute top-4 right-4" />
              </div>
              <div className="relative my-4">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  className="block  w-full md: w-full md:w-72 lg:w-72 lg: w-full md:w-72 lg:w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-indigo-600 focus:outline-none focus:right-0 focus:text-white focus:border-indigo-600 peer"
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  placeholder=""
                >
                  Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
              </div>
              <div className="relative my-4">
                <input
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  className="block  w-full md:w-72 lg:w-72 py-2.5 px-0 text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-white dark:focus:border-indigo-500  focus:outline-none focus:right-0 focus:text-white focus:border-indigo-600 peer"
                />
                <label
                  htmlFor=""
                  className="absolute text-sm text-white duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-indigo-600 peer-focus:dark:text-indigo-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  placeholder=""
                >
                  Confirm Password
                </label>
                <AiOutlineUnlock className="absolute top-4 right-4" />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full mb-4 text-[18px] mt-6 rounded-lg bg-white text-indigo-800 hover:bg-indigo-600 hover:text-white py-2 transition-colors duration-300"
                type="button"
              >
                Register
              </button>
              <div>
                <span className="m-4 text-gray-400">
                  Already Create an Account?{" "}
                  <Link
                    href="/"
                    className="hover:text-indigo-500 text-white  transition-colors duration-300"
                  >
                    Login
                  </Link>
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
