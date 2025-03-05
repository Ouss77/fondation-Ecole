import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SideBar from "../src/components/SideBar";
import { AuthProvider, useLogin } from "../src/components/Context/AuthContext";
import { LanguageProvider } from "@/components/Context/LanguageContext";
import styles from "../src/styles/globals.css";
import Loading from "@/components/Loading";

function MyApp({ Component, pageProps }) { 

  const { isAdmin, loading } = useLogin();
  const router = useRouter();
  const isAdminPage = router.pathname.startsWith("/admin_pages");

  useEffect(() => {
    if (!loading && isAdminPage && !isAdmin) {
      router.replace("/login"); 
    }
  }, [isAdmin, isAdminPage, router, loading ]); 
 
  if (loading) {
    return <Loading />;
  }
 
  return (
    <>
      {!isAdminPage && <Header />}
      <div className="flex">
        {isAdminPage && isAdmin ? (
          <div className="flex">
            <SideBar />
            <div className="p-4 flex-1 lg:ml-64">
              <Component {...pageProps} />
            </div>
          </div>
        ) : (
          <div className="w-full">
            <Component {...pageProps} />
          </div>
        )}
      </div>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default function AppWithProvider(props) {
  return (
    <LanguageProvider> 
      <AuthProvider>
        <MyApp {...props} />
      </AuthProvider>
    </LanguageProvider>
  );
}
