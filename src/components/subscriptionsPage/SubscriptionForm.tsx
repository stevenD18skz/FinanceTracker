import React from 'react';
import { X, Music2, Monitor, Zap, Coffee, Gamepad2, BookOpen, ShoppingCart, Home } from 'lucide-react';
import type { Subscription } from './types';

interface SubscriptionFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subscription: Omit<Subscription, 'id'>) => void;
  editingSubscription?: Subscription;
}

const ICON_OPTIONS = [
  { icon: <Music2 className="h-6 w-6 text-white" />, name: 'Music' },
  { icon: <Monitor className="h-6 w-6 text-white" />, name: 'Monitor' },
  { icon: <Zap className="h-6 w-6 text-white" />, name: 'Zap' },
  { icon: <Coffee className="h-6 w-6 text-white" />, name: 'Coffee' },
  { icon: <Gamepad2 className="h-6 w-6 text-white" />, name: 'Gaming' },
  { icon: <BookOpen className="h-6 w-6 text-white" />, name: 'Books' },
  { icon: <ShoppingCart className="h-6 w-6 text-white" />, name: 'Shopping' },
  { icon: <Home className="h-6 w-6 text-white" />, name: 'Home' },
];

const COLOR_OPTIONS = [
  '#1DB954', // Spotify Green
  '#E50914', // Netflix Red
  '#FF0000', // YouTube Red
  '#FF9900', // Amazon Orange
  '#00A4EF', // Microsoft Blue
  '#EA4C89', // Dribbble Pink
  '#5865F2', // Discord Purple
  '#000000', // Apple Black
];

export function SubscriptionForm({ isOpen, onClose, onSubmit, editingSubscription }: SubscriptionFormProps) {
  const [formData, setFormData] = React.useState({
    name: '',
    cost: 0,
    renewalDate: new Date().toISOString().split('T')[0],
    status: false,
    color: COLOR_OPTIONS[0],
    icon: ICON_OPTIONS[0].icon,
    category: 'entertainment',
    billingCycle: 'monthly',
  });

  React.useEffect(() => {
    if (editingSubscription) {
      setFormData({
        name: editingSubscription.name,
        cost: editingSubscription.cost,
        renewalDate: editingSubscription.renewalDate.split('T')[0],
        status: editingSubscription.status,
        color: editingSubscription.color,
        icon: editingSubscription.icon,
        category: editingSubscription.category || 'entertainment',
        billingCycle: editingSubscription.billingCycle || 'monthly',
      });
    }
  }, [editingSubscription]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white p-8">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>

        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          {editingSubscription ? 'Edit Subscription' : 'Add New Subscription'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Cost</label>
              <input
                type="number"
                required
                step="0.01"
                min="0"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              >
                <option value="entertainment">Entertainment</option>
                <option value="productivity">Productivity</option>
                <option value="utilities">Utilities</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Billing Cycle</label>
              <select
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              >
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Renewal Date</label>
              <input
                type="date"
                required
                value={formData.renewalDate}
                onChange={(e) => setFormData({ ...formData, renewalDate: e.target.value })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Status</label>
              <select
                value={formData.status.toString()}
                onChange={(e) => setFormData({ ...formData, status: e.target.value === 'true' })}
                className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-200"
              >
                <option value="true">Paid</option>
                <option value="false">Unpaid</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Icon</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {ICON_OPTIONS.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setFormData({ ...formData, icon: option.icon })}
                  className={`flex h-12 w-12 items-center justify-center rounded-lg transition-all hover:scale-110 ${
                    formData.icon === option.icon ? 'bg-violet-600' : 'bg-gray-200'
                  }`}
                >
                  {React.cloneElement(option.icon, {
                    className: `h-6 w-6 ${formData.icon === option.icon ? 'text-white' : 'text-gray-600'}`,
                  })}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <div className="mt-2 flex flex-wrap gap-3">
              {COLOR_OPTIONS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color })}
                  className={`h-12 w-12 rounded-lg transition-all hover:scale-110 ${
                    formData.color === color ? 'ring-4 ring-violet-300' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full bg-gray-100 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-full bg-violet-600 px-6 py-2.5 font-medium text-white hover:bg-violet-700"
            >
              {editingSubscription ? 'Save Changes' : 'Add Subscription'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}