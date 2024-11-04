import React from 'react';
import { 
  FolderKanban, 
  CheckCircle2, 
  Truck, 
  ClipboardCheck,
  Calendar
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  name: string;
  stage: 'stakeout' | 'footings' | 'walls' | 'strip' | 'waterproofing' | 'flatwork';
  inspection?: string;
  concrete?: string;
}

const stageColors = {
  stakeout: 'bg-blue-100 text-blue-800',
  footings: 'bg-green-100 text-green-800',
  walls: 'bg-amber-100 text-amber-800',
  strip: 'bg-purple-100 text-purple-800',
  waterproofing: 'bg-pink-100 text-pink-800',
  flatwork: 'bg-emerald-100 text-emerald-800'
};

const mockSchedule: ScheduleItem[] = [
  {
    id: '1',
    name: 'Downtown Foundation Repair',
    stage: 'walls',
    inspection: '9:00 AM',
    concrete: '10:30 AM'
  },
  {
    id: '2',
    name: 'Eastside Commercial Complex',
    stage: 'footings',
    inspection: '2:00 PM'
  },
  {
    id: '3',
    name: 'Riverside Development',
    stage: 'stakeout',
    concrete: '7:00 AM'
  }
];

const stages = [
  { id: 'stakeout', label: 'Stake Out' },
  { id: 'footings', label: 'Footings' },
  { id: 'walls', label: 'Walls' },
  { id: 'strip', label: 'Strip' },
  { id: 'waterproofing', label: 'Waterproofing' },
  { id: 'flatwork', label: 'Flatwork' }
];

const TodaySchedule: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 gap-4">
        {stages.map(stage => {
          const stageItems = mockSchedule.filter(item => item.stage === stage.id);
          
          return (
            <div key={stage.id} className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700">{stage.label}</h3>
              <div className="space-y-2">
                {stageItems.map(item => (
                  <div
                    key={item.id}
                    className={`${stageColors[item.stage]} p-2 rounded-lg text-sm`}
                  >
                    <p className="font-medium truncate">{item.name}</p>
                    <div className="mt-1 space-y-1">
                      {item.inspection && (
                        <div className="flex items-center space-x-1">
                          <ClipboardCheck className="h-4 w-4" />
                          <span>{item.inspection}</span>
                        </div>
                      )}
                      {item.concrete && (
                        <div className="flex items-center space-x-1">
                          <Truck className="h-4 w-4" />
                          <span>{item.concrete}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodaySchedule;