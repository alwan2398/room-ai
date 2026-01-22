"use client";

import HeaderWorkspace from "@/components/workspace/HeaderWorkspace";
import SettingsWorkspace from "@/components/workspace/SettingsWorkspace";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getProject } from "@/actions/project-actions";

const ProjectWorkspace = () => {
  const params = useParams();
  const projectId = params.id as string;

  // Fetch project data
  const { data, isLoading, error } = useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const result = await getProject(projectId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.project;
    },
    enabled: !!projectId,
  });

  if (isLoading) {
    return (
      <main>
        <HeaderWorkspace />
        <section className="flex items-center justify-center h-[90vh]">
          <div className="text-gray-400">Loading project...</div>
        </section>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main>
        <HeaderWorkspace />
        <section className="flex items-center justify-center h-[90vh]">
          <div className="text-red-400">
            {error?.message || "Project tidak ditemukan"}
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <HeaderWorkspace />
      <section>
        <SettingsWorkspace projectId={projectId} initialTitle={data.title} />
      </section>
    </main>
  );
};

export default ProjectWorkspace;
