"use client";

import React, { useEffect, useState } from "react";
import { ChevronRight, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAuthUser } from "@/hooks/use-auth-user";
import { useRouter } from "next/navigation";
import LoadingComponent from "@/components/elements/LoadingComponent";
import NusaInfoModule from "@/modules/NusaInfoModule";
import SidebarLayout from "@/components/elements/Navigation/navigation";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

type ChartType = "pendapatan" | "biaya" | "grossProfit" | "cashflow";

const NusaSimulasiModule = () => {
  const [activeTab, setActiveTab] = useState<"finansial" | "demand">("finansial");
  const [activeChart, setActiveChart] = useState<ChartType>("pendapatan");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1Y");
  const [isNusaInfoExpanded, setIsNusaInfoExpanded] = useState(true);
  const { user, loading } = useAuthUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingComponent />
      </div>
    );
  }

  // Mock data for the charts
  const chartData = {
    years: ["2026", "2027", "2028", "2029", "2030", "2031"],
    pendapatan: {
      rawatInap: [50, 65, 80, 95, 110, 125],
      rawatJalan: [40, 55, 70, 85, 100, 115],
      layanan: [30, 40, 50, 55, 65, 75],
      penunjang: [20, 30, 40, 50, 60, 70],
      total: [100, 150, 180, 210, 240, 250],
    },
    biaya: {
      operasional: [40, 50, 60, 70, 80, 90],
      gaji: [30, 35, 40, 45, 50, 55],
      peralatan: [15, 20, 25, 30, 35, 40],
      administrasi: [10, 15, 20, 25, 30, 35],
      total: [95, 120, 145, 170, 195, 220],
    },
    grossProfit: {
      rawatInap: [20, 25, 30, 35, 40, 45],
      rawatJalan: [15, 20, 25, 30, 35, 40],
      layanan: [10, 15, 20, 25, 30, 35],
      penunjang: [5, 10, 15, 20, 25, 30],
      total: [50, 70, 90, 110, 130, 150],
    },
    cashflow: {
      inflow: [110, 130, 150, 170, 190, 210],
      outflow: [90, 100, 110, 120, 130, 140],
      netCashflow: [20, 30, 40, 50, 60, 70],
      cummulative: [20, 50, 90, 140, 200, 270],
    },
  };

  const chartConfigs = {
    pendapatan: {
      title: "Pendapatan",
      datasets: [
        {
          label: "Rawat Inap",
          data: chartData.pendapatan.rawatInap,
          borderColor: "#047857",
          backgroundColor: "#04785733",
        },
        {
          label: "Rawat Jalan",
          data: chartData.pendapatan.rawatJalan,
          borderColor: "#0369a1",
          backgroundColor: "#0369a133",
        },
        {
          label: "Layanan",
          data: chartData.pendapatan.layanan,
          borderColor: "#dc2626",
          backgroundColor: "#dc262633",
        },
        {
          label: "Penunjang",
          data: chartData.pendapatan.penunjang,
          borderColor: "#6d28d9",
          backgroundColor: "#6d28d933",
        },
        {
          label: "Total Pendapatan (Cummulative)",
          data: chartData.pendapatan.total,
          borderColor: "#059669",
          backgroundColor: "#05966933",
          borderWidth: 3,
        },
      ],
    },
    biaya: {
      title: "Biaya",
      datasets: [
        {
          label: "Operasional",
          data: chartData.biaya.operasional,
          borderColor: "#047857",
          backgroundColor: "#04785733",
        },
        {
          label: "Gaji",
          data: chartData.biaya.gaji,
          borderColor: "#0369a1",
          backgroundColor: "#0369a133",
        },
        {
          label: "Peralatan",
          data: chartData.biaya.peralatan,
          borderColor: "#dc2626",
          backgroundColor: "#dc262633",
        },
        {
          label: "Administrasi",
          data: chartData.biaya.administrasi,
          borderColor: "#6d28d9",
          backgroundColor: "#6d28d933",
        },
        {
          label: "Total Biaya",
          data: chartData.biaya.total,
          borderColor: "#059669",
          backgroundColor: "#05966933",
          borderWidth: 3,
        },
      ],
    },
    grossProfit: {
      title: "Gross Profit",
      datasets: [
        {
          label: "Rawat Inap",
          data: chartData.grossProfit.rawatInap,
          borderColor: "#047857",
          backgroundColor: "#04785733",
        },
        {
          label: "Rawat Jalan",
          data: chartData.grossProfit.rawatJalan,
          borderColor: "#0369a1",
          backgroundColor: "#0369a133",
        },
        {
          label: "Layanan",
          data: chartData.grossProfit.layanan,
          borderColor: "#dc2626",
          backgroundColor: "#dc262633",
        },
        {
          label: "Penunjang",
          data: chartData.grossProfit.penunjang,
          borderColor: "#6d28d9",
          backgroundColor: "#6d28d933",
        },
        {
          label: "Total Gross Profit",
          data: chartData.grossProfit.total,
          borderColor: "#059669",
          backgroundColor: "#05966933",
          borderWidth: 3,
        },
      ],
    },
    cashflow: {
      title: "Cashflow",
      datasets: [
        {
          label: "Inflow",
          data: chartData.cashflow.inflow,
          borderColor: "#047857",
          backgroundColor: "#04785733",
        },
        {
          label: "Outflow",
          data: chartData.cashflow.outflow,
          borderColor: "#0369a1",
          backgroundColor: "#0369a133",
        },
        {
          label: "Net Cashflow",
          data: chartData.cashflow.netCashflow,
          borderColor: "#dc2626",
          backgroundColor: "#dc262633",
        },
        {
          label: "Cummulative",
          data: chartData.cashflow.cummulative,
          borderColor: "#059669",
          backgroundColor: "#05966933",
          borderWidth: 3,
        },
      ],
    },
  };

  const breadcrumbs = [
    { label: "Dasbor", href: "/dashboard" },
    { label: "Daftar Faskes", href: "/faskes" },
    { label: "RS Daerah Jawa...", href: "/faskes/rs-jawa" },
    { label: "Rangkuman", href: "#", active: true },
  ];

  const timeframes = ["1Y", "3M", "1M", "1W"];

  // Chart component with PyChart
  const FinancialChart = ({ config }: { config: typeof chartConfigs.pendapatan }) => (
    <div className="w-full max-w-2xl mx-auto">
      <Line
        data={{
          labels: chartData.years,
          datasets: config.datasets,
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              display: false, // We'll use custom legend
            },
            title: {
              display: false,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Milliards (Rp)",
              },
            },
            x: {
              title: {
                display: true,
                text: "Tahun",
              },
            },
          },
        }}
      />
      {/* Custom Legend */}
      <div className="flex flex-wrap gap-4 justify-center mt-4">
        {config.datasets.map((series, i) => (
          <div key={i} className="flex items-center space-x-2">
            <span
              className="inline-block w-4 h-2 rounded"
              style={{ backgroundColor: series.borderColor }}
            />
            <span className="text-xs text-slate-600">{series.label}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Breadcrumb Navigation */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 z-20">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbs.map((crumb, index) => (
              <div key={crumb.label} className="flex items-center">
                {index > 0 && <ChevronRight className="h-4 w-4 text-slate-400 mx-2" />}
                <span
                  className={cn(
                    "hover:text-emerald-600 transition-colors",
                    crumb.active ? "text-emerald-600 font-medium" : "text-slate-600 cursor-pointer",
                  )}
                >
                  {crumb.label}
                </span>
              </div>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 relative">
          {/* Main Content */}
          <div className={cn("flex-1 transition-all duration-300", isNusaInfoExpanded ? "mr-80" : "mr-16")}>
            <div className="p-6">
              {/* Tab Navigation */}
              <div className="flex space-x-4 mb-6">
                <Button
                  variant={activeTab === "finansial" ? "default" : "outline"}
                  onClick={() => setActiveTab("finansial")}
                  className={cn(
                    "px-8 py-3 rounded-xl transition-all duration-300 w-1/2",
                    activeTab === "finansial"
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
                  )}
                >
                  Finansial
                </Button>
                <Button
                  variant={activeTab === "demand" ? "default" : "outline"}
                  onClick={() => setActiveTab("demand")}
                  className={cn(
                    "px-8 py-3 rounded-xl transition-all duration-300 w-1/2",
                    activeTab === "demand"
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg"
                      : "border-emerald-200 text-emerald-700 hover:bg-emerald-50",
                  )}
                >
                  Demand & Operasional
                </Button>
              </div>

              {/* Chart Section */}
              <Card className="border-emerald-200/50 shadow-lg">
                <CardContent className="p-0">
                  {/* Chart Type Navigation */}
                  <div className="flex border-b border-slate-200">
                    {(["pendapatan", "biaya", "grossProfit", "cashflow"] as const).map((chartType) => (
                      <button
                        key={chartType}
                        onClick={() => setActiveChart(chartType)}
                        className={cn(
                          "px-6 py-4 text-sm font-medium transition-colors",
                          activeChart === chartType
                            ? "text-emerald-600 border-b-2 border-emerald-500"
                            : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50",
                        )}
                      >
                        {chartType === "pendapatan"
                          ? "Pendapatan"
                          : chartType === "biaya"
                            ? "Biaya"
                            : chartType === "grossProfit"
                              ? "Gross Profit"
                              : "Cashflow"}
                      </button>
                    ))}
                  </div>

                  {/* Timeframe and Filter */}
                  <div className="flex justify-between items-center px-6 py-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-slate-500">Timeframe</span>
                      <div className="flex bg-slate-100 rounded-lg p-1">
                        {timeframes.map((tf) => (
                          <button
                            key={tf}
                            onClick={() => setSelectedTimeframe(tf)}
                            className={cn(
                              "px-3 py-1 text-xs rounded-md transition-all duration-200",
                              selectedTimeframe === tf
                                ? "bg-white text-emerald-600 shadow-sm"
                                : "text-slate-600 hover:text-emerald-600",
                            )}
                          >
                            {tf}
                          </button>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="border-emerald-200 hover:bg-emerald-50">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>

                  {/* Chart Area + Legend */}
                  <div className="p-6 bg-gradient-to-br from-emerald-50/30 to-blue-50/30 flex flex-col items-center">
                    <FinancialChart config={chartConfigs[activeChart]} />
                  </div>
                </CardContent>
              </Card>

              {/* Additional Content Area */}
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-emerald-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-500">Total Pendapatan</div>
                        <div className="text-2xl font-bold text-emerald-600">Rp 250M</div>
                      </div>
                      <div className="text-xs text-emerald-500 bg-emerald-50 px-2 py-1 rounded-full">+12%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-500">Total Biaya</div>
                        <div className="text-2xl font-bold text-blue-600">Rp 220M</div>
                      </div>
                      <div className="text-xs text-blue-500 bg-blue-50 px-2 py-1 rounded-full">+8%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-500">Gross Profit</div>
                        <div className="text-2xl font-bold text-purple-600">Rp 150M</div>
                      </div>
                      <div className="text-xs text-purple-500 bg-purple-50 px-2 py-1 rounded-full">+18%</div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-200/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-slate-500">Net Cashflow</div>
                        <div className="text-2xl font-bold text-orange-600">Rp 270M</div>
                      </div>
                      <div className="text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded-full">+15%</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* NusaInfo Sidebar */}
          <div
            className={cn(
              "fixed right-0 top-[64px] h-[calc(100vh-64px)] bg-white border-l border-emerald-200/50 shadow-xl transition-all duration-300 z-40",
              isNusaInfoExpanded ? "w-80" : "w-16"
            )}
          >
            {/* Toggle Button */}
            <button
              onClick={() => setIsNusaInfoExpanded(!isNusaInfoExpanded)}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white border border-emerald-200 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50"
              style={{ top: "48px" }} // Agar tidak menutupi navbar
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-emerald-600 transition-transform duration-300",
                  isNusaInfoExpanded ? "rotate-90" : "-rotate-90"
                )}
              />
            </button>

            {/* NusaInfo Content */}
            <div className="h-full overflow-hidden">
              {isNusaInfoExpanded ? (
                <div className="h-full p-4">
                  <NusaInfoModule />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="writing-mode-vertical text-emerald-600 font-medium text-sm">NusaInfo</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
};

export default NusaSimulasiModule;
