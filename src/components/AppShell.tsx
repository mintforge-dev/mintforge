"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <Navbar onMenuClick={() => setSidebarOpen((o) => !o)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div
        style={{
          paddingTop: "60px",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <main style={{ flex: 1 }}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}
