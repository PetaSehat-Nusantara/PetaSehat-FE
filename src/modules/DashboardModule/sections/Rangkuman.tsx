'use client';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';

type Props = {};
const libraries: Array<'places' | 'geometry'> = ['places', 'geometry'];
interface PropertyMarker {
  id: string;
  position: { lat: number; lng: number };
  title: string;
  type: 'apartment' | 'house' | 'complex';
  price: string;
  size: string;
  description: string;
}

export const Rangkuman = ({}: Props) => {
  const [selectedMarker, setSelectedMarker] = useState<PropertyMarker | null>(
    null
  );
  const [mapCenter, setMapCenter] = useState({ lat: -6.2088, lng: 106.8456 });
  const [mapZoom, setMapZoom] = useState(11);

  // Map styling to match the design
  const mapStyles = useMemo(
    () => [
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#e8f4f8' }],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [{ color: '#f8f9fa' }],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }, { weight: 1.2 }],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }, { weight: 1 }],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [{ color: '#ffffff' }, { weight: 0.8 }],
      },
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'simplified' }],
      },
      {
        featureType: 'administrative',
        elementType: 'labels.text',
        stylers: [{ color: '#666666' }],
      },
    ],
    []
  );

  // Map options
  const mapOptions = useMemo(
    () => ({
      styles: mapStyles,
      disableDefaultUI: false,
      zoomControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      fullscreenControl: true,
      gestureHandling: 'greedy',
    }),
    [mapStyles]
  );

  // Get marker icon based on property type
  const getMarkerIcon = useCallback((type: PropertyMarker['type']) => {
    if (typeof window === 'undefined' || !window.google?.maps) {
      return undefined;
    }
    // Check if Google Maps is loaded
    if (!window.google?.maps) {
      return undefined;
    }

    const colors = {
      apartment: 'FF6B6B',
      house: '4ECDC4',
      complex: '45B7D1',
    };

    return {
      url: `data:image/svg+xml;charset=UTF-8,%3csvg width='32' height='32' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5 2.5-1.12 2.5-2.5 2.5z' fill='%23${colors[type]}'/%3e%3c/svg%3e`,
      scaledSize: new window.google.maps.Size(32, 32),
      anchor: new window.google.maps.Point(16, 32),
    };
  }, []);

  const onLoad = useCallback((map: google.maps.Map) => {
    // Map loaded successfully
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: libraries,
    language: 'id',
  });

  const chartData = [
    { year: 1, value: 120 },
    { year: 2, value: 135 },
    { year: 3, value: 150 },
    { year: 4, value: 170 },
    { year: 5, value: 190 },
    { year: 6, value: 195 },
    { year: 7, value: 220 },
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 p-4 flex gap-4">
      <div className="mx-auto w-full">
        <div className="py-6 w-full flex flex-col gap-2">
          <h1 className="text-4xl font-bold primary-gradient-text">
            Rangkuman - [RS Daerah Jawa Tenggara]
          </h1>
        </div>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 px-6 py-4 flex flex-col gap-6">
          <div className="flex items-center w-full gap-4">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              Lokasi Utama
            </h2>
            <div className="h-[1px] w-full bg-slate-300" />
          </div>
          <h3 className="font-semibold text-md">Lokasi Faskes</h3>
          {isLoaded ? (
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '400px' }}
              center={mapCenter}
              zoom={mapZoom}
              onLoad={onLoad}
              options={mapOptions}
            />
          ) : (
            <div className="h-64 flex items-center justify-center bg-gray-100 rounded">
              Loading...
            </div>
          )}

          {/* Spotlight Section */}
          <div className="flex items-center w-full gap-4">
            <h2 className="text-lg font-semibold whitespace-nowrap">
              Spotlight
            </h2>
            <div className="h-[1px] w-full bg-slate-300" />
          </div>

          {/* Overall Score */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                </div>
                <span className="text-2xl font-bold primary-gradient-text">
                  92%
                </span>
              </div>
              <span className="text-sm text-gray-600">
                Kecocokan dengan kriteria yang kamu berikan, beberapa perbaikan
                dapat ditinjau
              </span>
              <button className="ml-auto">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Poin Unggul */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Poin Unggul</h3>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-blue-500 flex items-center justify-center mt-0.5">
                    <div className="w-4 h-4 bg-[#fff] rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-700">
                      Aksesibilitas tinggi ke{' '}
                    </span>
                    <span className="text-sm primary-gradient-text font-medium">
                      jalan provinsi
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-blue-500 flex items-center justify-center mt-0.5">
                    <div className="w-4 h-4 bg-[#fff] rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm text-gray-700">
                      Konsentrasi target demografi{' '}
                    </span>
                    <span className="text-sm primary-gradient-text font-medium">
                      Keluarga dengan Lansia
                    </span>
                    <span className="text-sm text-gray-700"> sangat baik</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-600 to-blue-500 flex items-center justify-center mt-0.5">
                    <div className="w-4 h-4 bg-[#fff] rounded-full"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-sm primary-gradient-text font-medium">
                      Risiko bencana
                    </span>
                    <span className="text-sm text-gray-700"> rendah</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Poin Perhatian */}
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Poin Perhatian</h3>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-4 border-red-500 flex items-center justify-center mt-0.5"></div>
                  <div className="flex-1">
                    <span className="text-sm text-red-600 font-medium">
                      Ketersediaan sumber air bersih
                    </span>
                    <span className="text-sm text-gray-700">
                      {' '}
                      perlu verifikasi lanjut
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full border-4 border-red-500 flex items-center justify-center mt-0.5"></div>

                  <div className="flex-1">
                    <span className="text-sm text-red-600 font-medium">
                      Pertimbangan penambahan layanan
                    </span>
                    <span className="text-sm text-gray-700">
                      {' '}
                      X untuk meningkatkan jangkauan
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Estimation Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estimasi Biaya Konstruksi */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">
                    Estimasi Biaya Konstruksi
                  </h3>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold primary-gradient-text">
                    Rp 150 - 165,2 Miliar
                  </span>
                </div>
              </div>
              <div className="bg-teal-500 p-3">
                <span className="text-white text-sm">
                  Sesuai dengan estimasi anggaran Anda
                </span>
              </div>
            </div>

            {/* Estimasi Waktu Pembangunan */}
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-800">
                    Estimasi Waktu Pembangunan
                  </h3>
                  <svg
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
                <div className="mt-2">
                  <span className="text-2xl font-bold primary-gradient-text">
                    4 tahun
                  </span>
                </div>
              </div>
              <div className="bg-slate-700 p-3">
                <span className="text-white text-sm">
                  Lebih lama dari target waktu Anda!
                </span>
              </div>
            </div>
          </div>

          {/* ROI Chart */}
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">
                  Estimasi Return on Investment (ROI)
                </h3>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
              <div className="mt-4">
                <div className="relative h-32">
                  <svg viewBox="0 0 350 120" className="w-full h-full">
                    {/* Grid lines */}
                    {[120, 140, 160, 180, 200, 220].map((y, i) => (
                      <line
                        key={i}
                        x1="40"
                        y1={120 - (y - 120)}
                        x2="330"
                        y2={120 - (y - 120)}
                        stroke="#f3f4f6"
                        strokeWidth="1"
                      />
                    ))}

                    {/* Y-axis labels */}
                    {[120, 140, 160, 180, 200, 220].map((y, i) => (
                      <text
                        key={i}
                        x="30"
                        y={120 - (y - 120) + 5}
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="end"
                      >
                        {y}
                      </text>
                    ))}

                    {/* X-axis labels */}
                    {chartData.map((point, i) => (
                      <text
                        key={i}
                        x={40 + i * 40}
                        y="115"
                        fontSize="10"
                        fill="#6b7280"
                        textAnchor="middle"
                      >
                        {point.year}
                      </text>
                    ))}

                    {/* Gray baseline */}
                    <polyline
                      fill="none"
                      stroke="#9ca3af"
                      strokeWidth="2"
                      points={chartData
                        .map(
                          (point, i) => `${40 + i * 40},${120 - (180 - 120)}`
                        )
                        .join(' ')}
                    />

                    {/* Teal growth line */}
                    <polyline
                      fill="none"
                      stroke="#14b8a6"
                      strokeWidth="3"
                      points={chartData
                        .map(
                          (point, i) =>
                            `${40 + i * 40},${120 - (point.value - 120)}`
                        )
                        .join(' ')}
                    />
                  </svg>
                  <div className="absolute bottom-0 left-0 text-xs text-gray-500">
                    (Tahun)
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-teal-500 p-3">
              <span className="text-white text-sm">
                Mencapai target ROI Anda
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
