import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

const PrivateRoute = ({ children, tokenName = "STEP1_TOKEN" }) => {
  const [cookies] = useCookies([tokenName]); // Dinamik cookie ismi
  const router = useRouter();

  // Client-side kontrol için bir state
  const [isClient, setIsClient] = useState(false);
  console.log(tokenName);
  console.log(cookies[tokenName]);

  useEffect(() => {
    // Component mount edildiğinde client-side olduğunu belirle
    setIsClient(true);

    // Dinamik olarak belirlenen cookie yoksa ve client-side'daysak, ana sayfaya yönlendir
    if (!cookies[tokenName]) {
      router.push("/");
    }
  }, [cookies, router, tokenName, isClient]); // tokenName ve isClient'i bağımlılıklara ekle

  // Client-side kontrolü sağlamak ve server-side render ile uyumsuzluk olmamasını sağlamak için isClient kontrolü
  if (!isClient) {
    // Client-side olmadan önce bir şey render etme
    return null;
  }

  // Gerekli cookie varsa çocuk component'leri render et
  return cookies[tokenName] ? children : null;
};

export default PrivateRoute;
