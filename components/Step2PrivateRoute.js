import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import axios from "axios"; // Axios'u import et

const Step2PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(["STEP2_TOKEN"]); // Dinamik cookie ismi
  const router = useRouter();

  // Client-side kontrol için bir state
  const [isClient, setIsClient] = useState(false);

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
          setIsClient(true);
        } else {
          console.error(response.status);

          router.push("/profile");
        }
      } catch (error) {
        console.error("Token doğrulama hatası:", error);
        removeCookie("STEP1_TOKEN");

        router.push("/"); // Hata durumunda ana sayfaya yönlendir
      }
    };

    // Cookie varsa ve client-side'daysak, token'ı doğrula
    if (cookies["STEP2_TOKEN"]) {
      verifyToken();
    }
  }, []);

  // Client-side kontrolü sağlamak ve server-side render ile uyumsuzluk olmamasını sağlamak için isClient kontrolü
  if (!isClient) {
    // Client-side olmadan önce bir şey render etme
    return null;
  }

  // Gerekli cookie varsa çocuk component'leri render et
  return cookies["STEP2_TOKEN"] ? children : null;
};

export default Step2PrivateRoute;
