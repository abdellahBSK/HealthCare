'use client';

import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, CheckCircle, XCircle, FileText, User, Briefcase, GraduationCap, Calendar } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Sample data for demonstration
const PENDING_DOCTORS = [
  { 
    id: 1, 
    name: 'Dr. Marie Laurent', 
    specialty: 'Cardiology', 
    email: 'marie.laurent@example.com', 
    licenseNumber: 'CARD-12345-FR',
    submittedDate: '2023-06-15',
    documents: [
      { name: 'Medical Degree', verified: false },
      { name: 'Professional License', verified: false },
      { name: 'Specialty Certificate', verified: false }
    ],
    education: [
      { institution: 'Paris Descartes University', degree: 'Doctor of Medicine', year: 2015 },
      { institution: 'Georges-Pompidou European Hospital', degree: 'Cardiology Specialization', year: 2019 }
    ],
    experience: [
      { position: 'Cardiologist', institution: 'Pitié-Salpêtrière Hospital', years: '2019-2022' },
      { position: 'Medical Intern', institution: 'Necker-Enfants Malades Hospital', years: '2016-2019' }
    ]
  },
  { 
    id: 2, 
    name: 'Dr. Thomas Dubois', 
    specialty: 'Neurology', 
    email: 'thomas.dubois@example.com', 
    licenseNumber: 'NEUR-54321-FR',
    submittedDate: '2023-06-18',
    documents: [
      { name: 'Medical Degree', verified: false },
      { name: 'Professional License', verified: false },
      { name: 'Specialty Certificate', verified: false }
    ],
    education: [
      { institution: 'Claude Bernard Lyon 1 University', degree: 'Doctor of Medicine', year: 2014 },
      { institution: 'Lyon Civil Hospices', degree: 'Neurology Specialization', year: 2018 }
    ],
    experience: [
      { position: 'Neurologist', institution: 'Grenoble University Hospital', years: '2018-2023' },
      { position: 'Medical Intern', institution: 'Pierre Wertheimer Neurological Hospital', years: '2015-2018' }
    ]
  },
  { 
    id: 3, 
    name: 'Dr. Sophie Martin', 
    specialty: 'Pediatrics', 
    email: 'sophie.martin@example.com', 
    licenseNumber: 'PED-67890-FR',
    submittedDate: '2023-06-20',
    documents: [
      { name: 'Medical Degree', verified: false },
      { name: 'Professional License', verified: false },
      { name: 'Specialty Certificate', verified: false }
    ],
    education: [
      { institution: 'University of Strasbourg', degree: 'Doctor of Medicine', year: 2016 },
      { institution: 'Strasbourg University Hospital', degree: 'Pediatrics Specialization', year: 2020 }
    ],
    experience: [
      { position: 'Pediatrician', institution: 'Robert Debré Hospital', years: '2020-2023' },
      { position: 'Medical Intern', institution: 'Necker-Enfants Malades Hospital', years: '2017-2020' }
    ]
  },
];

// Sample data for verified doctors
const VERIFIED_DOCTORS = [
  { id: 4, name: 'Dr. Jean Dupont', specialty: 'Dermatology', email: 'jean.dupont@example.com', licenseNumber: 'DERM-98765-FR', verifiedDate: '2023-05-10' },
  { id: 5, name: 'Dr. Claire Moreau', specialty: 'Psychiatry', email: 'claire.moreau@example.com', licenseNumber: 'PSYC-45678-FR', verifiedDate: '2023-05-15' },
];

// Sample data for rejected doctors
const REJECTED_DOCTORS = [
  { id: 6, name: 'Dr. Pierre Leroy', specialty: 'Ophthalmology', email: 'pierre.leroy@example.com', licenseNumber: 'OPHT-13579-FR', rejectedDate: '2023-05-20', reason: 'Incomplete documents' },
  { id: 7, name: 'Dr. Isabelle Blanc', specialty: 'Gynecology', email: 'isabelle.blanc@example.com', licenseNumber: 'GYN-24680-FR', rejectedDate: '2023-05-25', reason: 'Invalid license' },
];

