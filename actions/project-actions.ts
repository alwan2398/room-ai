"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { headers } from "next/headers";

// Zod schema for validation
const createProjectSchema = z.object({
  prompt: z.string().min(10, "Prompt minimal 10 karakter"),
  type: z.enum(["website", "app"], {
    message: "Tipe harus 'website' atau 'app'",
  }),
});

// Type definitions
type CreateProjectInput = z.infer<typeof createProjectSchema>;

interface CreateProjectSuccess {
  success: true;
  projectId: string;
}

interface CreateProjectError {
  success: false;
  error: string;
}

type CreateProjectResult = CreateProjectSuccess | CreateProjectError;

export async function createProject(
  input: CreateProjectInput
): Promise<CreateProjectResult> {
  try {
    // 1. Auth check - get session using Better Auth
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Anda harus login terlebih dahulu",
      };
    }

    // 2. Validate input with Zod
    const validationResult = createProjectSchema.safeParse(input);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0]?.message || "Input tidak valid",
      };
    }

    const { prompt, type } = validationResult.data;

    // 3. Generate project ID
    const projectId = crypto.randomUUID();

    // 4. Create title from first 50 chars of prompt
    const title = prompt.length > 50 ? prompt.slice(0, 50) + "..." : prompt;

    // 5. Insert into database
    await db.insert(projects).values({
      id: projectId,
      userId: session.user.id,
      title,
      prompt,
      type,
    });

    // 6. Return success
    return {
      success: true,
      projectId,
    };
  } catch (error) {
    console.error("Error creating project:", error);
    return {
      success: false,
      error: "Gagal membuat project. Silakan coba lagi.",
    };
  }
}
