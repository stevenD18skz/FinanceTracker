import React from "react";

// Importacion de Iconos
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  CreditCard,
  Activity,
  DollarSign,
  Clock,
} from "lucide-react";

const Profile = () => {
  return (
    <div className="min-h-screen bg-[#1a1f2e] p-8 text-white">
      <div className="mx-auto max-w-6xl space-y-8">
        {/* Profile Header */}
        <div className="flex flex-col items-center gap-6 rounded-xl bg-[#262b38] p-6 md:flex-row md:items-start">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="h-32 w-32 rounded-full ring-4 ring-indigo-500"
            />
            <button className="absolute bottom-0 right-0 rounded-full bg-indigo-500 p-2 transition-colors hover:bg-indigo-600">
              <User className="h-4 w-4" />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold">Ali Husni</h1>
            <p className="text-gray-400">Premium Member</p>
            <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
              <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-sm text-indigo-400">
                Active Investor
              </span>
              <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                Verified Account
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Personal Information */}
          <div className="md:col-span-2">
            <div className="rounded-xl bg-[#262b38] p-6">
              <h2 className="mb-6 text-xl font-semibold">
                Personal Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p>ali.husni@example.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p>+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p>San Francisco, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Calendar className="h-5 w-5 text-indigo-400" />
                  <div>
                    <p className="text-sm text-gray-400">Member Since</p>
                    <p>January 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Account Statistics */}
          <div className="space-y-4">
            <div className="rounded-xl bg-[#262b38] p-6">
              <h3 className="mb-4 text-lg font-semibold">Account Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-2">
                      <CreditCard className="h-5 w-5 text-indigo-400" />
                    </div>
                    <span>Active Cards</span>
                  </div>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-green-500/20 p-2">
                      <Activity className="h-5 w-5 text-green-400" />
                    </div>
                    <span>Transactions</span>
                  </div>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-yellow-500/20 p-2">
                      <DollarSign className="h-5 w-5 text-yellow-400" />
                    </div>
                    <span>Total Saved</span>
                  </div>
                  <span className="font-semibold">$12,365</span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl bg-[#262b38] p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent Activity</h3>
                <Clock className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                  <p className="text-sm">Card payment successful</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-yellow-400"></div>
                  <p className="text-sm">New subscription added</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-indigo-400"></div>
                  <p className="text-sm">Profile updated</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
