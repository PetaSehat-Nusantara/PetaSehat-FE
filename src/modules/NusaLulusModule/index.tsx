"use client"

import { useEffect, useState } from "react"
import { Clock, DollarSign, Building2, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import SidebarLayout from "@/components/elements/Navigation/navigation"

type DocumentItem = {
  id: string
  name: string
  requirements: string[]
  estimatedTime: string
  estimatedCost: string
  authority: string
  category: string
  priority: string
}

const provinsiList = [
  "nasional",
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung",
  "Kepulauan Bangka Belitung", "Kepulauan Riau", "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta",
  "Jawa Timur", "Banten", "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur", "Kalimantan Barat",
  "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara", "Sulawesi Utara",
  "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat", "Maluku",
  "Maluku Utara", "Papua", "Papua Barat", "Papua Selatan", "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya"
];

const NusaLulusModule = () => {
  const [provinsi, setProvinsi] = useState<string>("nasional")
  const [documents, setDocuments] = useState<DocumentItem[]>([])
  const [loadingDocs, setLoadingDocs] = useState(true)
  const [errorDocs, setErrorDocs] = useState<string | null>(null)
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string>("all")

  useEffect(() => {
    setLoadingDocs(true)
    setErrorDocs(null)
    setDocuments([])
    fetch("/api/nusa-lulus", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ provinsi }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data.error || "Gagal memuat data dokumen.")
        }
        return res.json()
      })
      .then(data => {
        if (Array.isArray(data.documents)) {
          setDocuments(data.documents)
          setErrorDocs(null)
        } else {
          setDocuments([])
          setErrorDocs(data.error || "Gagal memuat data dokumen.")
        }
        setLoadingDocs(false)
      })
      .catch((err) => {
        setDocuments([])
        setErrorDocs(err.message || "Gagal memuat data dokumen.")
        setLoadingDocs(false)
      })
  }, [provinsi])

  const categories = [
    { id: "all", name: "Semua Dokumen", count: documents.length },
    ...Array.from(new Set(documents.map((d) => d.category)))
      .filter(Boolean)
      .map((cat) => ({
        id: cat,
        name: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: documents.filter((d) => d.category === cat).length,
      })),
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

  return (
    <SidebarLayout>
      <div className="space-y-6">
        {/* Dropdown Provinsi */}
        <div className="mb-4 flex items-center gap-2">
          <label htmlFor="provinsi" className="text-slate-700 font-medium">Pilih Provinsi:</label>
          <select
            id="provinsi"
            value={provinsi}
            onChange={e => setProvinsi(e.target.value)}
            className="border rounded-lg px-3 py-2"
          >
            {provinsiList.map((p) => (
              <option key={p} value={p}>{p === "nasional" ? "Nasional (Seluruh Indonesia)" : p}</option>
            ))}
          </select>
        </div>

        {/* Loading/Error/Empty */}
        {loadingDocs ? (
          <div className="text-center text-slate-500 py-8">Memuat data dokumen...</div>
        ) : errorDocs ? (
          <div className="text-center text-red-500 py-8">{errorDocs}</div>
        ) : documents.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            Tidak ada dokumen ditemukan untuk provinsi ini.
          </div>
        ) : (
          <>
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
                        <th className="text-left p-4 text-sm font-medium text-slate-600">Nama Dokumen</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-600">Persyaratan</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-600">Estimasi Waktu</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-600">Estimasi Biaya</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-600">Otoritas Penerbit</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-600">Kategori</th>
                        <th className="text-left p-4 text-sm font-medium text-slate-600">Prioritas</th>
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
                            <div className="space-y-1">
                              <p className="font-medium text-slate-800">{document.name}</p>
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
                          <td className="p-4">
                            <span className="capitalize">{document.category}</span>
                          </td>
                          <td className="p-4">
                            <Badge className={cn("text-xs", getPriorityColor(document.priority))}>
                              {document.priority === "high"
                                ? "Prioritas Tinggi"
                                : document.priority === "medium"
                                ? "Prioritas Sedang"
                                : "Prioritas Rendah"}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </SidebarLayout>
  )
}

export default NusaLulusModule
