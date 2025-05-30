'use client';

import React from 'react';

import { useState, useEffect, useRef, useCallback } from 'react';
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
  Database,
  Map,
  Zap,
  Globe,
  Cpu,
  Sparkles,
  Activity,
  Shield,
  Users,
  Waves,
  Leaf,
  Mountain,
  Sun,
  Star,
  Heart,
  Lightbulb,
  Rocket,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import SidebarLayout from '@/components/elements/Navigation/navigation';

const HomePageModule = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const [clickedElements, setClickedElements] = useState<string[]>([]);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const impactRef = useRef<HTMLDivElement>(null);
  const techRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Search,
      title: 'NusaCari',
      description:
        'Rekomendasi lokasi strategis berbasis AI untuk alokasi anggaran yang presisi',
      details:
        'Menganalisis data spasial, demografis, dan epidemiologis untuk menentukan lokasi optimal fasilitas kesehatan',
      color: 'green',
      bgPattern:
        'radial-gradient(circle at 20% 80%, rgba(34, 197, 94, 0.15) 0%, transparent 60%)',
      accent: Leaf,
    },
    {
      icon: BarChart3,
      title: 'NusaSimulasi',
      description:
        'Simulasi permintaan layanan dan analisis keberlanjutan finansial fasilitas',
      details:
        'Prediksi kebutuhan layanan kesehatan dan evaluasi kelayakan finansial jangka panjang',
      color: 'blue',
      bgPattern:
        'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 60%)',
      accent: Waves,
    },
    {
      icon: CheckCircle,
      title: 'NusaLulus',
      description:
        'Otomatisasi kepatuhan regulasi dan perizinan yang mempercepat proyek dari tahun menjadi minggu',
      details:
        'Sistem otomatis untuk memastikan compliance regulasi dan mempercepat proses perizinan',
      color: 'emerald',
      bgPattern:
        'radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 60%)',
      accent: Mountain,
    },
    {
      icon: Info,
      title: 'NusaInfo',
      description:
        'Akses informasi real-time untuk mendukung keputusan pembiayaan yang cepat dan akurat',
      details:
        'Dashboard terintegrasi dengan data real-time untuk pengambilan keputusan yang informed',
      color: 'sky',
      bgPattern:
        'radial-gradient(circle at 70% 30%, rgba(14, 165, 233, 0.15) 0%, transparent 60%)',
      accent: Sun,
    },
  ];

  const impacts = [
    {
      icon: DollarSign,
      value: '630M',
      unit: 'IDR',
      label: 'Penghematan per Tahun',
      description:
        'Optimalisasi alokasi anggaran melalui analisis prediktif berbasis AI',
      color: 'green',
      accent: Star,
    },
    {
      icon: Clock,
      value: '90',
      unit: '%',
      label: 'Pengurangan Waktu Perizinan',
      description:
        'Otomatisasi proses compliance dan perizinan dari tahun menjadi minggu',
      color: 'blue',
      accent: Rocket,
    },
    {
      icon: TrendingUp,
      value: '250',
      unit: '%',
      label: 'Return on Investment',
      description: 'ROI maksimal melalui perencanaan strategis berbasis data',
      color: 'emerald',
      accent: Heart,
    },
    {
      icon: Target,
      value: '3',
      unit: 'SDGs',
      label: 'Kontribusi Pembangunan Berkelanjutan',
      description:
        'Mendukung SDG 3, 9, dan 17 untuk Indonesia yang lebih sehat',
      color: 'sky',
      accent: Lightbulb,
    },
  ];

  const handleClick = useCallback((elementId: string) => {
    setClickedElements((prev) => [...prev, elementId]);
    setTimeout(() => {
      setClickedElements((prev) => prev.filter((id) => id !== elementId));
    }, 1000);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('data-section');
            if (sectionId) {
              setVisibleSections((prev) => [...prev, sectionId]);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    const sections = [heroRef, featuresRef, impactRef, techRef];
    sections.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    // Auto-rotate features
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      clearInterval(interval);
    };
  }, [features.length]);

  return (
    <SidebarLayout>
      <main className="flex-1 overflow-hidden">
        {/* Hero Section */}
        <section
          ref={heroRef}
          data-section="hero"
          className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-green-50 via-blue-50/50 to-green-100/30"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          {/* Enhanced animated background */}
          <div className="absolute inset-0">
            <div
              className="absolute w-96 h-96 rounded-full opacity-20 animate-pulse"
              style={{
                background:
                  'radial-gradient(circle, rgba(34, 197, 94, 0.4) 0%, transparent 70%)',
                left: `${20 + mousePosition.x * 0.02}px`,
                top: `${20 + mousePosition.y * 0.02}px`,
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.3s ease-out',
              }}
            />
            <div
              className="absolute w-80 h-80 rounded-full opacity-15 animate-pulse delay-1000"
              style={{
                background:
                  'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                right: `${20 + mousePosition.x * 0.01}px`,
                bottom: `${20 + mousePosition.y * 0.01}px`,
                transform: 'translate(50%, 50%)',
                transition: 'all 0.3s ease-out',
              }}
            />
            <div
              className="absolute w-64 h-64 rounded-full opacity-10 animate-pulse delay-2000"
              style={{
                background:
                  'radial-gradient(circle, rgba(16, 185, 129, 0.3) 0%, transparent 70%)',
                left: `${50 + mousePosition.x * 0.015}%`,
                top: `${30 + mousePosition.y * 0.015}%`,
                transform: 'translate(-50%, -50%)',
                transition: 'all 0.3s ease-out',
              }}
            />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div
                className={`space-y-8 transition-all duration-1000 ${
                  visibleSections.includes('hero')
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-10 opacity-0'
                }`}
                style={{
                  transform: `translateY(${scrollY * 0.05}px)`,
                }}
              >
                <div className="space-y-6">
                  <div
                    className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm text-green-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all cursor-pointer group hover:scale-105 active:scale-95"
                    onClick={() => handleClick('hero-badge')}
                  >
                    <Brain className="h-4 w-4 group-hover:animate-pulse transition-all duration-300" />
                    <span>AI-Powered Healthcare Planning</span>
                    <Sparkles
                      className={`h-4 w-4 text-green-500 transition-all duration-300 ${clickedElements.includes('hero-badge') ? 'animate-spin' : ''}`}
                    />
                  </div>

                  <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                    <span
                      className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 bg-clip-text text-transparent hover:from-green-700 hover:to-emerald-800 transition-all duration-500 cursor-pointer"
                      onClick={() => handleClick('title-1')}
                    >
                      PetaSehat
                    </span>
                    <br />
                    <span
                      className="bg-gradient-to-r from-blue-600 via-sky-600 to-blue-700 bg-clip-text text-transparent hover:from-blue-700 hover:to-sky-800 transition-all duration-500 cursor-pointer"
                      onClick={() => handleClick('title-2')}
                    >
                      Nusantara
                    </span>
                  </h1>

                  <p className="text-xl text-slate-600 leading-relaxed max-w-lg">
                    Transformasi perencanaan infrastruktur kesehatan Indonesia
                    dengan teknologi{' '}
                    <span className="font-semibold text-green-600 hover:text-green-700 transition-colors cursor-pointer">
                      AI dan data spasial terintegrasi
                    </span>{' '}
                    untuk masa depan yang lebih sehat seperti{' '}
                    <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                      lautan biru yang luas
                    </span>
                    .
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 group"
                    onClick={() => handleClick('cta-primary')}
                  >
                    <span>Mulai Eksplorasi</span>
                    <ArrowRight
                      className={`ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform ${clickedElements.includes('cta-primary') ? 'animate-bounce' : ''}`}
                    />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-green-200 hover:bg-green-50 hover:border-green-300 transition-all transform hover:scale-105 active:scale-95 group"
                    onClick={() => handleClick('cta-secondary')}
                  >
                    <Play
                      className={`mr-2 h-5 w-5 group-hover:text-green-600 transition-colors ${clickedElements.includes('cta-secondary') ? 'animate-spin' : ''}`}
                    />
                    <span>Lihat Demo</span>
                  </Button>
                </div>

                <div className="grid grid-cols-3 gap-6 pt-8">
                  {[
                    {
                      value: '630M',
                      label: 'IDR Saved',
                      color: 'text-green-600',
                      icon: Star,
                    },
                    {
                      value: '90%',
                      label: 'Faster Process',
                      color: 'text-blue-600',
                      icon: Rocket,
                    },
                    {
                      value: '250%',
                      label: 'ROI Growth',
                      color: 'text-emerald-600',
                      icon: Heart,
                    },
                  ].map((stat, index) => (
                    <div
                      key={index}
                      className="text-center group cursor-pointer hover:scale-110 transition-all duration-300 active:scale-95"
                      onClick={() => handleClick(`stat-${index}`)}
                    >
                      <div className="flex items-center justify-center gap-1 mb-1">
                        <stat.icon
                          className={`h-4 w-4 ${stat.color} ${clickedElements.includes(`stat-${index}`) ? 'animate-pulse' : ''}`}
                        />
                        <div
                          className={`text-2xl lg:text-3xl font-bold ${stat.color} transition-all duration-300`}
                        >
                          {stat.value}
                        </div>
                      </div>
                      <div className="text-sm text-slate-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`relative transition-all duration-1000 delay-300 ${
                  visibleSections.includes('hero')
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-10 opacity-0'
                }`}
                style={{
                  transform: `translateY(${scrollY * -0.03}px)`,
                }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-3xl animate-pulse"></div>
                  <div
                    className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer group"
                    onClick={() => handleClick('hero-card')}
                  >
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                          <Activity
                            className={`h-6 w-6 text-white ${clickedElements.includes('hero-card') ? 'animate-pulse' : ''}`}
                          />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-900 group-hover:text-green-600 transition-colors">
                            Healthcare Analytics
                          </h3>
                          <p className="text-sm text-slate-600">
                            Real-time monitoring dashboard
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {[
                          {
                            label: 'Fasilitas Aktif',
                            value: '12,847',
                            color: 'green',
                            icon: Leaf,
                          },
                          {
                            label: 'Pasien Harian',
                            value: '285,000',
                            color: 'blue',
                            icon: Waves,
                          },
                          {
                            label: 'Coverage Area',
                            value: '87%',
                            color: 'emerald',
                            icon: Mountain,
                          },
                        ].map((item, index) => (
                          <div
                            key={index}
                            className={`flex justify-between items-center p-4 bg-${item.color}-50 rounded-xl hover:bg-${item.color}-100 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group`}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClick(`dashboard-${index}`);
                            }}
                          >
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-3 h-3 bg-${item.color}-500 rounded-full ${clickedElements.includes(`dashboard-${index}`) ? 'animate-ping' : 'animate-pulse'}`}
                              ></div>
                              <item.icon
                                className={`h-4 w-4 text-${item.color}-600 group-hover:scale-110 transition-transform`}
                              />
                              <span className="text-sm font-medium text-slate-700">
                                {item.label}
                              </span>
                            </div>
                            <span
                              className={`text-lg font-bold text-${item.color}-600 group-hover:scale-110 transition-transform`}
                            >
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          ref={featuresRef}
          data-section="features"
          className="py-20 bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 relative overflow-hidden"
          style={{
            transform: `translateY(${scrollY * 0.02}px)`,
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: features[activeFeature].bgPattern }}
          ></div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div
              className={`text-center space-y-6 mb-16 transition-all duration-1000 ${
                visibleSections.includes('features')
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
                Empat Fitur Utama{' '}
                <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hover:from-green-700 hover:to-blue-700 transition-all duration-500 cursor-pointer">
                  PetaSehat
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
                Platform terintegrasi yang mentransformasi perencanaan
                infrastruktur kesehatan dari pendekatan manual menjadi{' '}
                <span className="font-semibold text-green-600 hover:text-green-700 transition-colors cursor-pointer">
                  prediktif seperti alam yang hijau
                </span>{' '}
                dan{' '}
                <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors cursor-pointer">
                  berbasis bukti seperti kedalaman laut biru
                </span>
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`group cursor-pointer transition-all duration-500 ${
                      activeFeature === index ? 'scale-105' : 'hover:scale-102'
                    }`}
                    onClick={() => {
                      setActiveFeature(index);
                      handleClick(`feature-${index}`);
                    }}
                    onMouseEnter={() => setActiveFeature(index)}
                  >
                    <div
                      className={`relative p-6 rounded-2xl transition-all duration-500 hover:shadow-lg ${
                        activeFeature === index
                          ? `bg-${feature.color}-50 border-2 border-${feature.color}-200 shadow-xl`
                          : 'bg-white/70 border border-slate-200 hover:bg-white/90'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                            activeFeature === index
                              ? `bg-gradient-to-br from-${feature.color}-500 to-${feature.color}-600 shadow-lg rotate-6`
                              : `bg-${feature.color}-100 group-hover:bg-${feature.color}-200 group-hover:rotate-3`
                          }`}
                        >
                          <feature.icon
                            className={`h-7 w-7 transition-all duration-300 ${
                              activeFeature === index
                                ? 'text-white scale-110'
                                : `text-${feature.color}-600`
                            } ${clickedElements.includes(`feature-${index}`) ? 'animate-pulse' : ''}`}
                          />
                        </div>

                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            <h3
                              className={`text-xl font-bold transition-colors ${
                                activeFeature === index
                                  ? `text-${feature.color}-900`
                                  : 'text-slate-900'
                              }`}
                            >
                              {feature.title}
                            </h3>
                            <feature.accent
                              className={`h-5 w-5 text-${feature.color}-500 transition-all duration-300 ${
                                activeFeature === index
                                  ? 'animate-pulse scale-110'
                                  : 'group-hover:scale-110'
                              }`}
                            />
                          </div>
                          <p className="text-slate-600 leading-relaxed">
                            {feature.description}
                          </p>

                          <div
                            className={`overflow-hidden transition-all duration-500 ${
                              activeFeature === index
                                ? 'max-h-20 opacity-100 mt-3'
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            <p className="text-sm text-slate-600 pt-3 border-t border-slate-200">
                              {feature.details}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/10 to-blue-400/10 rounded-3xl blur-3xl animate-pulse"></div>
                <div
                  className="relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500 hover:scale-105 cursor-pointer"
                  onClick={() => handleClick('feature-showcase')}
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-br from-${features[activeFeature].color}-500 to-${features[activeFeature].color}-600 shadow-lg hover:rotate-12 transition-transform duration-300`}
                      >
                        {React.createElement(features[activeFeature].icon, {
                          className: `h-8 w-8 text-white ${clickedElements.includes('feature-showcase') ? 'animate-spin' : ''}`,
                        })}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 hover:text-green-600 transition-colors">
                          {features[activeFeature].title}
                        </h3>
                        <p className="text-slate-600">Active Module</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r from-${features[activeFeature].color}-500 to-${features[activeFeature].color}-600 rounded-full transition-all duration-1000`}
                          style={{ width: `${85 + activeFeature * 5}%` }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div
                          className="text-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-pointer hover:scale-105 active:scale-95"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClick('accuracy-stat');
                          }}
                        >
                          <div
                            className={`text-2xl font-bold text-slate-900 ${clickedElements.includes('accuracy-stat') ? 'animate-pulse' : ''}`}
                          >
                            98%
                          </div>
                          <div className="text-sm text-slate-600">Accuracy</div>
                        </div>
                        <div
                          className="text-center p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-all cursor-pointer hover:scale-105 active:scale-95"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleClick('monitoring-stat');
                          }}
                        >
                          <div
                            className={`text-2xl font-bold text-slate-900 ${clickedElements.includes('monitoring-stat') ? 'animate-pulse' : ''}`}
                          >
                            24/7
                          </div>
                          <div className="text-sm text-slate-600">
                            Monitoring
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section
          ref={impactRef}
          data-section="impact"
          className="py-20 bg-gradient-to-br from-slate-900 via-green-900/90 to-blue-900/90 relative overflow-hidden"
          style={{
            transform: `translateY(${scrollY * 0.01}px)`,
          }}
        >
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-64 h-64 bg-green-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div
              className={`text-center space-y-6 mb-16 transition-all duration-1000 ${
                visibleSections.includes('impact')
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-10 opacity-0'
              }`}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Dampak Nyata untuk{' '}
                <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent hover:from-green-300 hover:to-blue-300 transition-all duration-500 cursor-pointer">
                  Indonesia
                </span>
              </h2>
              <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed">
                Transformasi sistemik dengan dampak terukur pada efisiensi,
                efektivitas, dan keberlanjutan sistem kesehatan nasional seperti{' '}
                <span className="text-green-300 font-semibold cursor-pointer hover:text-green-200 transition-colors">
                  hutan hijau yang subur
                </span>{' '}
                dan{' '}
                <span className="text-blue-300 font-semibold cursor-pointer hover:text-blue-200 transition-colors">
                  lautan biru yang dalam
                </span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {impacts.map((impact, index) => (
                <div
                  key={index}
                  className={`group cursor-pointer transition-all duration-700 hover:scale-110 active:scale-95 ${
                    visibleSections.includes('impact')
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-20 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 0.2}s` }}
                  onClick={() => handleClick(`impact-${index}`)}
                >
                  <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 border border-white/20 hover:border-white/40 hover:shadow-2xl">
                    <div className="text-center space-y-6">
                      <div className="relative">
                        <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 hover:rotate-12">
                          <impact.icon
                            className={`h-10 w-10 text-white ${clickedElements.includes(`impact-${index}`) ? 'animate-pulse' : ''}`}
                          />
                        </div>
                        <impact.accent
                          className={`absolute -top-2 -right-2 h-6 w-6 text-${impact.color}-300 ${clickedElements.includes(`impact-${index}`) ? 'animate-spin' : 'group-hover:animate-pulse'}`}
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-baseline justify-center gap-1">
                          <span
                            className={`text-4xl font-bold text-white group-hover:scale-110 transition-transform duration-300 ${clickedElements.includes(`impact-${index}`) ? 'animate-bounce' : ''}`}
                          >
                            {impact.value}
                          </span>
                          <span className={`text-lg text-${impact.color}-300`}>
                            {impact.unit}
                          </span>
                        </div>
                        <div
                          className={`text-lg font-semibold text-${impact.color}-200 group-hover:text-${impact.color}-100 transition-colors`}
                        >
                          {impact.label}
                        </div>
                        <p
                          className={`text-sm text-${impact.color}-100 leading-relaxed group-hover:text-white transition-colors`}
                        >
                          {impact.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`absolute top-4 right-4 w-3 h-3 bg-${impact.color}-400 rounded-full ${clickedElements.includes(`impact-${index}`) ? 'animate-ping' : 'group-hover:animate-ping'}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section
          ref={techRef}
          data-section="tech"
          className="py-20 bg-gradient-to-br from-white via-green-50/30 to-blue-50/50 relative overflow-hidden"
          style={{
            transform: `translateY(${scrollY * 0.015}px)`,
          }}
        >
          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div
                className={`space-y-8 transition-all duration-1000 ${
                  visibleSections.includes('tech')
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-10 opacity-0'
                }`}
              >
                <div className="space-y-6">
                  <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight">
                    Teknologi Mutakhir untuk
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent hover:from-green-700 hover:to-blue-700 transition-all duration-500 cursor-pointer">
                      {' '}
                      Transformasi Sistemik
                    </span>
                  </h2>
                  <p className="text-xl text-slate-600 leading-relaxed">
                    PetaSehat mengintegrasikan teknologi AI, data spasial, dan
                    analisis prediktif untuk menciptakan solusi komprehensif
                    yang mengubah paradigma perencanaan infrastruktur kesehatan
                    nasional seperti{' '}
                    <span className="text-green-600 font-semibold cursor-pointer hover:text-green-700 transition-colors">
                      ekosistem alam yang harmonis
                    </span>
                    .
                  </p>
                </div>

                <div className="space-y-6">
                  {[
                    {
                      icon: Brain,
                      title: 'Artificial Intelligence',
                      description:
                        'Algoritma machine learning untuk analisis prediktif dan rekomendasi strategis',
                      color: 'green',
                      accent: Lightbulb,
                    },
                    {
                      icon: Map,
                      title: 'Geospatial Analysis',
                      description:
                        'Analisis data spasial terintegrasi untuk optimalisasi lokasi dan coverage area',
                      color: 'blue',
                      accent: Globe,
                    },
                    {
                      icon: Database,
                      title: 'Integrated Data Platform',
                      description:
                        'Integrasi data demografis, epidemiologis, dan regulasi dalam satu platform',
                      color: 'emerald',
                      accent: Shield,
                    },
                  ].map((tech, index) => (
                    <div
                      key={index}
                      className="flex gap-6 group cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95"
                      onClick={() => handleClick(`tech-${index}`)}
                    >
                      <div
                        className={`w-16 h-16 bg-gradient-to-br from-${tech.color}-500 to-${tech.color}-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-12`}
                      >
                        <tech.icon
                          className={`h-8 w-8 text-white ${clickedElements.includes(`tech-${index}`) ? 'animate-pulse' : ''}`}
                        />
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`text-xl font-semibold text-slate-900 group-hover:text-${tech.color}-600 transition-colors`}
                          >
                            {tech.title}
                          </h3>
                          <tech.accent
                            className={`h-5 w-5 text-${tech.color}-500 ${clickedElements.includes(`tech-${index}`) ? 'animate-spin' : 'group-hover:animate-pulse'}`}
                          />
                        </div>
                        <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div
                className={`relative transition-all duration-1000 delay-300 ${
                  visibleSections.includes('tech')
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-10 opacity-0'
                }`}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-3xl blur-3xl animate-pulse"></div>
                  <div
                    className="relative bg-gradient-to-br from-green-500 via-blue-600 to-emerald-600 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:scale-105 cursor-pointer"
                    onClick={() => handleClick('tech-showcase')}
                  >
                    <div className="space-y-8">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm hover:rotate-12 transition-transform duration-300">
                          <Zap
                            className={`h-8 w-8 text-white ${clickedElements.includes('tech-showcase') ? 'animate-pulse' : ''}`}
                          />
                        </div>
                        <h3 className="text-3xl font-bold text-white hover:text-green-100 transition-colors">
                          GDSS Platform
                        </h3>
                      </div>

                      <p className="text-green-100 text-lg leading-relaxed hover:text-white transition-colors">
                        Geospatial Decision Support System yang mentransformasi
                        pendekatan dari manual-intuitif menjadi prediktif,
                        ilmiah, dan efisien seperti alam yang terorganisir
                        dengan sempurna.
                      </p>

                      <div className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
                        <div className="grid grid-cols-2 gap-4">
                          <div
                            className="bg-white/20 rounded-xl p-4 text-center hover:bg-white/30 transition-all cursor-pointer group hover:scale-105 active:scale-95"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClick('ai-powered');
                            }}
                          >
                            <Cpu
                              className={`h-8 w-8 text-white mx-auto mb-2 ${clickedElements.includes('ai-powered') ? 'animate-spin' : 'group-hover:animate-pulse'}`}
                            />
                            <div className="text-xl font-bold text-white">
                              AI-Powered
                            </div>
                            <div className="text-sm text-green-100">
                              Analisis Prediktif
                            </div>
                          </div>
                          <div
                            className="bg-white/20 rounded-xl p-4 text-center hover:bg-white/30 transition-all cursor-pointer group hover:scale-105 active:scale-95"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleClick('real-time');
                            }}
                          >
                            <Globe
                              className={`h-8 w-8 text-white mx-auto mb-2 ${clickedElements.includes('real-time') ? 'animate-spin' : 'group-hover:animate-spin'}`}
                            />
                            <div className="text-xl font-bold text-white">
                              Real-time
                            </div>
                            <div className="text-sm text-green-100">
                              Data Processing
                            </div>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`absolute -top-4 -right-4 w-20 h-20 bg-yellow-400 rounded-full opacity-60 ${clickedElements.includes('tech-showcase') ? 'animate-ping' : 'animate-pulse'}`}
                      />
                      <div
                        className={`absolute -bottom-4 -left-4 w-16 h-16 bg-pink-400 rounded-full opacity-40 ${clickedElements.includes('tech-showcase') ? 'animate-bounce' : 'animate-pulse'}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section
          className="py-20 bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 relative overflow-hidden"
          style={{
            transform: `translateY(${scrollY * 0.005}px)`,
          }}
        >
          <div className="absolute inset-0">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-pulse delay-2000" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center space-y-8 text-white">
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-bold leading-tight hover:scale-105 transition-transform duration-300 cursor-pointer">
                  Bergabunglah dalam Transformasi
                  <br />
                  <span className="text-green-200 hover:text-green-100 transition-colors">
                    Sistem Kesehatan Indonesia
                  </span>
                </h2>
                <p className="text-xl text-green-100 max-w-4xl mx-auto leading-relaxed hover:text-white transition-colors cursor-pointer">
                  PetaSehat Nusantara adalah katalisator strategis bagi
                  transformasi sistem kesehatan yang berkelanjutan, efisien, dan
                  inklusif untuk seluruh rakyat Indonesia seperti{' '}
                  <span className="font-semibold text-green-200">
                    harmoni alam nusantara
                  </span>
                  .
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-green-600 hover:bg-green-50 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 group"
                  onClick={() => handleClick('final-cta-primary')}
                >
                  <span>Mulai Sekarang</span>
                  <ArrowRight
                    className={`ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform ${clickedElements.includes('final-cta-primary') ? 'animate-bounce' : ''}`}
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 transition-all transform hover:scale-105 active:scale-95"
                  onClick={() => handleClick('final-cta-secondary')}
                >
                  <span
                    className={
                      clickedElements.includes('final-cta-secondary')
                        ? 'animate-pulse'
                        : ''
                    }
                  >
                    Jadwalkan Demo
                  </span>
                </Button>
              </div>

              <div className="grid md:grid-cols-3 gap-8 pt-12 border-t border-white/20">
                {[
                  { icon: Shield, text: 'Implementasi Cepat', accent: Rocket },
                  { icon: Users, text: 'Dukungan 24/7', accent: Heart },
                  { icon: TrendingUp, text: 'ROI Terukur', accent: Star },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 justify-center group cursor-pointer hover:scale-110 transition-all duration-300 active:scale-95"
                    onClick={() => handleClick(`final-feature-${index}`)}
                  >
                    <item.icon
                      className={`h-6 w-6 text-green-300 group-hover:scale-110 transition-transform ${clickedElements.includes(`final-feature-${index}`) ? 'animate-pulse' : ''}`}
                    />
                    <span className="text-lg group-hover:text-green-200 transition-colors">
                      {item.text}
                    </span>
                    <item.accent
                      className={`h-4 w-4 text-green-400 ${clickedElements.includes(`final-feature-${index}`) ? 'animate-spin' : 'group-hover:animate-pulse'}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </SidebarLayout>
  );
};

export default HomePageModule;
