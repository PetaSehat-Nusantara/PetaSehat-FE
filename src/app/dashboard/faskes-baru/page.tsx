"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import NusaInfoModule from '@/modules/NusaInfoModule';
import SidebarLayout from '@/components/elements/Navigation/navigation';

interface FormData {
  namaFaskes: string
  tipeFaskes1: string
  tipeFaskes2: string
  kapasitasMin: string
  kapasitasMax: string
  layanan: string[]
  anggaranMin: string
  anggaranMax: string
  waktuPembangunan: string
  targetROI: string
}

interface StepProps {
  onNext: () => void
  formData: FormData
  setFormData: (data: FormData) => void
}

// Step 1: General Information
const InformasiUmum = ({ onNext, formData, setFormData }: StepProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Informasi Umum</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="nama-faskes" className="text-sm font-medium text-gray-900">
            Nama Faskes
          </Label>
          <Input
            id="nama-faskes"
            placeholder="RS Daerah Jawa Tenggara"
            value={formData.namaFaskes}
            onChange={(e) => setFormData({ ...formData, namaFaskes: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-900">Tipe Faskes</Label>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <Select
              value={formData.tipeFaskes1}
              onValueChange={(value) => setFormData({ ...formData, tipeFaskes1: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Rumah Sakit Umum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rumah-sakit-umum">Rumah Sakit Umum</SelectItem>
                <SelectItem value="rumah-sakit-khusus">Rumah Sakit Khusus</SelectItem>
                <SelectItem value="puskesmas">Puskesmas</SelectItem>
                <SelectItem value="klinik">Klinik</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={formData.tipeFaskes2}
              onValueChange={(value) => setFormData({ ...formData, tipeFaskes2: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tipe A" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tipe-a">Tipe A</SelectItem>
                <SelectItem value="tipe-b">Tipe B</SelectItem>
                <SelectItem value="tipe-c">Tipe C</SelectItem>
                <SelectItem value="tipe-d">Tipe D</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="kapasitas-min" className="text-sm font-medium text-gray-900">
              Kapasitas Kamar Minimum
            </Label>
            <Input
              id="kapasitas-min"
              placeholder="100"
              value={formData.kapasitasMin}
              onChange={(e) => setFormData({ ...formData, kapasitasMin: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="kapasitas-max" className="text-sm font-medium text-gray-900">
              Kapasitas Kamar Maksimum
            </Label>
            <Input
              id="kapasitas-max"
              placeholder="200"
              value={formData.kapasitasMax}
              onChange={(e) => setFormData({ ...formData, kapasitasMax: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-900">
            Layanan Unggulan/Spesialisasi yang Direncanakan (opsional)
          </Label>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="igd-24-jam"
                  checked={formData.layanan.includes("igd-24-jam")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, layanan: [...formData.layanan, "igd-24-jam"] })
                    } else {
                      setFormData({ ...formData, layanan: formData.layanan.filter((item) => item !== "igd-24-jam") })
                    }
                  }}
                />
                <Label htmlFor="igd-24-jam" className="text-sm text-gray-700">
                  IGD 24 Jam
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="radiologi-canggih"
                  checked={formData.layanan.includes("radiologi-canggih")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, layanan: [...formData.layanan, "radiologi-canggih"] })
                    } else {
                      setFormData({
                        ...formData,
                        layanan: formData.layanan.filter((item) => item !== "radiologi-canggih"),
                      })
                    }
                  }}
                />
                <Label htmlFor="radiologi-canggih" className="text-sm text-gray-700">
                  Radiologi Canggih
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="hemodialisa"
                  checked={formData.layanan.includes("hemodialisa")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, layanan: [...formData.layanan, "hemodialisa"] })
                    } else {
                      setFormData({ ...formData, layanan: formData.layanan.filter((item) => item !== "hemodialisa") })
                    }
                  }}
                />
                <Label htmlFor="hemodialisa" className="text-sm text-gray-700">
                  Hemodialisa
                </Label>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="radiologi-canggih-2"
                  checked={formData.layanan.includes("radiologi-canggih-2")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, layanan: [...formData.layanan, "radiologi-canggih-2"] })
                    } else {
                      setFormData({
                        ...formData,
                        layanan: formData.layanan.filter((item) => item !== "radiologi-canggih-2"),
                      })
                    }
                  }}
                />
                <Label htmlFor="radiologi-canggih-2" className="text-sm text-gray-700">
                  Radiologi Canggih
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="nicu"
                  checked={formData.layanan.includes("nicu")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, layanan: [...formData.layanan, "nicu"] })
                    } else {
                      setFormData({ ...formData, layanan: formData.layanan.filter((item) => item !== "nicu") })
                    }
                  }}
                />
                <Label htmlFor="nicu" className="text-sm text-gray-700">
                  NICU
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="lainnya"
                  checked={formData.layanan.includes("lainnya")}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, layanan: [...formData.layanan, "lainnya"] })
                    } else {
                      setFormData({ ...formData, layanan: formData.layanan.filter((item) => item !== "lainnya") })
                    }
                  }}
                />
                <Label htmlFor="lainnya" className="text-sm text-gray-700">
                  Lainnya
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Step 2: Location and Land
const LokasiDanLahan = ({ onNext, formData, setFormData }: StepProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Lokasi dan Lahan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3 block">Lokasi Faskes</Label>
          <div className="bg-gray-100 h-[300px] rounded-lg flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                <span className="text-white text-sm">Map</span>
              </div>
              <p className="text-sm text-gray-600">Interactive Map Component</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Select>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Pilih Provinsi" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                <SelectItem value="jabar">Jawa Barat</SelectItem>
                <SelectItem value="jateng">Jawa Tengah</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Pilih Kabupaten/Kota" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jakarta-pusat">Jakarta Pusat</SelectItem>
                <SelectItem value="jakarta-selatan">Jakarta Selatan</SelectItem>
                <SelectItem value="bandung">Bandung</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="text-xs">
                <SelectValue placeholder="Pilih Kecamatan/Kelurahan (Opsional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="menteng">Menteng</SelectItem>
                <SelectItem value="kebayoran">Kebayoran</SelectItem>
                <SelectItem value="cicendo">Cicendo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">Preferensi Area</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="area-metropolitan" />
                <Label htmlFor="area-metropolitan" className="text-sm text-gray-700">
                  Area Metropolitan/Urban
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="area-suburban" />
                <Label htmlFor="area-suburban" className="text-sm text-gray-700">
                  Area Suburban
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="area-pedesaan" />
                <Label htmlFor="area-pedesaan" className="text-sm text-gray-700">
                  Area Pedesaan
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">Preferensi Lahan</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="lahan-kosong" />
                <Label htmlFor="lahan-kosong" className="text-sm text-gray-700">
                  Lahan kosong
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lahan-bangunan" />
                <Label htmlFor="lahan-bangunan" className="text-sm text-gray-700">
                  Lahan dengan bangunan (akan dirobohkan/direnovasi)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lahan-lainnya" />
                <Label htmlFor="lahan-lainnya" className="text-sm text-gray-700">
                  Lainnya
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">Preferensi Aksebilitas</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="dekat-jalan-utama" />
                <Label htmlFor="dekat-jalan-utama" className="text-sm text-gray-700">
                  Dekat jalan utama/provinsi
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dekat-transportasi" />
                <Label htmlFor="dekat-transportasi" className="text-sm text-gray-700">
                  Dekat akses transportasi publik
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dekat-pemukiman" />
                <Label htmlFor="dekat-pemukiman" className="text-sm text-gray-700">
                  Dekat pemukiman
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">
              Preferensi Lingkungan & Kondisi Lahan
            </Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="bebas-riwayat-banjir" />
                <Label htmlFor="bebas-riwayat-banjir" className="text-sm text-gray-700">
                  Bebas riwayat banjir
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="kondisi-tanah-stabil" />
                <Label htmlFor="kondisi-tanah-stabil" className="text-sm text-gray-700">
                  Kondisi tanah stabil
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="dekat-sumber-air" />
                <Label htmlFor="dekat-sumber-air" className="text-sm text-gray-700">
                  Dekat sumber air bersih memadai
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tidak-berada-zona-merah" />
                <Label htmlFor="tidak-berada-zona-merah" className="text-sm text-gray-700">
                  Tidak berada di zona merah/bahaya (misal: gunung api aktif, jalur pipa gas besar)
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Step 3: Demographics & Target Market
const KriteriaDemografi = ({ onNext, formData, setFormData }: StepProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Kriteria Demografi & Pasar Target</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">Target Demografi Utama</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="keluarga-anak-kecil" />
                <Label htmlFor="keluarga-anak-kecil" className="text-sm text-gray-700">
                  Keluarga dengan anak kecil
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="keluarga-remaja" />
                <Label htmlFor="keluarga-remaja" className="text-sm text-gray-700">
                  Keluarga dengan remaja
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="keluarga-lansia" />
                <Label htmlFor="keluarga-lansia" className="text-sm text-gray-700">
                  Keluarga dengan lansia
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="lainnya-demografi" />
                <Label htmlFor="lainnya-demografi" className="text-sm text-gray-700">
                  Lainnya
                </Label>
              </div>
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-900 mb-3 block">Target Pendapatan Pasien</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="rendah-umr" />
                <Label htmlFor="rendah-umr" className="text-sm text-gray-700">
                  Rendah ({"< UMR wilayah"})
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="menengah-umr" />
                <Label htmlFor="menengah-umr" className="text-sm text-gray-700">
                  Menengah (1x - 3x UMR wilayah)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="tinggi-umr" />
                <Label htmlFor="tinggi-umr" className="text-sm text-gray-700">
                  Tinggi ({"> 3x UMR wilayah"})
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={onNext} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

// Step 4: Financial Criteria & Projections
const KriteriaKeuangan = ({ onNext, formData, setFormData }: StepProps) => {
  const router = useRouter()

  const handleFinalSubmit = () => {
    // Here you would typically save the form data
    console.log("Final form data:", formData)
    router.push("/dashboard/faskes-baru/ringkasan")
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Kriteria Keuangan & Proyeksi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="anggaran-min" className="text-sm font-medium text-gray-900">
              Estimasi Anggaran Minimum
            </Label>
            <Input
              id="anggaran-min"
              placeholder="Rp 4.000.000.000"
              value={formData.anggaranMin}
              onChange={(e) => setFormData({ ...formData, anggaranMin: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="anggaran-max" className="text-sm font-medium text-gray-900">
              Estimasi Anggaran Maksimum
            </Label>
            <Input
              id="anggaran-max"
              placeholder="Rp 12.000.000.000"
              value={formData.anggaranMax}
              onChange={(e) => setFormData({ ...formData, anggaranMax: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-900">Target Waktu Pembangunan</Label>
          <Select
            value={formData.waktuPembangunan}
            onValueChange={(value) => setFormData({ ...formData, waktuPembangunan: value })}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="2 tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-tahun">1 tahun</SelectItem>
              <SelectItem value="2-tahun">2 tahun</SelectItem>
              <SelectItem value="3-tahun">3 tahun</SelectItem>
              <SelectItem value="4-tahun">4 tahun</SelectItem>
              <SelectItem value="5-tahun">5 tahun</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-900 mb-3 block">Target ROI (Return on Investment)</Label>
          <Input
            placeholder="40%"
            value={formData.targetROI}
            onChange={(e) => setFormData({ ...formData, targetROI: e.target.value })}
            className="mb-4"
          />
          <div className="px-3">
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={Number.parseInt(formData.targetROI) || 40}
              onChange={(e) => setFormData({ ...formData, targetROI: e.target.value })}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button onClick={handleFinalSubmit} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Selanjutnya
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FaskesBaru() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isiFormExpanded, setIsiFormExpanded] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    namaFaskes: "",
    tipeFaskes1: "",
    tipeFaskes2: "",
    kapasitasMin: "",
    kapasitasMax: "",
    layanan: [],
    anggaranMin: "",
    anggaranMax: "",
    waktuPembangunan: "",
    targetROI: "40",
  })

  const steps = [
    { id: 1, title: "Informasi Umum", component: InformasiUmum },
    { id: 2, title: "Lokasi dan Lahan", component: LokasiDanLahan },
    { id: 3, title: "Kriteria Demografi", component: KriteriaDemografi },
    { id: 4, title: "Kriteria Keuangan", component: KriteriaKeuangan },
  ]

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const CurrentStepComponent = steps[currentStep - 1].component

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
            <span className="text-gray-600">Faskes Baru</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${currentStep >= step.id ? "bg-emerald-600" : "bg-gray-300"}`}
                    />
                    {index < steps.length - 1 && (
                      <div className={`w-24 h-1 ml-2 ${currentStep > step.id ? "bg-emerald-600" : "bg-gray-300"}`} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Form */}
            <div className="lg:col-span-2">
              <CurrentStepComponent onNext={handleNext} formData={formData} setFormData={setFormData} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* NusaInfo */}
              <NusaInfoModule />

              {/* Isi Form Otomatis */}
              <Card>
                <CardHeader
                  className="flex flex-row items-center justify-between cursor-pointer pb-2"
                  onClick={() => setIsiFormExpanded(!isiFormExpanded)}
                >
                  <CardTitle className="text-lg font-semibold text-gray-900">Isi Form Otomatis</CardTitle>
                  {isiFormExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </CardHeader>
                {isiFormExpanded && (
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-700">Isi form sesuai dengan profil saya</span>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                      </div>

                      <div className="p-3 bg-blue-50 rounded-lg">
                        <p className="text-xs text-gray-700 mb-2">
                          Terdeteksi Anda berasal dari Faskes RS Medika Jaya (RS Umum Tipe B) di Jakarta Selatan. Form
                          telah diotomasi dengan data profil awal Anda, seperti:
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          <li>• Tipe Faskes: Rumah Sakit Umum Tipe B</li>
                          <li>• Kapasitas Tempat Tidur: 250</li>
                          <li>• Layanan Unggulan: IGD 24 jam, Radiologi Canggih</li>
                          <li>
                            • Lokasi: DKI Jakarta, Jakarta Selatan Sistem siap membantu verifikasi regulasi dan
                            rekomendasi lanjutan berdasarkan profil ini.
                          </li>
                        </ul>

                        <div className="mt-3 flex items-center">
                          <div className="flex-1 bg-blue-200 h-2 rounded-full">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                          </div>
                          <span className="ml-2 text-xs text-blue-600">Form sedang diotomasi</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  )
}
