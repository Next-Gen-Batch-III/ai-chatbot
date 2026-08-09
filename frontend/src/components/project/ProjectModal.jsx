import { useState } from "react";
import { FiX } from "react-icons/fi";
import ProjectTile from "./ProjectTile";
import NewProjectForm from "./NewProjectForm";
import ProjectDetail from "./ProjectDetail";

export default function ProjectsModal({
  projects = [],
  onClose,
  onCreateProject,
  availableChats,
  onAddChat,
  onSelectChat,
}) {
  const [activeProjectId, setActiveProjectId] = useState(null);
  const [creating, setCreating] = useState(false);

  const activeProject = projects.find((project) => project.id === activeProjectId);

  const handleCreate = async (name) => {
    const created = await onCreateProject?.(name);
    if (created) {
      setCreating(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        {activeProject ? (
          <ProjectDetail
            project={activeProject}
            onBack={() => setActiveProjectId(null)}
            onSelectChat={(chatId) => onSelectChat?.(activeProject.id, chatId)}
            availableChats={availableChats}
            onAddChat={(chatId) => onAddChat?.(activeProject.id, chatId)}
          />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm font-bold text-black">Projects</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-md p-1 text-gray-400 hover:bg-gray-100"
                aria-label="Close"
              >
                <FiX size={16} />
              </button>
            </div>

            <div className="mt-4">
              {creating ? (
                <NewProjectForm onCreate={handleCreate} onCancel={() => setCreating(false)} />
              ) : (
                <div className="flex flex-wrap gap-3">
                  <ProjectTile variant="add" label="Add new" onClick={() => setCreating(true)} />
                  {projects.map((project) => (
                    <ProjectTile
                      key={project.id}
                      variant="project"
                      label={project.name}
                      onClick={() => setActiveProjectId(project.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
