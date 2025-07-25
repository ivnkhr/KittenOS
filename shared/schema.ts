import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  technologies: text("technologies").notNull(),
  demoUrl: text("demo_url"),
  sourceUrl: text("source_url"),
  iconType: text("icon_type").notNull(),
  renderType: text("render_type").notNull().default("component"), // "component" or "iframe"
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: text("created_at").notNull(),
});

export const windowPositions = pgTable("window_positions", {
  id: serial("id").primaryKey(),
  appType: text("app_type").notNull(),
  x: integer("x").notNull(),
  y: integer("y").notNull(),
  width: text("width").notNull(),
  height: text("height").notNull(),
  isMaximized: boolean("is_maximized").notNull().default(false),
  updatedAt: text("updated_at").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  title: true,
  description: true,
  technologies: true,
  demoUrl: true,
  sourceUrl: true,
  iconType: true,
  renderType: true,
});

export const insertContactMessageSchema = createInsertSchema(contactMessages).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
});

export const insertWindowPositionSchema = createInsertSchema(windowPositions).pick({
  appType: true,
  x: true,
  y: true,
  width: true,
  height: true,
  isMaximized: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type ContactMessage = typeof contactMessages.$inferSelect;

export type InsertWindowPosition = z.infer<typeof insertWindowPositionSchema>;
export type WindowPosition = typeof windowPositions.$inferSelect;
