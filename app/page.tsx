"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import ViewToggle from "@/components/view-toggle"
import EstablishmentsList from "@/components/establishments-list"
import MapView from "@/components/map-view"
import BottomNavigation from "@/components/bottom-navigation"

export default function Home() {
  const [view, setView] = useState<"list" | "map">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [city] = useState("Павлодар")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Header />
      <div className="flex-1 flex flex-col">
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} city={city} />
        <ViewToggle currentView={view} onViewChange={setView} />

        <div className="flex-1 overflow-y-auto px-4 pb-24">
          {view === "list" ? <EstablishmentsList searchQuery={searchQuery} /> : <MapView />}
        </div>
      </div>
      <BottomNavigation />
    </main>
  )
}
