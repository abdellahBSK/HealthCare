"use client"
import type React from "react";
import Link from "next/link";
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
  AlertCircle,
  
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useEffect } from "react";
import { DoctorProfile } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  console.log(user);
  const router = useRouter();

  // Check if doctor is verified
  const isVerified = user?.isVerified || false;

  // Redirect unverified doctors to verification page if they try to access other pages
  useEffect(() => {
    if (!isLoading && user && user.userType === "doctor" && !isVerified) {
      const currentPath = window.location.pathname;
      if (
        currentPath !== "/doctor/verification" &&
        currentPath !== "/doctor/verification/submitted"
      ) {
        toast({
          title: "Verification Required",
          description:
            "Please complete your verification process to access the doctor portal.",
          variant: "destructive",
        });
        router.push("/doctor/verification");
      }
    }
  }, [isLoading, user, isVerified, router]);

  // Handle logout
  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const doctorProfile = user?.profile as DoctorProfile;

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

        {!isVerified && (
          <div className="bg-amber-50 p-3 m-3 rounded-md border border-amber-200">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <h3 className="font-medium text-amber-800">
                  Verification Required
                </h3>
                <p className="text-xs text-amber-700 mt-1">
                  Please complete your verification process to access all
                  features.
                </p>
              </div>
            </div>
          </div>
        )}

        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            <li>
              <Link
                href="/doctor"
                className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium ${
                  isVerified
                    ? "hover:bg-blue-50 text-gray-600 hover:text-blue-900"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
              >
                <LayoutGrid className="h-5 w-5" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/patients"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isVerified
                    ? "hover:bg-blue-50 text-gray-600 hover:text-blue-900"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
              >
                <Users className="h-5 w-5" />
                <span>Patients</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/appointments"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isVerified
                    ? "hover:bg-blue-50 text-gray-600 hover:text-blue-900"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
              >
                <Calendar className="h-5 w-5" />
                <span>Appointments</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/medical-records"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isVerified
                    ? "hover:bg-blue-50 text-gray-600 hover:text-blue-900"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
              >
                <FileText className="h-5 w-5" />
                <span>Medical Records</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/messages"
                className={`flex items-center justify-between px-3 py-2 rounded-md ${
                  isVerified
                    ? "hover:bg-blue-50 text-gray-600 hover:text-blue-900"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-5 w-5" />
                  <span>Messages</span>
                </div>
                {isVerified && (
                  <Badge className="bg-red-500 text-white hover:bg-red-500">
                    3
                  </Badge>
                )}
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/prescriptions"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isVerified
                    ? "hover:bg-blue-50 text-gray-600 hover:text-blue-900"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
              >
                <Pill className="h-5 w-5" />
                <span>Prescriptions</span>
              </Link>
            </li>
            <li>
              <Link
                href="/doctor/lab-results"
                className={`flex items-center gap-3 px-3 py-2 rounded-md ${
                  isVerified
                    ? "hover:bg-blue-50 text-gray-600 hover:text-blue-900"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
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
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={
                    user?.profileImage || "/placeholder.svg?height=40&width=40"
                  }
                  alt={`${user?.firstName} ${user?.lastName}`}
                />
                <AvatarFallback className="bg-blue-100 text-blue-900 font-bold">
                  {`${user?.firstName?.charAt(0) || ""}${
                    user?.lastName?.charAt(0) || "D"
                  }`}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-blue-900 truncate">
                  {`${user?.firstName} ${user?.lastName}` || "Doctor"}
                </h3>
                <p className="text-xs text-gray-500 truncate">
                  {doctorProfile?.speciality || "Medical Professional"}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-1">
              <Link
                href="/doctor/profile"
                className={`flex items-center gap-2 text-sm px-2 py-1.5 rounded-md ${
                  isVerified
                    ? "text-gray-600 hover:text-blue-900 hover:bg-blue-50"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
              >
                <User className="h-4 w-4" />
                <span>My Profile</span>
              </Link>

              <Link
                href="/doctor/settings"
                className={`flex items-center gap-2 text-sm px-2 py-1.5 rounded-md ${
                  isVerified
                    ? "text-gray-600 hover:text-blue-900 hover:bg-blue-50"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={(e) => !isVerified && e.preventDefault()}
              >
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 px-2 py-1.5 rounded-md hover:bg-red-50 w-full text-left"
              >
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

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
