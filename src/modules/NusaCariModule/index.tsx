"use client"

import React from 'react'
import { useState, useRef, useEffect } from "react"
import { ChevronRight, ChevronDown, ChevronUp, MapPin, Navigation, Save, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import SidebarLayout from '@/components/elements/Navigation/navigation';

// Google Maps component
const GoogleMap = () => {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Load Google Maps script
    if (!loaded) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDSbuVcqlsylwylSN3EPwUO0NHnIsF_dOg&libraries=places`
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

    // Initialize map when script is loaded
    if (loaded && mapRef.current && !map) {
      const mapOptions = {
        center: { lat: -6.366, lng: 106.828 }, // Depok coordinates
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions)

      // Add circle overlays
      const circle1 = new window.google.maps.Circle({
        strokeColor: "#0D9488",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0D9488",
        fillOpacity: 0.35,
        map: newMap,
        center: { lat: -6.366, lng: 106.828 },
        radius: 250, // 500m diameter
      })

      const circle2 = new window.google.maps.Circle({
        strokeColor: "#0D9488",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#0D9488",
        fillOpacity: 0.35,
        map: newMap,
        center: { lat: -6.369, lng: 106.823 },
        radius: 100, // 200m diameter
      })

      setMap(newMap)
    }
  }, [loaded, map])

  return (
    <div ref={mapRef} className="w-full h-full absolute inset-0">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
        </div>
      )}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium bg-emerald-600/80 px-3 py-1 rounded-full text-sm">
        500 m²
      </div>
      <div className="absolute bottom-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 text-white font-medium bg-emerald-600/80 px-3 py-1 rounded-full text-sm">
        200 m²
      </div>
    </div>
  )
}

export default function NusaCariModule() {
  const [showRecommendation, setShowRecommendation] = useState(true)
  const [expandedInfo, setExpandedInfo] = useState(false)

  return (
    <SidebarLayout>
      <div className="relative h-screen w-full bg-gray-100">
        {/* Map Component */}
        <GoogleMap />

        {/* Sidebar */}
        <div className="absolute top-0 left-0 h-full w-[280px] bg-white shadow-lg z-10 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lokasi Direkomendasikan</h2>

            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-between mb-6"
              onClick={() => setShowRecommendation(true)}
            >
              <span>Pilih Lokasi</span>
              <ChevronRight className="w-4 h-4" />
            </Button>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900">Skor Kriteria</h3>
              </div>

              <div className="bg-gray-50 rounded-md">
                <div className="flex items-center justify-between p-2 border-b border-gray-200">
                  <span className="text-sm text-gray-600">Kriteria</span>
                  <span className="text-sm text-gray-600">Skor</span>
                </div>

                <div className="p-3 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">Demografi</span>
                    <span className="text-sm font-medium text-gray-900">96%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 mr-2">
                      <Progress value={96} className="h-2 bg-blue-600" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="p-3 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">Aksesibilitas</span>
                    <span className="text-sm font-medium text-gray-900">90%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 mr-2">
                      <Progress value={96} className="h-2 bg-blue-600" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-900">Kondisi Lahan</span>
                    <span className="text-sm font-medium text-gray-900">65%</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex-1 mr-2">
                      <Progress value={96} className="h-2 bg-blue-600" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <Button variant="outline" className="flex flex-col items-center justify-center h-16 py-1">
                <Navigation className="w-5 h-5 mb-1 text-emerald-600" />
                <span className="text-xs text-gray-700">Arah</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-16 py-1">
                <Save className="w-5 h-5 mb-1 text-emerald-600" />
                <span className="text-xs text-gray-700">Simpan</span>
              </Button>
              <Button variant="outline" className="flex flex-col items-center justify-center h-16 py-1">
                <Share2 className="w-5 h-5 mb-1 text-emerald-600" />
                <span className="text-xs text-gray-700">Bagikan</span>
              </Button>
            </div>

            <div className="mb-6">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-gray-700 ml-2">
                  Jl. Margonda Gg. H. Atan No.10, RT.04 RW.12, Kemiri Muka, Kecamatan Beji, Kota Depok, Jawa Barat 16424
                </p>
              </div>
            </div>

            <div>
              <div
                className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedInfo(!expandedInfo)}
              >
                <h3 className="text-sm font-medium text-gray-900">Informasi Pasar</h3>
                {expandedInfo ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>

              {expandedInfo && (
                <div className="mt-2 text-xs text-gray-600">
                  <p>
                    Kawasan sekitar lokasi menunjukkan dinamika pasar yang cukup aktif dengan potensi sebagai tempat
                    berkembangnya layanan kesehatan. Jika Anda mengembangkan di sini, kebutuhan masyarakat akan fasilitas
                    kesehatan dengan standar pelayanan dan kelengkapan tertentu. Meskipun terdapat beberapa pemain
                    eksisting, diferensiasi layanan akan menjadi kunci keberhasilan dalam konteks kompetisi pasar
                    kesehatan di area ini. Studi lebih lanjut mengenai pola konsumsi layanan kesehatan direkomendasikan.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recommendation Dialog */}
        <Dialog open={showRecommendation} onOpenChange={setShowRecommendation}>
          <DialogContent className="sm:max-w-md p-0 overflow-hidden">
            <DialogHeader className="p-4 border-b">
              <div className="flex items-center justify-between">
                <DialogTitle>Lokasi Rekomendasi 1</DialogTitle>
                <DialogClose asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>
            <div className="relative h-40 bg-gradient-to-r from-indigo-900 to-blue-900">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 p-1 bg-gray-800 text-white text-xs">1:25</div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </SidebarLayout>
  )
}