import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, Plus, Filter, ChevronDown, FileText, Calendar, MessageSquare } from "lucide-react"

export default function PatientsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Patients</h1>
          <p className="text-gray-500">Manage your patient list</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800">
          <Plus className="h-4 w-4 mr-2" /> Add New Patient
        </Button>
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search patients by name, ID, or condition"
              className="pl-10 bg-white border-gray-200"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-200 text-gray-700">
              <Filter className="h-4 w-4 mr-2" /> Filter
            </Button>
            <Button variant="outline" className="border-gray-200 text-gray-700">
              Status <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" className="border-gray-200 text-gray-700">
              Sort by <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </Card>

      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 font-medium text-gray-700">
          <div className="col-span-4">Patient</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Last Visit</div>
          <div className="col-span-2">Upcoming Appt.</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        {/* Patient rows */}
        {[
          {
            name: "John Doe",
            id: "P-10042389",
            email: "john.doe@example.com",
            status: "Active",
            statusColor: "green",
            lastVisit: "May 5, 2023",
            upcomingAppt: "Today, 10:00 AM",
          },
          {
            name: "Emily Rodriguez",
            id: "P-10042390",
            email: "emily.r@example.com",
            status: "Active",
            statusColor: "green",
            lastVisit: "Apr 20, 2023",
            upcomingAppt: "Today, 10:45 AM",
          },
          {
            name: "Michael Chen",
            id: "P-10042391",
            email: "m.chen@example.com",
            status: "Active",
            statusColor: "green",
            lastVisit: "Apr 15, 2023",
            upcomingAppt: "Today, 11:30 AM",
          },
          {
            name: "Sarah Williams",
            id: "P-10042392",
            email: "s.williams@example.com",
            status: "Active",
            statusColor: "green",
            lastVisit: "Apr 10, 2023",
            upcomingAppt: "Today, 1:30 PM",
          },
          {
            name: "Robert Johnson",
            id: "P-10042393",
            email: "r.johnson@example.com",
            status: "Critical",
            statusColor: "red",
            lastVisit: "May 5, 2023",
            upcomingAppt: "Admitted",
          },
          {
            name: "Lisa Martinez",
            id: "P-10042394",
            email: "l.martinez@example.com",
            status: "Urgent",
            statusColor: "amber",
            lastVisit: "May 5, 2023",
            upcomingAppt: "Admitted",
          },
          {
            name: "David Wilson",
            id: "P-10042395",
            email: "d.wilson@example.com",
            status: "Active",
            statusColor: "green",
            lastVisit: "Apr 28, 2023",
            upcomingAppt: "May 10, 2023",
          },
          {
            name: "Jennifer Lee",
            id: "P-10042396",
            email: "j.lee@example.com",
            status: "Active",
            statusColor: "green",
            lastVisit: "Apr 25, 2023",
            upcomingAppt: "May 12, 2023",
          },
          {
            name: "Thomas Brown",
            id: "P-10042397",
            email: "t.brown@example.com",
            status: "Inactive",
            statusColor: "gray",
            lastVisit: "Mar 15, 2023",
            upcomingAppt: "Not scheduled",
          },
        ].map((patient, index) => (
          <div
            key={patient.id}
            className={`grid grid-cols-12 gap-4 p-4 items-center ${
              index % 2 === 0 ? "bg-white" : "bg-gray-50"
            } hover:bg-blue-50 transition-colors`}
          >
            <div className="col-span-4 flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-blue-100 text-blue-900">
                  {patient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-blue-900">{patient.name}</p>
                <p className="text-xs text-gray-500">{patient.id}</p>
                <p className="text-xs text-gray-500">{patient.email}</p>
              </div>
            </div>
            <div className="col-span-2">
              <Badge
                className={`bg-${patient.statusColor}-100 text-${patient.statusColor}-800 hover:bg-${patient.statusColor}-100`}
              >
                {patient.status}
              </Badge>
            </div>
            <div className="col-span-2 text-gray-700">{patient.lastVisit}</div>
            <div className="col-span-2 text-gray-700">{patient.upcomingAppt}</div>
            <div className="col-span-2 flex justify-end gap-2">
              <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                <FileText className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                <Calendar className="h-4 w-4" />
              </Button>
              <Button size="sm" variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                <MessageSquare className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-500">Showing 9 of 247 patients</p>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-200 text-gray-700" disabled>
            Previous
          </Button>
          <Button variant="outline" className="border-gray-200 bg-blue-50 text-blue-900">
            1
          </Button>
          <Button variant="outline" className="border-gray-200 text-gray-700">
            2
          </Button>
          <Button variant="outline" className="border-gray-200 text-gray-700">
            3
          </Button>
          <Button variant="outline" className="border-gray-200 text-gray-700">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
