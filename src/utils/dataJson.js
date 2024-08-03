export const acount_bank = {
  cuentas: [
    {
      title: "💳Cuenta de Ahorros",
      amount: 1500.75,
    },
    {
      title: "💳Cuenta Corriente",
      amount: 2500.5,
    },
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

  goals: [
    {
      title: "🎥RTX 4060",
      amount: 240_000,
      goal: 1_340_000,
      get overView() {
        return (this.amount / this.goal).toFixed(2) * 100 + " %";
      },
    },
  ],
};
