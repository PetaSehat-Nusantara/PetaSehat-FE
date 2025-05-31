import SidebarLayout from '@/components/elements/Navigation/navigation';
import DashboardModule from '@/modules/DashboardModule';
import LoadingPage from '@/modules/DashboardModule/sections/LoadingPage';
import LokasiLahan from '@/modules/DashboardModule/sections/LokasiLahan';
import { Rangkuman } from '@/modules/DashboardModule/sections/Rangkuman';
import React from 'react';

const Dashboard = () => {
  return (
    <SidebarLayout>
      {/* <DashboardModule /> */}
      {/* <LoadingPage /> */}
      <Rangkuman />
    </SidebarLayout>
  );
};

export default Dashboard;
