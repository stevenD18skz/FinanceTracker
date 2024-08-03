import NavBar from "../components/NavBar";
import Card from "../components/Card";

import { acount_bank } from "../utils/dataJson";

export default function Home() {
  console.log(acount_bank.goals[0].overView);
  return (
    <main className="min-h-dvh bg-slate-800 text-gray-300">
      <NavBar></NavBar>

      <div className="grid grid-cols-3 gap-5">
        <aside className="min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          {acount_bank.cuentas.map((current, index) => (
            <Card dataCard={current}></Card>
          ))}

          <button className="mb-8 w-full rounded-xl border-2 border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600">
            new
          </button>

          <img
            className="mx-auto w-10/12 rounded-3xl"
            src="https://i.pinimg.com/originals/80/55/b6/8055b6bca39e97b823e919c917a90312.gif"
            alt="imagen decorativa"
          />
        </aside>

        <div className="min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          datos
        </div>

        <aside className="min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          {acount_bank.goals.map((current, index) => (
            <Card dataCard={current}></Card>
          ))}
          <button className="mb-8 w-full rounded-xl border-2 border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600">
            new
          </button>
        </aside>
      </div>
    </main>
  );
}
