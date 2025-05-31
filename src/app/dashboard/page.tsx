'use client'
import SidebarLayout from '@/components/elements/Navigation/navigation';
import DashboardModule from '@/modules/DashboardModule';
import LoadingPage from '@/modules/DashboardModule/sections/LoadingPage';
import LokasiLahan from '@/modules/DashboardModule/sections/LokasiLahan';
import { Rangkuman } from '@/modules/DashboardModule/sections/Rangkuman';
import NusaSimulasiDashboard from '@/modules/NusaCariModule/sections/NusaSimulasi';
import React, { useEffect } from 'react';
import { healthCheck } from '../genkit/nusa-cari';

const Dashboard = () => {
  // useEffect(() => {
  //   (async () => {
  //     const hc = await healthCheck({data: 'kaboom!'});
  //     console.log(hc);
  //   })();
  // }, []);
  return (
    <SidebarLayout>
      <DashboardModule />
      {/* <LoadingPage /> */}
      {/* <Rangkuman /> */}
      {/* <NusaSimulasiDashboard /> */}
    </SidebarLayout>
  );
};

export default Dashboard;
