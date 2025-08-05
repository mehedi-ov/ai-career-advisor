// src/types/index.ts (Final and Complete)

import type { User } from 'firebase/auth';
import type { Timestamp } from 'firebase/firestore';

// --- Core User and Authentication ---

// The user object provided by Firebase Auth. Can be null if not logged in.
export type AuthUser = User | null;


// --- AI Career Advisor ---

// Structure for a single job role suggested by the AI.
export interface JobRole {
  title: string;
  description: string;
}

// Structure for a single course or resource link.
export interface RecommendedCourse {
  name:string;
  link: string;
}

// The complete, structured response from the OpenRouter AI API.
export interface AIResponse {
  jobRoles: JobRole[];
  learningPath: string[];
  recommendedCourses: RecommendedCourse[];
}


// --- Roadmap Builder ---

// Structure for a single node within the interactive roadmap.
// Structure for a single node within the interactive roadmap.
export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  position: { x: number; y: number };
  color: string; // <-- ADD THIS LINE for styling
}

// The main roadmap document saved in Firestore for each user.
export interface Roadmap {
  id: string;
  userId: string;
  name: string;
  nodes: RoadmapNode[];
  createdAt: Timestamp; // Use Firestore's own Timestamp type for consistency
}


// --- Suggestion History ---

// The document structure for saving each AI suggestion to the user's history.
export interface SuggestionHistoryItem {
  id: string;
  userId: string;
  createdAt: Timestamp; // Use Firestore's own Timestamp type
  inputs: {
    skills: string;
    interests: string;
    goals: string;
  };
  suggestions: AIResponse;
}