'use client';
import SideNusaInfo from '../NusaInfoModule/sections/SideNusaInfo';
import ProgressBar from './module-elements/ProgressBar';
import LokasiLahan from './sections/LokasiLahan';

export default function DashboardModule() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4 flex gap-4">
      <div className="mx-auto w-full">
        <div className="py-6 w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold primary-gradient-text">
            Fasilitas Kesehatan Baru
          </h1>
          <ProgressBar currentStep={1} />
        </div>
        {/* Step 1 */}
        {/* <InformasiUmum /> */}
        <LokasiLahan /> 
      </div>
      <SideNusaInfo />
    </div>
  );
}
