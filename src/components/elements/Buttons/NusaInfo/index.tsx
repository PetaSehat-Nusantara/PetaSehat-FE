"use client"

import { useState } from "react"
import { Bot } from "lucide-react"
import { Button } from "@/components/ui/button"
import NusaInfoModule from "@/modules/NusaInfoModule"

type NusaInfoButtonProps = {
  initialPrompt?: string
  className?: string
}

const NusaInfoButton = ({ initialPrompt, className }: NusaInfoButtonProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-4 right-4 rounded-full h-14 w-14 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
      >
        <Bot className="h-6 w-6" />
      </Button>

      {isOpen && (
        <NusaInfoModule
          initialPrompt={initialPrompt}
          className="animate-in fade-in slide-in-from-bottom-5 duration-300"
        />
      )}
    </>
  )
}

export default NusaInfoButton
