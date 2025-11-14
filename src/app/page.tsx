"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirector() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);

  return (
    <section>
      <html>
        <body>
          <h1>Redirecting...</h1>
        </body>
      </html>
    </section>
  );
}
