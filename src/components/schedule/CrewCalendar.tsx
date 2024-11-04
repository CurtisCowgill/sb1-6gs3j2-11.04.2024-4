import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { 
  format, 
  addDays, 
  startOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  getDay
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CrewCalendarProps {
  crews: Array<{
    id: string;
    name: string;
  }>;
}

const CrewCalendar: React.FC<CrewCalendarProps> = ({ crews }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('week');

  const getDays = () => {
    switch (view) {
      case 'day':
        return [currentDate];
      case 'week':
        const start = startOfWeek(currentDate, { weekStartsOn: 1 });
        return Array.from({ length: 5 }, (_, i) => addDays(start, i));
      case 'month': {
        const monthStart = startOfMonth(currentDate);
        const monthEnd = endOfMonth(currentDate);
        const start = startOfWeek(monthStart, { weekStartsOn: 1 });
        const end = addDays(monthEnd, 6 - getDay(monthEnd));
        return eachDayOfInterval({ start, end });
      }
    }
  };

  const handlePrevious = () => {
    switch (view) {
      case 'day':
        setCurrentDate(prev => addDays(prev, -1));
        break;
      case 'week':
        setCurrentDate(prev => addDays(prev, -7));
        break;
      case 'month':
        setCurrentDate(prev => subMonths(prev, 1));
        break;
    }
  };

  const handleNext = () => {
    switch (view) {
      case 'day':
        setCurrentDate(prev => addDays(prev, 1));
        break;
      case 'week':
        setCurrentDate(prev => addDays(prev, 7));
        break;
      case 'month':
        setCurrentDate(prev => addMonths(prev, 1));
        break;
    }
  };

  const days = getDays();

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handlePrevious}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="font-medium">
            {view === 'day' 
              ? format(currentDate, 'MMMM d, yyyy')
              : format(currentDate, 'MMMM yyyy')}
          </span>
          <button
            onClick={handleNext}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        <div className="flex rounded-lg overflow-hidden border">
          <button
            onClick={() => setView('day')}
            className={`px-3 py-1 text-sm ${
              view === 'day'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Day
          </button>
          <button
            onClick={() => setView('week')}
            className={`px-3 py-1 text-sm ${
              view === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Week
          </button>
          <button
            onClick={() => setView('month')}
            className={`px-3 py-1 text-sm ${
              view === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Month
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-white rounded-lg shadow">
        <div className={`min-w-[800px] h-full`}>
          <div className="grid grid-cols-[150px_1fr] h-full">
            <div className="bg-gray-50 border-r">
              <div className="h-10 border-b" />
              {crews.map(crew => (
                <div
                  key={crew.id}
                  className="h-16 px-4 flex items-center border-b"
                >
                  <span className="text-sm font-medium truncate">
                    {crew.name}
                  </span>
                </div>
              ))}
            </div>

            <div className="overflow-auto">
              <div className={`grid ${
                view === 'month' 
                  ? 'grid-cols-7' 
                  : view === 'day'
                  ? 'grid-cols-1'
                  : 'grid-cols-5'
              } border-b`}>
                {days.slice(0, view === 'month' ? 7 : days.length).map(day => (
                  <div
                    key={day.toString()}
                    className={`h-10 px-2 flex flex-col justify-center border-r text-center ${
                      !isSameMonth(day, currentDate) ? 'bg-gray-50' : ''
                    } ${isSameDay(day, new Date()) ? 'bg-blue-50' : ''}`}
                  >
                    <div className="text-xs font-medium">
                      {format(day, 'EEE')}
                    </div>
                    <div className="text-xs text-gray-500">
                      {format(day, 'MMM d')}
                    </div>
                  </div>
                ))}
              </div>

              {crews.map(crew => (
                <div
                  key={crew.id}
                  className={`grid ${
                    view === 'month'
                      ? 'grid-cols-7'
                      : view === 'day'
                      ? 'grid-cols-1'
                      : 'grid-cols-5'
                  }`}
                >
                  {days.map(day => (
                    <Droppable
                      key={`${day.toString()}-${crew.id}`}
                      droppableId={`calendar-${format(day, 'yyyy-MM-dd')}-${crew.id}`}
                      type="PROJECT"
                      mode="standard"
                      direction="vertical"
                      isCombineEnabled={false}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`h-16 border-r border-b p-1 transition-colors ${
                            snapshot.isDraggingOver ? 'bg-blue-50' : ''
                          } ${!isSameMonth(day, currentDate) ? 'bg-gray-50' : ''} 
                            ${isSameDay(day, new Date()) ? 'bg-blue-50' : ''}`}
                        >
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CrewCalendar;