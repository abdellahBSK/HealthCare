import Link from "next/link";
import {
  Heart,
  LayoutGrid,
  FileText,
  Calendar,
  Pill,
  FileIcon,
  User,
  Settings,
  LogOut,
  MessageCircle
} from "lucide-react";

export function PatientSideBar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-900 text-white rounded flex items-center justify-center font-bold">
            JD
          </div>
          <div>
            <h2 className="font-bold text-blue-900">Medical Portal</h2>
            <p className="text-sm text-gray-500">Patient View</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-1">
          <li>
            <Link
              href="/patient/dashboard"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <LayoutGrid className="h-5 w-5" />
              <span>Overview</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/medical-history"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <FileText className="h-5 w-5" />
              <span>Medical History</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/appointments"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <Calendar className="h-5 w-5" />
              <span>Appointments</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/medications"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <Pill className="h-5 w-5" />
              <span>Medications</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/documents"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <FileIcon className="h-5 w-5" />
              <span>Documents</span>
            </Link>
          </li>
          <li>
            <Link
              href="/patient/messages"
              className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-blue-50 rounded-md"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Messages</span>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-900 rounded-full flex items-center justify-center font-bold">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-blue-900 truncate">John Doe</h3>
              <p className="text-xs text-gray-500 truncate">
                john.doe@example.com
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-1">
            <Link
              href="/patient/profile"
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-900 px-2 py-1.5 rounded-md hover:bg-blue-50"
            >
              <User className="h-4 w-4" />
              <span>My Profile</span>
            </Link>

            <Link
              href="/patient/settings"
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
            <span className="text-sm text-blue-900 font-medium">
              HealthCare
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
