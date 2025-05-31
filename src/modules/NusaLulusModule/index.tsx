"use client"

import { useState } from "react"
import { CheckCircle2, Clock, DollarSign, Building2, FileText, ChevronRight, Download, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import SidebarLayout from "@/components/elements/Navigation/navigation"
import { useAuthUser } from "@/hooks/use-auth-user"
import { redirect } from "next/navigation"

type DocumentItem = {
  id: string
  no: number
  name: string
  requirements: string[]
  estimatedTime: string
  estimatedCost: string
  authority: string
  category: "planning" | "environmental" | "construction" | "operational"
  priority: "high" | "medium" | "low"
  completed: boolean
}

const NusaLulusModule = () => {
    const user = useAuthUser();
    if(!user){
        redirect("/");
    }
    
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")

  const documents: DocumentItem[] = [
    {
      id: "imb",
      no: 1,
      name: "IMB (Izin Mendirikan Bangunan)",
      requirements: ["Gambar Teknis Bangunan", "Studi Dampak Lingkungan", "Sertifikat Tanah"],
      estimatedTime: "30 hari kerja",
      estimatedCost: "Rp 50 juta",
      authority: "Dinas Penanaman Modal",
      category: "planning",
      priority: "high",
      completed: false,
    },
    {
      id: "amdal1",
      no: 2,
      name: "AMDAL (Analisis Mengenai Dampak Lingkungan)",
      requirements: ["Dokumen Rencana Pengelolaan & Pemantauan Lingkungan (RKL-RPL)", "Studi Kelayakan Lingkungan"],
      estimatedTime: "45 hari kerja",
      estimatedCost: "Rp 75 juta",
      authority: "Dinas Lingkungan Hidup",
      category: "environmental",
      priority: "high",
      completed: false,
    },
    {
      id: "amdal2",
      no: 3,
      name: "UKL-UPL (Upaya Pengelolaan & Pemantauan Lingkungan)",
      requirements: ["Dokumen Rencana Pengelolaan & Pemantauan Lingkungan (RKL-RPL)", "Formulir UKL-UPL"],
      estimatedTime: "21 hari kerja",
      estimatedCost: "Rp 25 juta",
      authority: "Dinas Lingkungan Hidup",
      category: "environmental",
      priority: "medium",
      completed: false,
    },
    {
      id: "amdal3",
      no: 4,
      name: "Izin Operasional Fasilitas Kesehatan",
      requirements: [
        "Dokumen Rencana Pengelolaan & Pemantauan Lingkungan (RKL-RPL)",
        "Sertifikat Standar Pelayanan",
        "Dokumen SDM Kesehatan",
      ],
      estimatedTime: "60 hari kerja",
      estimatedCost: "Rp 100 juta",
      authority: "Dinas Kesehatan",
      category: "operational",
      priority: "high",
      completed: false,
    },
    {
      id: "construction",
      no: 5,
      name: "Izin Konstruksi & Keselamatan Kerja",
      requirements: [
        "Dokumen K3 (Keselamatan dan Kesehatan Kerja)",
        "Sertifikat Kontraktor",
        "Rencana Anggaran Biaya (RAB)",
      ],
      estimatedTime: "14 hari kerja",
      estimatedCost: "Rp 15 juta",
      authority: "Dinas Tenaga Kerja",
      category: "construction",
      priority: "medium",
      completed: false,
    },
  ]

  const categories = [
    { id: "all", name: "Semua Dokumen", count: documents.length },
    { id: "planning", name: "Perencanaan", count: documents.filter((d) => d.category === "planning").length },
    { id: "environmental", name: "Lingkungan", count: documents.filter((d) => d.category === "environmental").length },
    { id: "construction", name: "Konstruksi", count: documents.filter((d) => d.category === "construction").length },
    { id: "operational", name: "Operasional", count: documents.filter((d) => d.category === "operational").length },
  ]

  const filteredDocuments =
    activeCategory === "all" ? documents : documents.filter((doc) => doc.category === activeCategory)

  const handleDocumentSelect = (documentId: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(documentId) ? prev.filter((id) => id !== documentId) : [...prev, documentId],
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-700 border-green-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "planning":
        return <FileText className="h-4 w-4" />
      case "environmental":
        return <AlertCircle className="h-4 w-4" />
      case "construction":
        return <Building2 className="h-4 w-4" />
      case "operational":
        return <CheckCircle2 className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const totalEstimatedCost = documents.reduce((total, doc) => {
    const cost = Number.parseInt(doc.estimatedCost.replace(/[^\d]/g, ""))
    return total + cost
  }, 0)

  const selectedCost = selectedDocuments.reduce((total, docId) => {
    const doc = documents.find((d) => d.id === docId)
    if (doc) {
      const cost = Number.parseInt(doc.estimatedCost.replace(/[^\d]/g, ""))
      return total + cost
    }
    return total
  }, 0)

  return (
    <SidebarLayout>
        <div className="space-y-6">
        {/* Header */}
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-100 via-slate-50 to-blue-100 p-6 border border-emerald-200/50">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-4 right-8 w-16 h-16 bg-emerald-200/30 rounded-full animate-pulse" />
            <div className="absolute bottom-4 left-8 w-12 h-12 bg-blue-200/30 rounded-full animate-pulse delay-1000" />
            </div>

            <div className="relative z-10">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-700 to-blue-800 bg-clip-text text-transparent mb-2">
                NusaLulus
            </h1>
            <p className="text-slate-600 mb-4">
                Panduan lengkap dokumen dan perizinan untuk pembangunan infrastruktur fasilitas kesehatan
            </p>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-emerald-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600">
                        <FileText className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Total Dokumen</p>
                        <p className="text-xl font-bold text-emerald-700">{documents.length}</p>
                    </div>
                    </div>
                </CardContent>
                </Card>

                <Card className="border-blue-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600">
                        <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Estimasi Total Biaya</p>
                        <p className="text-xl font-bold text-blue-700">
                        Rp {(totalEstimatedCost / 1000000).toFixed(0)} juta
                        </p>
                    </div>
                    </div>
                </CardContent>
                </Card>

                <Card className="border-slate-200/50 bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-slate-500 to-slate-600">
                        <Clock className="h-5 w-5 text-white" />
                    </div>
                    <div>
                        <p className="text-sm text-slate-600">Dipilih</p>
                        <p className="text-xl font-bold text-slate-700">{selectedDocuments.length} dokumen</p>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </div>
            </div>
        </div>

        {/* Category Filter */}
        <Card className="border-emerald-200/50">
            <CardHeader className="pb-3">
            <CardTitle className="text-lg text-slate-700">Filter Kategori</CardTitle>
            </CardHeader>
            <CardContent>
            <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                <Button
                    key={category.id}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                    "transition-all duration-300",
                    activeCategory === category.id
                        ? "bg-gradient-to-r from-emerald-600 to-blue-700 hover:from-emerald-700 hover:to-blue-800"
                        : "border-emerald-200 hover:bg-emerald-50",
                    )}
                >
                    {category.name}
                    <Badge variant="secondary" className="ml-2 text-xs">
                    {category.count}
                    </Badge>
                </Button>
                ))}
            </div>
            </CardContent>
        </Card>

        {/* Documents Table */}
        <Card className="border-emerald-200/50">
            <CardHeader>
            <CardTitle className="text-xl text-slate-700 flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Daftar Dokumen & Perizinan
            </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
            <div className="overflow-x-auto">
                <table className="w-full">
                <thead className="bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-emerald-200/50">
                    <tr>
                    <th className="text-left p-4 text-sm font-medium text-slate-600">Pilih</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-600">No.</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-600">Nama Dokumen</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-600">Persyaratan</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-600">Estimasi Waktu</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-600">Estimasi Biaya</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-600">Otoritas Penerbit</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDocuments.map((document) => (
                    <tr
                        key={document.id}
                        className={cn(
                        "border-b border-emerald-100/50 hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-blue-50/50 transition-all duration-300",
                        selectedDocuments.includes(document.id) && "bg-gradient-to-r from-emerald-50/80 to-blue-50/80",
                        )}
                    >
                        <td className="p-4">
                        <Checkbox
                            checked={selectedDocuments.includes(document.id)}
                            onCheckedChange={() => handleDocumentSelect(document.id)}
                            className="border-emerald-300 data-[state=checked]:bg-emerald-600"
                        />
                        </td>
                        <td className="p-4">
                        <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-700">{document.no}</span>
                            {getCategoryIcon(document.category)}
                        </div>
                        </td>
                        <td className="p-4">
                        <div className="space-y-1">
                            <p className="font-medium text-slate-800">{document.name}</p>
                            <Badge className={cn("text-xs", getPriorityColor(document.priority))}>
                            {document.priority === "high"
                                ? "Prioritas Tinggi"
                                : document.priority === "medium"
                                ? "Prioritas Sedang"
                                : "Prioritas Rendah"}
                            </Badge>
                        </div>
                        </td>
                        <td className="p-4">
                        <ul className="space-y-1">
                            {document.requirements.map((req, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-1">
                                <span className="text-emerald-500 mt-1">•</span>
                                {req}
                            </li>
                            ))}
                        </ul>
                        </td>
                        <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Clock className="h-4 w-4 text-blue-500" />
                            {document.estimatedTime}
                        </div>
                        </td>
                        <td className="p-4">
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                            {document.estimatedCost}
                        </div>
                        </td>
                        <td className="p-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Building2 className="h-4 w-4 text-slate-500" />
                            {document.authority}
                        </div>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </CardContent>
        </Card>

        {/* Action Buttons */}
        {selectedDocuments.length > 0 && (
            <Card className="border-emerald-200/50 bg-gradient-to-r from-emerald-50/50 to-blue-50/50">
            <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <p className="font-medium text-slate-700">{selectedDocuments.length} dokumen dipilih</p>
                    <p className="text-sm text-slate-600">Estimasi biaya: Rp {(selectedCost / 1000000).toFixed(0)} juta</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="border-emerald-300 hover:bg-emerald-50">
                    <Download className="h-4 w-4 mr-2" />
                    Unduh Checklist
                    </Button>
                    <Button className="bg-gradient-to-r from-emerald-600 to-blue-700 hover:from-emerald-700 hover:to-blue-800">
                    <ChevronRight className="h-4 w-4 mr-2" />
                    Siapkan Dokumen
                    </Button>
                </div>
                </div>
            </CardContent>
            </Card>
        )}
        </div>
    </SidebarLayout>
  )
}

export default NusaLulusModule
