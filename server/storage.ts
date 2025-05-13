import { users, type User, type InsertUser, type Project, type InsertProject, type ContactMessage, type InsertContactMessage } from "@shared/schema";

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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projects: Map<number, Project>;
  private contactMessages: Map<number, ContactMessage>;
  private userIdCounter: number;
  private projectIdCounter: number;
  private contactMessageIdCounter: number;

  constructor() {
    this.users = new Map();
    this.projects = new Map();
    this.contactMessages = new Map();
    this.userIdCounter = 1;
    this.projectIdCounter = 1;
    this.contactMessageIdCounter = 1;
    
    // Initialize with some example projects
    this.initializeProjects();
  }

  private initializeProjects() {
    const demoProjects: InsertProject[] = [
      {
        title: "E-Commerce Platform",
        description: "A full-featured e-commerce platform with product management, shopping cart, and payment processing.",
        technologies: "React, Node.js, MongoDB",
        demoUrl: "https://example.com/ecommerce-demo",
        sourceUrl: "https://github.com/example/ecommerce",
        iconType: "html"
      },
      {
        title: "Real-Time Chat Application",
        description: "Real-time messaging platform with private chats, group channels, and file sharing capabilities.",
        technologies: "Socket.io, Express, Vue.js",
        demoUrl: "https://example.com/chat-demo",
        sourceUrl: "https://github.com/example/chat-app",
        iconType: "chat"
      },
      {
        title: "Analytics Dashboard",
        description: "Interactive data visualization dashboard for business metrics with real-time updates and historical data.",
        technologies: "D3.js, React, Express, PostgreSQL",
        demoUrl: "https://example.com/dashboard-demo",
        sourceUrl: "https://github.com/example/analytics-dashboard",
        iconType: "chart"
      },
      {
        title: "RESTful API Service",
        description: "Scalable API service with authentication, rate limiting, and comprehensive documentation.",
        technologies: "Node.js, Express, MongoDB, JWT",
        demoUrl: "https://example.com/api-demo",
        sourceUrl: "https://github.com/example/api-service",
        iconType: "api"
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
}

export const storage = new MemStorage();
