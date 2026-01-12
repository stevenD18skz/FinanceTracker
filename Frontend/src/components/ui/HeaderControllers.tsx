import { LayoutGrid, List, Plus, Search } from "lucide-react";

import React from "react";

interface PageHeaderProps {
  title: string;
  itemCount: number;
  filterOptions: string[];
  selectedFilter: string;
  setFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  view: string;
  setView: (view: string) => void;
  onNewItem: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  itemCount,
  filterOptions = [],
  selectedFilter,
  setFilter,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  view,
  setView,
  onNewItem,
}) => {
  return (
    <div className="space-y-6">
      {/* Title Row */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {itemCount.toLocaleString()} items
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex rounded-xl bg-zinc-100 p-1 dark:bg-zinc-800">
            <button
              onClick={() => setView("grid")}
              className={`rounded-lg p-2 transition-all ${view === "grid"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              title="Grid view"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-lg p-2 transition-all ${view === "list"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
                }`}
              title="List view"
            >
              <List className="h-4 w-4" />
            </button>
          </div>

          {onNewItem && (
            <button
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-700 active:scale-95"
              onClick={onNewItem}
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New Transaction</span>
              <span className="sm:hidden">New</span>
            </button>
          )}
        </div>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Filter Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto p-1">
          {filterOptions.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition-all ${selectedFilter === filterType
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
                }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        {/* Search & Sort */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 transition-colors group-focus-within:text-indigo-500" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition-all placeholder:text-zinc-400 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white sm:w-64"
            />
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-zinc-200 bg-white py-2.5 pl-3 pr-8 text-sm text-zinc-600 outline-none transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
          >
            <option value="progress">Default Sort</option>
            <option value="dueDate">Latest First</option>
            <option value="amount">Highest Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
