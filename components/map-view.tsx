"use client"

import { useState } from "react"
import { establishments } from "@/lib/mock-data"
import EstablishmentPopup from "./establishment-popup"
import { MapPin } from "lucide-react"

export default function MapView() {
  const [selectedEstablishment, setSelectedEstablishment] = useState<any>(null)

  // This avoids MIME type issues with external library loading
  const PAVLODAR_LAT = 52.2956
  const PAVLODAR_LNG = 76.9422

  const latToY = (lat: number) => {
    return (PAVLODAR_LAT - lat) * 1500 + 200
  }

  const lngToX = (lng: number) => {
    return (lng - PAVLODAR_LNG) * 1500 + 200
  }

  return (
    <div className="max-w-md mx-auto py-4">
      <div className="bg-muted rounded-xl border border-border overflow-hidden relative">
        {/* Map background */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 h-96 relative w-full" style={{ minHeight: "400px" }}>
          {/* Map grid lines for visual effect */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="grid grid-cols-4 grid-rows-4 h-full w-full border border-gray-300">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="border border-gray-300" />
              ))}
            </div>
          </div>

          {/* Center marker for Pavlodar */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>

          {/* Establishment markers */}
          {establishments.map((est) => {
            const x = lngToX(est.lng)
            const y = latToY(est.lat)

            return (
              <button
                key={est.id}
                onClick={() => setSelectedEstablishment(est)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-10 hover:scale-125 transition-transform"
                style={{
                  left: `${x}px`,
                  top: `${y}px`,
                }}
                title={est.name}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div className="absolute -inset-1 bg-primary opacity-20 rounded-full animate-pulse pointer-events-none"></div>
                </div>
              </button>
            )
          })}

          {/* Map label */}
          <div className="absolute bottom-3 left-3 text-xs text-gray-600 bg-white/80 px-2 py-1 rounded">
            Павлодар, Казахстан
          </div>
        </div>
      </div>

      {selectedEstablishment && (
        <EstablishmentPopup establishment={selectedEstablishment} onClose={() => setSelectedEstablishment(null)} />
      )}
    </div>
  )
}
