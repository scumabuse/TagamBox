"use client"

import { useState } from "react"
import { X, Minus, Plus, Clock, Zap } from "lucide-react"

interface BookingModalProps {
  product: any
  store: any
  onClose: () => void
}

export default function BookingModal({ product, store, onClose }: BookingModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [time, setTime] = useState("19:00")
  const [isLoading, setIsLoading] = useState(false)

  const times = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"]

  const handleBooking = async () => {
    setIsLoading(true)
    setTimeout(() => {
      alert(`Забронировано ${quantity} бокс(ов) из ${store.name} на ${time}`)
      onClose()
      setIsLoading(false)
    }, 1000)
  }

  const handleInstantBooking = async () => {
    setIsLoading(true)
    setTimeout(() => {
      alert(`Забронировано ${quantity} бокс(ов) из ${store.name}. Вы можете забрать прямо сейчас!`)
      onClose()
      setIsLoading(false)
    }, 1000)
  }

  const totalPrice = (product.discountedPrice * quantity).toFixed(0)

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-card w-full rounded-t-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Завершить заказ</h2>
            <button onClick={onClose} className="p-2 hover:bg-secondary rounded-lg transition">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Product Summary */}
          <div className="bg-secondary p-4 rounded-lg mb-6 border border-border">
            <p className="text-sm text-muted-foreground mb-1">Товар</p>
            <p className="font-bold text-foreground">{product.name}</p>
            <p className="text-lg font-bold text-primary mt-2">{product.discountedPrice} ₸</p>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-3">Сколько боксов?</label>
            <div className="flex items-center gap-4 bg-secondary p-4 rounded-lg border border-border">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-primary/10 rounded-lg transition"
              >
                <Minus className="w-5 h-5" />
              </button>
              <span className="text-2xl font-bold text-foreground w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-primary/10 rounded-lg transition"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Time Selector */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-foreground mb-3">Время получения</label>
            <div className="grid grid-cols-3 gap-2">
              {times.map((t) => (
                <button
                  key={t}
                  onClick={() => setTime(t)}
                  className={`py-3 rounded-lg font-semibold transition flex items-center justify-center gap-1 ${
                    time === t
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-foreground border border-border hover:bg-muted"
                  }`}
                >
                  <Clock className="w-4 h-4" />
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Total and Submit */}
          <div className="space-y-4">
            <div className="flex items-center justify-between text-lg font-bold text-foreground">
              <span>Итого:</span>
              <span className="text-primary">{totalPrice} ₸</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleInstantBooking}
                disabled={isLoading}
                className="bg-primary text-primary-foreground py-4 rounded-lg font-bold flex items-center justify-center gap-2 hover:opacity-90 transition disabled:opacity-50"
              >
                <Zap className="w-5 h-5" />
                Забрать сейчас
              </button>
              <button
                onClick={handleBooking}
                disabled={isLoading}
                className="bg-primary text-primary-foreground py-4 rounded-lg font-bold hover:opacity-90 transition disabled:opacity-50"
              >
                {isLoading ? "Обработка..." : "Забронировать"}
              </button>
            </div>

            <button
              onClick={onClose}
              className="w-full bg-secondary text-foreground py-3 rounded-lg font-semibold border border-border hover:bg-muted transition"
            >
              Отменить
            </button>
          </div>

          {/* Info Text */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            Реальных платежей не будет. Это демо-приложение.
          </p>
        </div>
      </div>
    </div>
  )
}
