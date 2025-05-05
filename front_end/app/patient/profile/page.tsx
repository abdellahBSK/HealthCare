import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function ProfilePage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">My Profile</h1>
        <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="col-span-1 p-6">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src="/placeholder.svg?height=96&width=96" alt="John Doe" />
              <AvatarFallback className="text-xl bg-blue-100 text-blue-900">JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold text-blue-900">John Doe</h2>
            <p className="text-gray-500 mb-4">Patient ID: P-10042389</p>
            <Button className="w-full bg-blue-900 hover:bg-blue-800 mb-2">Upload New Photo</Button>
          </div>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Email Address</h3>
              <p className="text-blue-900">john.doe@example.com</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
              <p className="text-blue-900">(555) 123-4567</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date of Birth</h3>
              <p className="text-blue-900">May 15, 1990</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Address</h3>
              <p className="text-blue-900">123 Main Street</p>
              <p className="text-blue-900">Apt 4B</p>
              <p className="text-blue-900">New York, NY 10001</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-1 md:col-span-2 p-6">
          <div>
            <h2 className="text-xl font-bold text-blue-900 mb-4">Personal Information</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Primary Care Physician</h3>
                <p className="text-blue-900 mb-4">Dr. Sarah Johnson</p>

                <h3 className="text-sm font-medium text-gray-500 mb-1">Blood Type</h3>
                <p className="text-blue-900 mb-4">O Positive</p>

                <h3 className="text-sm font-medium text-gray-500 mb-1">Height</h3>
                <p className="text-blue-900 mb-4">5'10" (178 cm)</p>

                <h3 className="text-sm font-medium text-gray-500 mb-1">Weight</h3>
                <p className="text-blue-900 mb-4">165 lbs (75 kg)</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Emergency Contact</h3>
                <p className="text-blue-900">Jane Doe (Spouse)</p>
                <p className="text-blue-900 mb-4">(555) 987-6543</p>

                <h3 className="text-sm font-medium text-gray-500 mb-1">Insurance Provider</h3>
                <p className="text-blue-900">HealthPlus Insurance</p>
                <p className="text-blue-900 mb-4">Policy #: HP-78923456</p>

                <h3 className="text-sm font-medium text-gray-500 mb-1">Preferred Pharmacy</h3>
                <p className="text-blue-900">MedRx Pharmacy</p>
                <p className="text-blue-900">456 Oak Street, New York, NY 10001</p>
              </div>
            </div>

            <Separator className="my-6" />

            <h2 className="text-xl font-bold text-blue-900 mb-4">Account Settings</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                </div>
                <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Enable
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Notification Preferences</h3>
                  <p className="text-sm text-gray-500">Manage how you receive notifications</p>
                </div>
                <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Manage
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-blue-900">Privacy Settings</h3>
                  <p className="text-sm text-gray-500">Control your data and privacy preferences</p>
                </div>
                <Button variant="outline" className="border-blue-900 text-blue-900 hover:bg-blue-50">
                  Update
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
