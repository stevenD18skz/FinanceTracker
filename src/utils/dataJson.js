export const test_data = {
  ACOUNTS: [
    {
      title: "💳Bancolombia",
      amount: 2500.5,
    },
    {
      title: "💳NU",
      amount: 2500.5,
    },
    {
      title: "💳NEQUI",
      amount: 2500.5,
    },
  ],

  TRANSACTIONS: [
    {
      title: "guardar en la cuenta de ahorros",
      amount: 32_000,
      from_acount: "nequi",
      income_acount: "Nu",
      date: "23/04/2024",
    },
  ],

  GOALS: [
    {
      title: "🎥RTX 4060",
      amount: 240_000,
      goal: 1_340_000,
      get remaining() {
        return this.goal - this.amount + "";
      },
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
    {
      title: "🎥BUDS 5",
      amount: 50_000,
      goal: 340_000,
      get remaining() {
        return this.goal - this.amount + "";
      },
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
  ],

  MONTHLY_ESSENTIALS: [
    {
      title: "🏡HOUSING",
      monthly_budget: 650_000,
      spending: 550_000,
      get remaining() {
        return (this.monthly_budget - this.spending).toFixed(2) + "";
      },
      get overView() {
        return (this.monthly_budget / this.spending).toFixed(2) * 100 + " %";
      },
    },
    {
      title: "🏡Transporte",
      monthly_budget: 120000,
      spending: 100000,
      get remaining() {
        return (this.monthly_budget - this.spending).toFixed(2) + "";
      },
      get overView() {
        return (this.monthly_budget / this.spending).toFixed(2) * 100 + " %";
      },
    },

    {
      title: "🏡Alimentación",
      monthly_budget: 120000,
      spending: 50000,
      get remaining() {
        return (this.monthly_budget - this.spending).toFixed(2) + "";
      },
      get overView() {
        return (this.monthly_budget / this.spending).toFixed(2) * 100 + " %";
      },
    },
    {
      title: "🏡Entretenimiento",
      monthly_budget: 120000,
      spending: 80000,
      get remaining() {
        return (this.monthly_budget - this.spending).toFixed(2) + "";
      },
      get overView() {
        return (this.monthly_budget / this.spending).toFixed(2) * 100 + " %";
      },
    },
    {
      title: "🏡Universidad",
      monthly_budget: 120000,
      spending: 60000,
      get remaining() {
        return (this.monthly_budget - this.spending).toFixed(2) + "";
      },
      get overView() {
        return (this.monthly_budget / this.spending).toFixed(2) * 100 + " %";
      },
    },
  ],

  INCOME: [
    {
      id: 1,
      title: "Salario",
      amount: 3500,
      payment: "wallet",
      date: "2024-08-03",
      tags: ["Trabajo", "Ingresos"],
      note: "Pago regular",
    },
    {
      id: 2,
      title: "Dividendos",
      amount: 150,
      payment: "bancolombia",
      date: "2024-12-31",
      tags: ["Inversiones", "Ingresos"],
      note: "Ingresos pasivos",
    },
    {
      id: 3,
      title: "Freelance",
      amount: 800,
      payment: "Nequi",
      date: "2024-08-15",
      tags: ["Proyecto", "Ingresos"],
      note: "Trabajo adicional",
    },
  ],

  EXPENSES: [
    {
      id: 1,
      title: "Renta",
      amount: 1200,
      payment: "Nequi",
      date: "2024-08-01",
      tags: ["Vivienda", "Gastos Fijos"],
      note: "Pago mensual de renta",
    },
    {
      id: 2,
      title: "Supermercado",
      amount: 400,
      payment: "wallet",
      date: "2024-08-02",
      tags: ["Alimentos", "Gastos Variables"],
      note: "Compra de despensa",
    },
    {
      id: 3,
      title: "Servicios",
      amount: 150,
      payment: "Nequi",
      date: "2024-08-10",
      tags: ["Servicios Públicos", "Gastos Fijos"],
      note: "Pago de luz, agua e internet",
    },
  ],

  MONTHLY_SUMMARY: [
    {
      title: "enero",
      total_income: 450_000,
      total_expenses: 375_000,
      get overView() {
        return (
          (this.total_income / this.total_expenses).toFixed(2) * 100 + " %"
        );
      },
    },
  ],
};
