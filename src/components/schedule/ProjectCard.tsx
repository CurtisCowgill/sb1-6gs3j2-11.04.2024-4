import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import type { Project } from '../../types';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  return (
    <Draggable draggableId={project.id.toString()} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`rounded-full px-2 py-0.5 text-xs ${
            snapshot.isDragging
              ? 'bg-blue-100 shadow-lg'
              : 'bg-white shadow'
          }`}
        >
          <div className="truncate font-medium text-gray-900">{project.name}</div>
        </div>
      )}
    </Draggable>
  );
};

export default ProjectCard;