import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const avatarTypes = [
  { id: "water-mage", name: "Water Mage", emoji: "🧙‍♂️" },
  { id: "ocean-warrior", name: "Ocean Warrior", emoji: "⚔️" },
  { id: "hydro-engineer", name: "Hydro Engineer", emoji: "👷‍♂️" },
  { id: "rain-shaman", name: "Rain Shaman", emoji: "🌧️" },
  { id: "aqua-scientist", name: "Aqua Scientist", emoji: "👩‍🔬" },
  { id: "tide-ranger", name: "Tide Ranger", emoji: "🏹" },
  { id: "bubble-guardian", name: "Bubble Guardian", emoji: "💧" },
  { id: "wave-rider", name: "Wave Rider", emoji: "🏄‍♂️" },
] as const;

export const presetNames = [
  "Aqua Avenger",
  "Droplet Defender",
  "Splash Captain",
  "Hydro Guardian",
] as const;

export const heroSchema = z.object({
  avatarId: z.string(),
  heroName: z.string().min(1),
  level: z.number().default(1),
  xp: z.number().default(0),
});

export type Hero = z.infer<typeof heroSchema>;

export const quizAnswerSchema = z.object({
  questionId: z.number(),
  selectedAnswer: z.number(),
  isCorrect: z.boolean(),
});

export type QuizAnswer = z.infer<typeof quizAnswerSchema>;
