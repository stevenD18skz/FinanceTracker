import React, { useState } from "react";

// Importacion de Iconos
import {
  User,
  Mail,
  Lock,
  Globe,
  Clock,
  DollarSign,
  Calendar,
  Bell,
  Moon,
  Sun,
  Database,
  AlertTriangle,
  Save,
  Upload,
  Download,
  Trash2,
  ChevronDown,
  Info,
} from "lucide-react";

const Settings = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState("");

  const handleSave = (section: string) => {
    setSaveStatus(`${section} settings saved successfully!`);
    setTimeout(() => setSaveStatus(""), 3000);
  };

  const Section = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="mb-6 rounded-xl bg-[#262b38] p-6">
      <h2 className="mb-6 text-xl font-semibold">{title}</h2>
      {children}
    </div>
  );

  const Field = ({
    icon: Icon,
    label,
    children,
    tooltip,
  }: {
    icon: any;
    label: string;
    children: React.ReactNode;
    tooltip?: string;
  }) => (
    <div className="mb-4">
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 text-indigo-400" />
        <label className="text-sm font-medium text-gray-300">{label}</label>
        {tooltip && (
          <div className="group relative">
            <Info className="h-4 w-4 cursor-help text-gray-400" />
            <div className="absolute left-full ml-2 hidden w-48 rounded bg-gray-800 p-2 text-xs text-white group-hover:block">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      {children}
    </div>
  );

  const Select = ({ options }: { options: string[] }) => (
    <div className="relative">
      <select className="w-full appearance-none rounded-lg border border-gray-700 bg-[#1a1f2e] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1a1f2e] p-8 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Settings</h1>
          {saveStatus && (
            <div className="rounded-lg bg-green-500/20 px-4 py-2 text-sm text-green-400">
              {saveStatus}
            </div>
          )}
        </div>

        <Section title="Profile Settings">
          <div className="mb-6 flex items-center gap-6">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile"
                className="h-24 w-24 rounded-full ring-4 ring-indigo-500"
              />
              <button className="absolute bottom-0 right-0 rounded-full bg-indigo-500 p-2 transition-colors hover:bg-indigo-600">
                <Upload className="h-4 w-4" />
              </button>
            </div>
            <div className="flex-1">
              <Field icon={User} label="Full Name">
                <input
                  type="text"
                  defaultValue="Ali Husni"
                  className="w-full rounded-lg border border-gray-700 bg-[#1a1f2e] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Field>
              <Field icon={Mail} label="Email Address">
                <input
                  type="email"
                  defaultValue="ali.husni@example.com"
                  className="w-full rounded-lg border border-gray-700 bg-[#1a1f2e] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </Field>
            </div>
          </div>
          <Field icon={Lock} label="Change Password">
            <button className="rounded-lg bg-indigo-500 px-4 py-2 text-sm transition-colors hover:bg-indigo-600">
              Update Password
            </button>
          </Field>
          <Field icon={Globe} label="Language">
            <Select
              options={["English", "Spanish", "French", "German", "Arabic"]}
            />
          </Field>
          <Field icon={Clock} label="Time Zone">
            <Select options={["UTC-8", "UTC-5", "UTC+0", "UTC+1", "UTC+3"]} />
          </Field>
        </Section>

        <Section title="Financial Preferences">
          <Field icon={DollarSign} label="Default Currency">
            <Select options={["USD ($)", "EUR (€)", "GBP (£)", "JPY (¥)"]} />
          </Field>
          <Field
            icon={Calendar}
            label="Budget Cycle"
            tooltip="Choose how often you want to reset and review your budget"
          >
            <Select options={["Weekly", "Monthly", "Yearly"]} />
          </Field>
          <Field icon={Calendar} label="Budget Start Day">
            <Select options={[...Array(31)].map((_, i) => `${i + 1}`)} />
          </Field>
        </Section>

        <Section title="Notifications">
          <Field icon={Bell} label="Email Notifications">
            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="form-checkbox rounded border-gray-700 bg-[#1a1f2e] text-indigo-500"
                />
                <span>Weekly summary</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="form-checkbox rounded border-gray-700 bg-[#1a1f2e] text-indigo-500"
                />
                <span>Budget alerts</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="form-checkbox rounded border-gray-700 bg-[#1a1f2e] text-indigo-500"
                />
                <span>Bill reminders</span>
              </label>
            </div>
          </Field>
          <Field
            icon={AlertTriangle}
            label="Alert Thresholds"
            tooltip="Get notified when you reach these budget percentages"
          >
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Warning at %"
                className="rounded-lg border border-gray-700 bg-[#1a1f2e] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                placeholder="Critical at %"
                className="rounded-lg border border-gray-700 bg-[#1a1f2e] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </Field>
        </Section>

        <Section title="Display Options">
          <Field icon={Moon} label="Theme">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm transition-colors hover:bg-indigo-600"
            >
              {isDarkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </Field>
          <Field icon={Globe} label="Number Format">
            <Select options={["1,234.56", "1.234,56", "1 234.56"]} />
          </Field>
          <Field icon={Calendar} label="Date Format">
            <Select options={["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]} />
          </Field>
        </Section>

        <Section title="Data Management">
          <Field icon={Database} label="Export Data">
            <div className="flex gap-4">
              <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm transition-colors hover:bg-indigo-600">
                <Download className="h-4 w-4" />
                Export as CSV
              </button>
              <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm transition-colors hover:bg-indigo-600">
                <Download className="h-4 w-4" />
                Export as PDF
              </button>
            </div>
          </Field>
          <Field icon={Upload} label="Import Data">
            <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-sm transition-colors hover:bg-indigo-600">
              <Upload className="h-4 w-4" />
              Import Data
            </button>
          </Field>
          <Field
            icon={Trash2}
            label="Delete Account"
            tooltip="This action cannot be undone. All your data will be permanently deleted."
          >
            <button className="flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm transition-colors hover:bg-red-600">
              <Trash2 className="h-4 w-4" />
              Delete Account
            </button>
          </Field>
        </Section>

        <div className="mt-8 flex justify-end gap-4">
          <button className="rounded-lg bg-gray-700 px-6 py-2 text-sm transition-colors hover:bg-gray-600">
            Cancel
          </button>
          <button
            onClick={() => handleSave("All")}
            className="flex items-center gap-2 rounded-lg bg-indigo-500 px-6 py-2 text-sm transition-colors hover:bg-indigo-600"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
