import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/admin_pages/dashboard"); // Redirect to the dashboard or any other default page
  }, [router]);

  return <div>Redirecting...</div>; // Optional loading state
}
