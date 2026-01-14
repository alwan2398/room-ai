import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

// users table
export const users = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  image: text("image"),
  credits: integer("credits").default(2), // Free credits per user
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// projects table
export const projects = pgTable("project", {
  id: text("id").primaryKey(), // managed by nanoid in app logic
  userId: text("user_id").references(() => users.id).notNull(),
  title: text("title").notNull(),
  prompt: text("prompt").notNull(),
  type: text("type").notNull(), // 'website' | 'app'
  createdAt: timestamp("created_at").defaultNow(),
});

// generations table
export const generations = pgTable("generation", {
  id: text("id").primaryKey(),
  projectId: text("project_id").references(() => projects.id).notNull(),
  htmlCode: text("html_code").notNull(),
  version: integer("version").default(1),
  createdAt: timestamp("created_at").defaultNow(),
});
