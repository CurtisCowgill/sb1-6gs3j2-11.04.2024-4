import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import ProjectStages from '../components/schedule/ProjectStages';
import CrewCalendar from '../components/schedule/CrewCalendar';

interface Project {
  id: string;
  name: string;
  customer: string;
  stage: string;
}

const mockProjects: Project[] = [
  { id: 'p1', name: 'Downtown Foundation', customer: 'ABC Corp', stage: 'ready' },
  { id: 'p2', name: 'Retail Center Base', customer: 'XYZ Ltd', stage: 'stakeout' },
  { id: 'p3', name: 'Office Complex', customer: 'Smith Inc', stage: 'footings' },
  { id: 'p4', name: 'Residential Project', customer: 'Johnson LLC', stage: 'walls' }
];

const mockCrews = [
  { id: 'c1', name: 'Foundation Team A' },
  { id: 'c2', name: 'Foundation Team B' },
  { id: 'c3', name: 'Wall Team' },
  { id: 'c4', name: 'Waterproofing Team' },
  { id: 'c5', name: 'Flatwork Team' }
];

const Schedule: React.FC = () => {
  const [projects, setProjects] = useState(mockProjects);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const updatedProjects = projects.map(project => {
        if (project.id === result.draggableId) {
          return {
            ...project,
            stage: destination.droppableId.startsWith('calendar-')
              ? source.droppableId
              : destination.droppableId
          };
        }
        return project;
      });
      setProjects(updatedProjects);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="space-y-6">
        <ProjectStages projects={projects} onDragEnd={handleDragEnd} />
        <CrewCalendar crews={mockCrews} />
      </div>
    </DragDropContext>
  );
};

export default Schedule;