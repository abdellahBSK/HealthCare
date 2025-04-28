'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ui/mode-toggle';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import { Heart, Stethoscope, Calendar, MessageCircle, Search, Menu, X } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass-effect border-b',
        scrolled 
          ? 'py-2 border-border/50' 
          : 'py-4 border-transparent'
      )}
      style={{
        backgroundImage: scrolled 
          ? `linear-gradient(to right, hsl(226, 70%, ${theme === 'dark' ? '40%' : '33%'}), hsl(174, 58%, ${theme === 'dark' ? '32%' : '29%'}))`
          : 'none',
        backgroundColor: !scrolled ? (theme === 'dark' ? 'rgba(25, 33, 52, 0.8)' : 'rgba(255, 255, 255, 0.8)') : 'transparent',
      }}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Heart className={cn(
            "h-8 w-8 transition-colors",
            scrolled ? "text-primary-foreground" : "text-primary"
          )} />
          <span className={cn(
            "text-xl font-bold font-heading transition-colors",
            scrolled ? "text-primary-foreground" : "text-foreground"
          )}>HealthCare</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-transparent transition-colors",
                  scrolled ? "text-primary-foreground" : "text-foreground"
                )}>Services</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {servicesItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-transparent transition-colors",
                  scrolled ? "text-primary-foreground" : "text-foreground"
                )}>For Patients</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {patientsItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(
                  "bg-transparent hover:bg-transparent transition-colors",
                  scrolled ? "text-primary-foreground" : "text-foreground"
                )}>For Doctors</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {doctorsItems.map((item) => (
                      <ListItem
                        key={item.title}
                        title={item.title}
                        href={item.href}
                        icon={item.icon}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={cn(
                    "font-medium transition-colors",
                    scrolled ? "text-primary-foreground" : "text-foreground"
                  )}>
                    About
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center space-x-4">
            <ModeToggle scrolled={scrolled} />
            <Button

              size="sm"
              className={cn(
                scrolled && "border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              )}
              asChild
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              variant={scrolled ? "outline" : "default"}
              size="sm"
              className={cn(
                "bg-accent text-accent-foreground hover:bg-accent/90",
                scrolled && "border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              )}
              asChild
            >
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <ModeToggle scrolled={scrolled} />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "p-2 transition-colors",
              scrolled ? "text-primary-foreground" : "text-foreground"
            )}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-6 glass-effect border-t border-border/50 animate-in fade-in slide-in-from-top">
          <nav className="flex flex-col space-y-4">
            <h3 className="font-heading font-medium text-sm text-muted-foreground mb-2">Services</h3>
            {servicesItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors py-2"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
            
            <h3 className="font-heading font-medium text-sm text-muted-foreground mt-4 mb-2">For Patients</h3>
            {patientsItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors py-2"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
            
            <h3 className="font-heading font-medium text-sm text-muted-foreground mt-4 mb-2">For Doctors</h3>
            {doctorsItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 text-foreground hover:text-primary transition-colors py-2"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.title}</span>
              </Link>
            ))}
            
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-foreground hover:text-primary transition-colors py-2"
            >
              About
            </Link>
            
            <div className="flex space-x-4 mt-4 pt-4 border-t border-border">
              <Button className="flex-1" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90" asChild>
                <Link href="/register">Register</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

const ListItem = ({ className, title, children, href, icon: Icon, ...props }: any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="flex items-center space-x-2">
            {Icon && <Icon className="h-5 w-5" />}
            <div className="text-sm font-medium leading-none">{title}</div>
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

const servicesItems = [
  {
    title: "Teleconsultations",
    description: "Connect with medical professionals through secure video calls",
    href: "/services/teleconsultation",
    icon: Stethoscope,
  },
  {
    title: "Emergency Services",
    description: "Get immediate medical assistance for urgent situations",
    href: "/services/emergency",
    icon: Heart,
  },
  {
    title: "Medical Records",
    description: "Access and manage your medical history and documents",
    href: "/services/records",
    icon: Calendar,
  },
  {
    title: "Messaging",
    description: "Securely communicate with healthcare providers",
    href: "/services/messaging",
    icon: MessageCircle,
  },
];

const patientsItems = [
  {
    title: "Find a Doctor",
    description: "Search for specialists based on expertise and availability",
    href: "/patients/find-doctor",
    icon: Search,
  },
  {
    title: "Schedule Appointment",
    description: "Book consultations with healthcare professionals",
    href: "/patients/appointments",
    icon: Calendar,
  },
  {
    title: "Health Records",
    description: "View and manage your complete medical history",
    href: "/patients/records",
    icon: Calendar,
  },
  {
    title: "Prescriptions",
    description: "Access your electronic prescriptions and refill requests",
    href: "/patients/prescriptions",
    icon: Stethoscope,
  },
];

const doctorsItems = [
  {
    title: "Patient Management",
    description: "Organize and access your patient information securely",
    href: "/doctors/patients",
    icon: Search,
  },
  {
    title: "Appointment Schedule",
    description: "Manage your consultation calendar and availability",
    href: "/doctors/schedule",
    icon: Calendar,
  },
  {
    title: "Consultation Tools",
    description: "Access video conferencing and medical reference tools",
    href: "/doctors/tools",
    icon: Stethoscope,
  },
  {
    title: "Revenue Dashboard",
    description: "Track your earnings and financial analytics",
    href: "/doctors/revenue",
    icon: Heart,
  },
];