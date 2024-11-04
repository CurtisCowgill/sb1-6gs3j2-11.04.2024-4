import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Calendar, Clock, Users } from 'lucide-react';
import type { WorkOrderTemplate } from '../../types/workOrders';

interface WorkOrderTemplateListProps {
  templates: WorkOrderTemplate[];
  onCreateFromTemplate: (template: WorkOrderTemplate) => void;
}

const WorkOrderTemplateList: React.FC<WorkOrderTemplateListProps> = ({
  templates,
  onCreateFromTemplate
}) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {templates.map((template) => (
        <div
          key={template.id}
          className="bg-white shadow rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
              <p className="text-sm text-gray-500">{template.description}</p>
            </div>
            <button
              onClick={() => onCreateFromTemplate(template)}
              className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Copy className="h-4 w-4 mr-2" />
              Use Template
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {template.type === 'recurring' ? (
                <span>Every {template.interval} {template.frequency}</span>
              ) : (
                <span>One-time</span>
              )}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {Math.floor(template.estimatedDuration / 60)}h {template.estimatedDuration % 60}m
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 mr-2" />
              {template.defaultCrewType}
            </div>
          </div>

          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Tasks ({template.tasks.length})</h4>
            <ul className="text-sm text-gray-500 space-y-1">
              {template.tasks.slice(0, 3).map((task) => (
                <li key={task.id}>{task.title}</li>
              ))}
              {template.tasks.length > 3 && (
                <li>+ {template.tasks.length - 3} more tasks</li>
              )}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkOrderTemplateList;