import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft,
  Calendar,
  Users,
  ClipboardCheck,
  Truck,
  Building2,
  Plus
} from 'lucide-react';
import { WorkOrder } from '../types';
import { STANDARD_WORK_ORDERS } from '../data/workOrders';
import { formatDate } from '../utils/format';

const mockCrews = [
  { id: 'c1', name: 'Foundation Team A' },
  { id: 'c2', name: 'Foundation Team B' },
  { id: 'c3', name: 'Wall Team' },
  { id: 'c4', name: 'Waterproofing Team' }
];

const mockVendors = [
  { id: 'v1', name: 'ABC Concrete', type: 'Concrete' },
  { id: 'v2', name: 'XYZ Pumping', type: 'Pump' },
  { id: 'v3', name: 'Dig Masters', type: 'Excavator' },
  { id: 'v4', name: 'Pro Plumbing', type: 'Plumber' }
];

const WorkOrderDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const workOrder = STANDARD_WORK_ORDERS.find(wo => wo.id === id);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<WorkOrder | undefined>(workOrder);

  if (!workOrder || !formData) {
    return <div>Work Order not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddCrew = () => {
    if (!formData.additionalCrews) {
      setFormData({ ...formData, additionalCrews: [] });
    }
    // Show crew selection modal or dropdown
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{workOrder.title}</h1>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(workOrder.status)}`}>
            {workOrder.status}
          </span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
        >
          {isEditing ? 'Save Changes' : 'Edit Work Order'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-6">Schedule</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Start Date</span>
              </div>
              {isEditing ? (
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="rounded-md border-gray-300"
                />
              ) : (
                <span className="text-sm font-medium">{formatDate(workOrder.startDate)}</span>
              )}
            </div>

            {(workOrder.inspection || isEditing) && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <ClipboardCheck className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Inspection</span>
                </div>
                {isEditing ? (
                  <input
                    type="datetime-local"
                    value={formData.inspection}
                    onChange={(e) => setFormData({ ...formData, inspection: e.target.value })}
                    className="rounded-md border-gray-300"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {workOrder.inspection && new Date(workOrder.inspection).toLocaleString()}
                  </span>
                )}
              </div>
            )}

            {(workOrder.concrete || isEditing) && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Concrete Pour</span>
                </div>
                {isEditing ? (
                  <input
                    type="datetime-local"
                    value={formData.concrete}
                    onChange={(e) => setFormData({ ...formData, concrete: e.target.value })}
                    className="rounded-md border-gray-300"
                  />
                ) : (
                  <span className="text-sm font-medium">
                    {workOrder.concrete && new Date(workOrder.concrete).toLocaleString()}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900">Crews</h2>
            <button
              onClick={handleAddCrew}
              className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Crew
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Users className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm text-gray-500">Primary Crew</span>
              </div>
              {isEditing ? (
                <select
                  value={formData.crew}
                  onChange={(e) => setFormData({ ...formData, crew: e.target.value })}
                  className="rounded-md border-gray-300"
                >
                  {mockCrews.map(crew => (
                    <option key={crew.id} value={crew.name}>{crew.name}</option>
                  ))}
                </select>
              ) : (
                <span className="text-sm font-medium">{workOrder.crew}</span>
              )}
            </div>

            {formData.additionalCrews?.map((crew, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Additional Crew</span>
                </div>
                <span className="text-sm font-medium">{crew}</span>
              </div>
            ))}
          </div>
        </div>

        {(workOrder.title === 'Footings' || workOrder.title === 'Walls' || workOrder.title === 'Flatwork') && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Concrete Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">Estimated CY</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.estimatedCY}
                    onChange={(e) => setFormData({ ...formData, estimatedCY: Number(e.target.value) })}
                    className="w-full rounded-md border-gray-300"
                  />
                ) : (
                  <span className="text-sm font-medium">{workOrder.estimatedCY}</span>
                )}
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">Actual CY</label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.actualCY}
                    onChange={(e) => setFormData({ ...formData, actualCY: Number(e.target.value) })}
                    className="w-full rounded-md border-gray-300"
                  />
                ) : (
                  <span className="text-sm font-medium">{workOrder.actualCY || 'Not recorded'}</span>
                )}
              </div>
            </div>
          </div>
        )}

        {(workOrder.title === 'Footings' || workOrder.title === 'Walls' || workOrder.title === 'Flatwork') && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-6">Vendors</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Concrete Vendor</span>
                </div>
                {isEditing ? (
                  <select
                    value={formData.concreteVendor}
                    onChange={(e) => setFormData({ ...formData, concreteVendor: e.target.value })}
                    className="rounded-md border-gray-300"
                  >
                    {mockVendors.filter(v => v.type === 'Concrete').map(vendor => (
                      <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-sm font-medium">{workOrder.concreteVendor}</span>
                )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Truck className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">Pump Company</span>
                </div>
                {isEditing ? (
                  <select
                    value={formData.pumpCompany}
                    onChange={(e) => setFormData({ ...formData, pumpCompany: e.target.value })}
                    className="rounded-md border-gray-300"
                  >
                    {mockVendors.filter(v => v.type === 'Pump').map(vendor => (
                      <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
                    ))}
                  </select>
                ) : (
                  <span className="text-sm font-medium">{workOrder.pumpCompany}</span>
                )}
              </div>

              {(workOrder.title === 'Footings' || workOrder.title === 'Walls') && (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">Excavator</span>
                    </div>
                    {isEditing ? (
                      <select
                        value={formData.excavator}
                        onChange={(e) => setFormData({ ...formData, excavator: e.target.value })}
                        className="rounded-md border-gray-300"
                      >
                        {mockVendors.filter(v => v.type === 'Excavator').map(vendor => (
                          <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm font-medium">{workOrder.excavator}</span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-500">Plumber</span>
                    </div>
                    {isEditing ? (
                      <select
                        value={formData.plumber}
                        onChange={(e) => setFormData({ ...formData, plumber: e.target.value })}
                        className="rounded-md border-gray-300"
                      >
                        {mockVendors.filter(v => v.type === 'Plumber').map(vendor => (
                          <option key={vendor.id} value={vendor.name}>{vendor.name}</option>
                        ))}
                      </select>
                    ) : (
                      <span className="text-sm font-medium">{workOrder.plumber}</span>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkOrderDetail;