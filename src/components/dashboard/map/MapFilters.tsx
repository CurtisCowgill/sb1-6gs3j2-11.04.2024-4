import React, { useState } from 'react';
import { stageColors, stageNames } from './mapData';

const MapFilters: React.FC = () => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedStage, setSelectedStage] = useState<string>('all');
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>('all');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('all');
  const [selectedCity, setSelectedCity] = useState<string>('all');
  const [selectedCounty, setSelectedCounty] = useState<string>('all');

  const statuses = [
    { id: 'all', label: 'All Statuses' },
    { id: 'not_started', label: 'Not Started' },
    { id: 'active', label: 'Active' },
    { id: 'complete', label: 'Complete' },
    { id: 'closed', label: 'Closed' }
  ];

  const stages = [
    { id: 'all', label: 'All Stages' },
    { id: 'backlog', label: 'Backlog' },
    { id: 'stakeout', label: 'Stakeout' },
    { id: 'footings', label: 'Footings' },
    { id: 'walls', label: 'Walls' },
    { id: 'waterproofing', label: 'Waterproofing' },
    { id: 'complete', label: 'Complete' }
  ];

  const neighborhoods = [
    { id: 'all', name: 'All Neighborhoods' },
    { id: 'downtown', name: 'Downtown' },
    { id: 'eastside', name: 'East Side' },
    { id: 'westside', name: 'West Side' }
  ];

  const customers = [
    { id: 'all', name: 'All Customers' },
    { id: 'nies', name: 'Nies Homes' },
    { id: 'craig', name: 'Craig Sharp Homes' }
  ];

  const cities = [
    { id: 'all', name: 'All Cities' },
    { id: 'wichita', name: 'Wichita' },
    { id: 'derby', name: 'Derby' },
    { id: 'andover', name: 'Andover' }
  ];

  const counties = [
    { id: 'all', name: 'All Counties' },
    { id: 'sedgwick', name: 'Sedgwick' },
    { id: 'butler', name: 'Butler' },
    { id: 'harvey', name: 'Harvey' }
  ];

  const buttonClasses = "px-3 py-1.5 text-sm font-medium rounded-full transition-colors duration-150";
  const activeButtonClasses = "bg-blue-100 text-blue-800";
  const inactiveButtonClasses = "bg-gray-100 text-gray-700 hover:bg-gray-200";
  const selectClasses = "block w-44 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm font-medium text-gray-700 py-1.5";

  return (
    <div className="space-y-4">
      <div className="flex gap-6">
        {/* Left side - Status and Stage filters */}
        <div className="space-y-4 pr-6 border-r border-gray-200">
          {/* Status filters */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 min-w-[60px]">Status:</span>
            <div className="flex space-x-2">
              {statuses.map((status) => (
                <button
                  key={status.id}
                  onClick={() => setSelectedStatus(status.id)}
                  className={`${buttonClasses} ${
                    selectedStatus === status.id ? activeButtonClasses : inactiveButtonClasses
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Stage filters */}
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-700 min-w-[60px]">Stage:</span>
            <div className="flex space-x-2">
              {stages.map((stage) => (
                <button
                  key={stage.id}
                  onClick={() => setSelectedStage(stage.id)}
                  className={`${buttonClasses} ${
                    selectedStage === stage.id ? activeButtonClasses : inactiveButtonClasses
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right side - Dropdown filters */}
        <div className="space-y-4 flex-1">
          {/* First row of dropdowns */}
          <div className="flex gap-4">
            <select
              value={selectedNeighborhood}
              onChange={(e) => setSelectedNeighborhood(e.target.value)}
              className={selectClasses}
            >
              {neighborhoods.map((neighborhood) => (
                <option key={neighborhood.id} value={neighborhood.id}>
                  {neighborhood.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
              className={selectClasses}
            >
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>

          {/* Second row of dropdowns */}
          <div className="flex gap-4">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className={selectClasses}
            >
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>

            <select
              value={selectedCounty}
              onChange={(e) => setSelectedCounty(e.target.value)}
              className={selectClasses}
            >
              {counties.map((county) => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapFilters;