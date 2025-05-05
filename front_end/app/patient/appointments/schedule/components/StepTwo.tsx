"use client"

import { Check } from "lucide-react"
import { Reason, DoctorType } from "../types"

interface StepTwoProps {
  selectedReasons: Reason[]
  recommendedDoctorTypes: (DoctorType & { matchCount?: number })[]
  selectedDoctorType: string | null
  setSelectedDoctorType: (id: string) => void
}

export default function StepTwo({ 
  selectedReasons, 
  recommendedDoctorTypes, 
  selectedDoctorType, 
  setSelectedDoctorType 
}: StepTwoProps) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium text-gray-800 mb-2">Select Doctor Type</h2>
      <p className="text-gray-600 mb-6">Choose the type of doctor that best fits your needs</p>

      {selectedReasons.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Based on your selected reasons:</h3>
          <div className="flex flex-wrap gap-2">
            {selectedReasons.map((reason) => (
              <div
                key={reason.id}
                className="flex items-center gap-2 bg-[#eef2ff] text-[#1e3a8a] px-3 py-1.5 rounded-full text-sm"
              >
                <span>{reason.title}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendedDoctorTypes.map((doctorType) => (
          <button
            key={doctorType.id}
            onClick={() => setSelectedDoctorType(doctorType.id)}
            className={`w-full text-left border rounded-lg p-6 transition-all ${
              selectedDoctorType === doctorType.id
                ? "border-[#1e3a8a] bg-[#eef2ff] ring-2 ring-[#1e3a8a]"
                : "border-gray-200 hover:border-[#1e3a8a]"
            } cursor-pointer`}
          >
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1e3a8a] rounded-lg flex items-center justify-center">
                  {doctorType.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">{doctorType.title}</h4>
                  <p className="text-gray-600 text-sm">{doctorType.description}</p>
                </div>
              </div>
              {selectedDoctorType === doctorType.id && (
                <div className="bg-[#1e3a8a] text-white rounded-full p-1 h-6 w-6 flex items-center justify-center">
                  <Check className="h-4 w-4" />
                </div>
              )}
            </div>

            {/* Show match indicator if there are selected reasons */}
            {selectedReasons.length > 0 && doctorType.matchCount !== undefined && doctorType.matchCount > 0 && (
              <div className="mt-3 flex items-center">
                <div className="bg-[#e6f7f2] text-[#0d9488] text-xs font-medium px-2 py-1 rounded-full">
                  Recommended for {doctorType.matchCount} of your selected conditions
                </div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}