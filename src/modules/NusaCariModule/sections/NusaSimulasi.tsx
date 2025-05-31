'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler, // Import Filler plugin untuk area chart
} from 'chart.js';
import SideNusaInfo from '@/modules/NusaInfoModule/sections/SideNusaInfo';

// Registrasi komponen-komponen Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Komponen untuk Tab Utama
const MainTab = ({ label, isActive, onClick }) => (
  <div className="p-[1px] primary-gradient-bg rounded-lg w-full flex items-center justify-center">
    <button
      onClick={onClick}
      className="border-2 border-transparent rounded-lg w-full px-6 py-3 
           text-blue-600 font-medium cursor-pointer text-center
           [background:linear-gradient(white,white)_padding-box,linear-gradient(to_right,#00A79D,#0072CE)_border-box]"
    >
      <p className="primary-gradient-text font-semibold text-md">{label}</p>
    </button>
  </div>
);

// Komponen untuk Sub-Tab
const SubTab = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`pb-2 text-sm transition-colors duration-150 ease-in-out
      ${
        isActive
          ? 'text-blue-600 border-b-2 border-blue-600 font-semibold'
          : 'text-gray-500 hover:text-gray-700'
      }
    `}
  >
    {label}
  </button>
);

// Komponen untuk Tombol Timeframe
const TimeframeButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`py-1 px-3 text-xs rounded-md transition-colors duration-150 ease-in-out
      ${
        isActive
          ? 'bg-blue-100 text-blue-700 font-semibold'
          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
      }
    `}
  >
    {label}
  </button>
);

