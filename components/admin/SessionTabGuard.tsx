"use client";

import { useEffect } from "react";

export function SessionTabGuard() {
  useEffect(() => {
    const handlePageHide = () => {
      navigator.sendBeacon("/api/admin/session-end");
    };

    window.addEventListener("pagehide", handlePageHide);
    return () => window.removeEventListener("pagehide", handlePageHide);
  }, []);

  return null;
}
