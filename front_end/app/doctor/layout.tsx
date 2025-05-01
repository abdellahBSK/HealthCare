import type React from "react"
import Link from "next/link"
import {
  Heart,
  LayoutGrid,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Pill,
  Activity,
  Settings,
  User,
  LogOut,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-900 text-white rounded flex items-center justify-center font-bold">
              DR
            </div>
            <div>
              <h2 className="font-bold text-blue-900">Medical Portal</h2>
              <p className="text-sm text-gray-500">Doctor View</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <Link
                href="/doctor"
                className="flex items-center gap-3 px-3 py-2 bg-blue-50 text-blue-900 rounded-md font-medium"
              >
                <LayoutGrid className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/patients"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
              >
                <Users className="h-5 w-5" />
                <span>Patients</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/appointments"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
              >
                <Calendar className="h-5 w-5" />
                <span>Appointments</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/medical-records"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
              >
                <FileText className="h-5 w-5" />
                <span>Medical Records</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/messages"
                className="flex items-center justify-between px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                </div>
                <Badge className="bg-red-500 text-white hover:bg-red-500">3</Badge>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/prescriptions"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
              >
                <Pill className="h-5 w-5" />
                <span>Prescriptions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/lab-results"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
              >
                <Activity className="h-5 w-5" />
                <span>Lab Results</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold">
                SJ
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-blue-900 truncate">Dr. Sarah Johnson</h3>
                <p className="text-xs text-gray-500 truncate">Cardiology</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <Link
                href="/doctor/profile"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-900 px-2 py-1.5 rounded-md hover:bg-blue-50"
              >
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/doctor/settings"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-900 px-2 py-1.5 rounded-md hover:bg-blue-50"
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>

              <button className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-2 py-1.5 rounded-md hover:bg-red-50 w-full text-left">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-200">
              <Heart className="h-5 w-5 text-blue-900" />
              <span className="text-sm text-blue-900 font-medium">HealthCare</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  )
}
