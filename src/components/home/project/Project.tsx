"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { Bell, Plus, Search, Settings } from "lucide-react";
import CreateProject from "./createProject";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import {  setProjects } from "@/lib/features/projectSlice";
import apiClient from "@/utils/apiClient";

interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  [key: string]: any;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  orgId: string;
  createdBy: User;
  members: User[];
}
const Projects = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const projectsData = useSelector(
    (state: RootState) => state.project.projects
  );
  const fetchProjects = async () => {
    try {
      const response = await apiClient.get<{ projects: Project[] }>("/projects");
      dispatch(setProjects(response?.projects));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProjects();
  }, []);



  console.log("projectf:", projectsData);

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center md:justify-between">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Projects</h1>
          <div className="flex items-center space-x-4">
            <div className="relative max-sm:flex max-sm:space-x-2">
              <Search className="absolute md:left-3 left-1 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tasks..."
                className="md:pl-10 pl-8 md:pr-4  py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none md:w-64"
              />
            </div>
            <button
              onClick={() => setModalOpen(true)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto p-8">
        {projectsData.length === 0 ? (
          <div className="text-center text-slate-500 text-lg py-20">
            🚫 No projects found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectsData.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>

      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <CreateProject
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};

export default Projects;
