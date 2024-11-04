import React from 'react';
import { 
  FolderKanban, 
  CheckCircle2, 
  Truck, 
  ClipboardCheck,
  Calendar
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  type: 'project' | 'inspection' | 'concrete' | 'schedule';
  action: string;
  description: string;
  timestamp: Date;
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'project',
    action: 'Project Started',
    description: 'Downtown Foundation Repair kicked off',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: '2',
    type: 'inspection',
    action: 'Inspection Passed',
    description: 'Sienna Ranch - 3001 passed foundation inspection',
    timestamp: new Date(Date.now() - 1000 * 60 * 60) // 1 hour ago
  },
  {
    id: '3',
    type: 'concrete',
    action: 'Concrete Pour Scheduled',
    description: 'Brookfield - 2505 scheduled for tomorrow',
    timestamp: new Date(Date.now() - 1000 * 60 * 90) // 1.5 hours ago
  },
  {
    id: '4',
    type: 'schedule',
    action: 'Schedule Updated',
    description: 'Added 3 new projects to next week\'s schedule',
    timestamp: new Date(Date.now() - 1000 * 60 * 120) // 2 hours ago
  },
  {
    id: '5',
    type: 'inspection',
    action: 'Inspection Scheduled',
    description: 'Waterproofing inspection for Brookfield - 2509',
    timestamp: new Date(Date.now() - 1000 * 60 * 180) // 3 hours ago
  }
];

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'project':
      return FolderKanban;
    case 'inspection':
      return ClipboardCheck;
    case 'concrete':
      return Truck;
    case 'schedule':
      return Calendar;
    default:
      return CheckCircle2;
  }
};

const getActivityColor = (type: Activity['type']) => {
  switch (type) {
    case 'project':
      return 'text-blue-500';
    case 'inspection':
      return 'text-green-500';
    case 'concrete':
      return 'text-purple-500';
    case 'schedule':
      return 'text-orange-500';
    default:
      return 'text-gray-500';
  }
};

const RecentActivity: React.FC = () => {
  return (
    <div className="space-y-4">
      {mockActivities.map((activity) => {
        const Icon = getActivityIcon(activity.type);
        const iconColor = getActivityColor(activity.type);
        
        return (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`flex-shrink-0 ${iconColor}`}>
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">{activity.action}</p>
              <p className="text-sm text-gray-500">{activity.description}</p>
            </div>
            <div className="flex-shrink-0">
              <p className="text-xs text-gray-500">
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RecentActivity;