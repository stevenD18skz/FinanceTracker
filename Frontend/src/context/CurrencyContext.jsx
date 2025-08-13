// src/context/CurrencyContext.js
import { createContext, useState, useContext } from "react";
import { currencies } from "../types/currency"; // Asegúrate que la ruta sea correcta

import PropTypes from "prop-types";

// 1. Creamos el contexto
const CurrencyContext = createContext();

CurrencyContext.propTypes = {
  selectedCurrency: PropTypes.object.isRequired,
  handleCurrencyChange: PropTypes.func.isRequired,
};

// 2. Creamos un "Proveedor" que contendrá el estado
export const CurrencyProvider = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(currencies[0]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  return (
    <CurrencyContext.Provider
      value={{ selectedCurrency, handleCurrencyChange }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCurrency = () => {
  return useContext(CurrencyContext);
};
