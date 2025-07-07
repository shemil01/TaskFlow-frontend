"use client";
import React, { useState } from "react";
import { FolderPlus, ArrowLeft, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/store";
import { setProject } from "../../../lib/features/projectSlice";
import apiClient from "@/utils/apiClient";
import { toast } from "react-toastify";

export default function CreateProject({ isOpen, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const org = useSelector((state: RootState) => state.organization.currentOrg);

  const handleCreate = async () => {
    if (!org) return alert('Organization missing');

    const res = await apiClient.post("/projects", { name, description });

    const data =  res;
    if (data.success) {
      dispatch(setProject(data.project));
      toast.success("Project created");
      onClose();
    }
  };
  if (!isOpen) return null;

  return (
    <div className="w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-8 text-white">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              <FolderPlus className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Create New Project</h1>
              <p className="text-blue-100 mt-2">
                Start building something amazing
              </p>
            </div>
          </div>
         
        </div>

        {/* Form Section */}
        <div className="p-5">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Project Name *
              </label>
              <input
                type="text"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your project name"
              />
              <p className="text-sm text-gray-500 mt-2">
                Choose a clear, descriptive name for your project
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Description
              </label>
              <textarea
                rows={6}
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg placeholder-gray-400 resize-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what this project is about, its goals, and key objectives..."
              />
              <p className="text-sm text-gray-500 mt-2">
                Help your team understand the project's purpose and scope
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
              onClick={onClose}
                type="button"
                className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </button>

              <button
                onClick={handleCreate}
                disabled={!name.trim()}
                className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 ${
                  name.trim()
                    ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                <FolderPlus className="w-5 h-5 mr-2" />
                Create Project
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section */}
      {/* <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Project Creation Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-blue-600 font-bold text-xs">1</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Clear Project Name</p>
              <p>
                Use a descriptive name that clearly identifies the project's
                purpose
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-green-600 font-bold text-xs">2</span>
            </div>
            <div>
              <p className="font-medium text-gray-900">Detailed Description</p>
              <p>
                Include goals, scope, and key information for team alignment
              </p>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
