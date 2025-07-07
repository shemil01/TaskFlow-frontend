"use client";

import apiClient from "@/utils/apiClient";
import { Users, Building2, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";
import EditProject from "./EditProject";

interface User {
  _id: string;
  name: string;
  avatar?: string;
}

interface Project {
  _id: string;
  name: string;
  description: string;
  orgId: string;
  createdBy: User;
  members: User[];
}

interface ProjectCardProps {
  project: Project;
}
const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState("");



const handleAddMember = async () => {
  if (!selectedUserId) return;

  try {
    const res = await apiClient.put(`/projects/${project._id}/${selectedUserId}`);
    toast.success("Member added");

    // Optional: update UI or reload projects from API
    // You can use a Redux action like dispatch(fetchProjects()) if needed

    setShowUserSelect(false);
    setSelectedUserId("");
  } catch (err) {
    console.error(err);
    toast.error("Failed to add member");
  }
};


  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(`/projects/${id}`);
      console.log("resd:", response);
      toast.success(response.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors mb-2">
            {project.name}
          </h3>
        </div>
        <div className="relative">
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <p className="text-slate-600 text-sm mb-6 line-clamp-3">
        {project.description}
      </p>

      {/* Project Details */}
      <div className="space-y-3 mb-6">
        {/* Organization */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs text-slate-500">Organization</p>
            <p className="text-sm font-medium text-slate-900">
              Org ID: {project.orgId}
            </p>
          </div>
        </div>

        {/* Created By */}
        <div className="flex items-center space-x-3">
          <div
            className={`w-8 h-8  rounded-lg flex items-center justify-center`}
          >
            {project?.createdBy.avatar ? (
              <img
                src={project?.createdBy.avatar}
                alt="avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            ) : (
              <div
                className={`w-full h-full 
                 flex items-center justify-center bg-green-400`}
              >
                <span className="text-white text-xs font-medium ">
                  {getInitials(project.createdBy.name)}
                </span>
              </div>
            )}
          </div>
          <div>
            <p className="text-xs text-slate-500">Created by</p>
            <p className="text-sm font-medium text-slate-900">
              {project.createdBy.name}
            </p>
          </div>
        </div>
      </div>

      {/* Members Section */}
      <div className="border-t border-slate-100 pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium text-slate-700">
              Team Members
            </span>
          </div>
          <span className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
            {project.members.length}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {project.members.slice(0, 4).map((member, index) => (
            <div
              key={member._id}
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm overflow-hidden"
              style={{ marginLeft: index > 0 ? "-8px" : "0" }}
            >
              {member.avatar ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className={`w-full h-full 
                 flex items-center justify-center bg-green-400`}
                >
                  <span className="text-white text-xs font-medium ">
                    {getInitials(member.name)}
                  </span>
                </div>
              )}
            </div>
          ))}

          {project.members.length <= 4 && (
            <>
              <button
                onClick={() => setShowUserSelect(true)}
                className="w-8 h-8 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
              >
                <span className="text-slate-400 text-lg">+</span>
              </button>

              {showUserSelect && (
                <div className="absolute mt-2 bg-white shadow-md border rounded-lg p-4 z-50">
                  <select
                    value={selectedUserId}
                    onChange={(e) => setSelectedUserId(e.target.value)}
                    className="border px-2 py-1 rounded mb-2"
                  >
                    <option value="">Select user</option>
                    {/* Replace this list with dynamic user list */}
                    <option value="USER_ID_1">User 1</option>
                    <option value="USER_ID_2">User 2</option>
                  </select>
                  <button
                    onClick={handleAddMember}
                    className="ml-2 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowUserSelect(false)}
                    className="ml-2 px-3 py-1 text-sm text-gray-600 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}

          {/* {project.members.length <= 4 && (
            <button className="w-8 h-8 border-2 border-dashed border-slate-300 rounded-full flex items-center justify-center hover:border-blue-400 hover:bg-blue-50 transition-colors">
              <span className="text-slate-400 text-lg">+</span>
            </button>
          )} */}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          View Project
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setModalOpen(true)}
            className="px-3 py-2 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-100 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(project?._id)}
            className="px-3 py-2 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
      {modalOpen && (
        <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <EditProject
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            project={project}
          />
        </div>
      )}
    </div>
  );
};

export default ProjectCard;
