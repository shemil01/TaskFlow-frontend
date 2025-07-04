"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setOrg } from "../../lib/features/orgSlice";
import apiClient from "@/utils/apiClient";
import { toast } from "react-toastify";
import {
  ChevronRight,
  Building2,
//   Users,
//   Mail,
//   Globe,
//   Camera,
  ArrowLeft,
} from "lucide-react";

export default function CreateOrganization() {
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const handleCreate = async () => {
    const res = await apiClient.post("/organizations", { name });

    const data = await res;
    console.log("res:", data);
    if (data.success) {
      dispatch(setOrg(data.org));
      toast.success("Organization created");
    }
  };

  const [step, setStep] = useState(1);




  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">
                Create Your Organization
              </h1>
              <div className="text-sm text-gray-500">
                {step === 1 && "Basic Information"}
                {step === 2 && "Organization Details"}
                {step === 3 && "Team Setup"}
              </div>
            </div>
            <div className="mt-4 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          <div className="px-8 py-8">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building2 className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Let's start with the basics
                  </h2>
                  <p className="text-gray-600 mt-2">
                    Tell us about your organization
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    name="orgName"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Organization name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization URL
                  </label>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-3 py-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-lg">
                      workflow.com/
                    </span>
                    <input
                      type="text"
                      name="orgUrl"
                      placeholder="your-org-name"
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose a unique URL for your organization
                  </p>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrev}
                disabled={step === 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  step === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={handleCreate}
                  className="flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Organization
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>
            By creating an organization, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