const NusaSimulasiDashboard = () => {
  const [activeMainTab, setActiveMainTab] = useState('Finansial');
  const [activeSubTab, setActiveSubTab] = useState('Pendapatan');
  const [activeTimeframe, setActiveTimeframe] = useState('1Y');

  // Data Mock untuk Chart Pendapatan
  const revenueChartData = {
    labels: ['2026', '2027', '2028', '2029', '2030', '2031'],
    datasets: [
      {
        label: 'Total Pendapatan (Commulative)',
        data: [100, 120, 150, 180, 210, 250],
        borderColor: 'rgb(20, 184, 166)', // Tailwind teal-500
        backgroundColor: 'rgba(20, 184, 166, 0.1)', // Warna area fill lebih muda
        tension: 0.1, // Sedikit melengkung jika diinginkan, 0 untuk lurus
        fill: true, // Mengisi area di bawah garis
        pointRadius: 3,
        pointBackgroundColor: 'rgb(20, 184, 166)',
      },
      {
        label: 'Rawat Inap',
        data: [50, 60, 75, 90, 105, 125],
        borderColor: 'rgb(59, 130, 246)', // Tailwind blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        tension: 0.1,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(59, 130, 246)',
      },
      {
        label: 'Rawat Jalan',
        data: [30, 40, 50, 60, 70, 80],
        borderColor: 'rgb(107, 114, 128)', // Tailwind gray-500
        backgroundColor: 'rgba(107, 114, 128, 0.5)',
        tension: 0.1,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(107, 114, 128)',
      },
      {
        label: 'Layanan Unggulan',
        data: [20, 25, 35, 45, 55, 65],
        borderColor: 'rgb(239, 68, 68)', // Tailwind red-500
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        tension: 0.1,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: 'rgb(239, 68, 68)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: false, // Sesuai gambar, tidak mulai dari 0
        min: 50,
        max: 300,
        ticks: {
          stepSize: 50,
          color: '#6b7280', // Warna label sumbu Y
          font: {
            size: 10,
          },
        },
        grid: {
          color: '#e5e7eb', // Warna garis grid
        },
        title: {
          display: true,
          text: 'Miliar Rupiah',
          color: '#6b7280',
          font: {
            size: 10,
            weight: 'normal',
          },
          padding: { bottom: 0, top: -5 }, // Atur padding agar tidak terlalu jauh
        },
      },
      x: {
        ticks: {
          color: '#6b7280', // Warna label sumbu X
          font: {
            size: 10,
          },
        },
        grid: {
          display: false, // Sembunyikan grid vertikal
        },
        title: {
          display: true,
          text: 'Tahun',
          color: '#6b7280',
          font: {
            size: 10,
            weight: 'normal',
          },
          padding: { top: 5 },
        },
      },
    },
    plugins: {
      legend: {
        position: 'right', // Posisi legenda sesuai gambar
        align: 'start', // Align item legenda ke atas
        labels: {
          boxWidth: 10, // Ukuran kotak warna
          boxHeight: 10,
          padding: 15, // Jarak antar item legenda
          color: '#374151', // Warna teks legenda
          font: {
            size: 10,
          },
          usePointStyle: true, // Menggunakan style titik (lingkaran)
          pointStyle: 'circle',
        },
      },
      tooltip: {
        backgroundColor: '#374151',
        titleFont: { size: 12 },
        bodyFont: { size: 10 },
        padding: 10,
        cornerRadius: 4,
      },
    },
    elements: {
      line: {
        borderWidth: 2, // Ketebalan garis default
      },
    },
  };

  // Fungsi untuk mengganti data chart berdasarkan sub-tab atau timeframe (untuk pengembangan lebih lanjut)
  // useEffect(() => {
  //   if (activeMainTab === 'Finansial') {
  //     if (activeSubTab === 'Pendapatan') {
  //       // Logika untuk memuat data pendapatan berdasarkan activeTimeframe
  //     } else if (activeSubTab === 'Biaya') {
  //       // Logika untuk memuat data biaya
  //     } // dst.
  //   }
  // }, [activeMainTab, activeSubTab, activeTimeframe]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4 flex gap-4">
      <div className="mx-auto w-full">
        {' '}
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-600">
          NusaSimulasi
        </h1>
        <div className="flex space-x-2 mb-6 bg-gray-100 rounded-xl w-full">
          <MainTab
            label="Finansial"
            isActive={activeMainTab === 'Finansial'}
            onClick={() => setActiveMainTab('Finansial')}
          />
          <MainTab
            label="Demand & Operasional"
            isActive={activeMainTab === 'Demand & Operasional'}
            onClick={() => setActiveMainTab('Demand & Operasional')}
          />
        </div>
        <div className="w-full max-w-5xl bg-white rounded-xl shadow-2xl p-6 md:p-8">
          {/* Main Tabs */}

          {/* Konten berdasarkan Main Tab */}
          {activeMainTab === 'Finansial' && (
            <div>
              {/* Sub Tabs */}
              <div className="flex space-x-6 border-b border-gray-200 mb-6">
                <SubTab
                  label="Pendapatan"
                  isActive={activeSubTab === 'Pendapatan'}
                  onClick={() => setActiveSubTab('Pendapatan')}
                />
                <SubTab
                  label="Biaya"
                  isActive={activeSubTab === 'Biaya'}
                  onClick={() => setActiveSubTab('Biaya')}
                />
                <SubTab
                  label="Gross Profit"
                  isActive={activeSubTab === 'Gross Profit'}
                  onClick={() => setActiveSubTab('Gross Profit')}
                />
                <SubTab
                  label="Cashflow"
                  isActive={activeSubTab === 'Cashflow'}
                  onClick={() => setActiveSubTab('Cashflow')}
                />
              </div>

              {/* Timeframe & Filter */}
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500 mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 inline-block mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Timeframe
                  </span>
                  <TimeframeButton
                    label="1Y"
                    isActive={activeTimeframe === '1Y'}
                    onClick={() => setActiveTimeframe('1Y')}
                  />
                  <TimeframeButton
                    label="3M"
                    isActive={activeTimeframe === '3M'}
                    onClick={() => setActiveTimeframe('3M')}
                  />
                  <TimeframeButton
                    label="1M"
                    isActive={activeTimeframe === '1M'}
                    onClick={() => setActiveTimeframe('1M')}
                  />
                  <TimeframeButton
                    label="1W"
                    isActive={activeTimeframe === '1W'}
                    onClick={() => setActiveTimeframe('1W')}
                  />
                </div>
                <button className="p-2 text-gray-500 hover:text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </button>
              </div>

              {/* Chart Area */}
              {activeSubTab === 'Pendapatan' && (
                <div className="w-full" style={{ height: '300px' }}>
                  {' '}
                  {/* Beri tinggi eksplisit untuk kontainer chart */}
                  <Line data={revenueChartData} options={chartOptions} />
                </div>
              )}
              {activeSubTab !== 'Pendapatan' && (
                <div className="text-center text-gray-500 py-10">
                  Chart untuk {activeSubTab} belum diimplementasikan.
                </div>
              )}
            </div>
          )}

          {activeMainTab === 'Demand & Operasional' && (
            <div className="text-center text-gray-500 py-10">
              Konten untuk Demand & Operasional belum diimplementasikan.
            </div>
          )}
        </div>
      </div>
      <SideNusaInfo />
    </div>
  );
};

export default NusaSimulasiDashboard;
