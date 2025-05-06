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
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Search, MoreVertical, Plus, CheckCircle, XCircle, UserCheck } from 'lucide-react';
import Link from 'next/link';

// Données fictives pour la démonstration
const DOCTORS_DATA = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Cardiologie', email: 'sarah@example.com', verified: true, patients: 45, joinedDate: '2023-01-10' },
  { id: 2, name: 'Dr. Michael Brown', specialty: 'Neurologie', email: 'michael@example.com', verified: true, patients: 32, joinedDate: '2023-02-15' },
  { id: 3, name: 'Dr. Emily Davis', specialty: 'Pédiatrie', email: 'emily@example.com', verified: false, patients: 0, joinedDate: '2023-05-20' },
  { id: 4, name: 'Dr. James Wilson', specialty: 'Dermatologie', email: 'james@example.com', verified: true, patients: 28, joinedDate: '2023-03-05' },
  { id: 5, name: 'Dr. Lisa Martinez', specialty: 'Psychiatrie', email: 'lisa@example.com', verified: true, patients: 37, joinedDate: '2023-04-12' },
];

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredDoctors = DOCTORS_DATA.filter(doctor => 
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Médecins</h1>
        <div className="flex space-x-2">
          <Link href="/admin/doctor-verification">
            <Button variant="outline" className="flex items-center">
              <UserCheck className="mr-2 h-4 w-4" /> Vérification des médecins
            </Button>
          </Link>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Ajouter un médecin
          </Button>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Rechercher des médecins..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Spécialité</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Vérifié</TableHead>
              <TableHead>Patients</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell className="font-medium">{doctor.name}</TableCell>
                <TableCell>{doctor.specialty}</TableCell>
                <TableCell>{doctor.email}</TableCell>
                <TableCell>
                  {doctor.verified ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </TableCell>
                <TableCell>{doctor.patients}</TableCell>
                <TableCell>{doctor.joinedDate}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Voir le profil</DropdownMenuItem>
                      <DropdownMenuItem>Modifier</DropdownMenuItem>
                      {!doctor.verified && (
                        <DropdownMenuItem className="text-green-600">Vérifier</DropdownMenuItem>
                      )}
                      <DropdownMenuItem className="text-red-600">Suspendre</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}