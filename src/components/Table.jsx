//IMPORTACION DE LIBRERIAS
import React, { useState, useEffect } from "react";

export default function Table({ data_list }) {
  const [income, setIncome] = useState(data_list);
  const [orderby, setOrderby] = useState("");
  const [order, setOrder] = useState(true); //true ascendetemente <====> false descendentemene

  // Actualizar el estado interno cuando data_list cambie
  useEffect(() => {
    setIncome(data_list);
  }, [data_list]);

  const orderProp = (prop) => {
    prop === orderby ? setOrder(!order) : setOrder(true);

    const sortedData = [...income].sort((a, b) => {
      let attrA = a[prop];
      let attrB = b[prop];

      if (order) {
        //ascendetemente
        attrA = a[prop];
        attrB = b[prop];
      } else {
        //descendentemene
        attrA = b[prop];
        attrB = a[prop];
      }

      if (typeof attrA === "string" && typeof attrB === "string") {
        return attrA.localeCompare(attrB);
      } else if (typeof attrA === "number" && typeof attrB === "number") {
        return attrA - attrB;
      } else if (
        new Date(attrA) instanceof Date &&
        !isNaN(new Date(attrA)) &&
        new Date(attrB) instanceof Date &&
        !isNaN(new Date(attrB))
      ) {
        return new Date(attrA) - new Date(attrB);
      } else {
        return 0;
      }
    });
    setIncome(sortedData);
    setOrderby(prop);
  };
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
        <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {Object.keys(income[0]).map((key) => (
              <th key={key} scope="col" className="px-6 py-3 text-3xl">
                <div className="flex items-center">
                  {key}
                  <button onClick={() => orderProp(key)}>
                    <svg
                      className={`all ease-in-outtransition-all ms-1.5 h-3 w-3 transition-all duration-300 ease-in-out ${orderby === key ? "text-orange-600" : ""}`}
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
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>

        <tbody>
          {income.map((current) => (
            <tr
              key={current.title}
              className="border-b bg-white text-2xl dark:border-gray-700 dark:bg-gray-800"
            >
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
              >
                {current.title}
              </th>
              {Object.keys(current)
                .slice(1)
                .map((valor, index) => (
                  <td key={index} className="px-6 py-4">
                    {current[valor]}
                  </td>
                ))}
              <td className="px-6 py-4 text-right">
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
