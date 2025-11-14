"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Redirector() {
  const router = useRouter();

  useEffect(() => {
    router.push("/home");
  }, []);

  return null;
}
