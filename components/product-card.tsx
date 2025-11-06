"use client"

import { ShoppingCart } from "lucide-react"
import Image from "next/image"

interface ProductCardProps {
  product: {
    id: string
    name: string
    image: string
  }
  onBook: () => void
}

export default function ProductCard({ product, onBook }: ProductCardProps) {
  const fixedPrice = 2500

  return (
    <div className="bg-card rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-md transition">
      <div className="flex gap-4 p-4">
        <div className="relative w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h4 className="font-bold text-foreground text-sm text-balance">{product.name}</h4>
            <div className="flex items-baseline gap-2 mt-2">
              <span className="text-lg font-bold text-primary">{fixedPrice} ₸</span>
            </div>
          </div>

          <button
            onClick={onBook}
            className="self-start px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-semibold hover:opacity-90 transition flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Забронировать
          </button>
        </div>
      </div>
    </div>
  )
}
