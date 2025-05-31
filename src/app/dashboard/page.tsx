'use client'
import SidebarLayout from '@/components/elements/Navigation/navigation';
import DashboardModule from '@/modules/DashboardModule';

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
