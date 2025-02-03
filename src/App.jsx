import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// IMPORTACIÓN DE COMPONENTES
import Layout from "./components/Layout";

// IMPORTACIÓN DE PÁGINAS
import LoginForm from "./pages/Login";
import Dashboard from "./pages/Dashboard.jsx";

import WalletPage from "./pages/WalletPage.tsx";
import TransactionPage from "./pages/TransactionPage.tsx";
import SubscriptionPage from "./pages/SubscriptionPage.tsx";
import PlanningGoalsPage from "./pages/PlanningGoalsPage.tsx";

import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.tsx";

//CONTEXT AND HOOKS
import { AuthProvider } from "./context/AuthContext.jsx";
import { useAuth } from "./context/AuthContext.jsx";

const PrivateRoute = ({ element }) => {
  const { user } = useAuth();
  return user ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
