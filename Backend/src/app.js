import express, { json } from "express";
import { corsMiddleware } from "./middlewares/cors.js";

import planningGoalRoutes from "./routes/planningGoalRoutes.mjs";
import subscriptionRoutes from "./routes/subscriptionRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middlewares
app.use(json());
app.use(corsMiddleware());
app.disable("x-powered-by");

// Rutas
app.use("/api/planning-goals", planningGoalRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/user", userRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
