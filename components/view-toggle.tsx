"use client"

import { List, Map } from "lucide-react"

interface ViewToggleProps {
  currentView: "list" | "map"
  onViewChange: (view: "list" | "map") => void
}

export default function ViewToggle({ currentView, onViewChange }: ViewToggleProps) {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="max-w-md mx-auto flex gap-3">
        <button
          onClick={() => onViewChange("list")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
            currentView === "list"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground border border-border hover:bg-muted"
          }`}
        >
          <List className="w-5 h-5" />
          Список
        </button>
        <button
          onClick={() => onViewChange("map")}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition ${
            currentView === "map"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-foreground border border-border hover:bg-muted"
          }`}
        >
          <Map className="w-5 h-5" />
          Карта
        </button>
      </div>
    </div>
  )
}
