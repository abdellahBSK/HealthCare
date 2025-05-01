import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Plus, Send, Paperclip, ChevronLeft, Phone, Video } from "lucide-react"

export default function MessagesPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Messages</h1>
          <p className="text-gray-500">Communicate with patients and colleagues</p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800">
          <Plus className="h-4 w-4 mr-2" /> New Message
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 p-0 border-0 shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input type="search" placeholder="Search messages" className="pl-10 bg-white border-gray-200" />
            </div>
          </div>

          <Tabs defaultValue="inbox" className="h-full">
            <div className="border-b border-gray-200">
              <TabsList className="bg-white border-b-0 p-0 h-12">
                <TabsTrigger
                  value="inbox"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3"
                >
                  Inbox
                </TabsTrigger>
                <TabsTrigger
                  value="sent"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3"
                >
                  Sent
                </TabsTrigger>
                <TabsTrigger
                  value="archived"
                  className="flex-1 data-[state=active]:border-b-2 data-[state=active]:border-blue-900 data-[state=active]:text-blue-900 rounded-none py-3"
                >
                  Archived
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="inbox" className="m-0 h-[calc(100%-48px)] overflow-auto">
              <div className="divide-y divide-gray-200">
                {[
                  {
                    name: "John Doe",
                    avatar: "JD",
                    message: "I've been experiencing chest pain again...",
                    time: "10:30 AM",
                    unread: true,
                    urgent: true,
                  },
                  {
                    name: "Emily Rodriguez",
                    avatar: "ER",
                    message: "Thank you for the prescription refill, Dr. Johnson.",
                    time: "Yesterday",
                    unread: true,
                    urgent: false,
                  },
                  {
                    name: "Dr. Michael Chen",
                    avatar: "MC",
                    message: "Can we discuss the patient case I sent you?",
                    time: "Yesterday",
                    unread: true,
                    urgent: false,
                  },
                  {
                    name: "Sarah Williams",
                    avatar: "SW",
                    message: "My blood pressure readings for the past week...",
                    time: "May 4",
                    unread: false,
                    urgent: false,
                  },
                  {
                    name: "Robert Johnson",
                    avatar: "RJ",
                    message: "When should I schedule my follow-up appointment?",
                    time: "May 3",
                    unread: false,
                    urgent: false,
                  },
                  {
                    name: "Lisa Martinez",
                    avatar: "LM",
                    message: "The new medication is working well so far.",
                    time: "May 2",
                    unread: false,
                    urgent: false,
                  },
                  {
                    name: "Dr. Jennifer Lee",
                    avatar: "JL",
                    message: "Patient referral for cardiology consultation",
                    time: "Apr 30",
                    unread: false,
                    urgent: false,
                  },
                ].map((conversation, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer ${
                      index === 0 ? "bg-blue-50" : ""
                    } ${conversation.unread ? "bg-blue-50/50" : ""}`}
                  >
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback
                          className={`${conversation.urgent ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-900"}`}
                        >
                          {conversation.avatar}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.unread && (
                        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-blue-600 border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className={`font-medium ${conversation.unread ? "text-blue-900" : "text-gray-700"}`}>
                          {conversation.name}
                        </h3>
                        <p className="text-xs text-gray-500">{conversation.time}</p>
                      </div>
                      <p className={`text-sm truncate ${conversation.unread ? "text-gray-700" : "text-gray-500"}`}>
                        {conversation.message}
                      </p>
                    </div>
                    {conversation.urgent && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>}
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="sent" className="m-0 h-[calc(100%-48px)] overflow-auto">
              <div className="divide-y divide-gray-200">
                {[
                  {
                    name: "Michael Chen",
                    avatar: "MC",
                    message: "Let's discuss the case tomorrow morning.",
                    time: "2:15 PM",
                  },
                  {
                    name: "Emily Rodriguez",
                    avatar: "ER",
                    message: "Your prescription has been sent to the pharmacy.",
                    time: "Yesterday",
                  },
                  {
                    name: "Sarah Williams",
                    avatar: "SW",
                    message: "Please continue monitoring your blood pressure daily.",
                    time: "May 4",
                  },
                  {
                    name: "Robert Johnson",
                    avatar: "RJ",
                    message: "Schedule your follow-up in 3 months.",
                    time: "May 3",
                  },
                ].map((conversation, index) => (
                  <div key={index} className={`flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer`}>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-blue-100 text-blue-900">{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-700">{conversation.name}</h3>
                        <p className="text-xs text-gray-500">{conversation.time}</p>
                      </div>
                      <p className="text-sm truncate text-gray-500">{conversation.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="archived" className="m-0 h-[calc(100%-48px)] overflow-auto">
              <div className="divide-y divide-gray-200">
                {[
                  {
                    name: "Thomas Brown",
                    avatar: "TB",
                    message: "Thank you for your help with my condition.",
                    time: "Apr 15",
                  },
                  {
                    name: "David Wilson",
                    avatar: "DW",
                    message: "My symptoms have completely resolved.",
                    time: "Apr 10",
                  },
                  {
                    name: "Jennifer Lee",
                    avatar: "JL",
                    message: "Patient transferred to Dr. Rodriguez.",
                    time: "Mar 28",
                  },
                ].map((conversation, index) => (
                  <div key={index} className={`flex items-center gap-3 p-4 hover:bg-blue-50 cursor-pointer`}>
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-gray-100 text-gray-800">{conversation.avatar}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-gray-700">{conversation.name}</h3>
                        <p className="text-xs text-gray-500">{conversation.time}</p>
                      </div>
                      <p className="text-sm truncate text-gray-500">{conversation.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="col-span-1 lg:col-span-2 p-0 border-0 shadow-md overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" className="lg:hidden">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-red-100 text-red-800">JD</AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-medium text-blue-900">John Doe</h2>
                  <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Urgent</Badge>
                </div>
                <p className="text-xs text-gray-500">Patient ID: P-10042389</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                <Video className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-blue-900 hover:bg-blue-800">
                View Chart
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-4 bg-gray-50">
            <div className="space-y-4">
              <div className="flex justify-center">
                <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">Today, 10:30 AM</p>
              </div>

              <div className="flex items-end gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-red-100 text-red-800">JD</AvatarFallback>
                </Avatar>
                <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm max-w-[80%]">
                  <p className="text-gray-800">
                    Hello Dr. Johnson, I've been experiencing chest pain again since yesterday evening. It's similar to
                    what I felt last month, but more intense. Should I be concerned?
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-end gap-3">
                <div className="bg-blue-100 p-3 rounded-lg rounded-br-none shadow-sm max-w-[80%]">
                  <p className="text-blue-900">
                    Hello John, I'm sorry to hear you're experiencing chest pain. Can you describe the pain in more
                    detail? Is it sharp, dull, or pressure-like? Does it radiate to your arm, jaw, or back?
                  </p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-900">SJ</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex items-end gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-red-100 text-red-800">JD</AvatarFallback>
                </Avatar>
                <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm max-w-[80%]">
                  <p className="text-gray-800">
                    It's a pressure-like pain in the center of my chest. It sometimes radiates to my left arm and I feel
                    a bit short of breath. It gets worse when I walk up stairs.
                  </p>
                </div>
              </div>

              <div className="flex justify-center">
                <p className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">10:35 AM</p>
              </div>

              <div className="flex items-end justify-end gap-3">
                <div className="bg-blue-100 p-3 rounded-lg rounded-br-none shadow-sm max-w-[80%]">
                  <p className="text-blue-900">
                    Given your symptoms and history, I recommend you go to the emergency room immediately. These
                    symptoms could indicate a serious cardiac issue that needs immediate attention. Would you like me to
                    call an ambulance for you?
                  </p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-900">SJ</AvatarFallback>
                </Avatar>
              </div>

              <div className="flex items-end gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-red-100 text-red-800">JD</AvatarFallback>
                </Avatar>
                <div className="bg-white p-3 rounded-lg rounded-bl-none shadow-sm max-w-[80%]">
                  <p className="text-gray-800">
                    My wife can drive me. I'll head to Memorial Hospital ER right away. Thank you, Dr. Johnson.
                  </p>
                </div>
              </div>

              <div className="flex items-end justify-end gap-3">
                <div className="bg-blue-100 p-3 rounded-lg rounded-br-none shadow-sm max-w-[80%]">
                  <p className="text-blue-900">
                    That's good. I'll call ahead to the ER to let them know you're coming. Please keep me updated, and
                    I'll check in with you later today. Take care, John.
                  </p>
                </div>
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-900">SJ</AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="rounded-full border-gray-200">
                <Paperclip className="h-4 w-4 text-gray-500" />
              </Button>
              <Input type="text" placeholder="Type your message..." className="bg-white border-gray-200" />
              <Button size="icon" className="rounded-full bg-blue-900 hover:bg-blue-800">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
