"use client"

import { useState, useRef, useEffect } from "react"
import { ArrowLeft } from "lucide-react"

// Import components
import StepOne from "./components/StepOne"
import StepTwo from "./components/StepTwo"
import StepThree from "./components/StepThree"
import StepFour from "./components/StepFour"
import ProgressSteps from "./components/ProgressSteps"
import DoctorDetails from "./components/DoctorDetails"

// Import types and data
import { Reason, Doctor } from "./types"
import { doctors, doctorTypes } from "./data"

export default function AppointmentBooking() {
  // State for the booking process
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedReasons, setSelectedReasons] = useState<Reason[]>([])
  const [selectedDoctorType, setSelectedDoctorType] = useState<string | null>(null)
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null)
  const [showTimeSlots, setShowTimeSlots] = useState<string | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<"rating" | "availability">("availability")
  const [viewingDoctorDetails, setViewingDoctorDetails] = useState<string | null>(null)
  
  // Add ref for scrolling to top when step changes
  const contentRef = useRef<HTMLDivElement>(null)
  const mainContainerRef = useRef<HTMLDivElement>(null)
  
  // Scroll to top when step changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" })
    }
    
    // Also reset the scroll position of the overflow container
    const scrollContainer = document.querySelector('.max-h-\\[calc\\(100vh-250px\\)\\]')
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }
  }, [currentStep])

  const handleReasonSelect = (reason: Reason) => {
    // Check if the reason is already selected
    if (selectedReasons.some((item) => item.id === reason.id)) {
      // If selected, remove it
      setSelectedReasons(selectedReasons.filter((item) => item.id !== reason.id))
    } else {
      // If not selected and less than 3 items are selected, add it
      if (selectedReasons.length < 3) {
        setSelectedReasons([...selectedReasons, reason])
      }
    }
  }

  const isSelected = (id: string) => {
    return selectedReasons.some((item) => item.id === id)
  }

  const handleContinue = () => {
    if (currentStep === 1 && selectedReasons.length > 0) {
      setCurrentStep(2)
      // Ensure scroll to top happens after state update
      setTimeout(() => {
        if (mainContainerRef.current) {
          window.scrollTo({
            top: mainContainerRef.current.offsetTop,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else if (currentStep === 2 && selectedDoctorType) {
      setCurrentStep(3)
      setTimeout(() => {
        if (mainContainerRef.current) {
          window.scrollTo({
            top: mainContainerRef.current.offsetTop,
            behavior: 'smooth'
          })
        }
      }, 100)
    } else if (currentStep === 3 && selectedDoctor && selectedTimeSlot) {
      setCurrentStep(4)
      setTimeout(() => {
        if (mainContainerRef.current) {
          window.scrollTo({
            top: mainContainerRef.current.offsetTop,
            behavior: 'smooth'
          })
        }
      }, 100)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)

      // Reset selections when going back
      if (currentStep === 3) {
        setSelectedDoctor(null)
        setSelectedTimeSlot(null)
        setShowTimeSlots(null)
      }
    }
  }

  const toggleTimeSlots = (doctorId: string) => {
    if (showTimeSlots === doctorId) {
      setShowTimeSlots(null)
    } else {
      setShowTimeSlots(doctorId)
      setSelectedDoctor(doctorId)
    }
  }

  const selectTimeSlot = (slot: string) => {
    setSelectedTimeSlot(slot)
  }

  const viewDoctorDetails = (doctorId: string) => {
    setViewingDoctorDetails(doctorId)
  }

  const closeDoctorDetails = () => {
    setViewingDoctorDetails(null)
  }

  // Filter doctor types based on selected reasons
  const getRecommendedDoctorTypes = () => {
    if (selectedReasons.length === 0) return doctorTypes

    const selectedTitles = selectedReasons.map((reason) => reason.title)

    return doctorTypes
      .map((doctorType) => {
        const matchCount = doctorType.specialties.filter((specialty) => selectedTitles.includes(specialty)).length

        return {
          ...doctorType,
          matchCount,
        }
      })
      .sort((a, b) => b.matchCount - a.matchCount)
  }

  // Filter doctors based on selected doctor type
  const getFilteredDoctors = () => {
    if (!selectedDoctorType) return []

    const filtered = doctors.filter((doctor) => doctor.doctorTypeId === selectedDoctorType)

    // Sort doctors based on the selected sort criteria
    if (sortBy === "rating") {
      return filtered.sort((a, b) => b.rating - a.rating)
    } else {
      // Sort by availability (doctors with today slots first)
      return filtered.sort((a, b) => {
        const aHasToday = a.availability.some((avail) => avail.day === "Today")
        const bHasToday = b.availability.some((avail) => avail.day === "Today")

        if (aHasToday && !bHasToday) return -1
        if (!aHasToday && bHasToday) return 1
        return b.rating - a.rating // If tie, sort by rating
      })
    }
  }

  const recommendedDoctorTypes = getRecommendedDoctorTypes()
  const filteredDoctors = getFilteredDoctors()

  // Get the selected doctor type title
  const getSelectedDoctorTypeTitle = () => {
    if (!selectedDoctorType) return ""
    const doctorType = doctorTypes.find((dt) => dt.id === selectedDoctorType)
    return doctorType ? doctorType.title : ""
  }

  // Get the selected doctor object
  const getSelectedDoctorObject = (): Doctor | null => {
    if (!selectedDoctor) return null
    return doctors.find((doc) => doc.id === selectedDoctor) || null
  }

  // If viewing doctor details, show that component
  if (viewingDoctorDetails) {
    return (
      <DoctorDetails
        doctorId={viewingDoctorDetails}
        onBack={closeDoctorDetails}
        onBookAppointment={() => {
          closeDoctorDetails()
          // You could also set the selected doctor here if needed
          // setSelectedDoctor(viewingDoctorDetails);
        }}
      />
    )
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden" ref={mainContainerRef}>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div ref={contentRef} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="inline-block px-3 py-1 bg-[#e6f7f2] text-[#0d9488] text-sm font-medium rounded-full mb-4">
                Premium Healthcare Anywhere
              </div>
              <h1 className="text-2xl font-bold text-[#1e3a8a]">Book an Appointment</h1>
            </div>
            <ProgressSteps currentStep={currentStep} />
          </div>

          <div className="max-h-[calc(100vh-250px)] overflow-y-auto px-2 pb-4">
            {currentStep === 1 && (
              <StepOne 
                selectedReasons={selectedReasons} 
                onReasonSelect={handleReasonSelect} 
                isSelected={isSelected} 
              />
            )}

            {currentStep === 2 && (
              <StepTwo 
                selectedReasons={selectedReasons}
                recommendedDoctorTypes={recommendedDoctorTypes}
                selectedDoctorType={selectedDoctorType}
                setSelectedDoctorType={setSelectedDoctorType}
              />
            )}

            {currentStep === 3 && (
              <StepThree 
                selectedDoctorTypeTitle={getSelectedDoctorTypeTitle()}
                selectedReasons={selectedReasons}
                sortBy={sortBy}
                setSortBy={setSortBy}
                filteredDoctors={filteredDoctors}
                selectedDoctor={selectedDoctor}
                showTimeSlots={showTimeSlots}
                toggleTimeSlots={toggleTimeSlots}
                selectedTimeSlot={selectedTimeSlot}
                selectTimeSlot={selectTimeSlot}
                viewDoctorDetails={viewDoctorDetails}
              />
            )}

            {currentStep === 4 && (
              <StepFour 
                selectedDoctor={getSelectedDoctorObject()}
                selectedTimeSlot={selectedTimeSlot}
                selectedReasons={selectedReasons}
              />
            )}
          </div>

          {/* Navigation buttons - fixed at the bottom */}
          <div className="mt-6 flex justify-between items-center border-t border-gray-100 pt-6">
            <button
              onClick={handleBack}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-700 ${
                currentStep === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
              }`}
              disabled={currentStep === 1}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
            <button
              onClick={handleContinue}
              disabled={
                (currentStep === 1 && selectedReasons.length === 0) ||
                (currentStep === 2 && !selectedDoctorType) ||
                (currentStep === 3 && (!selectedDoctor || !selectedTimeSlot))
              }
              className={`px-6 py-2 rounded-lg ${
                (currentStep === 1 && selectedReasons.length === 0) ||
                (currentStep === 2 && !selectedDoctorType) ||
                (currentStep === 3 && (!selectedDoctor || !selectedTimeSlot))
                  ? "opacity-50 cursor-not-allowed bg-gray-300 text-gray-500"
                  : "bg-[#1e3a8a] text-white hover:bg-[#1e40af]"
              }`}
            >
              {currentStep === 4 ? "Confirm Appointment" : "Continue"}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}