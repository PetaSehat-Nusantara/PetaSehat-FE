// /* eslint-disable @typescript-eslint/no-explicit-any */
// 'use client';
// import { Skeleton } from '@/components/ui/skeleton';
// import { useState } from 'react';
// import {
//   FormData,
//   InformasiUmumData,
//   KriteriaDemografiData,
//   KriteriaKeuanganData,
//   LokasiLahanData,
// } from './interface';
// import ProgressBar from './module-elements/ProgressBar';
// import InformasiUmum from './sections/InformasiUmum';
// import KriteriaDemografi from './sections/KriteriaDemografi';
// import KriteriaKeuangan from './sections/KriteriaKeuangan';
// import LokasiLahan from './sections/LokasiLahan';
//
// export default function DashboardModule() {
//   const [currentProgressIdx, setCurrentProgressIdx] = useState<number>(1);
//   const [isLoading, setIsLoading] = useState(false);
//
//   // State to retain data from all steps
//   const [formData, setFormData] = useState<FormData>({
//     informasiUmum: {},
//     kriteriaDemografi: {},
//     lokasiLahan: {},
//     kriteriaKeuangan: {},
//   });
//
//   // Function to update specific section data
//   const updateFormData = (section: keyof FormData, data: any) => {
//     setFormData((prev) => ({
//       ...prev,
//       [section]: { ...prev[section], ...data },
//     }));
//   };
//
//   // Function to go to next step
//   const nextStep = () => {
//     if (currentProgressIdx < 4) {
//       setCurrentProgressIdx((prev) => prev + 1);
//     }
//   };
//
//   // Function to go to previous step
//   const prevStep = () => {
//     if (currentProgressIdx > 1) {
//       setCurrentProgressIdx((prev) => prev - 1);
//     }
//   };
//
//   // Function to handle form submission from step components
//   const handleStepSubmit = (stepData: any) => {
//     const sectionMap: Record<number, keyof FormData> = {
//       1: 'informasiUmum',
//       2: 'kriteriaDemografi',
//       3: 'lokasiLahan',
//       4: 'kriteriaKeuangan',
//     };
//
//     const currentSection = sectionMap[currentProgressIdx];
//     updateFormData(currentSection, stepData);
//
//     // Only move to next step if not on final step
//     if (currentProgressIdx < 4) {
//       nextStep();
//     } else {
//       setIsLoading(true);
//       // Simulate loading/thinking process
//       console.log(formData)
//       setTimeout(() => {
//         setIsLoading(false);
//         // Here you would navigate to the result page or show the result
//       }, 2500);
//     }
//   };
//
//   // Render current step component
//   const renderCurrentStep = () => {
//     // const commonProps = {
//     //   onNext: nextStep,
//     //   onPrev: currentProgressIdx > 1 ? prevStep : undefined,
//     //   onSubmit: handleStepSubmit,
//     // };
//
//     switch (currentProgressIdx) {
//       case 1:
//         return (
//           <InformasiUmum
//             initialData={formData.informasiUmum}
//             onSubmit={(data: InformasiUmumData) => handleStepSubmit(data)}
//           />
//         );
//       case 2:
//         return (
//           <KriteriaDemografi
//             initialData={formData.kriteriaDemografi}
//             onSubmit={(data: KriteriaDemografiData) => {
//               // Do something else first
//               console.log("Submitting KriteriaDemografi", data);
//               // Then call the original handler
//               handleStepSubmit(data);
//             }}
//             onPrev={prevStep}
//           />
//         );
//       case 3:
//         return (
//           <LokasiLahan
//             initialData={formData.lokasiLahan}
//             onSubmit={(data: LokasiLahanData) => {
//               // Do something else first
//               // e.g., setLoading(true);
//               return handleStepSubmit(data);
//             }}
//             onPrev={prevStep}
//           />
//         );
//       case 4:
//         return (
//           <KriteriaKeuangan
//             initialData={formData.kriteriaKeuangan}
//             onSubmit={(data: KriteriaKeuanganData) => {
//               // Do something else first
//               // e.g., validate data, show toast, etc.
//               handleStepSubmit(data);
//             }}
//             onPrev={prevStep}
//             allData={formData}
//           />
//         );
//       default:
//         return null;
//     }
//   };
//
//   // Loading page component
//   const LoadingPage = () => (
//     <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 gap-6 border border-gray-200">
//       <div className="w-full flex flex-col items-center gap-2">
//         <Skeleton className="h-8 w-2/3 mb-2" />
//         <Skeleton className="h-4 w-1/3 mb-4" />
//         <div className="w-full flex flex-col items-center border border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
//           <Skeleton className="h-6 w-1/2 mb-2" />
//           <Skeleton className="h-4 w-1/3 mb-2" />
//           <div className="flex items-center gap-3 mt-4">
//             <Skeleton className="h-10 w-10 rounded-full" />
//             <div>
//               <Skeleton className="h-4 w-24 mb-1" />
//               <Skeleton className="h-3 w-32" />
//             </div>
//           </div>
//         </div>
//         <div className="w-full flex items-center gap-2 mt-6">
//           <Skeleton className="h-2 w-1/4 rounded-full" />
//           <span className="text-sm text-gray-500">44%</span>
//         </div>
//         <div className="w-full mt-8 space-y-4">
//           <Skeleton className="h-5 w-1/2" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-5/6" />
//           <Skeleton className="h-5 w-1/3 mt-6" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-4/6" />
//           <Skeleton className="h-5 w-2/5 mt-6" />
//           <Skeleton className="h-4 w-full" />
//           <Skeleton className="h-4 w-3/4" />
//         </div>
//       </div>
//     </div>
//   );
//
//   return (
//     <div className="bg-gray-50 p-4 flex gap-4">
//       <div className="mx-auto w-full">
//         <div className="py-6 w-full flex flex-col gap-2">
//           <h1 className="text-4xl font-bold primary-gradient-text">
//             Fasilitas Kesehatan Baru
//           </h1>
//           <ProgressBar currentStep={currentProgressIdx} />
//         </div>
//         {isLoading ? <LoadingPage /> : renderCurrentStep()}
//       </div>
//       {/* <SideNusaInfo /> */}
//     </div>
//   );
// }


