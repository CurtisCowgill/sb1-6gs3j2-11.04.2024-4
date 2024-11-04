import React, { useState } from 'react';
import {
  Building2,
  Users,
  HardHat,
  FolderKanban,
  TrendingUp,
  DollarSign,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Truck
} from 'lucide-react';
import ProjectMap from '../components/dashboard/ProjectMap';
import MapFilters from '../components/dashboard/map/MapFilters';
import MapLegend from '../components/dashboard/map/MapLegend';
import TodaySchedule from '../components/dashboard/TodaySchedule';
import RecentActivity from '../components/dashboard/RecentActivity';
import { formatCurrency } from '../utils/format';

const Dashboard: React.FC = () => {
  const [showMapFilters, setShowMapFilters] = useState(false);

  const stats = {
    activeProjects: 12,
    totalEmployees: 45,
    activeCrews: 8,
    completionRate: 92,
    revenue: 850000,
    expenses: 650000,
    upcomingInspections: 5,
    scheduledPours: 3
  };

  return (
    <div className="space-y-6">
      {/* Company Overview */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Company Overview</h2>
        <div className="grid grid-cols-6 gap-6">
          <div className="flex items-center">
            <FolderKanban className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeProjects}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Users className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Employees</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.totalEmployees}</p>
            </div>
          </div>

          <div className="flex items-center">
            <HardHat className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Crews</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.activeCrews}</p>
            </div>
          </div>

          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completion</p>
              <p className="text-2xl font-semibold text-gray-900">{stats.completionRate}%</p>
            </div>
          </div>

          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Revenue (MTD)</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(stats.revenue)}
              </p>
            </div>
          </div>

          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Expenses (MTD)</p>
              <p className="text-2xl font-semibold text-gray-900">
                {formatCurrency(stats.expenses)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule and Activity */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Today's Schedule</h2>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>
          <TodaySchedule />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
            <Clock className="h-5 w-5 text-gray-400" />
          </div>
          <RecentActivity />
        </div>
      </div>

      {/* Project Map */}
      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-medium text-gray-900">Project Map</h2>
            <button
              onClick={() => setShowMapFilters(!showMapFilters)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              {showMapFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          {showMapFilters && <MapFilters />}

          <div className="h-[500px] mt-4">
            <ProjectMap />
          </div>

          <MapLegend />
        </div>
      </div>

      {/* Upcoming Events */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Upcoming Inspections</h2>
            <CheckCircle2 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {stats.upcomingInspections}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Scheduled Pours</h2>
            <Truck className="h-5 w-5 text-gray-400" />
          </div>
          <div className="text-2xl font-semibold text-gray-900">
            {stats.scheduledPours}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;