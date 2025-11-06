"use client"

import { Search, MapPin } from "lucide-react"

interface SearchBarProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  city: string
}

export default function SearchBar({ searchQuery, onSearchChange, city }: SearchBarProps) {
  return (
    <div className="bg-card border-b border-border p-4">
      <div className="max-w-md mx-auto space-y-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск заведений..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        <div className="flex gap-3">
          {/* City Selector */}
          <div className="flex-1 flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg border border-border">
            <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
            <select className="flex-1 bg-transparent text-foreground font-medium focus:outline-none cursor-pointer text-sm">
              <option>{city}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