"use client"

import { useState } from "react"
import {
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Upload,
  MapPin,
  FileText,
  MessageCircle,
  Filter,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from 'next/link';

export default function Dashboard() {
  const [nusaInfoExpanded, setNusaInfoExpanded] = useState(false)
  const [statisticsExpanded, setStatisticsExpanded] = useState(true)

  const chartData = [
    { year: "2026", percentage: 6, height: 20 },
    { year: "2027", percentage: 10.5, height: 35 },
    { year: "2028", percentage: 14, height: 45 },
    { year: "2029", percentage: 21.75, height: 70 },
    { year: "2030", percentage: 37, height: 100 },
  ]

  const statistics = [
    {
      icon: Upload,
      label: "Faskes Dibuat",
      value: "0",
      percentage: "0%",
    },
    {
      icon: MapPin,
      label: "Lokasi Diperiksa",
      value: "0",
      percentage: "0%",
    },
    {
      icon: FileText,
      label: "Dokumen Diselesaikan",
      value: "0",
      percentage: "0%",
    },
    {
      icon: MessageCircle,
      label: "Pertanyaan Dijawab NusaInfo",
      value: "0",
      percentage: "0%",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <span className="text-emerald-600 font-medium">Dasbor</span>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">Beranda</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Geographical Health Coverage Chart */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold text-gray-900">Geographical Health Coverage</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-sm text-gray-500">Timeframe</span>
                    <Badge variant="secondary" className="text-xs">
                      5Y
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      3M
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      1M
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      1W
                    </Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-1" />
                  Filter
                </Button>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Y-axis labels */}
                  <div className="absolute left-0 top-0 h-64 flex flex-col justify-between text-xs text-gray-500">
                    <span>40</span>
                    <span>30</span>
                    <span>20</span>
                    <span>10</span>
                    <span>0</span>
                  </div>

                  {/* Chart area */}
                  <div className="ml-8 h-64 flex items-end justify-between gap-4">
                    {chartData.map((item, index) => (
                      <div key={item.year} className="flex flex-col items-center flex-1">
                        <div className="relative w-full max-w-16">
                          <div
                            className={`w-full rounded-t ${
                              index < 2 ? "bg-blue-600" : index === 2 ? "bg-blue-700" : "bg-blue-800"
                            } flex items-end justify-center text-white text-xs font-medium pb-2`}
                            style={{ height: `${item.height * 2.4}px` }}
                          >
                            {item.percentage}%
                          </div>
                        </div>
                        <span className="text-xs text-gray-600 mt-2">{item.year}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-center text-xs text-gray-500 mt-2">Tahun</div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">Aktivitas Terbaru</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-6">Kamu tidak punya rencana Fasilitas Kesehatan</p>
                  <Link href="/dashboard/faskes-baru">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Rencanakan Faskes Baru
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* NusaInfo */}
            <Card>
              <CardHeader
                className="flex flex-row items-center justify-between cursor-pointer"
                onClick={() => setNusaInfoExpanded(!nusaInfoExpanded)}
              >
                <CardTitle className="text-lg font-semibold text-gray-900">NusaInfo</CardTitle>
                {nusaInfoExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </CardHeader>
              {nusaInfoExpanded && (
                <CardContent>
                  <p className="text-gray-600 text-sm">Informasi dan bantuan terkait sistem kesehatan.</p>
                </CardContent>
              )}
            </Card>

            {/* Usage Statistics */}
            <Card>
              <CardHeader
                className="flex flex-row items-center justify-between cursor-pointer"
                onClick={() => setStatisticsExpanded(!statisticsExpanded)}
              >
                <CardTitle className="text-lg font-semibold text-gray-900">Statistik Penggunaan</CardTitle>
                {statisticsExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </CardHeader>
              {statisticsExpanded && (
                <CardContent className="space-y-4">
                  {statistics.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <stat.icon className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-700">{stat.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{stat.value}</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 text-xs">
                          {stat.percentage}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}



