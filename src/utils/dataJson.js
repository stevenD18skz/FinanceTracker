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

  GOALS: [
    {
      title: "🎥RTX 4060",
      amount: 240_000,
      goal: 1_340_000,
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
    {
      title: "🎥BUDS 5",
      amount: 50_000,
      goal: 340_000,
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
  ],

  MONTHLY_ESSENTIALS: [
    {
      title: "🏡HOUSING",
      amount: 650_000,
      goal: 850_000,
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
    {
      title: "🏡Transporte",
      amount: 120000,
      goal: 150000,
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },

    {
      title: "🏡Alimentación",
      amount: 120000,
      goal: 150000,
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
    {
      title: "🏡Entretenimiento",
      amount: 120000,
      goal: 150000,
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
    {
      title: "🏡Universidad",
      amount: 120000,
      goal: 150000,
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
  ],

  INCOME: [
    {
      title: "Salario",
      amount: 3500,
      payment: "Quincenal",
      date: "2024-08-03",
      tags: ["Trabajo", "Ingresos"],
      note: "Pago regular",
    },
    {
      title: "Dividendos",
      amount: 150,
      payment: "Anual",
      date: "2024-12-31",
      tags: ["Inversiones", "Ingresos"],
      note: "Ingresos pasivos",
    },
    {
      title: "Freelance",
      amount: 800,
      payment: "Mensual",
      date: "2024-08-15",
      tags: ["Proyecto", "Ingresos"],
      note: "Trabajo adicional",
    },
  ],

  EXPENSES: [
    {
      title: "Renta",
      amount: 1200,
      payment: "Mensual",
      date: "2024-08-01",
      tags: ["Vivienda", "Gastos Fijos"],
      note: "Pago mensual de renta",
    },
    {
      title: "Supermercado",
      amount: 400,
      payment: "Quincenal",
      date: "2024-08-02",
      tags: ["Alimentos", "Gastos Variables"],
      note: "Compra de despensa",
    },
    {
      title: "Servicios",
      amount: 150,
      payment: "Mensual",
      date: "2024-08-10",
      tags: ["Servicios Públicos", "Gastos Fijos"],
      note: "Pago de luz, agua e internet",
    },
  ],
};
