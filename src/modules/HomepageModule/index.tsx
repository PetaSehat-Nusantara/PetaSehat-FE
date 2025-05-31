"use client"

import React from "react"
import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Brain,
  Play,
  Search,
  BarChart3,
  CheckCircle,
  Info,
  TrendingUp,
  Clock,
  DollarSign,
  Target,
  Map,
  Shield,
  Users,
  Leaf,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import SidebarLayout from "@/components/elements/Navigation/navigation"
import Image from "next/image"

const HomePageModule = () => {
  const [activeFeature, setActiveFeature] = useState(0)
  const [visibleSections, setVisibleSections] = useState<string[]>([])

  const heroRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const impactRef = useRef<HTMLDivElement>(null)
  const techRef = useRef<HTMLDivElement>(null)

  const features = [
    {
      icon: Search,
      title: "NusaCari",
      description: "Rekomendasi lokasi strategis berbasis AI untuk alokasi anggaran yang presisi",
      color: "green",
    },
    {
      icon: BarChart3,
      title: "NusaSimulasi",
      description: "Simulasi permintaan layanan dan analisis keberlanjutan finansial fasilitas",
      color: "blue",
    },
    {
      icon: CheckCircle,
      title: "NusaLulus",
      description: "Otomatisasi kepatuhan regulasi dan perizinan yang mempercepat proyek dari tahun menjadi minggu",
      color: "emerald",
    },
    {
      icon: Info,
      title: "NusaInfo",
      description: "Akses informasi real-time untuk mendukung keputusan pembiayaan yang cepat dan akurat",
      color: "sky",
    },
  ]

  const impacts = [
    {
      icon: DollarSign,
      value: "630M",
      unit: "IDR",
      label: "Penghematan per Tahun",
      description: "Optimalisasi alokasi anggaran melalui analisis prediktif berbasis AI",
    },
    {
      icon: Clock,
      value: "90",
      unit: "%",
      label: "Pengurangan Waktu Perizinan",
      description: "Otomatisasi proses compliance dan perizinan dari tahun menjadi minggu",
    },
    {
      icon: TrendingUp,
      value: "250",
      unit: "%",
      label: "Return on Investment",
      description: "ROI maksimal melalui perencanaan strategis berbasis data",
    },
    {
      icon: Target,
      value: "3",
      unit: "SDGs",
      label: "Kontribusi Pembangunan Berkelanjutan",
      description: "Mendukung SDG 3, 9, dan 17 untuk Indonesia yang lebih sehat",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section")
            if (sectionId) {
              setVisibleSections((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    const sections = [heroRef, featuresRef, impactRef, techRef]
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length)
    }, 5000)

    return () => {
      observer.disconnect()
      clearInterval(interval)
    }
  }, [features.length])

  return (
    <SidebarLayout>
      <main className="flex-1 overflow-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          data-section="hero"
          className="relative min-h-screen flex items-center bg-gradient-to-b from-white to-green-50"
        >
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div
                className={`space-y-8 transition-all duration-700 ${
                  visibleSections.includes("hero") ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
              >
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                    <Brain className="h-4 w-4" />
                    <span>AI-Powered Healthcare Planning</span>
                  </div>

                  <h1 className="text-4xl lg:text-6xl font-bold tracking-tight text-gray-900">
                    <span className="text-green-600">PetaSehat</span>
                    <br />
                    <span className="text-blue-600">Nusantara</span>
                  </h1>

                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                    Transformasi perencanaan infrastruktur kesehatan Indonesia dengan teknologi AI dan data spasial
                    terintegrasi untuk masa depan yang lebih sehat.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                    <span>Mulai Eksplorasi</span>
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button size="lg" variant="outline" className="border-green-200 hover:bg-green-50">
                    <Play className="mr-2 h-5 w-5" />
                    <span>Lihat Demo</span>
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8">
                  {[
                    {
                      value: "630M",
                      label: "IDR Saved",
                      color: "text-green-600",
                    },
                    {
                      value: "90%",
                      label: "Faster Process",
                      color: "text-blue-600",
                    },
                    {
                      value: "250%",
                      label: "ROI Growth",
                      color: "text-emerald-600",
                    },
                  ].map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="text-2xl lg:text-3xl font-bold mb-1 transition-all duration-300">
                        <span className={stat.color}>{stat.value}</span>
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`relative transition-all duration-700 delay-300 ${
                  visibleSections.includes("hero") ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
              >
                <div className="relative flex justify-center items-center">
                  <Image
                    src="/VariantAbe.png"
                    alt="PetaSehat Mascot"
                    width={400}
                    height={400}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={featuresRef} data-section="features" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div
              className={`text-center space-y-6 mb-16 transition-all duration-700 ${
                visibleSections.includes("features") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                Empat Fitur Utama <span className="text-green-600">PetaSehat</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Platform terintegrasi yang mentransformasi perencanaan infrastruktur kesehatan dari pendekatan manual
                menjadi prediktif dan berbasis bukti.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-300 ${
                    activeFeature === index ? "scale-105" : "hover:scale-102"
                  }`}
                  onClick={() => setActiveFeature(index)}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div
                    className={`h-full p-6 rounded-xl transition-all duration-300 ${
                      activeFeature === index
                        ? "bg-green-50 border border-green-200 shadow-md"
                        : "bg-white border border-gray-200 hover:shadow-sm"
                    }`}
                  >
                    <div className="space-y-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-green-100`}>
                        {React.createElement(feature.icon, {
                          className: "h-6 w-6 text-green-600",
                        })}
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section ref={impactRef} data-section="impact" className="py-20 bg-green-600 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div
              className={`text-center space-y-6 mb-16 transition-all duration-700 ${
                visibleSections.includes("impact") ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
            >
              <h2 className="text-3xl lg:text-4xl font-bold leading-tight">
                Dampak Nyata untuk <span className="text-green-100">Indonesia</span>
              </h2>
              <p className="text-lg text-green-100 max-w-3xl mx-auto">
                Transformasi sistemik dengan dampak terukur pada efisiensi, efektivitas, dan keberlanjutan sistem
                kesehatan nasional.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impacts.map((impact, index) => (
                <div
                  key={index}
                  className={`transition-all duration-700 ${
                    visibleSections.includes("impact") ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
                  }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 h-full border border-white/20">
                    <div className="text-center space-y-4">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mx-auto">
                        {React.createElement(impact.icon, {
                          className: "h-6 w-6 text-white",
                        })}
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-baseline justify-center gap-1">
                          <span className="text-3xl font-bold text-white">{impact.value}</span>
                          <span className="text-lg text-green-200">{impact.unit}</span>
                        </div>
                        <div className="text-lg font-semibold text-green-100">{impact.label}</div>
                        <p className="text-sm text-green-100">{impact.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section with Mascot */}
        <section ref={techRef} data-section="tech" className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div
                className={`space-y-8 transition-all duration-700 ${
                  visibleSections.includes("tech") ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                }`}
              >
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
                    Teknologi Mutakhir untuk <span className="text-green-600">Transformasi Sistemik</span>
                  </h2>
                  <p className="text-lg text-gray-600">
                    PetaSehat mengintegrasikan teknologi AI, data spasial, dan analisis prediktif untuk menciptakan
                    solusi komprehensif yang mengubah paradigma perencanaan infrastruktur kesehatan nasional.
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Brain,
                      title: "Artificial Intelligence",
                      description: "Algoritma machine learning untuk analisis prediktif dan rekomendasi strategis",
                    },
                    {
                      icon: Map,
                      title: "Geospatial Analysis",
                      description: "Analisis data spasial terintegrasi untuk optimalisasi lokasi dan coverage area",
                    },
                    {
                      icon: Shield,
                      title: "Integrated Data Platform",
                      description: "Integrasi data demografis, epidemiologis, dan regulasi dalam satu platform",
                    },
                  ].map((tech, index) => (
                    <div key={index} className="flex gap-4 group">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {React.createElement(tech.icon, {
                          className: "h-6 w-6 text-green-600",
                        })}
                      </div>
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{tech.title}</h3>
                        <p className="text-gray-600">{tech.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`relative transition-all duration-700 delay-300 ${
                  visibleSections.includes("tech") ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                }`}
              >
                <div className="relative flex justify-center items-center">
                  <div className="absolute inset-0 bg-green-100 rounded-3xl opacity-50"></div>
                  <Image
                    src="/VariantAbe.png"
                    alt="PetaSehat Mascot"
                    width={400}
                    height={400}
                    className="object-contain relative z-10 transform -scale-x-100"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-600 text-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold">
                Bergabunglah dalam Transformasi
                <br />
                <span className="text-green-100">Sistem Kesehatan Indonesia</span>
              </h2>
              <p className="text-lg text-green-100 max-w-3xl mx-auto">
                PetaSehat Nusantara adalah katalisator strategis bagi transformasi sistem kesehatan yang berkelanjutan,
                efisien, dan inklusif untuk seluruh rakyat Indonesia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
                  <span>Mulai Sekarang</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                  <span>Jadwalkan Demo</span>
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20 mt-8">
                {[
                  { icon: Shield, text: "Implementasi Cepat" },
                  { icon: Users, text: "Dukungan 24/7" },
                  { icon: Leaf, text: "Berkelanjutan" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3 justify-center">
                    {React.createElement(item.icon, {
                      className: "h-5 w-5 text-green-200",
                    })}
                    <span className="text-lg">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SidebarLayout>
  )
}

export default HomePageModule
