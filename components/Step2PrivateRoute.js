import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const Step2PrivateRoute = ({ children }) => {
  const [cookies] = useCookies(["STEP2_TOKEN"]); // Dinamik cookie ismi
  const router = useRouter();

  // Client-side kontrol için bir state
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Component mount edildiğinde client-side olduğunu belirle
    setIsClient(true);

    // Dinamik olarak belirlenen cookie yoksa ve client-side'daysak, ana sayfaya yönlendir
    if (!cookies["STEP2_TOKEN"]) {
      router.push("/");
    }
  }, [cookies, router, isClient]); // tokenName ve isClient'i bağımlılıklara ekle

  // Client-side kontrolü sağlamak ve server-side render ile uyumsuzluk olmamasını sağlamak için isClient kontrolü
  if (!isClient) {
    // Client-side olmadan önce bir şey render etme
    return null;
  }

  // Gerekli cookie varsa çocuk component'leri render et
  return cookies["STEP2_TOKEN"] ? children : null;
};

export default Step2PrivateRoute;
