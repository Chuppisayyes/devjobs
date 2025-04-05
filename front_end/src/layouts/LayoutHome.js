import React from "react";
import Navbar from "../components/auth/Navbar";
import Footer from "../components/auth/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="mt-20">
        <Outlet/>
      </main>
      <Footer />
    </>
  );
}

export default Layout;
