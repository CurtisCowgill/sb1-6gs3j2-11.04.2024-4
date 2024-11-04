import React, { useState } from 'react';
import { 
  Plus, 
  ClipboardList, 
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Users
} from 'lucide-react';
import TabNavigation from '../components/TabNavigation';
import WorkOrderList from '../components/workOrders/WorkOrderList';
import WorkOrderTemplateList from '../components/workOrders/WorkOrderTemplateList';
import WorkOrderForm from '../components/workOrders/WorkOrderForm';
import { WorkOrder, WorkOrderTemplate } from '../types/workOrders';

const tabs = [
  { id: 'active', label: 'Active' },
  { id: 'scheduled', label: 'Scheduled' },
  { id: 'templates', label: 'Templates' },
  { id: 'completed', label: 'Completed' }
];

const mockMetrics = {
  activeOrders: 12,
  scheduledOrders: 8,
  completedOrders: 45,
  totalHours: 320,
  laborCost: 15000,
  materialCost: 25000
};

const WorkOrders: React.FC = () => {
  const [activeTab, setActiveTab] = useState('active');
  const [showNewOrderForm, setShowNewOrderForm] = useState(false);

  const handleCreateWorkOrder = (data: WorkOrder | WorkOrderTemplate) => {
    console.log('Creating work order:', data);
    setShowNewOrderForm(false);
  };

  const handleCreateFromTemplate = (template: WorkOrderTemplate) => {
    console.log('Creating from template:', template);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Work Orders</h1>
        <button
          onClick={() => setShowNewOrderForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Work Order
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <ClipboardList className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Orders</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockMetrics.activeOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Scheduled</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockMetrics.scheduledOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockMetrics.completedOrders}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-orange-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Hours</p>
              <p className="text-2xl font-semibold text-gray-900">
                {mockMetrics.totalHours}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-indigo-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Labor Cost</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${mockMetrics.laborCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Material Cost</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${mockMetrics.materialCost.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      <TabNavigation
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className="bg-white shadow rounded-lg p-6">
        {activeTab === 'templates' ? (
          <WorkOrderTemplateList
            templates={[]}
            onCreateFromTemplate={handleCreateFromTemplate}
          />
        ) : (
          <WorkOrderList
            workOrders={[]}
            onUpdate={() => {}}
          />
        )}
      </div>

      {showNewOrderForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-medium text-gray-900">Create Work Order</h2>
              <button
                onClick={() => setShowNewOrderForm(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Close</span>
                <X className="h-6 w-6" />
              </button>
            </div>
            <WorkOrderForm
              onSubmit={handleCreateWorkOrder}
              onCancel={() => setShowNewOrderForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrders;