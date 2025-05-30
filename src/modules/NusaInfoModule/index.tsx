"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, ChevronDown, ChevronUp, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

type NusaInfoModuleProps = {
  initialPrompt?: string
  className?: string
  title?: string
  subtitle?: string
}

const NusaInfoModule = ({
  initialPrompt = "NusaInfo kami menyediakan fasilitas kesehatan di Jawa Timur. Silahkan ketikkan nama rumah sakit yang ingin dicari.",
  className,
  title = "NusaInfo",
  subtitle = "AI Assistant",
}: NusaInfoModuleProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-message",
      content: initialPrompt,
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat is opened
  useEffect(() => {
    if (!isCollapsed) {
      inputRef.current?.focus()
    }
  }, [isCollapsed])

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault()

    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Here we would integrate with Vertex AI
      // This is a placeholder for the actual API call
      const response = await callVertexAI(input)

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        content: response,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error fetching response from Vertex AI:", error)

      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        content: "Maaf, terjadi kesalahan saat memproses permintaan Anda. Silakan coba lagi nanti.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  // Mock function to simulate Vertex AI response
  // This would be replaced with actual Vertex AI integration
  // const mockVertexAIRequest = async (prompt: string): Promise<string> => {
  //   // Simulate network delay
  //   await new Promise((resolve) => setTimeout(resolve, 1000))

  //   // Simple response logic based on prompt keywords
  //   if (prompt.toLowerCase().includes("halo") || prompt.toLowerCase().includes("hai")) {
  //     return "Halo! Ada yang bisa saya bantu terkait layanan kesehatan PetaSehat?"
  //   } else if (prompt.toLowerCase().includes("rumah sakit") || prompt.toLowerCase().includes("rs")) {
  //     return "PetaSehat memiliki informasi tentang berbagai rumah sakit di Indonesia. Anda dapat mencari rumah sakit terdekat melalui fitur NusaCari."
  //   } else if (prompt.toLowerCase().includes("dokter")) {
  //     return "Anda dapat menemukan informasi dokter spesialis melalui fitur NusaCari. Kami memiliki data lengkap tentang dokter di berbagai rumah sakit."
  //   } else {
  //     return "Terima kasih atas pertanyaan Anda. Sebagai asisten AI PetaSehat, saya dapat membantu Anda dengan informasi kesehatan, rumah sakit, dokter, dan layanan kesehatan lainnya. Silakan tanyakan lebih spesifik."
  //   }
  // }

  // Function to implement actual Vertex AI integration
  const callVertexAI = async (prompt: string): Promise<string> => {
    try {
      const response = await fetch("/api/vertex-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("Failed to fetch from Vertex AI")
      }

      const data = await response.json()
      return data.response
    } catch (error) {
      console.error("Error calling Vertex AI:", error)
      throw error
    }
  }

  return (
    <Card
      className={cn(
        "border-2 border-dashed border-slate-400/60 rounded-lg shadow-lg overflow-hidden bg-gradient-to-br from-emerald-100 via-slate-50 to-blue-100 backdrop-blur-lg h-full",
        className,
      )}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-4 right-6 w-12 h-12 bg-emerald-300/30 rounded-full animate-pulse" />
        <div className="absolute bottom-16 left-4 w-8 h-8 bg-blue-300/30 rounded-full animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-2 w-6 h-6 bg-emerald-400/25 rounded-full animate-pulse delay-500" />
      </div>

      {/* Chat Header */}
      <CardHeader
        className="relative p-4 flex flex-row items-center justify-between bg-gradient-to-r from-emerald-200/80 via-slate-100/90 to-blue-200/80 backdrop-blur-sm border-b-2 border-dashed border-slate-300/60 cursor-pointer hover:from-emerald-300/60 hover:to-blue-300/60 transition-all duration-300"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="relative p-2 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-700 shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300">
            <Bot className="h-5 w-5 text-white" />
            {/* Glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-blue-700 opacity-20 animate-pulse" />
          </div>
          <div>
            <h3 className="font-bold text-lg bg-gradient-to-r from-emerald-700 to-blue-800 bg-clip-text text-transparent">
              {title}
            </h3>
            {!isCollapsed && (
              <p className="text-xs text-slate-700 bg-gradient-to-r from-emerald-600 to-blue-700 bg-clip-text text-transparent">
                {subtitle}
              </p>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-gradient-to-r hover:from-emerald-200 hover:to-blue-200 hover:scale-110 transition-all duration-300 group"
        >
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4 text-emerald-700 group-hover:text-blue-800 transition-colors" />
          ) : (
            <ChevronUp className="h-4 w-4 text-emerald-700 group-hover:text-blue-800 transition-colors" />
          )}
        </Button>
      </CardHeader>

      {/* Chat Content */}
      {!isCollapsed && (
        <>
          <CardContent className="relative p-4 overflow-y-auto max-h-[400px] bg-gradient-to-b from-transparent via-emerald-50/30 to-blue-50/30">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={message.id}>
                  {index > 0 && message.role === "assistant" && (
                    <div className="border-t border-dashed border-emerald-300/50 my-4"></div>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-xl text-sm transition-all duration-300 hover:shadow-md relative overflow-hidden",
                      message.role === "user"
                        ? "bg-gradient-to-r from-emerald-200 to-blue-200 ml-auto max-w-[85%] rounded-tr-none"
                        : "bg-gradient-to-r from-slate-100 to-slate-200 mr-auto max-w-[90%] rounded-tl-none border border-emerald-300/40",
                    )}
                  >
                    {/* Background animation for assistant messages */}
                    {message.role === "assistant" && (
                      <div className="absolute inset-0 bg-gradient-to-r from-emerald-200/30 to-blue-200/30 opacity-0 hover:opacity-100 transition-opacity duration-300" />
                    )}
                    <span
                      className={cn("relative z-10", message.role === "user" ? "text-slate-800" : "text-slate-700")}
                    >
                      {message.content}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-2 block text-right relative z-10">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </span>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-gradient-to-r from-slate-100 to-slate-200 mr-auto max-w-[90%] rounded-tl-none border border-emerald-300/40">
                  <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                  <span className="text-slate-600 text-sm">NusaInfo sedang mengetik...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>

          {/* Chat Input */}
          <CardFooter className="relative p-4 border-t-2 border-dashed border-slate-300/60 bg-gradient-to-r from-emerald-100/50 to-blue-100/50">
            <form onSubmit={handleSendMessage} className="flex w-full gap-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Masukkan Rumah Sakit..."
                className="flex-1 border-2 border-dashed border-emerald-300/60 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl py-2 px-4 transition-all duration-300 hover:border-emerald-400 bg-white/80 backdrop-blur-sm"
                disabled={isLoading}
              />
              <Button
                type="submit"
                size="icon"
                disabled={isLoading || !input.trim()}
                className="bg-gradient-to-r from-emerald-600 to-blue-700 hover:from-emerald-700 hover:to-blue-800 text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:scale-100"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default NusaInfoModule
