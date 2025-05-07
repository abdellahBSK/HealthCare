"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MoreVertical, Filter, Calendar } from "lucide-react";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

// Données fictives pour la démonstration
const APPOINTMENTS_DATA = [
  {
    id: 1,
    patient: "John Doe",
    doctor: "Dr. Sarah Johnson",
    speciality: "Cardiologie",
    date: "15 Juin 2023",
    time: "10:00",
    status: "Confirmé",
  },
  {
    id: 2,
    patient: "Jane Smith",
    doctor: "Dr. Michael Brown",
    speciality: "Neurologie",
    date: "16 Juin 2023",
    time: "11:30",
    status: "En attente",
  },
  {
    id: 3,
    patient: "Robert Johnson",
    doctor: "Dr. Emily Davis",
    speciality: "Pédiatrie",
    date: "17 Juin 2023",
    time: "14:15",
    status: "Confirmé",
  },
  {
    id: 4,
    patient: "Emily Davis",
    doctor: "Dr. James Wilson",
    speciality: "Dermatologie",
    date: "18 Juin 2023",
    time: "09:45",
    status: "Annulé",
  },
  {
    id: 5,
    patient: "Michael Wilson",
    doctor: "Dr. Lisa Martinez",
    speciality: "Psychiatrie",
    date: "19 Juin 2023",
    time: "13:00",
    status: "Confirmé",
  },
];

// Données pour le graphique
const appointmentsByDay = Array.from({ length: 30 }, (_, i) => i + 1).map(
  (day) => ({
    day,
    date: `2023-06-${day.toString().padStart(2, "0")}`,
    appointments: Math.floor(Math.random() * 10) + 1,
  })
);

export default function AppointmentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Tous");

  const filteredAppointments = APPOINTMENTS_DATA.filter((appointment) => {
    const matchesSearch =
      appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.speciality.toLowerCase().includes(searchTerm.toLowerCase());

    if (selectedFilter === "Tous") return matchesSearch;
    if (selectedFilter === "Confirmé")
      return matchesSearch && appointment.status === "Confirmé";
    if (selectedFilter === "En attente")
      return matchesSearch && appointment.status === "En attente";
    if (selectedFilter === "Annulé")
      return matchesSearch && appointment.status === "Annulé";

    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rendez-vous</h1>
        <Button>
          <CalendarIcon className="mr-2 h-4 w-4" /> Nouveau rendez-vous
        </Button>
      </div>

      <Tabs defaultValue="liste" className="space-y-4">
        <TabsList>
          <TabsTrigger value="liste">Liste des rendez-vous</TabsTrigger>
          <TabsTrigger value="calendrier">Calendrier</TabsTrigger>
          <TabsTrigger value="statistiques">Statistiques</TabsTrigger>
        </TabsList>

        <TabsContent value="liste" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher des rendez-vous..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto">
                  <Filter className="mr-2 h-4 w-4" /> Filtrer
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setSelectedFilter("Tous")}>
                  Tous les rendez-vous
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("Confirmé")}>
                  Confirmés
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setSelectedFilter("En attente")}
                >
                  En attente
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setSelectedFilter("Annulé")}>
                  Annulés
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Médecin</TableHead>
                  <TableHead>Spécialité</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Heure</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell className="font-medium">
                      {appointment.patient}
                    </TableCell>
                    <TableCell>{appointment.doctor}</TableCell>
                    <TableCell>{appointment.speciality}</TableCell>
                    <TableCell>{appointment.date}</TableCell>
                    <TableCell>{appointment.time}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appointment.status === "Confirmé"
                            ? "default"
                            : appointment.status === "En attente"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Voir les détails</DropdownMenuItem>
                          <DropdownMenuItem>Modifier</DropdownMenuItem>
                          <DropdownMenuItem>Envoyer un rappel</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Annuler
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="calendrier" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendrier des rendez-vous</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center p-12">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">
                  Calendrier interactif
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Le calendrier interactif sera implémenté ici avec une
                  bibliothèque comme react-big-calendar.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistiques" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Rendez-vous par jour</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appointmentsByDay}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value} rendez-vous`, "Nombre"]}
                      labelFormatter={(label) => `Jour ${label}`}
                    />
                    <Bar
                      dataKey="appointments"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
