import React, { useState } from "react";
import {
  MoreVertical,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Eye,
  AlertCircle,
  Clock,
  ArrowUpDown,
  X,
} from "lucide-react";

interface Item {
  id: string;
  title: string;
  description: string;
  status: "active" | "completed" | "inactive";
  priority: "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
}

interface SortOption {
  label: string;
  value: string;
  options: Array<{
    label: string;
    value: string;
  }>;
}

const sortOptions: SortOption[] = [
  {
    label: "Date",
    value: "date",
    options: [
      { label: "Newest First", value: "date-desc" },
      { label: "Oldest First", value: "date-asc" },
    ],
  },
  {
    label: "Alphabetical",
    value: "alpha",
    options: [
      { label: "A to Z", value: "alpha-asc" },
      { label: "Z to A", value: "alpha-desc" },
    ],
  },
  {
    label: "Status",
    value: "status",
    options: [
      { label: "Active First", value: "status-active" },
      { label: "Completed First", value: "status-completed" },
      { label: "Inactive First", value: "status-inactive" },
    ],
  },
  {
    label: "Priority",
    value: "priority",
    options: [
      { label: "High First", value: "priority-high" },
      { label: "Medium First", value: "priority-medium" },
      { label: "Low First", value: "priority-low" },
    ],
  },
];

const ItemCard = ({ item, onEdit, onDelete, onComplete, onView }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700";
      case "medium":
        return "bg-yellow-100 text-yellow-700";
      case "low":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "inactive":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{item.description}</p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
          {showMenu && (
            <div className="absolute right-0 z-10 mt-2 w-48 rounded-md border border-gray-200 bg-white py-1 shadow-lg">
              <button
                onClick={() => {
                  onView(item);
                  setShowMenu(false);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Eye className="mr-3 h-4 w-4" />
                View Details
              </button>
              <button
                onClick={() => {
                  onEdit(item);
                  setShowMenu(false);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Edit2 className="mr-3 h-4 w-4" />
                Edit
              </button>
              <button
                onClick={() => {
                  onComplete(item);
                  setShowMenu(false);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <CheckCircle className="mr-3 h-4 w-4" />
                Mark as Completed
              </button>
              <button
                onClick={() => {
                  onDelete(item);
                  setShowMenu(false);
                }}
                className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="mr-3 h-4 w-4" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getPriorityColor(
            item.priority,
          )}`}
        >
          <AlertCircle className="mr-1 h-3 w-3" />
          {item.priority.charAt(0).toUpperCase() + item.priority.slice(1)}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
            item.status,
          )}`}
        >
          {item.status === "completed" ? (
            <CheckCircle className="mr-1 h-3 w-3" />
          ) : (
            <Clock className="mr-1 h-3 w-3" />
          )}
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
        <span className="text-xs text-gray-500">
          Updated {new Date(item.updatedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const ItemForm = ({ item, onSubmit, onClose }) => {
  const [formData, setFormData] = useState(
    item || {
      title: "",
      description: "",
      priority: "medium",
      status: "active",
    },
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={3}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Priority
        </label>
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          <option value="active">Active</option>
          <option value="completed">Completed</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {item ? "Update" : "Create"}
        </button>
      </div>
    </form>
  );
};

const ItemListPage = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: "1",
      title: "Complete Project Proposal",
      description: "Draft and finalize the project proposal for the new client",
      status: "active",
      priority: "high",
      createdAt: "2024-03-10T10:00:00Z",
      updatedAt: "2024-03-10T10:00:00Z",
    },
    // Add more sample items as needed
  ]);

  const [sortBy, setSortBy] = useState("date-desc");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const handleSort = (value: string) => {
    setSortBy(value);
    let sortedItems = [...items];

    switch (value) {
      case "date-desc":
        sortedItems.sort(
          (a, b) =>
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
        );
        break;
      case "date-asc":
        sortedItems.sort(
          (a, b) =>
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime(),
        );
        break;
      case "alpha-asc":
        sortedItems.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "alpha-desc":
        sortedItems.sort((a, b) => b.title.localeCompare(a.title));
        break;
      // Add more sorting cases as needed
    }

    setItems(sortedItems);
  };

  const handleCreate = (data) => {
    const newItem: Item = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setItems([newItem, ...items]);
  };

  const handleEdit = (data) => {
    const updatedItems = items.map((item) =>
      item.id === selectedItem?.id
        ? { ...item, ...data, updatedAt: new Date().toISOString() }
        : item,
    );
    setItems(updatedItems);
  };

  const handleDelete = () => {
    const updatedItems = items.filter((item) => item.id !== selectedItem?.id);
    setItems(updatedItems);
    setShowDeleteModal(false);
  };

  const handleComplete = (item: Item) => {
    const updatedItems = items.map((i) =>
      i.id === item.id
        ? { ...i, status: "completed", updatedAt: new Date().toISOString() }
        : i,
    );
    setItems(updatedItems);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Items</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {sortOptions.map((group) => (
                  <optgroup key={group.value} label={group.label}>
                    {group.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <ArrowUpDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
              onEdit={(item) => {
                setSelectedItem(item);
                setShowEditModal(true);
              }}
              onDelete={(item) => {
                setSelectedItem(item);
                setShowDeleteModal(true);
              }}
              onComplete={handleComplete}
              onView={(item) => {
                setSelectedItem(item);
                setShowViewModal(true);
              }}
            />
          ))}
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="fixed bottom-8 right-8 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <Plus className="h-6 w-6" />
        </button>

        <Modal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          title="Create New Item"
        >
          <ItemForm
            onSubmit={handleCreate}
            onClose={() => setShowCreateModal(false)}
          />
        </Modal>

        <Modal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          title="Edit Item"
        >
          <ItemForm
            item={selectedItem}
            onSubmit={handleEdit}
            onClose={() => setShowEditModal(false)}
          />
        </Modal>

        <Modal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title="Delete Item"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete this item? This action cannot be
              undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </Modal>

        <Modal
          isOpen={showViewModal}
          onClose={() => setShowViewModal(false)}
          title="Item Details"
        >
          {selectedItem && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">Title</h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedItem.title}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Description
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {selectedItem.description}
                </p>
              </div>
              <div className="flex gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedItem.status}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">
                    Priority
                  </h3>
                  <p className="mt-1 text-sm text-gray-900">
                    {selectedItem.priority}
                  </p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Last Updated
                </h3>
                <p className="mt-1 text-sm text-gray-900">
                  {new Date(selectedItem.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default ItemListPage;
