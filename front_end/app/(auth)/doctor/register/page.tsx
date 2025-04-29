"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Heart, PlusCircle, Trash2, CalendarClock, Award, Languages, DollarSign, Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const specialities = [
  "General Medicine",
  "Cardiology",
  "Dermatology",
  "Neurology",
  "Pediatrics",
  "Psychiatry",
  "Orthopedics",
  "Gynecology",
  "Ophthalmology",
  "Oncology",
  "Endocrinology",
  "Gastroenterology",
  "Urology",
  "Nephrology",
  "Pulmonology",
  "Rheumatology",
  "Hematology",
  "Infectious Disease",
  "Family Medicine",
  "Emergency Medicine",
]

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Arabic",
  "Russian",
  "Portuguese",
  "Hindi",
  "Italian",
]

const educationSchema = z.object({
  institution: z.string().min(2, { message: "Institution is required" }),
  degree: z.string().min(2, { message: "Degree is required" }),
  year: z.coerce
    .number()
    .min(1950, { message: "Year must be valid" })
    .max(new Date().getFullYear(), { message: "Year cannot be in the future" }),
})

const experienceSchema = z.object({
  position: z.string().min(2, { message: "Position is required" }),
  institution: z.string().min(2, { message: "Institution is required" }),
  startYear: z.coerce
    .number()
    .min(1950, { message: "Start year must be valid" })
    .max(new Date().getFullYear(), { message: "Start year cannot be in the future" }),
  endYear: z.coerce
    .number()
    .min(1950, { message: "End year must be valid" })
    .max(new Date().getFullYear() + 10, { message: "End year is too far in the future" })
    .optional(),
})

const availabilitySchema = z.object({
  day: z.enum(weekdays as [string, ...string[]]),
  startTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Please use HH:MM format" }),
  endTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: "Please use HH:MM format" }),
  isAvailable: z.boolean().default(true),
})

const formSchema = z.object({
  speciality: z.string().min(2, { message: "Speciality is required" }),
  professionalLicenseNumber: z.string().min(5, { message: "License number is required" }),
  biography: z
    .string()
    .min(50, { message: "Biography should be at least 50 characters" })
    .max(500, { message: "Biography should not exceed 500 characters" }),
  education: z.array(educationSchema).min(1, { message: "At least one education entry is required" }),
  experience: z.array(experienceSchema).min(1, { message: "At least one experience entry is required" }),
  languages: z.array(z.string()).min(1, { message: "At least one language is required" }),
  consultationFee: z.coerce.number().min(0, { message: "Consultation fee must be a positive number" }),
  availabilitySchedule: z.array(availabilitySchema).min(1, { message: "At least one availability slot is required" }),
})

