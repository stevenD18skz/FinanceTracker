import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// IMPORTACIÓN DE COMPONENTES
import Layout from "./components/Layout";

// IMPORTACIÓN DE PÁGINAS
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.tsx";

// CRUDS
import TransactionPage from "./pages/crud/TransactionPage.tsx";
import SubscriptionPage from "./pages/crud/SubscriptionPage.tsx";
import PlanningGoalsPage from "./pages/crud/PlanningGoalsPage.tsx";
import WalletPage from "./pages/crud/WalletPage.tsx";

//CONTEXT AND HOOKS

import PropTypes from "prop-types";

const PrivateRoute = ({ element }) => {
  const user = true;
  return user ? element : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirección inicial */}
        <Route path="/" element={<Navigate to="/Dashboard" />} />

        {/* Página de inicio de sesión */}
        <Route path="login" element={<LoginForm />} />

        {/* Rutas protegidas */}
        <Route path="/" element={<Layout />}>
          {/* Página principal */}
          <Route
            path="Dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />

          {/* Páginas Individuales*/}
          <Route
            path="wallets"
            element={<PrivateRoute element={<WalletPage />} />}
          />
          <Route
            path="transactions"
            element={<PrivateRoute element={<TransactionPage />} />}
          />
          <Route
            path="subscriptions"
            element={<PrivateRoute element={<SubscriptionPage />} />}
          />
          <Route
            path="planning-goals"
            element={<PrivateRoute element={<PlanningGoalsPage />} />}
          />

          {/* Páginas Usuario*/}
          <Route
            path="profile"
            element={<PrivateRoute element={<Profile />} />}
          />
          <Route
            path="settings"
            element={<PrivateRoute element={<Settings />} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
