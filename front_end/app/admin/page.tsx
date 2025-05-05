'use client';

import { Card } from '@/components/ui/card';
import { StatsCard } from '@/components/admin/dashboard/stats-card';
import { RecentUsers } from '@/components/admin/dashboard/recent-users';
import { RecentAppointments } from '@/components/admin/dashboard/recent-appointments';
import { RevenueChart } from '@/components/admin/dashboard/revenue-chart';
import { Users, UserCheck, Calendar, DollarSign } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
          title="Total Users" 
          value="12,345" 
          icon={<Users className="h-8 w-8" />} 
          trend="+12%" 
        />
        <StatsCard 
          title="Verified Doctors" 
          value="1,234" 
          icon={<UserCheck className="h-8 w-8" />} 
          trend="+7%" 
        />
        <StatsCard 
          title="Appointments" 
          value="2,345" 
          icon={<Calendar className="h-8 w-8" />} 
          trend="+23%" 
        />
        <StatsCard 
          title="Revenue" 
          value="$34,567" 
          icon={<DollarSign className="h-8 w-8" />} 
          trend="+18%" 
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-2 p-6">
          <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>
          <RevenueChart />
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
          <RecentUsers />
        </Card>
      </div>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Appointments</h2>
        <RecentAppointments />
      </Card>
    </div>
  );
}