'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, EyeOff, Mail, Lock, Heart, User, Stethoscope, PhoneCall, Calendar, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export default function SignupPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userType, setUserType] = useState('patient');

    return (
        <div className="container mx-auto flex items-center justify-center min-h-screen px-4 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-5xl">

                {/* Form Side */}
                <motion.div
                    className="space-y-6 p-8 lg:p-12 neomorph rounded-2xl"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="space-y-2 text-center lg:text-left">
                        <div className="flex justify-center lg:justify-start">
                            <Heart className="h-8 w-8 text-primary" />
                        </div>
                        <h1 className="text-3xl font-bold font-heading">Create your account</h1>
                        <p className="text-muted-foreground">Join our community today!</p>
                    </div>

                    <Tabs defaultValue="email" className="w-full">
                        <TabsList className="grid w-full grid-cols-1 neomorph-inset">
                            <TabsTrigger value="email">Email</TabsTrigger>

                        </TabsList>

                        {/* Email signup */}
                        <TabsContent value="email" className="space-y-6 pt-4">
                            <div className="grid gap-4">
                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Full Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Your full name"
                                        type="text"
                                        className="neomorph-inset"
                                    />
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="email"
                                            placeholder="name@example.com"
                                            type="email"
                                            className="pl-10 neomorph-inset"
                                        />
                                    </div>
                                </div>

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            className="pl-10 pr-10 neomorph-inset"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="confirm-password"
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="pl-10 pr-10 neomorph-inset"
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* User Type Selection */}
                            <div className="flex items-center space-x-4 justify-around py-2">
                                <UserTypeButton
                                    icon={User}
                                    label="Patient"
                                    active={userType === 'patient'}
                                    onClick={() => setUserType('patient')}
                                />
                                <UserTypeButton
                                    icon={Stethoscope}
                                    label="Doctor"
                                    active={userType === 'doctor'}
                                    onClick={() => setUserType('doctor')}
                                />
                            </div>

                            {/* Signup Button */}
                            <Button className="w-full" size="lg">
                                Sign Up
                            </Button>

                            {/* Already have account */}
                            <p className="text-center text-sm text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="font-medium text-primary hover:underline">
                                    Sign In
                                </Link>
                            </p>
                        </TabsContent>

                        {/* Phone signup */}

                    </Tabs>
                </motion.div>

                {/* Image / Info Side */}
                <motion.div
                    className="hidden lg:flex items-center justify-center relative"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary opacity-10 rounded-3xl blur-xl -m-4" />
                    <div className="neomorph rounded-2xl overflow-hidden relative w-full h-full">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                            <div className="space-y-4 max-w-sm">
                                <h2 className="text-2xl font-bold font-heading">Your Health, Your Way</h2>
                                <p className="text-muted-foreground">
                                    Create your account and start your journey towards better healthcare today.
                                </p>
                                <div className="grid grid-cols-2 gap-3 py-4">
                                    {benefits.map((benefit, i) => (
                                        <div key={i} className="flex items-center space-x-2">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <benefit.icon className="h-4 w-4 text-primary" />
                                            </div>
                                            <span className="text-sm">{benefit.text}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}

function UserTypeButton({ icon: Icon, label, active, onClick }: {
    icon: any;
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex flex-col items-center space-y-2 rounded-lg p-3 transition-all",
                active
                    ? "neomorph text-primary"
                    : "neomorph-inset text-muted-foreground hover:text-foreground"
            )}
        >
            <Icon className="h-5 w-5" />
            <span className="text-xs font-medium">{label}</span>
        </button>
    );
}

const benefits = [
    { icon: PhoneCall, text: '24/7 Support' },
    { icon: Calendar, text: 'Easy Scheduling' },
    { icon: Clock, text: 'Quick Response' },
    { icon: ShieldCheck, text: 'Secure Data' },
];
