// IMPORTACION DE HOOKS O UTILIDADES
import { Moon, Bell, User } from "lucide-react";

import { Menu, Search } from "lucide-react";

import { balanceData } from "../utils/Data";

export default function NavBar() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-10 border-b bg-white/80 px-6 py-3 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="rounded-lg p-2 hover:bg-gray-100 lg:hidden">
            <Menu className="h-5 w-5 text-gray-700" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">FinBank</h1>
            <p className="text-sm text-gray-600">Dashboard Overview</p>
          </div>
        </div>

        <div className="hidden flex-1 items-center justify-center px-8 lg:flex">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions, cards, etc..."
              className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="rounded-lg p-2 text-gray-700 hover:bg-gray-100">
            <Moon className="h-5 w-5" />
          </button>
          <div className="relative">
            <button className="rounded-lg p-2 text-gray-700 hover:bg-gray-100">
              <Bell className="h-5 w-5" />
            </button>
            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden flex-col text-right lg:flex">
              <span className="text-sm font-medium">Bariy Vollendito</span>
              <span className="text-xs text-gray-500">Premium Account</span>
            </div>
            <button className="group relative h-10 w-10 overflow-hidden rounded-full border-2 border-gray-200 hover:ring-2 hover:ring-blue-500">
              <img
                src={balanceData.photo}
                alt="Profile"
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
