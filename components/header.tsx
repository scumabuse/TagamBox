"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronDown } from "lucide-react"

export default function Header() {
  const [language, setLanguage] = useState("RU")
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-sm">
      <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-70 transition">
          <Image src="/logo.png" alt="TAGAM" width={32} height={32} className="w-8 h-8" />
          <h1 className="text-lg font-bold text-foreground">TAGAM</h1>
        </Link>

        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={() => setIsLanguageOpen(!isLanguageOpen)}
              className="flex items-center gap-1 px-3 py-2 rounded-lg bg-secondary text-foreground font-medium text-sm border border-border hover:bg-muted transition"
            >
              {language}
              <ChevronDown className="w-4 h-4" />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                {["RU", "KZ", "EN"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang)
                      setIsLanguageOpen(false)
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition ${
                      language === lang ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    {lang === "RU" && "🇷🇺"}
                    {lang === "KZ" && "🇰🇿"}
                    {lang === "EN" && "🇬🇧"}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
