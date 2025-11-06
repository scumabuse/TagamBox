"use client"

import { X, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface EstablishmentPopupProps {
  establishment: any
  onClose: () => void
}

export default function EstablishmentPopup({ establishment, onClose }: EstablishmentPopupProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end pointer-events-none">
      <div className="bg-card w-full rounded-t-2xl p-4 pointer-events-auto">
        <div className="max-w-md mx-auto">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground">{establishment.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{establishment.address}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition flex-shrink-0">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative w-full h-32 bg-muted rounded-lg overflow-hidden mb-4">
            <Image
              src={establishment.image || "/placeholder.svg"}
              alt={establishment.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-2 mb-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{establishment.hoursOpen}</span>
            </div>
            <div className="flex items-center gap-2 text-primary font-semibold">
              <Clock className="w-4 h-4" />
              <span>Скидки {establishment.discountHours}</span>
            </div>
          </div>

          <Link
            href={`/store/${establishment.id}`}
            onClick={onClose}
            className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold text-center hover:opacity-90 transition block"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </div>
  )
}
