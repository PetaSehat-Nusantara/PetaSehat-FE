/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Skeleton } from '@/components/ui/skeleton';
import { useState } from 'react';
import {
  FormData,
  InformasiUmumData,
  KriteriaDemografiData,
  KriteriaKeuanganData,
  LokasiLahanData,
} from './interface';
import ProgressBar from './module-elements/ProgressBar';
import InformasiUmum from './sections/InformasiUmum';
import KriteriaDemografi from './sections/KriteriaDemografi';
import KriteriaKeuangan from './sections/KriteriaKeuangan';
import LokasiLahan from './sections/LokasiLahan';

export default function DashboardModule() {
  const [currentProgressIdx, setCurrentProgressIdx] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(false);

  // State to retain data from all steps
  const [formData, setFormData] = useState<FormData>({
    informasiUmum: {},
    kriteriaDemografi: {},
    lokasiLahan: {},
    kriteriaKeuangan: {},
  });

  // Function to update specific section data
  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: { ...prev[section], ...data },
    }));
  };

  // Function to go to next step
  const nextStep = () => {
    if (currentProgressIdx < 4) {
      setCurrentProgressIdx((prev) => prev + 1);
    }
  };

  // Function to go to previous step
  const prevStep = () => {
    if (currentProgressIdx > 1) {
      setCurrentProgressIdx((prev) => prev - 1);
    }
  };

  // Function to handle form submission from step components
  const handleStepSubmit = (stepData: any) => {
    const sectionMap: Record<number, keyof FormData> = {
      1: 'informasiUmum',
      2: 'kriteriaDemografi',
      3: 'lokasiLahan',
      4: 'kriteriaKeuangan',
    };

    const currentSection = sectionMap[currentProgressIdx];
    updateFormData(currentSection, stepData);

    // Only move to next step if not on final step
    if (currentProgressIdx < 4) {
      nextStep();
    } else {
      setIsLoading(true);
      // Simulate loading/thinking process
      console.log(formData)
      setTimeout(() => {
        setIsLoading(false);
        // Here you would navigate to the result page or show the result
      }, 2500);
    }
  };

  // Render current step component
  const renderCurrentStep = () => {
    // const commonProps = {
    //   onNext: nextStep,
    //   onPrev: currentProgressIdx > 1 ? prevStep : undefined,
    //   onSubmit: handleStepSubmit,
    // };

    switch (currentProgressIdx) {
      case 1:
        return (
          <InformasiUmum
            initialData={formData.informasiUmum}
            onSubmit={(data: InformasiUmumData) => handleStepSubmit(data)}
          />
        );
      case 2:
        return (
          <KriteriaDemografi
            initialData={formData.kriteriaDemografi}
            onSubmit={(data: KriteriaDemografiData) => handleStepSubmit(data)}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <LokasiLahan
            initialData={formData.lokasiLahan}
            onSubmit={(data: LokasiLahanData) => handleStepSubmit(data)}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <KriteriaKeuangan
            initialData={formData.kriteriaKeuangan}
            onSubmit={(data: KriteriaKeuanganData) => handleStepSubmit(data)}
            onPrev={prevStep}
            allData={formData}
          />
        );
      default:
        return null;
    }
  };

  // Loading page component
  const LoadingPage = () => (
    <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 gap-6 border border-gray-200">
      <div className="w-full flex flex-col items-center gap-2">
        <Skeleton className="h-8 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-4" />
        <div className="w-full flex flex-col items-center border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
          <Skeleton className="h-6 w-1/2 mb-2" />
          <Skeleton className="h-4 w-1/3 mb-2" />
          <div className="flex items-center gap-3 mt-4">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div>
              <Skeleton className="h-4 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
        </div>
        <div className="w-full flex items-center gap-2 mt-6">
          <Skeleton className="h-2 w-1/4 rounded-full" />
          <span className="text-sm text-gray-500">44%</span>
        </div>
        <div className="w-full mt-8 space-y-4">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-5 w-1/3 mt-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/6" />
          <Skeleton className="h-5 w-2/5 mt-6" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 p-4 flex gap-4">
      <div className="mx-auto w-full">
        <div className="py-6 w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold primary-gradient-text">
            Fasilitas Kesehatan Baru
          </h1>
          <ProgressBar currentStep={currentProgressIdx} />
        </div>
        {isLoading ? <LoadingPage /> : renderCurrentStep()}
      </div>
      {/* <SideNusaInfo /> */}
    </div>
  );
}
