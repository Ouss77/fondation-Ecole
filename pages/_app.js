import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";
import SideBar from "../src/components/SideBar";
import { AuthProvider, useLogin } from "../src/components/Context/AuthContext"; // Import AuthProvider
import { LanguageProvider } from "@/components/Context/LanguageContext";
import styles from "../src/styles/globals.css";

function MyApp({ Component, pageProps }) { 
  const { isAdmin, loading } = useLogin(); // Access authentication state
  const router = useRouter();
  const isAdminPage = router.pathname.includes("admin_pages");

  useEffect(() => {
    if (!loading && isAdminPage && !isAdmin ) {
      router.push("/login"); // Or router.replace("/admin_pages/login");
    }
  }, [isAdmin, loading,  isAdminPage, router]);

  if(loading) return <div>Loading...</div>;
  
  return (
    <>
      {!isAdminPage && <Header />}

      <div className="flex">
        {/* Admin Layout */}
        {isAdminPage && isAdmin && (
          <>
            <SideBar />
            <div className="p-4 ml-64">
              <Component {...pageProps} />
            </div>
          </>
        )}

        {/* Public Layout */}
        {!isAdminPage && (
          <div className="w-full">
            <Component {...pageProps} />
          </div>
        )}
      </div>

      {!isAdminPage && <Footer />}
    </>
  );
}

// Wrap MyApp with AuthProvider
export default function AppWithProvider(props) {
  return (
    <LanguageProvider> 
    <AuthProvider>
      <MyApp {...props} />
    </AuthProvider>
    </LanguageProvider >
  );
}
