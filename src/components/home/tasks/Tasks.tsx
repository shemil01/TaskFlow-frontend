"use client";
import React, { useState } from "react";
import {
  Plus,
  MoreHorizontal,
  Calendar,
  User,
  Flag,
  Search,
  Filter,
  Bell,
  Settings,
} from "lucide-react";
import CreateProject from "./createProject";

const Tasks = () => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const initialData = {
    backlog: {
      title: "Backlog",
      color: "bg-slate-100 border-slate-200",
      items: [
        {
          id: 1,
          title: "User Authentication System",
          description: "Implement secure login and registration functionality",
          priority: "high",
          assignee: "Sarah Chen",
          dueDate: "2024-07-15",
          tags: ["Backend", "Security"],
        },
        {
          id: 2,
          title: "Database Schema Design",
          description: "Design and implement the core database structure",
          priority: "medium",
          assignee: "Mike Johnson",
          dueDate: "2024-07-20",
          tags: ["Database", "Architecture"],
        },
      ],
    },
    todo: {
      title: "To Do",
      color: "bg-blue-50 border-blue-200",
      items: [
        {
          id: 3,
          title: "Mobile App UI Design",
          description: "Create responsive mobile interface mockups",
          priority: "high",
          assignee: "Emma Wilson",
          dueDate: "2024-07-12",
          tags: ["Design", "Mobile"],
        },
        {
          id: 4,
          title: "API Documentation",
          description: "Write comprehensive API documentation",
          priority: "low",
          assignee: "David Park",
          dueDate: "2024-07-25",
          tags: ["Documentation", "API"],
        },
      ],
    },
    progress: {
      title: "In Progress",
      color: "bg-amber-50 border-amber-200",
      items: [
        {
          id: 5,
          title: "Payment Integration",
          description: "Integrate Stripe payment processing",
          priority: "high",
          assignee: "Alex Rodriguez",
          dueDate: "2024-07-18",
          tags: ["Backend", "Payment"],
        },
      ],
    },
    review: {
      title: "Review",
      color: "bg-purple-50 border-purple-200",
      items: [
        {
          id: 6,
          title: "Landing Page Optimization",
          description: "Improve SEO and loading performance",
          priority: "medium",
          assignee: "Lisa Thompson",
          dueDate: "2024-07-14",
          tags: ["Frontend", "SEO"],
        },
      ],
    },
    done: {
      title: "Done",
      color: "bg-green-50 border-green-200",
      items: [
        {
          id: 7,
          title: "Project Setup",
          description: "Initialize project structure and dependencies",
          priority: "high",
          assignee: "John Doe",
          dueDate: "2024-07-05",
          tags: ["Setup", "Configuration"],
        },
      ],
    },
  };

  const [columns, setColumns] = useState(initialData);

  const handleDragStart = (e, item, columnId) => {
    setDraggedItem({ item, sourceColumn: columnId });
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.FormEvent, targetColumnId) => {
    e.preventDefault();
    if (!draggedItem) return;

    const { item, sourceColumn } = draggedItem;

    if (sourceColumn === targetColumnId) {
      setDraggedItem(null);
      return;
    }

    setColumns((prev) => {
      const newColumns = { ...prev };

      // Remove from source column
      newColumns[sourceColumn].items = newColumns[sourceColumn].items.filter(
        (i) => i.id !== item.id
      );

      // Add to target column
      newColumns[targetColumnId].items.push(item);

      return newColumns;
    });

    setDraggedItem(null);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getAvatarColor = (name) => {
    const colors = [
      "bg-blue-500",
      "bg-purple-500",
      "bg-green-500",
      "bg-pink-500",
      "bg-indigo-500",
    ];
    return colors[name.length % colors.length];
  };

  const filteredColumns = Object.entries(columns).reduce(
    (acc, [columnId, column]) => {
      if (searchTerm) {
        const filteredItems = column.items.filter(
          (item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.tags.some((tag) =>
              tag.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
        acc[columnId] = { ...column, items: filteredItems };
      } else {
        acc[columnId] = column;
      }
      return acc;
    },
    {}
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 ">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-end">
         

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none w-64"
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
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-6 overflow-x-auto pb-6">
          {Object.entries(filteredColumns).map(([columnId, column]) => (
            <div
              key={columnId}
              className={`min-w-80 ${column.color} rounded-xl border-2 border-dashed transition-all duration-300 hover:shadow-lg`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, columnId)}
            >
              {/* Column Header */}
              <div className="p-4 border-b border-slate-200 bg-white bg-opacity-50 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-semibold text-slate-900">
                      {column.title}
                    </h3>
                    <span className="bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs font-medium">
                      {column.items.length}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-slate-500 hover:text-slate-700 hover:bg-white rounded transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-slate-500 hover:text-slate-700 hover:bg-white rounded transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Column Content */}
              <div className="p-4 space-y-3 min-h-96">
                {column.items.map((item) => (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item, columnId)}
                    className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 cursor-move hover:shadow-md transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.title}
                      </h4>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getPriorityColor(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-slate-100 text-slate-700 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-6 h-6 rounded-full ${getAvatarColor(
                            item.assignee
                          )} flex items-center justify-center`}
                        >
                          <User className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs text-slate-600">
                          {item.assignee}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(item.dueDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add New Task Button */}
                <button className="w-full py-3 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span className="text-sm font-medium">Add new task</span>
                </button>
              </div>
            </div>
          ))}
        </div>
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

export default Tasks;
