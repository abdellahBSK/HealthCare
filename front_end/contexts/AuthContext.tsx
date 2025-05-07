"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import api from "@/api/api"
import UserProfile  from "@/types/user"

type AuthContextType = {
  user: UserProfile | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isAuthenticated: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      
      if (token) {
        try {
          // Verify token and get user data
          const response = await api.get("/auth/me")
          setUser(response.data)
        } catch (error) {
          console.error("Auth verification failed:", error)
          localStorage.removeItem("token")
        }
      }
      
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data
      
      localStorage.setItem("token", token)
      setUser(user)
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
  }

  const isAuthenticated = () => {
    return !!user
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}