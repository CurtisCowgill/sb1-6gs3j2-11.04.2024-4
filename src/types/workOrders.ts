export type WorkOrderFrequency = 'once' | 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type WorkOrderPriority = 'low' | 'medium' | 'high' | 'emergency';
export type WorkOrderStatus = 'draft' | 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'blocked';
export type CrewType = 'foundation' | 'walls' | 'waterproofing' | 'flatwork' | 'general';
export type ResourceType = 'material' | 'equipment' | 'labor';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  duration: number; // in minutes
  dependencies?: string[]; // Task IDs
  assignedTo?: string; // Crew ID
  completedAt?: string;
  completedBy?: string;
  notes?: string;
}

export interface Resource {
  id: string;
  type: ResourceType;
  name: string;
  quantity: number;
  unit: string;
  cost?: number;
  notes?: string;
}

export interface WorkOrderTemplate {
  id: string;
  name: string;
  description?: string;
  type: 'recurring' | 'adhoc';
  frequency?: WorkOrderFrequency;
  interval?: number; // e.g., every 2 weeks
  priority: WorkOrderPriority;
  estimatedDuration: number; // in minutes
  defaultCrewType: CrewType;
  tasks: Task[];
  resources: Resource[];
  tags?: string[];
}

export interface WorkOrder extends WorkOrderTemplate {
  projectId?: string;
  scheduledStart?: string;
  scheduledEnd?: string;
  actualStart?: string;
  actualEnd?: string;
  status: WorkOrderStatus;
  progress: number;
  assignedCrews: string[]; // Crew IDs
  completionCriteria?: {
    requiresInspection: boolean;
    requiresSignoff: boolean;
    requiredDocuments?: string[];
  };
  linkedWorkOrders?: {
    dependencies: string[]; // Work Order IDs that must be completed first
    dependents: string[]; // Work Order IDs that depend on this one
  };
  weather?: {
    temperature?: number;
    conditions?: string;
    windSpeed?: number;
  };
  costs?: {
    estimated: number;
    actual: number;
    materials: number;
    labor: number;
    equipment: number;
  };
  quality?: {
    inspectionRequired: boolean;
    inspectionPassed?: boolean;
    inspectionDate?: string;
    inspector?: string;
    notes?: string;
  };
  safety?: {
    hazards: string[];
    requiredPPE: string[];
    specialInstructions?: string;
  };
}