import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface Project {
  id: string;
  name: string;
  customer: string;
}

interface StageColumnProps {
  stageId: string;
  title: string;
  projects: Project[];
}

const StageColumn: React.FC<StageColumnProps> = ({ stageId, title, projects }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-2 font-medium text-sm bg-gray-50 border-b rounded-t-lg">
        {title} ({projects.length})
      </div>
      <Droppable
        droppableId={stageId}
        type="PROJECT"
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`flex-1 p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-24rem)] ${
              snapshot.isDraggingOver ? 'bg-blue-50' : 'bg-white'
            }`}
          >
            {projects.map((project, index) => (
              <Draggable 
                key={project.id} 
                draggableId={project.id} 
                index={index}
              >
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`px-3 py-1 text-xs rounded-full ${
                      snapshot.isDragging 
                        ? 'bg-blue-100 shadow-lg' 
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    <div className="font-medium truncate">{project.name}</div>
                    <div className="text-gray-500 truncate text-xs">{project.customer}</div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StageColumn;