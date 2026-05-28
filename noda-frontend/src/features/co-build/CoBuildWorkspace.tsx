import React, { useState } from "react";
import ProjectCard from "./components/ProjectCard";
import ProjectFilterSidebar from "./components/ProjectFilterSidebar";

interface ProjectData {
  id: string;
  title: string;
  hook: string;
  description: string;
  images: string[];
  lookingFor: string[];
  techStack: string[];
  compensation: string;
  upvotes: number;
  currentTeam: { name: string; initials: string; role: string }[];
}

const CoBuildWorkspace = () => {
  const [projects, setProjects] = useState<ProjectData[]>([
    {
      id: "BLD-092",
      title: "synapse-mesh",
      hook: "A high-performance peer-to-peer execution layer bypassing centralized databases entirely for real-time collaboration.",
      description:
        "Building an ephemeral matrix engine handling extreme real-time updates over low-bandwidth environments...",
      images: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop",
      ],
      lookingFor: ["Backend", "DevOps"],
      techStack: ["Rust", "TypeScript", "Libp2p"],
      compensation: "50/50 Equity",
      upvotes: 614,
      currentTeam: [
        { name: "Marcus V.", initials: "MV", role: "Systems" },
        { name: "Elena R.", initials: "ER", role: "Frontend" },
      ],
    },
    {
      id: "BLD-093",
      title: "vortex-canvas",
      hook: "Vector layout engine running completely isolated within lightweight client-side WebAssembly sandboxes.",
      description:
        "We are reimagining design tooling using a raw WebGL pipeline instead of DOM trees...",
      images: [
        "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=400&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop",
      ],
      lookingFor: ["Frontend", "UI/UX"],
      techStack: ["TypeScript", "React", "Rust"],
      compensation: "Profit Share",
      upvotes: 342,
      currentTeam: [{ name: "Sora L.", initials: "SL", role: "Graphics Lead" }],
    },
  ]);

  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedCompensation, setSelectedCompensation] = useState<string[]>(
    [],
  );

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p)),
    );
  };

  const toggleFilter = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string,
  ) => {
    if (list.includes(item)) {
      setList(list.filter((x) => x !== item));
    } else {
      setList([...list, item]);
    }
  };

  return (
    <div className="flex flex-1 min-w-0 ">
      {/* Primary Interface Grid Feed */}
      <main className="flex-1 min-h-screen bg-white flex flex-col min-w-0">
        <div className="p-2 bg-zinc-200 border-b border-zinc-300 flex items-center justify-between font-mono">
          <div className="text-[10px] font-black uppercase text-zinc-900 tracking-tight flex items-center gap-2">
            <span>Find your next coding project</span>
          </div>
        </div>

        {/* Dynamic Project Grid Feed */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-x divide-y divide-zinc-300">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onUpvote={handleUpvote}
            />
          ))}
        </div>
      </main>

      {/* Separated Filters Panel Sidebar (Stays perfectly aligned to the right side of main) */}
      <ProjectFilterSidebar
        selectedRoles={selectedRoles}
        selectedSkills={selectedSkills}
        selectedCompensation={selectedCompensation}
        onToggleFilter={toggleFilter}
        setSelectedRoles={setSelectedRoles}
        setSelectedSkills={setSelectedSkills}
        setSelectedCompensation={setSelectedCompensation}
      />
    </div>
  );
};

export default CoBuildWorkspace;
