"use client"

import { useState, useRef, useEffect } from "react"
import {
  ChevronRight,
  Users,
  Building2,
  FileText,
  MapPin,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import NusaInfoModule from '@/modules/NusaInfoModule';
import SidebarLayout from '@/components/elements/Navigation/navigation';

// Google Maps component
const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!loaded) {
      const script = document.createElement("script")
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyDSbuVcqlsylwylSN3EPwUO0NHnIsF_dOg&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => {
        setLoaded(true)
      }
      document.head.appendChild(script)
      return () => {
        document.head.removeChild(script)
      }
    }

    if (
      loaded &&
      mapRef.current &&
      !map &&
      typeof window !== "undefined" &&
      (window as any).google &&
      (window as any).google.maps
    ) {
      const mapOptions = {
        center: { lat: -6.2088, lng: 106.8456 }, // Jakarta
        zoom: 15,
        mapTypeId: (window as any).google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }

      const newMap = new (window as any).google.maps.Map(
        mapRef.current,
        mapOptions
      )

      new (window as any).google.maps.Circle({
        strokeColor: "#0D9488",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0D9488",
        fillOpacity: 0.35,
        map: newMap,
        center: { lat: -6.2088, lng: 106.8456 },
        radius: 500,
      })

      setMap(newMap)
    }
  }, [loaded, map])

  return (
    <div ref={mapRef} className="w-full h-[300px] rounded-lg relative">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}
      <div className="absolute bottom-2 right-2 bg-white px-2 py-1 rounded text-xs text-gray-600">
        500 m
      </div>
    </div>
  )
}

