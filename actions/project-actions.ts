"use server";

import { z } from "zod";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

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
  input: CreateProjectInput,
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

// ============================================
// UPDATE PROJECT TITLE
// ============================================

const updateTitleSchema = z.object({
  projectId: z.string().min(1, "Project ID diperlukan"),
  newTitle: z.string().min(3, "Judul minimal 3 karakter"),
});

type UpdateTitleInput = z.infer<typeof updateTitleSchema>;

interface UpdateTitleSuccess {
  success: true;
  title: string;
}

interface UpdateTitleError {
  success: false;
  error: string;
}

type UpdateTitleResult = UpdateTitleSuccess | UpdateTitleError;

export async function updateProjectTitle(
  input: UpdateTitleInput,
): Promise<UpdateTitleResult> {
  try {
    // 1. Auth check
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
    const validationResult = updateTitleSchema.safeParse(input);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0]?.message || "Input tidak valid",
      };
    }

    const { projectId, newTitle } = validationResult.data;

    // 3. Update the project title in database
    const result = await db
      .update(projects)
      .set({ title: newTitle })
      .where(eq(projects.id, projectId))
      .returning({ title: projects.title });

    if (!result.length) {
      return {
        success: false,
        error: "Project tidak ditemukan",
      };
    }

    // 4. Revalidate the project page
    revalidatePath(`/project/${projectId}`);

    return {
      success: true,
      title: result[0].title,
    };
  } catch (error) {
    console.error("Error updating project title:", error);
    return {
      success: false,
      error: "Gagal mengubah judul project. Silakan coba lagi.",
    };
  }
}

// ============================================
// GET PROJECT
// ============================================

interface Project {
  id: string;
  title: string;
  prompt: string;
  type: string;
  userId: string;
  createdAt: Date | null;
}

interface GetProjectSuccess {
  success: true;
  project: Project;
}

interface GetProjectError {
  success: false;
  error: string;
}

type GetProjectResult = GetProjectSuccess | GetProjectError;

export async function getProject(projectId: string): Promise<GetProjectResult> {
  try {
    // 1. Auth check
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Anda harus login terlebih dahulu",
      };
    }

    // 2. Fetch project from database
    const result = await db
      .select()
      .from(projects)
      .where(eq(projects.id, projectId))
      .limit(1);

    if (!result.length) {
      return {
        success: false,
        error: "Project tidak ditemukan",
      };
    }

    const project = result[0];

    // 3. Check ownership
    if (project.userId !== session.user.id) {
      return {
        success: false,
        error: "Anda tidak memiliki akses ke project ini",
      };
    }

    return {
      success: true,
      project,
    };
  } catch (error) {
    console.error("Error fetching project:", error);
    return {
      success: false,
      error: "Gagal mengambil data project. Silakan coba lagi.",
    };
  }
}