export default function DoctorRegistrationForm() {
  const router = useRouter()
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      speciality: "",
      professionalLicenseNumber: "",
      biography: "",
      education: [{ institution: "", degree: "", year: undefined as unknown as number }],
      experience: [
        {
          position: "",
          institution: "",
          startYear: undefined as unknown as number,
          endYear: undefined as unknown as number,
        },
      ],
      languages: [],
      consultationFee: 0,
      availabilitySchedule: [{ day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true }],
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // Here you would typically send the data to your API
    // For example:
    // const response = await fetch('/api/doctors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(values)
    // })

    // if (response.ok) {
    //   router.push('/doctor/profile')
    // }

    alert("Registration submitted successfully!")
  }

  const addEducation = () => {
    const currentEducation = form.getValues("education")
    form.setValue("education", [
      ...currentEducation,
      { institution: "", degree: "", year: undefined as unknown as number },
    ])
  }

  const removeEducation = (index: number) => {
    const currentEducation = form.getValues("education")
    if (currentEducation.length > 1) {
      form.setValue(
        "education",
        currentEducation.filter((_, i) => i !== index),
      )
    }
  }

  const addExperience = () => {
    const currentExperience = form.getValues("experience")
    form.setValue("experience", [
      ...currentExperience,
      {
        position: "",
        institution: "",
        startYear: undefined as unknown as number,
        endYear: undefined as unknown as number,
      },
    ])
  }

  const removeExperience = (index: number) => {
    const currentExperience = form.getValues("experience")
    if (currentExperience.length > 1) {
      form.setValue(
        "experience",
        currentExperience.filter((_, i) => i !== index),
      )
    }
  }

  const addAvailability = () => {
    const currentAvailability = form.getValues("availabilitySchedule")
    form.setValue("availabilitySchedule", [
      ...currentAvailability,
      { day: "Monday", startTime: "09:00", endTime: "17:00", isAvailable: true },
    ])
  }

  const removeAvailability = (index: number) => {
    const currentAvailability = form.getValues("availabilitySchedule")
    if (currentAvailability.length > 1) {
      form.setValue(
        "availabilitySchedule",
        currentAvailability.filter((_, i) => i !== index),
      )
    }
  }

  const toggleLanguage = (language: string) => {
    setSelectedLanguages((prev) => {
      const newSelection = prev.includes(language) ? prev.filter((l) => l !== language) : [...prev, language]

      form.setValue("languages", newSelection)
      return newSelection
    })
  }

  return (
    <div className="container mx-auto pb-10 pt-28">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="bg-[#1e3a8a] text-white p-2 rounded-lg">
            <Award className="h-6 w-6" />
          </div>
          <h1 className="text-3xl font-bold text-[#1e3a8a]">Doctor Registration</h1>
        </div>
        <p className="text-slate-600">
          Join our network of healthcare professionals and start providing virtual consultations to patients worldwide.
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_300px] gap-8 max-w-4xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-8">
              {/* Basic Information */}
              <Card className="border-[#e0e7ff] shadow-sm">
                <CardHeader className="bg-[#f5f8ff] border-b border-[#e0e7ff]">
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-[#1e3a8a]" />
                    <CardTitle className="text-[#1e3a8a]">Basic Information</CardTitle>
                  </div>
                  <CardDescription>Please provide your professional details</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  <FormField
                    control={form.control}
                    name="speciality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1e3a8a] font-medium">Speciality</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-[#cbd5e1] focus:ring-[#1e3a8a]">
                              <SelectValue placeholder="Select your speciality" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {specialities.map((speciality) => (
                              <SelectItem key={speciality} value={speciality}>
                                {speciality}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="professionalLicenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1e3a8a] font-medium">Professional License Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your license number"
                            className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>This should be your official medical license number.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="biography"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1e3a8a] font-medium">Biography</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write a short biography about yourself and your medical practice"
                            className="min-h-[120px] border-[#cbd5e1] focus:ring-[#1e3a8a]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>This will be displayed on your public profile.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="consultationFee"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[#1e3a8a] font-medium">Consultation Fee ($)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                              type="number"
                              min="0"
                              step="0.01"
                              className="pl-10 border-[#cbd5e1] focus:ring-[#1e3a8a]"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>The fee you charge per consultation.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Education */}
              <Card className="border-[#e0e7ff] shadow-sm">
                <CardHeader className="bg-[#f5f8ff] border-b border-[#e0e7ff]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-[#1e3a8a]" />
                      <CardTitle className="text-[#1e3a8a]">Education</CardTitle>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addEducation}
                      className="text-[#1e3a8a] border-[#1e3a8a] hover:bg-[#f5f8ff]"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Education
                    </Button>
                  </div>
                  <CardDescription>Add your educational background and qualifications</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {form.watch("education").map((_, index) => (
                    <div key={index} className="p-4 border border-[#e0e7ff] rounded-md bg-[#fafbff]">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-[#1e3a8a]">Education #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeEducation(index)}
                          disabled={form.watch("education").length <= 1}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`education.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#1e3a8a] font-medium">Institution</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Harvard Medical School"
                                  className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`education.${index}.degree`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#1e3a8a] font-medium">Degree</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., MD, PhD"
                                  className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`education.${index}.year`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#1e3a8a] font-medium">Year</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="e.g., 2010"
                                  className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Experience */}
              <Card className="border-[#e0e7ff] shadow-sm">
                <CardHeader className="bg-[#f5f8ff] border-b border-[#e0e7ff]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="h-5 w-5 text-[#1e3a8a]" />
                      <CardTitle className="text-[#1e3a8a]">Experience</CardTitle>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addExperience}
                      className="text-[#1e3a8a] border-[#1e3a8a] hover:bg-[#f5f8ff]"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Experience
                    </Button>
                  </div>
                  <CardDescription>Add your professional work experience</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {form.watch("experience").map((_, index) => (
                    <div key={index} className="p-4 border border-[#e0e7ff] rounded-md bg-[#fafbff]">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-[#1e3a8a]">Experience #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeExperience(index)}
                          disabled={form.watch("experience").length <= 1}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`experience.${index}.position`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#1e3a8a] font-medium">Position</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Attending Physician"
                                  className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`experience.${index}.institution`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#1e3a8a] font-medium">Institution</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Mayo Clinic"
                                  className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`experience.${index}.startYear`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#1e3a8a] font-medium">Start Year</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="e.g., 2015"
                                    className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`experience.${index}.endYear`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#1e3a8a] font-medium">
                                  End Year (if current, leave blank)
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="e.g., 2020"
                                    className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Languages */}
              <Card className="border-[#e0e7ff] shadow-sm">
                <CardHeader className="bg-[#f5f8ff] border-b border-[#e0e7ff]">
                  <div className="flex items-center gap-2">
                    <Languages className="h-5 w-5 text-[#1e3a8a]" />
                    <CardTitle className="text-[#1e3a8a]">Languages</CardTitle>
                  </div>
                  <CardDescription>Select the languages you can communicate in</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <FormField
                    control={form.control}
                    name="languages"
                    render={() => (
                      <FormItem>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {languages.map((language) => (
                            <div
                              key={language}
                              className={`flex items-center space-x-2 p-3 rounded-md border ${
                                selectedLanguages.includes(language)
                                  ? "border-[#1e3a8a] bg-[#f5f8ff]"
                                  : "border-[#e0e7ff]"
                              } cursor-pointer transition-colors`}
                              onClick={() => toggleLanguage(language)}
                            >
                              <Checkbox
                                id={`language-${language}`}
                                checked={selectedLanguages.includes(language)}
                                className={
                                  selectedLanguages.includes(language) ? "text-[#1e3a8a] border-[#1e3a8a]" : ""
                                }
                              />
                              <label
                                htmlFor={`language-${language}`}
                                className="text-sm font-medium leading-none cursor-pointer w-full"
                              >
                                {language}
                              </label>
                            </div>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Availability Schedule */}
              <Card className="border-[#e0e7ff] shadow-sm">
                <CardHeader className="bg-[#f5f8ff] border-b border-[#e0e7ff]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-[#1e3a8a]" />
                      <CardTitle className="text-[#1e3a8a]">Availability Schedule</CardTitle>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addAvailability}
                      className="text-[#1e3a8a] border-[#1e3a8a] hover:bg-[#f5f8ff]"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Add Availability
                    </Button>
                  </div>
                  <CardDescription>Set your weekly availability for patient consultations</CardDescription>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {form.watch("availabilitySchedule").map((_, index) => (
                    <div key={index} className="p-4 border border-[#e0e7ff] rounded-md bg-[#fafbff]">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-[#1e3a8a]">Schedule #{index + 1}</h4>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAvailability(index)}
                          disabled={form.watch("availabilitySchedule").length <= 1}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name={`availabilitySchedule.${index}.day`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#1e3a8a] font-medium">Day</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger className="border-[#cbd5e1] focus:ring-[#1e3a8a]">
                                    <SelectValue placeholder="Select day" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {weekdays.map((day) => (
                                    <SelectItem key={day} value={day}>
                                      {day}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="grid grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name={`availabilitySchedule.${index}.startTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#1e3a8a] font-medium">Start Time</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., 09:00"
                                    className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Use 24-hour format (HH:MM)</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name={`availabilitySchedule.${index}.endTime`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-[#1e3a8a] font-medium">End Time</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g., 17:00"
                                    className="border-[#cbd5e1] focus:ring-[#1e3a8a]"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>Use 24-hour format (HH:MM)</FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name={`availabilitySchedule.${index}.isAvailable`}
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-[#e0e7ff] p-4">
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                  className="data-[state=checked]:bg-[#1e3a8a] data-[state=checked]:border-[#1e3a8a]"
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>Available</FormLabel>
                                <FormDescription>
                                  Check this box if you are available during this time slot.
                                </FormDescription>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button
                type="submit"
                className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white py-6 text-lg font-medium"
              >
                Complete Registration
              </Button>
            </div>
          </form>
        </Form>

        <div className="space-y-6">
          <Card className="border-[#e0e7ff] shadow-sm sticky top-6">
            <CardHeader className="bg-[#f5f8ff] border-b border-[#e0e7ff]">
              <CardTitle className="text-[#1e3a8a] text-lg">Registration Benefits</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="bg-[#f0f7ff] p-2 rounded-full mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1e3a8a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e3a8a]">Expand Your Practice</h4>
                    <p className="text-sm text-slate-600">Reach patients beyond your physical location</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#f0f7ff] p-2 rounded-full mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1e3a8a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e3a8a]">Flexible Schedule</h4>
                    <p className="text-sm text-slate-600">Set your own availability and work hours</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#f0f7ff] p-2 rounded-full mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1e3a8a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e3a8a]">Secure Platform</h4>
                    <p className="text-sm text-slate-600">HIPAA-compliant telehealth infrastructure</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-[#f0f7ff] p-2 rounded-full mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#1e3a8a"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-[#1e3a8a]">Easy Payments</h4>
                    <p className="text-sm text-slate-600">Automated billing and payment processing</p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
