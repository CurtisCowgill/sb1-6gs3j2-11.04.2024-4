import React from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import type { Project } from './mapData';

interface ProjectMarkersProps {
  projects: Project[];
  selectedStages: Set<string>;
  stageColors: Record<string, string>;
  stageNames: Record<string, string>;
}

const createMarkerIcon = (stage: string) => new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: `custom-icon-${stage}`
});

const ProjectMarkers: React.FC<ProjectMarkersProps> = ({
  projects,
  selectedStages,
  stageColors,
  stageNames
}) => {
  return (
    <>
      {projects
        .filter(project => selectedStages.has(project.stage))
        .map(project => (
          <Marker
            key={project.id}
            position={project.coordinates}
            icon={createMarkerIcon(project.stage)}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-medium text-gray-900">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.location}</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm">
                    <span className="font-medium">Customer:</span> {project.customer}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Stage:</span>{' '}
                    <span style={{ color: stageColors[project.stage] }}>
                      {stageNames[project.stage]}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Status:</span> {project.status}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Start Date:</span> {project.startDate}
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </>
  );
};

export default ProjectMarkers;