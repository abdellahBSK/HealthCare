import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, MoreVertical, Plus, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Add interface for AppointmentItem props
interface AppointmentItemProps {
  name: string;
  time: string;
  type: string;
  status: string;
  patientId: string;
  age: number;
  gender: string;
  isVirtual?: boolean;
  isNext?: boolean;
  reason?: string;
}

export default function AppointmentsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-blue-700">Appointments</h1>
          <p className="text-gray-500">Manage your patient appointments</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="hidden sm:inline">Calendar View</span>
          </Button>
          <Button className="bg-blue-700 hover:bg-blue-800 flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>New Appointment</span>
          </Button>
        </div>
      </header>

      <div className="p-4 md:p-6">
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative w-full md:w-80">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input type="search" placeholder="Search patients..." className="pl-9 w-full" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-9">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <div className="font-medium">May 2, 2023</div>
                  <Button variant="outline" size="sm" className="h-9">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Appointments</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Today's Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AppointmentItem
                    name="John Doe"
                    time="10:00 AM - 10:30 AM"
                    type="Annual Physical"
                    status="Upcoming"
                    patientId="P-12345"
                    age={45}
                    gender="Male"
                    isNext={true}
                  />

                  <AppointmentItem
                    name="Emily Rodriguez"
                    time="10:45 AM - 11:15 AM"
                    type="Follow-up"
                    status="Upcoming"
                    patientId="P-23456"
                    age={32}
                    gender="Female"
                    isVirtual={true}
                  />

                  <AppointmentItem
                    name="Michael Chen"
                    time="11:30 AM - 12:00 PM"
                    type="Cardiology Consultation"
                    status="Upcoming"
                    patientId="P-34567"
                    age={58}
                    gender="Male"
                  />

                  <AppointmentItem
                    name="Sarah Williams"
                    time="1:30 PM - 2:00 PM"
                    type="Prescription Renewal"
                    status="Upcoming"
                    patientId="P-45678"
                    age={41}
                    gender="Female"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle>Tomorrow, May 3, 2023</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AppointmentItem
                    name="Robert Johnson"
                    time="9:00 AM - 9:45 AM"
                    type="New Patient Consultation"
                    status="Upcoming"
                    patientId="P-56789"
                    age={62}
                    gender="Male"
                  />

                  <AppointmentItem
                    name="Lisa Garcia"
                    time="10:15 AM - 10:45 AM"
                    type="Follow-up"
                    status="Upcoming"
                    patientId="P-67890"
                    age={29}
                    gender="Female"
                    isVirtual={true}
                  />

                  <AppointmentItem
                    name="David Kim"
                    time="11:30 AM - 12:00 PM"
                    type="Lab Results Review"
                    status="Upcoming"
                    patientId="P-78901"
                    age={51}
                    gender="Male"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="upcoming" className="mt-0">
            {/* Similar content as "all" tab but filtered for upcoming */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AppointmentItem
                    name="John Doe"
                    time="Today, 10:00 AM - 10:30 AM"
                    type="Annual Physical"
                    status="Upcoming"
                    patientId="P-12345"
                    age={45}
                    gender="Male"
                    isNext={true}
                  />

                  <AppointmentItem
                    name="Emily Rodriguez"
                    time="Today, 10:45 AM - 11:15 AM"
                    type="Follow-up"
                    status="Upcoming"
                    patientId="P-23456"
                    age={32}
                    gender="Female"
                    isVirtual={true}
                  />

                  <AppointmentItem
                    name="Robert Johnson"
                    time="Tomorrow, 9:00 AM - 9:45 AM"
                    type="New Patient Consultation"
                    status="Upcoming"
                    patientId="P-56789"
                    age={62}
                    gender="Male"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Completed Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AppointmentItem
                    name="Jennifer Martinez"
                    time="Yesterday, 2:30 PM - 3:00 PM"
                    type="Annual Physical"
                    status="Completed"
                    patientId="P-89012"
                    age={37}
                    gender="Female"
                  />

                  <AppointmentItem
                    name="Thomas Wilson"
                    time="Yesterday, 11:00 AM - 11:30 AM"
                    type="Follow-up"
                    status="Completed"
                    patientId="P-90123"
                    age={44}
                    gender="Male"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cancelled" className="mt-0">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Cancelled Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <AppointmentItem
                    name="Amanda Lee"
                    time="Yesterday, 4:00 PM - 4:30 PM"
                    type="New Patient Consultation"
                    status="Cancelled"
                    patientId="P-01234"
                    age={26}
                    gender="Female"
                    reason="Patient requested reschedule"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function AppointmentItem({
  name,
  time,
  type,
  status,
  patientId,
  age,
  gender,
  isVirtual = false,
  isNext = false,
  reason = "",
}: AppointmentItemProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Upcoming":
        return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Upcoming</Badge>
      case "Completed":
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Completed</Badge>
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100">Cancelled</Badge>
      case "In Progress":
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">In Progress</Badge>
      default:
        return null
    }
  }

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-white border rounded-lg hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        <Avatar className="h-12 w-12 border">
          <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
          <AvatarFallback className="bg-blue-100 text-blue-700">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold">{name}</h3>
            {getStatusBadge(status)}
            {isNext && (
              <Badge variant="outline" className="border-green-500 text-green-700">
                Next Patient
              </Badge>
            )}
            {isVirtual && (
              <Badge variant="outline" className="border-purple-500 text-purple-700">
                Virtual
              </Badge>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 text-sm text-gray-500 mt-1">
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>{time}</span>
            </div>
            <div>{type}</div>
          </div>

          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span>ID: {patientId}</span>
            <span>{age} years</span>
            <span>{gender}</span>
            {reason && <span className="text-red-500">Reason: {reason}</span>}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 self-end md:self-center mt-2 md:mt-0">
        <Button variant="outline" size="sm">
          View Details
        </Button>
        {status === "Upcoming" && (
          <>
            <Button
              size="sm"
              className={isVirtual ? "bg-purple-600 hover:bg-purple-700" : "bg-blue-700 hover:bg-blue-800"}
            >
              {isVirtual ? "Join Virtual" : "Start"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Cancel Appointment</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        )}
      </div>
    </div>
  )
}
