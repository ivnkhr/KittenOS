import { users, type User, type InsertUser, type Project, type InsertProject, type ContactMessage, type InsertContactMessage, type WindowPosition, type InsertWindowPosition } from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  
  // Contact message methods
  createContactMessage(message: InsertContactMessage & { createdAt: string }): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  
  // Window position methods
  getWindowPosition(appType: string): Promise<WindowPosition | undefined>;
  saveWindowPosition(position: InsertWindowPosition & { updatedAt: string }): Promise<WindowPosition>;
  getAllWindowPositions(): Promise<WindowPosition[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contactMessages: Map<number, ContactMessage>;
  private windowPositions: Map<string, WindowPosition>;
  private userIdCounter: number;
  private projectIdCounter: number;
  private contactMessageIdCounter: number;
  private windowPositionIdCounter: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactMessages = new Map();
    this.windowPositions = new Map();
    this.userIdCounter = 1;
    this.projectIdCounter = 1;
    this.contactMessageIdCounter = 1;
    this.windowPositionIdCounter = 1;
    
    // Initialize with some example projects
    this.initializeProjects();
  }

  private initializeProjects() {
    const demoProjects: InsertProject[] = [
      {
        title: "Blog Page Browser",
        description: "Personal blog showcasing technical articles and thoughts on web development.",
        technologies: "Gatsby, React, GraphQL",
        demoUrl: "https://example.com/blog",
        sourceUrl: "https://github.com/example/blog",
        iconType: "notepad",
        renderType: "iframe"
      },
      {
        title: "LessTube",
        description: "Chrome extension for ad-free YouTube viewing with enhanced privacy features.",
        technologies: "JavaScript, Chrome Extension API",
        demoUrl: "https://chrome.google.com/webstore/detail/lesstube",
        sourceUrl: "https://github.com/example/lesstube",
        iconType: "globe",
        renderType: "iframe"
      },
      {
        title: "MentalQuest",
        description: "Mental health tracking and wellness application with personalized insights.",
        technologies: "React Native, Node.js, PostgreSQL",
        demoUrl: "https://mentalquest.app",
        sourceUrl: "https://github.com/example/mentalquest",
        iconType: "profile",
        renderType: "iframe"
      },
      {
        title: "LegacySPACE.mobile",
        description: "Mobile app for exploring retro computing history and legacy systems.",
        technologies: "Flutter, Firebase, Cloud Functions",
        demoUrl: "https://legacyspace.mobile",
        sourceUrl: "https://github.com/example/legacyspace-mobile",
        iconType: "computer",
        renderType: "iframe"
      }
    ];

    demoProjects.forEach(project => {
      this.createProject(project);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Project methods
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }
  
  // Contact message methods
  async createContactMessage(messageData: InsertContactMessage & { createdAt: string }): Promise<ContactMessage> {
    const id = this.contactMessageIdCounter++;
    const message: ContactMessage = { ...messageData, id };
    this.contactMessages.set(id, message);
    return message;
  }
  
  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }
  
  // Window position methods
  async getWindowPosition(appType: string): Promise<WindowPosition | undefined> {
    return this.windowPositions.get(appType);
  }
  
  async saveWindowPosition(positionData: InsertWindowPosition & { updatedAt: string }): Promise<WindowPosition> {
    const existingPosition = this.windowPositions.get(positionData.appType);
    
    if (existingPosition) {
      // Update existing position
      const updatedPosition: WindowPosition = { ...existingPosition, ...positionData };
      this.windowPositions.set(positionData.appType, updatedPosition);
      return updatedPosition;
    } else {
      // Create new position
      const id = this.windowPositionIdCounter++;
      const newPosition: WindowPosition = { ...positionData, id };
      this.windowPositions.set(positionData.appType, newPosition);
      return newPosition;
    }
  }
  
  async getAllWindowPositions(): Promise<WindowPosition[]> {
    return Array.from(this.windowPositions.values());
  }
}

export const storage = new MemStorage();
