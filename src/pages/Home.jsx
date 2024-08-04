import NavBar from "../components/NavBar";
import Card from "../components/Card";

import { test_data } from "../utils/dataJson";
import { useEffect } from "react";

export default function Home() {
  const orderProp = (prop) => {
    test_data.INCOME.sort((a, b) => {
      const attrA = a[prop];
      const attrB = b[prop];

      if (typeof attrA === "string" && typeof attrB === "string") {
        return attrA.localeCompare(attrB);
      } else if (typeof attrA === "number" && typeof attrB === "number") {
        return attrA - attrB;
      } else if (attrA instanceof Date && attrB instanceof Date) {
        return attrA - attrB;
      } else {
        return 0;
      }
    });
  };

  return (
    <main className="min-h-dvh bg-slate-800 text-gray-300">
      <NavBar></NavBar>

      <div className="grid grid-cols-12 gap-5 p-4">
        <aside className="col-span-3 min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          {test_data.cuentas.map((current, index) => (
            <Card key={index} dataCard={current}></Card>
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

        <div className="col-span-6 min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          <h3>MONTHLY_ESSENTIALS</h3>
          <div className="grid grid-cols-4 gap-8 text-black">
            {test_data.MONTHLY_ESSENTIALS.map((current, index) => (
              <Card dataCard={current}></Card>
            ))}

            <button className="mb-8 w-full rounded-xl border-2 border-cyan-800 py-3 transition-all duration-300 ease-in-out hover:border-dashed hover:bg-cyan-600">
              new
            </button>
          </div>

          <h3>INCOME</h3>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
              <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Product name
                  </th>

                  {Object.keys(test_data.INCOME[0])
                    .slice(1)
                    .map((key) => (
                      <th key={key} scope="col" class="px-6 py-3">
                        <div class="flex items-center">
                          {key}
                          <button onClick={() => orderProp(key)}>
                            <svg
                              class="ms-1.5 h-3 w-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                            </svg>
                          </button>
                        </div>
                      </th>
                    ))}

                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>

              <tbody>
                {test_data.INCOME.map((current) => (
                  <tr class="border-b bg-white dark:border-gray-700 dark:bg-gray-800">
                    <th
                      scope="row"
                      class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                    >
                      {current.title}
                    </th>
                    {Object.keys(current)
                      .slice(1)
                      .map((valor, index) => {
                        return <td class="px-6 py-4">{current[valor]}</td>;
                      })}
                    <td class="px-6 py-4 text-right">
                      <a
                        href="#"
                        class="font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Edit
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <aside className="col-span-3 min-h-svh w-full rounded-2xl border-2 border-indigo-700 p-3">
          {test_data.goals.map((current, index) => (
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
