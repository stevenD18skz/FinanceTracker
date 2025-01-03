import React from "react";
import { Outlet } from "react-router-dom"; // Importa Outlet
import Sidebar from "./SideBar"; // Ajusta la ruta según sea necesario

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1 }}>
        <main>
          <Outlet /> {/* Aquí se renderizan las rutas hijas */}
        </main>
        <footer>
          <p>&copy; 2023 Finance Tracker</p>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
