"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createProject } from "@/actions/project-actions";

interface CreateProjectInput {
  prompt: string;
  type: "website" | "app";
}

export function useCreateProject() {
  const router = useRouter();

  return useMutation({
    mutationFn: async (input: CreateProjectInput) => {
      const result = await createProject(input);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result;
    },
    onSuccess: (data) => {
      toast.success("Project berhasil dibuat!");
      router.push(`/project/${data.projectId}`);
    },
    onError: (error: Error) => {
      toast.error(error.message || "Gagal membuat project");
    },
  });
}
