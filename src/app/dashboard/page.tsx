import SidebarLayout from '@/components/elements/Navigation/navigation';
import DashboardModule from '@/modules/DashboardModule';
import LokasiLahan from '@/modules/DashboardModule/sections/LokasiLahan';
import React from 'react';

const Dashboard = () => {
  return (
    <SidebarLayout>
      <DashboardModule />
    </SidebarLayout>
  );
};

export default Dashboard;
