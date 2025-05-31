'use client';
import { useState } from 'react';
import SideNusaInfo from '../NusaInfoModule/sections/SideNusaInfo';
import ProgressBar from './module-elements/ProgressBar';
import InformasiUmum from './sections/InformasiUmum';
import KriteriaDemografi from './sections/KriteriaDemografi';
import KriteriaKeuangan from './sections/KriteriaKeuangan';
import LokasiLahan from './sections/LokasiLahan';
import { FormData, InformasiUmumData, KriteriaDemografiData, KriteriaKeuanganData, LokasiLahanData } from './interface';


export default function DashboardModule() {
  const [currentProgressIdx, setCurrentProgressIdx] = useState<number>(1);
  
  // State to retain data from all steps
  const [formData, setFormData] = useState<FormData>({
    informasiUmum: {},
    kriteriaDemografi: {},
    lokasiLahan: {},
    kriteriaKeuangan: {}
  });

  // Function to update specific section data
  const updateFormData = (section: keyof FormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: { ...prev[section], ...data }
    }));
  };

  // Function to go to next step
  const nextStep = () => {
    if (currentProgressIdx < 4) {
      setCurrentProgressIdx(prev => prev + 1);
    }
  };

  // Function to go to previous step
  const prevStep = () => {
    if (currentProgressIdx > 1) {
      setCurrentProgressIdx(prev => prev - 1);
    }
  };

  // Function to handle form submission from step components
  const handleStepSubmit = (stepData: any) => {
    const sectionMap: Record<number, keyof FormData> = {
      1: 'informasiUmum',
      2: 'kriteriaDemografi',
      3: 'lokasiLahan',
      4: 'kriteriaKeuangan'
    };
    
    const currentSection = sectionMap[currentProgressIdx];
    updateFormData(currentSection, stepData);
    
    // Only move to next step if not on final step
    if (currentProgressIdx < 4) {
      nextStep();
    } else {
        console.log('parent', formData)
    }
  };

  // Render current step component
  const renderCurrentStep = () => {
    const commonProps = {
      onNext: nextStep,
      onPrev: currentProgressIdx > 1 ? prevStep : undefined,
      onSubmit: handleStepSubmit
    };

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

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4 flex gap-4">
      <div className="mx-auto w-full">
        <div className="py-6 w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold primary-gradient-text">
            Fasilitas Kesehatan Baru
          </h1>
          <ProgressBar currentStep={currentProgressIdx} />
        </div>
        {renderCurrentStep()}
      </div>
      <SideNusaInfo />
    </div>
  );
}