export default function RingkasanPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("bulan-ini")
  const [todoExpanded, setTodoExpanded] = useState(true)

  const keyMetrics = [
    {
      title: "Total Fasilitas Kesehatan",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Building2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Cakupan Geografis",
      value: "78.5%",
      change: "+5.2%",
      trend: "up",
      icon: MapPin,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      title: "Dokumen Terverifikasi",
      value: "892",
      change: "-2.1%",
      trend: "down",
      icon: FileText,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Tingkat Kepuasan",
      value: "94.2%",
      change: "+1.8%",
      trend: "up",
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <SidebarLayout>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-emerald-600 font-medium">Dasbor</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-emerald-600 font-medium">Daftar Faskes</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-emerald-600 font-medium">
              RS Daerah Jawa...
            </span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">Ringkasan</span>
          </div>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Ringkasan Sistem
              </h1>
              <p className="text-gray-600">
                Overview lengkap fasilitas kesehatan dan aktivitas sistem
              </p>
            </div>
            <div className="flex items-center gap-2 mt-4 sm:mt-0">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="hari-ini">Hari Ini</option>
                <option value="minggu-ini">Minggu Ini</option>
                <option value="bulan-ini">Bulan Ini</option>
                <option value="tahun-ini">Tahun Ini</option>
              </select>
              <Button variant="outline" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {keyMetrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                      <metric.icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <div className="flex items-center gap-1">
                      {metric.trend === "up" ? (
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-600" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          metric.trend === "up"
                            ? "text-emerald-600"
                            : "text-red-600"
                        }`}
                      >
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{metric.title}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Location Map */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Lokasi Faskes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GoogleMap />
                  <p className="text-xs text-gray-600 mt-2">
                    Jl. Margonda No.305, Kemiri Muka, Kecamatan Beji, Kota Depok,
                    Jawa Barat 16424
                  </p>
                </CardContent>
              </Card>

              {/* Spotlight */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    Spotlight
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative w-16 h-16">
                      <div className="w-16 h-16 rounded-full border-4 border-blue-100"></div>
                      <div
                        className="absolute top-0 left-0 w-16 h-16 rounded-full border-4 border-blue-500"
                        style={{
                          clipPath:
                            "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                          transform: "rotate(331deg)",
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-blue-600 font-bold">92%</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700">
                      Kesesuaian dengan kriteria yang kamu berikan, beberapa
                      perbaikan dapat diajukan
                    </p>
                    <Button variant="ghost" size="sm" className="ml-auto">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Key Points */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          Poin Unggulan
                        </h3>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                          <p className="text-xs text-gray-700">
                            Aksesibilitas tinggi ke{" "}
                            <span className="text-blue-600">
                              jalan provinsi
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                          <p className="text-xs text-gray-700">
                            Konsentrasi target demografi{" "}
                            <span className="text-blue-600">
                              Keluarga dengan jumlah tangga bisa
                            </span>
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full border border-blue-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          </div>
                          <p className="text-xs text-gray-700">
                            Risiko bencana rendah
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Attention Points */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          Poin Perhatian
                        </h3>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="space-y-3">
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full border border-red-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          </div>
                          <p className="text-xs text-gray-700">
                            Ketersediaan sumber air bersih perlu verifikasi lanjut
                          </p>
                        </div>
                        <div className="flex gap-3">
                          <div className="w-5 h-5 rounded-full border border-red-500 flex items-center justify-center flex-shrink-0">
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          </div>
                          <p className="text-xs text-gray-700">
                            Pertimbangkan penambahan layanan X untuk meningkatkan
                            jangkauan
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    {/* Construction Cost */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          Estimasi Biaya Konstruksi
                        </h3>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-lg font-bold text-gray-900">
                          Rp 150 - 165,2 Miliar
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Sesuai dengan estimasi anggaran Anda
                        </p>
                      </div>
                    </div>

                    {/* Construction Time */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-medium text-gray-900">
                          Estimasi Waktu Pembangunan
                        </h3>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-lg font-bold text-gray-900">
                          4 tahun
                        </p>
                        <p className="text-xs text-gray-600 mt-1">
                          Lebih lama dari target waktu Anda!
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* ROI Chart */}
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-medium text-gray-900">
                        Estimasi Return on Investment (ROI)
                      </h3>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <div className="h-[150px] w-full">
                        <svg
                          width="100%"
                          height="100%"
                          viewBox="0 0 300 150"
                          preserveAspectRatio="none"
                        >
                          {/* Grid lines */}
                          <line
                            x1="0"
                            y1="0"
                            x2="300"
                            y2="0"
                            stroke="#eee"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="30"
                            x2="300"
                            y2="30"
                            stroke="#eee"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="60"
                            x2="300"
                            y2="60"
                            stroke="#eee"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="90"
                            x2="300"
                            y2="90"
                            stroke="#eee"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="120"
                            x2="300"
                            y2="120"
                            stroke="#eee"
                            strokeWidth="1"
                          />
                          <line
                            x1="0"
                            y1="150"
                            x2="300"
                            y2="150"
                            stroke="#eee"
                            strokeWidth="1"
                          />

                          {/* Y-axis labels */}
                          <text x="5" y="5" fontSize="8" fill="#888">
                            220
                          </text>
                          <text x="5" y="35" fontSize="8" fill="#888">
                            200
                          </text>
                          <text x="5" y="65" fontSize="8" fill="#888">
                            180
                          </text>
                          <text x="5" y="95" fontSize="8" fill="#888">
                            160
                          </text>
                          <text x="5" y="125" fontSize="8" fill="#888">
                            140
                          </text>
                          <text x="5" y="145" fontSize="8" fill="#888">
                            120
                          </text>

                          {/* X-axis labels */}
                          <text x="40" y="145" fontSize="8" fill="#888">
                            1
                          </text>
                          <text x="80" y="145" fontSize="8" fill="#888">
                            2
                          </text>
                          <text x="120" y="145" fontSize="8" fill="#888">
                            3
                          </text>
                          <text x="160" y="145" fontSize="8" fill="#888">
                            4
                          </text>
                          <text x="200" y="145" fontSize="8" fill="#888">
                            5
                          </text>
                          <text x="240" y="145" fontSize="8" fill="#888">
                            6
                          </text>
                          <text x="280" y="145" fontSize="8" fill="#888">
                            7
                          </text>

                          {/* Gray line */}
                          <path
                            d="M 40,120 L 80,115 L 120,110 L 160,105 L 200,100 L 240,95 L 280,90"
                            fill="none"
                            stroke="#aaa"
                            strokeWidth="2"
                          />

                          {/* Blue line */}
                          <path
                            d="M 40,130 L 80,110 L 120,80 L 160,60 L 200,45 L 240,40 L 280,35"
                            fill="none"
                            stroke="#0066cc"
                            strokeWidth="2"
                          />
                        </svg>
                      </div>
                      <div className="text-center text-xs text-gray-500 mt-2">
                        Tahun
                      </div>
                      <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
                        Mencapai target ROI Anda
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* To-Do */}
              <Card>
                <CardHeader
                  className="flex flex-row items-center justify-between cursor-pointer pb-2"
                  onClick={() => setTodoExpanded(!todoExpanded)}
                >
                  <CardTitle className="text-lg font-semibold text-gray-900">
                    To-Do
                  </CardTitle>
                  {todoExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </CardHeader>
                {todoExpanded && (
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-gray-700">
                            1
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            NusaCari
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Analisa dari pilih lokasi potensial yang akan
                            digunakan untuk mendirikan faskes
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-gray-700">
                            2
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            NusaSimulasi
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Simulasikan dan cakupan area kriteria input hingga
                            hasil dihasilkan mutlak
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-gray-700">
                            4
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            NusaUlus
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Siapkan dan rancangan dokumen yang diperlukan melalui
                            NusaUlus
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-medium text-gray-700">
                            4
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">
                            Konfirmasi
                          </h4>
                          <p className="text-xs text-gray-600 mt-1">
                            Konfirmasi rencana dan proyeksi faskes sebelum ke
                            tahap eksekusi proyek
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>

              {/* NusaInfo */}
              <NusaInfoModule />
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>

  )
}
