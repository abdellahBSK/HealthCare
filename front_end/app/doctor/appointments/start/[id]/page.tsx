"use client"

import { useState, useEffect, useRef } from "react"
import {
  AlertCircle,
  Check,
  FileText,
  Mic,
  MicOff,
  Monitor,
  Phone,
  PlusCircle,
  Send,
  Settings,
  Video,
  VideoOff,
  X,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Add interfaces for the component props and state
interface ConsultationPageProps {
  params: {
    id: string;
  }
}

interface ChatMessage {
  id: number;
  sender: "doctor" | "patient";
  message: string;
  time: string;
}

interface PrescriptionData {
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  refills: string;
  dispenseAsWritten: boolean;
}

interface PatientData {
  id: string;
  name: string;
  age: number;
  gender: string;
  dob: string;
  phone: string;
  email: string;
  address: string;
  allergies: string[];
  medications: string[];
  vitalSigns: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    respiratoryRate: string;
    oxygenSaturation: string;
  };
  appointmentType: string;
  appointmentTime: string;
  appointmentDate: string;
  lastVisit: string;
}



export default function ConsultationPage({ params }: ConsultationPageProps) {
  const [isMuted, setIsMuted] = useState(false)
  const [isVideoOff, setIsVideoOff] = useState(false)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [newMessage, setNewMessage] = useState("")
  const chatContainerRef = useRef<HTMLDivElement | null>(null)

  // Prescription modal state
  const [prescriptionOpen, setPrescriptionOpen] = useState(false)
  const [prescription, setPrescription] = useState<PrescriptionData>({
    medication: "",
    dosage: "",
    frequency: "",
    duration: "",
    instructions: "",
    refills: "0",
    dispenseAsWritten: false,
  })

  // Emergency modal state
  const [emergencyOpen, setEmergencyOpen] = useState(false)
  const [emergencyType, setEmergencyType] = useState("medical")

  // Chat messages
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      sender: "patient",
      message: "Hello Dr. Johnson, I've been experiencing headaches for the past week.",
      time: "10:02 AM",
    },
    {
      id: 2,
      sender: "doctor",
      message: "I'm sorry to hear that. Can you describe the pain and its location?",
      time: "10:03 AM",
    },
    {
      id: 3,
      sender: "patient",
      message: "It's a throbbing pain on the right side of my head, usually worse in the morning.",
      time: "10:04 AM",
    },
  ])

  // Mock patient data
  const patient: PatientData = {
    id: "P-12345",
    name: "John Doe",
    age: 45,
    gender: "Male",
    dob: "10/15/1978",
    phone: "(555) 123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, CA 94321",
    allergies: ["Penicillin", "Peanuts"],
    medications: ["Lisinopril 10mg", "Atorvastatin 20mg"],
    vitalSigns: {
      bloodPressure: "120/80 mmHg",
      heartRate: "72 bpm",
      temperature: "98.6°F",
      respiratoryRate: "16/min",
      oxygenSaturation: "98%",
    },
    appointmentType: "Annual Physical",
    appointmentTime: "10:00 AM - 10:30 AM",
    appointmentDate: "May 2, 2023",
    lastVisit: "November 10, 2022",
  }

  // Format time as mm:ss
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chatMessages])

  // Handle sending a new message
  const handleSendMessage = (e: React.FormEvent): void => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const newMsg: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "doctor",
      message: newMessage,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setChatMessages([...chatMessages, newMsg])
    setNewMessage("")
  }

  // Handle prescription form changes
  const handlePrescriptionChange = (field: keyof PrescriptionData, value: string | boolean): void => {
    setPrescription((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle prescription submission
  const handlePrescriptionSubmit = (): void => {
    // Here you would typically send the prescription data to your backend
    console.log("Prescription submitted:", prescription)

    // Add a message to the chat
    const newMsg: ChatMessage = {
      id: chatMessages.length + 1,
      sender: "doctor",
      message: `I've sent a prescription for ${prescription.medication} ${prescription.dosage}, to be taken ${prescription.frequency} for ${prescription.duration}.`,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    setChatMessages([...chatMessages, newMsg])

    // Close the modal and reset form
    setPrescriptionOpen(false)

    // Show a success message or notification here
    alert("Prescription sent successfully!")
  }

  // Handle emergency call
  const handleEmergencyCall = (): void => {
    // In a real application, this would trigger an emergency protocol
    console.log("Emergency call initiated:", emergencyType)
    setEmergencyOpen(false)

    // Show a confirmation message
    alert(`Emergency ${emergencyType} assistance requested. The team has been notified.`)
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Patient info sidebar - always visible */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col overflow-hidden shadow-sm">
        <div className="p-3 border-b border-gray-200 bg-[#1e3a8a] text-white">
          <h2 className="font-semibold">Patient Information</h2>
        </div>
        <ScrollArea className="flex-1">
          <div className="p-3">
            <div className="flex items-center gap-2 mb-3">
              <Avatar className="h-12 w-12 border border-gray-200">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback className="bg-blue-100 text-[#1e3a8a]">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold text-[#1e3a8a]">{patient.name}</h2>
                <div className="text-xs text-gray-500">
                  {patient.age} years • {patient.gender}
                </div>
                <div className="text-xs text-gray-500">ID: {patient.id}</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-1">Contact Information</h3>
                <div className="bg-gray-50 rounded-md p-2 space-y-1 text-xs">
                  <div>
                    <span className="text-gray-500">Phone:</span> {patient.phone}
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span> {patient.email}
                  </div>
                  <div>
                    <span className="text-gray-500">Address:</span> {patient.address}
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-1">Medical Information</h3>
                <div className="bg-gray-50 rounded-md p-2 space-y-2 text-xs">
                  <div>
                    <div className="font-medium mb-1">Allergies</div>
                    <div className="flex flex-wrap gap-1">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200 text-xs">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="font-medium mb-1">Current Medications</div>
                    <div className="flex flex-col gap-1">
                      {patient.medications.map((medication, index) => (
                        <div key={index}>{medication}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-1">Vital Signs</h3>
                <div className="bg-gray-50 rounded-md p-2 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Blood Pressure:</span>
                    <span className="font-medium">{patient.vitalSigns.bloodPressure}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Heart Rate:</span>
                    <span className="font-medium">{patient.vitalSigns.heartRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Temperature:</span>
                    <span className="font-medium">{patient.vitalSigns.temperature}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Respiratory Rate:</span>
                    <span className="font-medium">{patient.vitalSigns.respiratoryRate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Oxygen Saturation:</span>
                    <span className="font-medium">{patient.vitalSigns.oxygenSaturation}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xs font-medium text-gray-500 mb-1">Actions</h3>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-[#1e3a8a] hover:bg-blue-800 text-xs h-8"
                    onClick={() => setPrescriptionOpen(true)}
                  >
                    <PlusCircle className="h-3 w-3 mr-1" /> Write Prescription
                  </Button>
                  <Button variant="outline" className="w-full border-[#1e3a8a] text-[#1e3a8a] text-xs h-8">
                    <FileText className="h-3 w-3 mr-1" /> Medical Records
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-[#1e3a8a] p-2 flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8 bg-blue-800 text-white">
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-sm">Video Consultation</h1>
              <div className="flex items-center gap-2 text-xs text-blue-100">
                <span className="flex items-center">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span>
                  Online
                </span>
                <span>• {formatTime(elapsedTime)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700 h-8 w-8">
                    <Settings className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Settings</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-700 h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Main video area */}
          <div className="flex-1 flex flex-col relative">
            <div className="flex-1 bg-black border-2 border-[#1e3a8a] rounded-md m-2 relative">
              {/* Patient video (main) */}
              {!isVideoOff ? (
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt="Patient video"
                    className="max-w-full max-h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Avatar className="h-24 w-24">
                    <AvatarFallback className="bg-blue-100 text-[#1e3a8a] text-3xl">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                </div>
              )}

              {/* Doctor's video (small overlay) */}
              <div className="absolute top-2 right-2 w-32 h-24 bg-gray-800 rounded-md overflow-hidden border border-gray-700">
                <div className="relative w-full h-full">
                  <img
                    src="/placeholder.svg?height=96&width=128"
                    alt="Doctor video"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-1 right-1 text-xs bg-black bg-opacity-50 px-1 py-0.5 rounded">
                    You
                  </div>
                </div>
              </div>
            </div>

            {/* Video controls */}
            <div className="flex items-center justify-center gap-2 p-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full h-10 w-10 ${
                        isMuted ? "bg-red-600 text-white hover:bg-red-700" : "bg-[#1e3a8a] text-white hover:bg-blue-800"
                      }`}
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isMuted ? "Unmute" : "Mute"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full h-10 w-10 ${
                        isVideoOff
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-[#1e3a8a] text-white hover:bg-blue-800"
                      }`}
                      onClick={() => setIsVideoOff(!isVideoOff)}
                    >
                      {isVideoOff ? <VideoOff className="h-4 w-4" /> : <Video className="h-4 w-4" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isVideoOff ? "Turn on camera" : "Turn off camera"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`rounded-full h-10 w-10 ${
                        isScreenSharing
                          ? "bg-red-600 text-white hover:bg-red-700"
                          : "bg-[#1e3a8a] text-white hover:bg-blue-800"
                      }`}
                      onClick={() => setIsScreenSharing(!isScreenSharing)}
                    >
                      <Monitor className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>{isScreenSharing ? "Stop sharing" : "Share screen"}</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-10 w-10 bg-red-600 text-white hover:bg-red-700"
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>End call</TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full h-10 w-10 bg-red-600 text-white hover:bg-red-700"
                      onClick={() => setEmergencyOpen(true)}
                    >
                      <AlertCircle className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Emergency</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {/* Chat sidebar - always visible */}
          <div className="w-64 bg-white border-l border-gray-200 flex flex-col overflow-hidden shadow-sm">
            <div className="p-3 border-b border-gray-200 bg-[#1e3a8a] text-white">
              <h2 className="font-semibold">Chat</h2>
            </div>
            <ScrollArea className="flex-1" ref={chatContainerRef}>
              <div className="p-3 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "doctor" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-lg p-2 ${
                        msg.sender === "doctor"
                          ? "bg-[#1e3a8a] text-white"
                          : "bg-gray-100 text-gray-800 border border-gray-200"
                      }`}
                    >
                      <div className="text-xs">{msg.message}</div>
                      <div className="text-[10px] text-gray-300 mt-1">{msg.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-2 border-t border-gray-200">
              <form onSubmit={handleSendMessage} className="flex gap-1">
                <Input
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="border-gray-300 h-8 text-xs"
                />
                <Button type="submit" size="icon" className="bg-[#1e3a8a] hover:bg-blue-800 h-8 w-8">
                  <Send className="h-3 w-3" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Prescription Dialog */}
      <Dialog open={prescriptionOpen} onOpenChange={setPrescriptionOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#1e3a8a]">Write Prescription</DialogTitle>
            <DialogDescription>Create a prescription for {patient.name}</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="medication">Medication</Label>
                <Input
                  id="medication"
                  placeholder="Medication name"
                  value={prescription.medication}
                  onChange={(e) => handlePrescriptionChange("medication", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="dosage">Dosage</Label>
                <Input
                  id="dosage"
                  placeholder="e.g., 10mg"
                  value={prescription.dosage}
                  onChange={(e) => handlePrescriptionChange("dosage", e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="frequency">Frequency</Label>
                <Select
                  value={prescription.frequency}
                  onValueChange={(value) => handlePrescriptionChange("frequency", value)}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once-daily">Once daily</SelectItem>
                    <SelectItem value="twice-daily">Twice daily</SelectItem>
                    <SelectItem value="three-times-daily">Three times daily</SelectItem>
                    <SelectItem value="four-times-daily">Four times daily</SelectItem>
                    <SelectItem value="as-needed">As needed</SelectItem>
                    <SelectItem value="other">Other (specify in instructions)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  placeholder="e.g., 7 days, 2 weeks"
                  value={prescription.duration}
                  onChange={(e) => handlePrescriptionChange("duration", e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Special Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Take with food, avoid alcohol, etc."
                value={prescription.instructions}
                onChange={(e) => handlePrescriptionChange("instructions", e.target.value)}
                className="min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="refills">Refills</Label>
                <Select
                  value={prescription.refills}
                  onValueChange={(value) => handlePrescriptionChange("refills", value)}
                >
                  <SelectTrigger id="refills">
                    <SelectValue placeholder="Select refills" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="block mb-2">Dispense As Written</Label>
                <RadioGroup
                  defaultValue={prescription.dispenseAsWritten ? "yes" : "no"}
                  onValueChange={(value) => handlePrescriptionChange("dispenseAsWritten", value === "yes")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="daw-yes" />
                    <Label htmlFor="daw-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="daw-no" />
                    <Label htmlFor="daw-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setPrescriptionOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-[#1e3a8a] hover:bg-blue-800" onClick={handlePrescriptionSubmit}>
              <Check className="h-4 w-4 mr-2" /> Send Prescription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Emergency Dialog */}
      <Dialog open={emergencyOpen} onOpenChange={setEmergencyOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-red-600">Emergency Assistance</DialogTitle>
            <DialogDescription>Request immediate assistance for this patient</DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <RadioGroup defaultValue={emergencyType} onValueChange={setEmergencyType} className="space-y-3">
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="medical" id="emergency-medical" />
                <Label htmlFor="emergency-medical" className="font-medium">
                  Medical Emergency
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="security" id="emergency-security" />
                <Label htmlFor="emergency-security" className="font-medium">
                  Security Assistance
                </Label>
              </div>
              <div className="flex items-center space-x-2 border p-3 rounded-md">
                <RadioGroupItem value="technical" id="emergency-technical" />
                <Label htmlFor="emergency-technical" className="font-medium">
                  Technical Support
                </Label>
              </div>
            </RadioGroup>

            <Textarea className="mt-4" placeholder="Briefly describe the emergency situation..." />
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEmergencyOpen(false)}>
              <X className="h-4 w-4 mr-2" /> Cancel
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleEmergencyCall}>
              <AlertCircle className="h-4 w-4 mr-2" /> Request Assistance
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