export default function DoctorVerificationPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  
  const filteredPendingDoctors = PENDING_DOCTORS.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredVerifiedDoctors = VERIFIED_DOCTORS.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const filteredRejectedDoctors = REJECTED_DOCTORS.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleApprove = (doctor) => {
    // Here, you would implement the API call to approve the doctor
    alert(`Doctor ${doctor.name} has been approved.`);
  };
  
  const handleReject = () => {
    if (!selectedDoctor) return;
    
    // Here, you would implement the API call to reject the doctor
    alert(`Doctor ${selectedDoctor.name} has been rejected for the reason: ${rejectReason}`);
    
    setShowRejectDialog(false);
    setRejectReason('');
    setSelectedDoctor(null);
  };
  
  const openRejectDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setShowRejectDialog(true);
  };
  
  const openDetailsDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setShowDetailsDialog(true);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Doctor Verification</h1>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search doctors..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({PENDING_DOCTORS.length})</TabsTrigger>
          <TabsTrigger value="verified">Verified ({VERIFIED_DOCTORS.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({REJECTED_DOCTORS.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead className="w-[150px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPendingDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.licenseNumber}</TableCell>
                    <TableCell>{doctor.submittedDate}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDetailsDialog(doctor)}
                        >
                          Details
                        </Button>
                        <Button 
                          variant="default" 
                          size="sm"
                          onClick={() => handleApprove(doctor)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Approve
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          onClick={() => openRejectDialog(doctor)}
                        >
                          Reject
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="verified" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Verification Date</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVerifiedDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.licenseNumber}</TableCell>
                    <TableCell>{doctor.verifiedDate}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => alert(`View profile of ${doctor.name}`)}
                      >
                        View Profile
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
        
        <TabsContent value="rejected" className="space-y-4">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>License Number</TableHead>
                  <TableHead>Rejection Date</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRejectedDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">{doctor.name}</TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell>{doctor.licenseNumber}</TableCell>
                    <TableCell>{doctor.rejectedDate}</TableCell>
                    <TableCell>{doctor.reason}</TableCell>
                    <TableCell>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => alert(`Reconsider ${doctor.name}`)}
                      >
                        Reconsider
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Doctor details dialog */}
      {selectedDoctor && (
        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Doctor Details</DialogTitle>
              <DialogDescription>
                Verify doctor information before approving or rejecting.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                    <p>{selectedDoctor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p>{selectedDoctor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Specialty</p>
                    <p>{selectedDoctor.specialty}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">License Number</p>
                    <p>{selectedDoctor.licenseNumber}</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {selectedDoctor.documents && selectedDoctor.documents.map((doc, index) => (
                      <li key={index} className="flex items-center justify-between">
                        <span>{doc.name}</span>
                        <Button variant="outline" size="sm">View</Button>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Education
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedDoctor.education && selectedDoctor.education.map((edu, index) => (
                      <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
                        <p className="font-medium">{edu.degree}</p>
                        <p className="text-sm text-muted-foreground">{edu.institution}, {edu.year}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Professional Experience
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {selectedDoctor.experience && selectedDoctor.experience.map((exp, index) => (
                      <li key={index} className="border-b pb-2 last:border-0 last:pb-0">
                        <p className="font-medium">{exp.position}</p>
                        <p className="text-sm text-muted-foreground">{exp.institution}, {exp.years}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <DialogFooter className="flex justify-between sm:justify-between">
              <Button 
                variant="destructive" 
                onClick={() => {
                  setShowDetailsDialog(false);
                  openRejectDialog(selectedDoctor);
                }}
              >
                Reject
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => {
                  handleApprove(selectedDoctor);
                  setShowDetailsDialog(false);
                }}
              >
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Rejection dialog */}
      {selectedDoctor && (
        <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
              <DialogDescription>
                Please provide a reason for rejecting {selectedDoctor.name}'s application.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <Input
                placeholder="Reason for rejection"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleReject} disabled={!rejectReason.trim()}>
                Confirm Rejection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}