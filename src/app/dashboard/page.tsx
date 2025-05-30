import SidebarLayout from '@/components/elements/Navigation/navigation';
import DashboardModule from '@/modules/DashboardModule';
import React from 'react';

const Dashboard = () => {
  return (
    <SidebarLayout>
      <DashboardModule />
    </SidebarLayout>
  );
};

export default Dashboard;
