import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Heart } from "lucide-react"

export default function VerificationSubmittedPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex items-center mb-8">
        <Heart className="h-8 w-8 text-[#1e3a8a] mr-2" fill="#1e3a8a" strokeWidth={1} />
        <h1 className="text-2xl font-bold text-[#1e3a8a]">HealthCare</h1>
      </div>

      <Card className="max-w-md mx-auto text-center border-0 shadow-sm">
        <CardHeader className="bg-[#f8fafc] border-b pb-4">
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-[#1e3a8a]">Verification Submitted</CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="mb-4 text-gray-700">
            Thank you for submitting your professional information. Our administrative team will review your details and
            verify your account.
          </p>
          <p className="mb-8 text-gray-700">
            You will receive a notification once your account has been verified. This process typically takes 1-3
            business days.
          </p>
          <Button asChild className="bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
