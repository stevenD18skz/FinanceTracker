import { Money } from "../types/wallet";

/*
 * Formatea un número como moneda en formato COP (peso colombiano).
 *
 * @param amount - El monto a formatear.
 * @param currencyCode - El código de la moneda. Por defecto es "COP".
 * @returns El monto formateado como moneda.
 */
export const formatCurrency = (
  amount: number,
  currencyCode: string = "COP",
): string => {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/*
 * Formatea una fecha en formato "yyyy-MM-dd" como "día de mes de año".
 *
 * @param date - La fecha a formatear.
 * @returns La fecha formateada.
 */
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("es-CO", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// ratesToUSD: cuántos USD vale 1 unidad de la moneda (en unidades "grandes")
const ratesToUSD: Record<string, number> = {
  USD: 1,
  COP: 0.00028, // 1 COP = 0.00028 USD  (ejemplo mock)
  EUR: 1.09,
  GBP: 1.27,
};

// Convierte desde Money (amount en unidad menor) a otra moneda (resultado en unidad mayor)
function convertMoney(money: Money, targetCurrency: string): number {
  const from = money.currency;
  const fromRate = ratesToUSD[from];
  const toRate = ratesToUSD[targetCurrency];
  if (fromRate == null || toRate == null) throw new Error("tasa faltante");

  // amount está en unidad menor; normalizamos a unidad grande
  // Ej: COP amount=1000000 -> 1_000_000 (ya en "pesos" unidad grande)
  // Ej: USD amount=50000 -> 500.00 (centavos -> dólares)
  const fromIsMinorUnit = from === "USD" || from === "EUR" || from === "GBP";
  const fromUnitFactor = fromIsMinorUnit ? 100 : 1;
  const amountInFromUnits = money.amount / fromUnitFactor; // en unidad "grande"

  // convertir via USD
  const amountInUSD = amountInFromUnits * fromRate;
  const resultInTargetUnits = amountInUSD / toRate; // en unidad "grande" del target
  return resultInTargetUnits;
}

// Formatear para mostrar (Intl.NumberFormat espera unidad grande)
function formatConverted(
  money: Money,
  targetCurrency: string,
  locale = "es-CO",
) {
  const valueInTarget = convertMoney(money, targetCurrency);

  // cuántos decimales: 2 para USD/EUR/GBP, 0 para COP (opcional según tu Currency config)
  const decimals = targetCurrency === "COP" ? 0 : 2;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: targetCurrency,
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(valueInTarget);
}

// función principal
// utils/formatters.ts (o donde estés)
export async function convertAndFormat(
  balance: Money,
  targetCurrency: string,
  useMockIfFail = true,
  onlyNumber = false,
): Promise<string> {
  const sourceCurrency = balance.currency.toUpperCase();
  const target = targetCurrency.toUpperCase();

  // decimales por moneda (si COP no usa centavos, ponemos 0)
  const fractionDigitsMap: Record<string, number> = {
    USD: 2,
    EUR: 2,
    GBP: 2,
    COP: 0,
  };

  const sourceFractionDigits = fractionDigitsMap[sourceCurrency] ?? 2;
  const targetFractionDigits = fractionDigitsMap[target] ?? 2;

  // Convierte de unidad menor a unidad mayor:
  // ej: si sourceFractionDigits = 2 => centavos -> dividir por 100
  const amountMajor = balance.amount / Math.pow(1, sourceFractionDigits);

  // Si ya es la misma moneda, solo formateamos o devolvemos número
  if (sourceCurrency === target) {
    if (onlyNumber) {
      return amountMajor.toFixed(targetFractionDigits);
    }
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: target,
      maximumFractionDigits: targetFractionDigits,
      minimumFractionDigits: targetFractionDigits,
    }).format(amountMajor);
  }

  // Intento real: exchangerate.host convert
  try {
    const url = `https://api.exchangerate.host/convert?from=${encodeURIComponent(
      sourceCurrency,
    )}&to=${encodeURIComponent(target)}&amount=${encodeURIComponent(
      String(amountMajor),
    )}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("rate fetch failed");
    const data = await res.json();

    if (typeof data.result === "number") {
      const converted = Number(data.result);
      if (onlyNumber) return converted.toFixed(targetFractionDigits);
      return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: target,
        maximumFractionDigits: targetFractionDigits,
        minimumFractionDigits: targetFractionDigits,
      }).format(converted);
    } else {
      throw new Error("unexpected response shape");
    }
  } catch (err) {
    if (!useMockIfFail) throw err;

    // fallback mock
    const mockRates: Record<string, Record<string, number>> = {
      USD: { USD: 1, EUR: 0.92, GBP: 0.78, COP: 4600 },
      EUR: { USD: 1.08, EUR: 1, GBP: 0.85, COP: 5000 },
      GBP: { USD: 1.28, EUR: 1.18, GBP: 1, COP: 5900 },
      COP: { USD: 1 / 4600, EUR: 1 / 5000, GBP: 1 / 5900, COP: 1 },
    };

    const rateRow = mockRates[sourceCurrency];
    const rate =
      rateRow && typeof rateRow[target] === "number"
        ? rateRow[target]
        : undefined;

    if (rate == null) {
      // si no tenemos tasa, devolver original con etiqueta
      if (onlyNumber) return amountMajor.toFixed(targetFractionDigits);
      return (
        new Intl.NumberFormat(undefined, {
          style: "currency",
          currency: sourceCurrency,
          maximumFractionDigits: sourceFractionDigits,
          minimumFractionDigits: sourceFractionDigits,
        }).format(amountMajor) + ` (${sourceCurrency})`
      );
    }

    const converted = amountMajor * rate;
    if (onlyNumber) return converted.toFixed(targetFractionDigits);

    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: target,
      maximumFractionDigits: targetFractionDigits,
      minimumFractionDigits: targetFractionDigits,
    }).format(converted);
  }
}
