import { Layout, ListFilter, Plus, Search } from "lucide-react";

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
            {itemCount} {selectedFilter === "all" ? "total" : selectedFilter}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg bg-gray-100 p-1">
            <button
              onClick={() => setView("grid")}
              className={`rounded-md p-2 transition-all ${
                view === "grid"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              title="Grid view"
            >
              <Layout className="h-4 w-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`rounded-md p-2 transition-all ${
                view === "list"
                  ? "bg-white text-gray-800 shadow-sm"
                  : "text-gray-600 hover:text-gray-800"
              }`}
              title="List view"
            >
              <ListFilter className="h-4 w-4" />
            </button>
          </div>
          {onNewItem && (
            <button
              className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={onNewItem}
            >
              <Plus className="h-4 w-4" />
              New {title.slice(0, -1)}
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {filterOptions.map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-all ${
                selectedFilter === filterType
                  ? "bg-gray-100 text-gray-800"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-48 transition-all focus-within:w-64">
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border-gray-200 bg-white py-2 pl-10 pr-4 text-sm placeholder-gray-400 shadow-sm transition-all focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-lg border-gray-200 bg-white py-2 pl-3 pr-10 text-sm text-gray-600 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          >
            <option value="progress">Sort by Progress</option>
            <option value="dueDate">Sort by Due Date</option>
            <option value="amount">Sort by Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
