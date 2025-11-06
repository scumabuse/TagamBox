import { MapPin, Clock } from "lucide-react"
import Image from "next/image"

interface EstablishmentCardProps {
  establishment: {
    id: string
    name: string
    image: string
    hoursOpen: string
    discountHours: string
    address: string
  }
}

export default function EstablishmentCard({ establishment }: EstablishmentCardProps) {
  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition cursor-pointer">
      {/* Image */}
      <div className="relative w-full h-48 bg-muted">
        <Image src={establishment.image || "/placeholder.svg"} alt={establishment.name} fill className="object-cover" />
        <div className="absolute top-3 right-3 bg-accent text-accent-foreground px-3 py-1 rounded-full shadow-sm font-bold text-sm">
          50%
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="text-lg font-bold text-foreground text-balance">{establishment.name}</h3>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>{establishment.hoursOpen}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4 flex-shrink-0" />
            <span>Доступно {establishment.discountHours}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{establishment.address}</span>
          </div>
        </div>

        <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition">
          Подробнее
        </button>
      </div>
    </div>
  )
}
