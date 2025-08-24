import { Outlet } from "react-router-dom"; // Importa Outlet
import NavBar from "./NavBar";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div className="pt-16">
        <div className="relative bg-[--background-page]">
          {/* Hero / background grande que "entra" debajo del navbar */}
          <div className="absolute inset-x-0 top-0 h-32 bg-[--background-layout] z-10" />

          {/* Main: contenido real. -mt ajusta cuánto se solapa con el navbar/hero */}
          <main className="relative z-40 max-w-[110rem] mx-auto px-4 -mt-10 md:-mt-16 ">
            {/* Aquí va <Outlet /> o children */}
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
