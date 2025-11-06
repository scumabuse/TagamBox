"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, MapPin, Clock, Phone } from "lucide-react"
import { FaInstagram, FaWhatsapp } from "react-icons/fa"
import Link from "next/link"
import Image from "next/image"
import { establishments } from "@/lib/mock-data"
import { products } from "@/lib/mock-data"
import ProductCard from "@/components/product-card"
import BookingModal from "@/components/booking-modal"

export default function StorePage() {
  const params = useParams()
  const router = useRouter()
  const storeId = params.id as string
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const store = establishments.find((e) => e.id === storeId)
  const storeProducts = products.filter((p) => p.storeId === storeId)

  if (!store) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground text-lg">Заведение не найдено</p>
          <Link href="/" className="text-primary font-semibold mt-4 inline-block">
            Вернуться на главную
          </Link>
        </div>
      </div>
    )
  }

  const handleBooking = (product: any) => {
    setSelectedProduct(product)
    setIsBookingOpen(true)
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-foreground truncate">{store.name}</h1>
        </div>
      </header>

      <div className="relative w-full h-56 bg-muted">
        <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" priority />
      </div>

      <div className="max-w-md mx-auto px-4">
        <div className="bg-card rounded-2xl p-6 mt-6 shadow-md border border-border space-y-4">
          <h2 className="text-2xl font-bold text-foreground text-balance">{store.name}</h2>

          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3 text-muted-foreground">
              <MapPin className="w-5 h-5 flex-shrink-0 text-primary mt-0.5" />
              <span className="leading-relaxed">{store.address}</span>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 flex-shrink-0 text-primary mt-0.5" />
              <div>
                <p className="text-foreground font-medium">{store.hoursOpen}</p>
                <p className="text-primary text-xs font-medium mt-0.5">Доступно {store.discountHours}</p>
              </div>
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-border">
            <div className="flex flex-col items-center gap-4">
              {/* Social Icons - horizontal, centered, icon-only */}
              <div className="flex items-center gap-4">
                <a
                  href={`https://instagram.com/${store.instagram || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 text-white hover:scale-110 transition-transform duration-200 shadow-sm"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-6 h-6" />
                </a>
                <a
                  href={`https://wa.me/${store.whatsapp || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#25D366] text-white hover:scale-110 transition-transform duration-200 shadow-sm"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-6 h-6" />
                </a>
              </div>

              {/* Phone Number - clean text below icons */}
              <a
                href={`tel:${store.phone || ""}`}
                className="flex items-center gap-2 text-[#006C3F] font-medium hover:opacity-80 transition-opacity"
              >
                <Phone className="w-4 h-4" />
                <span>{store.phone || "Телефон не указан"}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="mt-8 mb-6">
          <h3 className="text-xl font-bold text-foreground mb-4">Вечерние предложения</h3>
          {storeProducts.length === 0 ? (
            <p className="text-muted-foreground">Товары не доступны</p>
          ) : (
            <div className="space-y-4">
              {storeProducts.map((product) => (
                <ProductCard key={product.id} product={product} onBook={() => handleBooking(product)} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {isBookingOpen && selectedProduct && (
        <BookingModal product={selectedProduct} store={store} onClose={() => setIsBookingOpen(false)} />
      )}
    </main>
  )
}
