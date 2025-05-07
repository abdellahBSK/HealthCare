"use client";

import { Filter, Star, Clock, MapPin } from "lucide-react";
import { Doctor } from "../types";

interface StepThreeProps {
  selectedDoctorTypeTitle: string;
  selectedReasons: any[];
  sortBy: "rating" | "availability";
  setSortBy: (sort: "rating" | "availability") => void;
  filteredDoctors: Doctor[];
  selectedDoctor: string | null;
  showTimeSlots: string | null;
  toggleTimeSlots: (doctorId: string) => void;
  selectedTimeSlot: string | null;
  selectTimeSlot: (slot: string) => void;
  viewDoctorDetails: (doctorId: string) => void;
}

export default function StepThree({
  selectedDoctorTypeTitle,
  selectedReasons,
  sortBy,
  setSortBy,
  filteredDoctors,
  selectedDoctor,
  showTimeSlots,
  toggleTimeSlots,
  selectedTimeSlot,
  selectTimeSlot,
  viewDoctorDetails,
}: StepThreeProps) {
  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-medium text-gray-800">Select a Doctor</h2>
        <button className="text-[#1e3a8a] text-sm font-medium hover:underline">
          All Ratings
        </button>
      </div>
      <p className="text-gray-600 mb-4">
        Choose from our {selectedDoctorTypeTitle} specialists
      </p>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-[#eef2ff] text-[#1e3a8a] px-3 py-1.5 rounded-full text-sm">
            <span>{selectedDoctorTypeTitle}</span>
          </div>
          {selectedReasons.length > 0 && (
            <div className="flex items-center gap-2 bg-[#f0f9ff] text-[#0369a1] px-3 py-1.5 rounded-full text-sm">
              <span>
                {selectedReasons.length} condition
                {selectedReasons.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex rounded-lg border border-gray-200 overflow-hidden">
            <button
              className={`px-3 py-1.5 text-sm ${
                sortBy === "rating"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setSortBy("rating")}
            >
              Rating
            </button>
            <button
              className={`px-3 py-1.5 text-sm ${
                sortBy === "availability"
                  ? "bg-[#1e3a8a] text-white"
                  : "bg-white text-gray-700"
              }`}
              onClick={() => setSortBy("availability")}
            >
              Availability
            </button>
          </div>
          <button className="p-2 rounded-lg border border-gray-200 text-gray-700">
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className={`border rounded-lg overflow-hidden transition-all ${
              selectedDoctor === doctor.id
                ? "border-[#1e3a8a] ring-2 ring-[#1e3a8a]"
                : "border-gray-200"
            }`}
          >
            <div className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden">
                  <img
                    src={doctor.image || "/placeholder.svg"}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {doctor.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {doctor.speciality}
                      </p>
                    </div>
                    <button
                      className="text-[#1e3a8a] text-sm font-medium hover:underline"
                      onClick={() => viewDoctorDetails(doctor.id)}
                    >
                      View Details
                    </button>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-[#f59e0b] fill-[#f59e0b]" />
                      <span className="ml-1 text-sm font-medium">
                        {doctor.rating}/5
                      </span>
                      <span className="ml-1 text-xs text-gray-500">
                        ({doctor.reviews})
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-500" />
                      <span className="ml-1 text-sm text-gray-600">
                        {doctor.experience} years
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="ml-1 text-sm text-gray-600">
                        {doctor.distance}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <div className="text-sm font-medium text-gray-700">
                    Next Available
                  </div>
                  <div className="text-sm text-gray-800">
                    {doctor.availability[0].day}
                  </div>
                </div>
                <button
                  onClick={() => toggleTimeSlots(doctor.id)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedDoctor === doctor.id && selectedTimeSlot
                      ? "bg-[#1e3a8a] text-white"
                      : "border border-[#1e3a8a] text-[#1e3a8a]"
                  }`}
                >
                  {selectedDoctor === doctor.id && selectedTimeSlot
                    ? "Time Selected"
                    : showTimeSlots === doctor.id
                    ? "Hide Times"
                    : "Select Time"}
                </button>
              </div>
            </div>

            {showTimeSlots === doctor.id && (
              <div className="bg-gray-50 p-4 border-t border-gray-200">
                {doctor.availability.map((avail) => (
                  <div key={avail.day} className="mb-3 last:mb-0">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      {avail.day}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {avail.slots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => selectTimeSlot(slot)}
                          className={`px-3 py-1.5 rounded-lg text-sm ${
                            selectedTimeSlot === slot
                              ? "bg-[#1e3a8a] text-white"
                              : "bg-white border border-gray-200 text-gray-700 hover:border-[#1e3a8a]"
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
