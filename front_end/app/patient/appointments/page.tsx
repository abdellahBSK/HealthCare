import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Plus, Video } from "lucide-react";
import Link from "next/link";

export default function AppointmentsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Appointments</h1>
          <p className="text-gray-500">Manage your healthcare appointments</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800">
          <Plus className="h-4 w-4 mr-2" /> Schedule Appointment
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="mb-6">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger
            value="upcoming"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
          >
            Upcoming
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
          >
            Past
          </TabsTrigger>
          <TabsTrigger
            value="cancelled"
            className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-900"
          >
            Cancelled
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="mt-4">
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full h-fit">
                    <Calendar className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-blue-900">
                        Annual Physical Examination
                      </h3>
                      <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                        Confirmed
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Dr. Sarah Johnson • Cardiology
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>May 15, 2023 • 10:00 AM</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>Main Hospital, Floor 3</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-50"
                  >
                    Reschedule
                  </Button>
                  <Link href="/patient/appointments/virtual/1">
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    
                      <Video className="h-4 w-4 mr-2" /> Join Virtual
                  
                  </Button>
                  </Link>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-4">
                  <div className="bg-blue-100 p-3 rounded-full h-fit">
                    <Calendar className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-blue-900">
                        Cardiology Follow-up
                      </h3>
                      <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Pending
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">
                      Dr. Michael Chen • Cardiology
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>June 3, 2023 • 2:30 PM</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>Cardiology Center, Floor 2</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-50"
                  >
                    Reschedule
                  </Button>
                  <Button
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-4">
          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-4">
                  <div className="bg-gray-100 p-3 rounded-full h-fit">
                    <Calendar className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-blue-900">
                      Asthma Follow-up
                    </h3>
                    <p className="text-sm text-gray-500">
                      Dr. Emily Rodriguez • Pulmonology
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>April 10, 2023 • 11:15 AM</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="border-blue-900 text-blue-900 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/patient/appointments/past-appointment-1">
                      View Summary
                    </Link>
                  </Button>
                  <Button className="bg-blue-900 hover:bg-blue-800">
                    Book Follow-up
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cancelled" className="mt-4">
          <Card className="p-6">
            <p className="text-gray-500">No cancelled appointments.</p>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h2 className="text-lg font-bold text-blue-900 mb-4">
          Need to see a doctor?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-4 border-2 border-blue-100 bg-blue-50">
            <h3 className="font-medium text-blue-900 mb-2">
              Schedule an Appointment
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Book an in-person visit with your doctor
            </p>

            <Button className="w-full bg-blue-900 hover:bg-blue-800" asChild>
              <Link href="/patient/appointments/schedule">Schedule Now</Link>
            </Button>
          </Card>

          <Card className="p-4 border-2 border-green-100 bg-green-50">
            <h3 className="font-medium text-green-800 mb-2">
              Virtual Consultation
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Connect with a doctor from home
            </p>
            <Button className="w-full bg-green-700 hover:bg-green-800">
              Start Virtual Visit
            </Button>
          </Card>

          <Card className="p-4 border-2 border-purple-100 bg-purple-50">
            <h3 className="font-medium text-purple-800 mb-2">Urgent Care</h3>
            <p className="text-sm text-gray-600 mb-4">
              Get immediate care for urgent needs
            </p>
            <Button className="w-full bg-purple-700 hover:bg-purple-800">
              Find Urgent Care
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
