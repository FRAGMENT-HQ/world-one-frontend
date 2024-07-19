import HomeExchangeCurrency from "@/components/HomeExchangeCurrency";
import {useEffect} from "react";
import { useRouter } from "next/router";
export default function Home() {
  // useEffect(() => {
  //   const router = useRouter();
  //   // router.push("/rates-new");
  //   // get current route
  //   console.log(router.pathname);
  //   if (router.pathname === "/") {
  //     router.push(router.pathname);
  //   }
  // }, []);
  const router = useRouter();
  useEffect(() => {
    
    // router.push("/rates-new");
    // get current route
    console.log(router.pathname);
    if (router.pathname !== "/") {
      router.push(router.pathname);
    }
  }, [])
  
  return (
    <>
      <HomeExchangeCurrency />
    </>
  );
}
