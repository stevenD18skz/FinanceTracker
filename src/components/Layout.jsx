import React from "react";
import { Outlet } from "react-router-dom"; // Importa Outlet
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div style={{ flex: 1 }}>
        <main>
          <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </main>
      </div>
    </div>
  );
};

export default Layout;
