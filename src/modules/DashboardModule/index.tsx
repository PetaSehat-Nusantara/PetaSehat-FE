'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Send } from 'lucide-react';
import ProgressBar from './module-elements/ProgressBar';

export default function DashboardModule() {
  const [facilityName, setFacilityName] = useState('');
  const [facilityType, setFacilityType] = useState('Rumah Sakit Umum');
  const [facilityClass, setFacilityClass] = useState('Tipe A');
  const [minCapacity, setMinCapacity] = useState('100');
  const [maxCapacity, setMaxCapacity] = useState('200');
  const [services, setServices] = useState<string[]>([]);
  const [isFormExpanded, setIsFormExpanded] = useState(false);
  const [searchCriteria, setSearchCriteria] = useState('');

  const handleServiceChange = (service: string) => {
    setServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const serviceOptions = [
    'IGD 24 Jam',
    'Radiologi Canggih',
    'Hemodialisa',
    'Radiologi Canggih',
    'NICU',
    'Lainnya',
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex gap-4">
      <div className="mx-auto w-full">
        {/* Header */}
        <div className="py-6 w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold primary-gradient-text">
            Fasilitas Kesehatan Baru
          </h1>
          <ProgressBar currentStep={1} />
        </div>

        <div className="flex bg-white rounded-lg shadow-sm">
          {/* Main Form */}
          <div className="flex-1 p-6">
            {/* General Information */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Informasi Umum
              </h2>

              {/* Facility Name */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nama Faskes
                </label>
                <input
                  type="text"
                  value={facilityName}
                  onChange={(e) => setFacilityName(e.target.value)}
                  placeholder="RS Daerah Jawa Tenggara"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              {/* Facility Type and Class */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipe Faskes
                  </label>
                  <div className="relative">
                    <select
                      value={facilityType}
                      onChange={(e) => setFacilityType(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white"
                    >
                      <option>Rumah Sakit Umum</option>
                      <option>Rumah Sakit Khusus</option>
                      <option>Puskesmas</option>
                      <option>Klinik</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <select
                      value={facilityClass}
                      onChange={(e) => setFacilityClass(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 appearance-none bg-white mt-6"
                    >
                      <option>Tipe A</option>
                      <option>Tipe B</option>
                      <option>Tipe C</option>
                      <option>Tipe D</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-9 h-4 w-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Capacity */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kapasitas Kamar Minimum
                  </label>
                  <input
                    type="number"
                    value={minCapacity}
                    onChange={(e) => setMinCapacity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kapasitas Kamar Maksimum
                  </label>
                  <input
                    type="number"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                </div>
              </div>

              {/* Services */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Layanan Unggulan/Spesialisasi yang Direncanakan (opsional)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {serviceOptions.map((service) => (
                    <label key={service} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={services.includes(service)}
                        onChange={() => handleServiceChange(service)}
                        className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {service}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium flex items-center gap-2 transition-colors">
                Selanjutnya
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Sidebar */}
      <div className="w-80 bg-gray-50 p-6 border-l">
        {/* Info Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">NusaInfo</h3>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        </div>

        {/* Auto Fill Form */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-800">Isi Form Otomatis</h3>
            <ChevronUp className="h-4 w-4 text-gray-400" />
          </div>

          <div className="bg-white p-4 rounded-lg border mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">
                Isi form sesuai dengan profil saya.
              </span>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </div>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                Terdeteksi Anda berasal dari Faskes 'RS Medika Jaya' (RS Umum
                Tipe B) di Jakarta Selatan. Form telah didatomasi dengan data
                profil awal Anda, seperti:
              </p>
              <ul className="list-disc list-inside text-xs space-y-1 mt-2">
                <li>Jenis Faskes: Rumah Sakit Umum Tipe B</li>
                <li>Kapasitas Tempat Tidur: 250</li>
                <li>Layanan Unggulan: Radiologi Canggih</li>
                <li>
                  Lokasi: DKI Jakarta, Jakarta Selatan Sistem siap membantu
                  verifikasi regulasi dan rekomendasi lanjutan berdasarkan
                  profil ini.
                </li>
              </ul>
            </div>

            <button className="flex items-center gap-2 text-teal-600 text-sm mt-3 hover:text-teal-700">
              <Download className="h-4 w-4" />
              Form sedang didownload
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={searchCriteria}
            onChange={(e) => setSearchCriteria(e.target.value)}
            placeholder="Tuliskan kriteria"
            className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <button className="absolute right-2 top-2 p-1 text-gray-400 hover:text-gray-600">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
