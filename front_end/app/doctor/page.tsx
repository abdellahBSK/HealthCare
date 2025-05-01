import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, MessageSquare, Bell, AlertCircle, Video, Search, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function DoctorDashboard() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Doctor Dashboard</h1>
          <p className="text-gray-500">Welcome back, Dr. Sarah Johnson</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="relative border-gray-200 text-gray-700 hover:bg-gray-100">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              5
            </span>
          </Button>
          <Button className="bg-blue-900 hover:bg-blue-800">
            <Video className="h-4 w-4 mr-2" /> Start Consultation
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">8</h3>
            </div>
            <div className="bg-blue-100 p-2 rounded-md">
              <Calendar className="h-6 w-6 text-blue-900" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Next: John Doe at 10:30 AM</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Patients</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">247</h3>
            </div>
            <div className="bg-green-100 p-2 rounded-md">
              <Users className="h-6 w-6 text-green-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">12 new this month</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Reports</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">5</h3>
            </div>
            <div className="bg-yellow-100 p-2 rounded-md">
              <AlertCircle className="h-6 w-6 text-yellow-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">2 urgent reviews needed</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Unread Messages</p>
              <h3 className="text-2xl font-bold text-blue-900 mt-1">3</h3>
            </div>
            <div className="bg-red-100 p-2 rounded-md">
              <MessageSquare className="h-6 w-6 text-red-700" />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">1 urgent message</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Schedule */}
        <Card className="col-span-1 lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-blue-900">Today's Schedule</h2>
            <Button variant="outline" className="text-blue-900 border-blue-900 hover:bg-blue-50">
              View Full Schedule
            </Button>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md bg-blue-50">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium text-blue-900">John Doe</h3>
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100">Current</Badge>
                </div>
                <p className="text-sm text-gray-500">10:00 AM - 10:30 AM • Annual Physical</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  View Chart
                </Button>
                <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                  Start
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900">Emily Rodriguez</h3>
                <p className="text-sm text-gray-500">10:45 AM - 11:15 AM • Follow-up</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  View Chart
                </Button>
                <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                  <Video className="h-4 w-4 mr-1" /> Virtual
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900">Michael Chen</h3>
                <p className="text-sm text-gray-500">11:30 AM - 12:00 PM • Cardiology Consultation</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  View Chart
                </Button>
                <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                  Start
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-md">
              <div className="bg-blue-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-blue-900" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-blue-900">Sarah Williams</h3>
                <p className="text-sm text-gray-500">1:30 PM - 2:00 PM • Prescription Renewal</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  View Chart
                </Button>
                <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                  Start
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Recent Activity</h2>

          <div className="space-y-4">
            <div className="border-l-2 border-blue-900 pl-4 pb-4">
              <p className="text-sm text-gray-500">Today, 9:15 AM</p>
              <p className="font-medium text-blue-900">Lab results received</p>
              <p className="text-sm text-gray-500">Blood work for Michael Chen</p>
            </div>

            <div className="border-l-2 border-blue-900 pl-4 pb-4">
              <p className="text-sm text-gray-500">Today, 8:30 AM</p>
              <p className="font-medium text-blue-900">Prescription approved</p>
              <p className="text-sm text-gray-500">Lisinopril for John Doe</p>
            </div>

            <div className="border-l-2 border-blue-900 pl-4 pb-4">
              <p className="text-sm text-gray-500">Yesterday, 4:45 PM</p>
              <p className="font-medium text-blue-900">Referral sent</p>
              <p className="text-sm text-gray-500">Emily Rodriguez to Neurology</p>
            </div>

            <div className="border-l-2 border-blue-900 pl-4">
              <p className="text-sm text-gray-500">Yesterday, 2:15 PM</p>
              <p className="font-medium text-blue-900">Medical record updated</p>
              <p className="text-sm text-gray-500">Added new diagnosis for Sarah Williams</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Patient Search and Urgent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <Card className="p-6">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Quick Patient Search</h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search patients by name or ID"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <h3 className="font-medium text-gray-700 mb-2">Recent Patients</h3>
          <div className="space-y-3">
            {[
              { name: "John Doe", id: "P-10042389", date: "Today, 10:00 AM" },
              { name: "Emily Rodriguez", id: "P-10042390", date: "Today, 10:45 AM" },
              { name: "Michael Chen", id: "P-10042391", date: "Today, 11:30 AM" },
              { name: "Sarah Williams", id: "P-10042392", date: "Today, 1:30 PM" },
            ].map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-blue-100 text-blue-900 text-xs">
                      {patient.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-blue-900">{patient.name}</p>
                    <p className="text-xs text-gray-500">{patient.id}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{patient.date}</p>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4 bg-blue-900 hover:bg-blue-800">View All Patients</Button>
        </Card>

        <Card className="p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-bold text-blue-900 mb-4">Urgent Cases</h2>
          <div className="space-y-4">
            <div className="p-4 border border-red-200 bg-red-50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-red-100 text-red-800">RJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-red-800">Robert Johnson</h3>
                    <p className="text-sm text-red-700">Chest Pain • Admitted: 2 hours ago</p>
                  </div>
                </div>
                <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-red-700">
                  <span className="font-medium">Vitals:</span> BP 160/95, HR 110, SpO2 94%
                </p>
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Review Immediately
                </Button>
              </div>
            </div>

            <div className="p-4 border border-amber-200 bg-amber-50 rounded-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-amber-100 text-amber-800">LM</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-amber-800">Lisa Martinez</h3>
                    <p className="text-sm text-amber-700">Severe Allergic Reaction • Admitted: 1 hour ago</p>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Urgent</Badge>
              </div>
              <div className="mt-3 flex items-center justify-between">
                <p className="text-sm text-amber-700">
                  <span className="font-medium">Vitals:</span> BP 100/60, HR 95, SpO2 97%
                </p>
                <Button size="sm" className="bg-amber-600 hover:bg-amber-700">
                  Review Soon
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium text-blue-900 mb-2">Pending Lab Reviews</h3>
            <div className="space-y-2">
              {[
                { patient: "David Wilson", test: "Complete Blood Count", date: "May 5, 2023" },
                { patient: "Jennifer Lee", test: "Lipid Panel", date: "May 4, 2023" },
                { patient: "Thomas Brown", test: "Thyroid Function", date: "May 3, 2023" },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
                  <div>
                    <p className="font-medium text-blue-900">{item.patient}</p>
                    <p className="text-sm text-gray-500">{item.test}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-500">{item.date}</p>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
