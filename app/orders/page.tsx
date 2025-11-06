"use client"

import { useState } from "react"
import Link from "next/link"
import Header from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"
import { ChevronRight, Clock } from "lucide-react"

export default function OrdersPage() {
  const [orders] = useState([
    {
      id: "1",
      storeName: "Кофейня №5",
      productName: "Вечерний кофе бокс",
      quantity: 1,
      total: 2500,
      date: "Сегодня, 19:30",
      status: "Готов к выдаче",
    },
    {
      id: "2",
      storeName: "Измир",
      productName: "Лаваш вечерний бокс",
      quantity: 1,
      total: 2500,
      date: "Вчера, 18:45",
      status: "Забран",
    },
    {
      id: "3",
      storeName: "Sweet Corner",
      productName: "Вечерний десерт бокс",
      quantity: 3,
      total: 7500,
      date: "3 ноября, 17:15",
      status: "Забран",
    },
  ])

  return (
    <main className="min-h-screen bg-background pb-20">
      <Header />

      <div className="max-w-md mx-auto px-4 py-6 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">История заказов</h1>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-4xl mb-4">📦</div>
            <p className="text-muted-foreground mb-4 text-lg">У вас нет заказов</p>
            <Link href="/" className="inline-block text-primary font-semibold hover:opacity-80 transition">
              Вернуться на главную
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Link
                key={order.id}
                href={`/orders/${order.id}`}
                className="block bg-card rounded-2xl border border-border p-4 sm:p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-foreground">{order.storeName}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{order.productName}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span>{order.date}</span>
                      </div>
                    </div>
                    <span className="text-lg font-bold text-primary">{order.total} ₸</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">x{order.quantity}</span>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      order.status === "Готов к забору" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </main>
  )
}
