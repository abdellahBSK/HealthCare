import { ReactNode } from "react"

export interface Reason {
  id: string
  title: string
  description: string
  category: string
}

export interface DoctorType {
  id: string
  title: string
  description: string
  icon: ReactNode
  specialties: string[]
}

export interface Availability {
  day: string
  slots: string[]
}

export interface Doctor {
  id: string
  name: string
  specialty: string
  image: string
  rating: number
  reviews: number
  experience: number
  distance: string
  location: string
  education: string
  languages: string[]
  about: string
  doctorTypeId: string
  availability: Availability[]
}