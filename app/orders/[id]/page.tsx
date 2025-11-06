"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react"
import Header from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"
import { QRCodeSVG as QRCode } from "qrcode.react"

export default function OrderDetailPage() {
  const params = useParams()
  const orderId = params.id

  // Mock order data
  const orderData: any = {
    "1": {
      storeName: "Кофейня №5",
      storeAddress: "Павлодар, ул. Академика Сатпаева 21",
      items: ["Сюрприз бокс"],
      status: "Готов к забору",
      total: 2500,
      date: "6 ноября, 2025",
      time: "19:30",
      qrCode: "ORDER_001_2025",
    },
    "2": {
      storeName: "Измир",
      storeAddress: "Павлодар, ул. Катаева 36/3",
      items: ["Сюрприз бокс"],
      status: "Забран",
      total: 2500,
      date: "5 ноября, 2025",
      time: "18:45",
      qrCode: "ORDER_002_2025",
    },
    "3": {
      storeName: "Sweet Corner",
      storeAddress: "Павлодар, ул. Назарбаева 120",
      items: ["Сюрприз бокс"],
      status: "Забран",
      total: 7500,
      date: "3 ноября, 2025",
      time: "17:15",
      qrCode: "ORDER_003_2025",
    },
  }

  const order = orderData[orderId as string]

  if (!order) {
    return (
      <main className="min-h-screen bg-background pb-20">
        <Header />
        <div className="max-w-md mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground mb-4">Заказ не найден</p>
          <Link href="/orders" className="text-primary font-semibold">
            Вернуться к заказам
          </Link>
        </div>
        <BottomNavigation />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <Header />

      <div className="max-w-md mx-auto px-4 py-6">
        {/* Back Button */}
        <Link
          href="/orders"
          className="flex items-center gap-2 text-primary font-semibold mb-6 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Назад к заказам
        </Link>

        {/* Order Status Card */}
        <div className="bg-card rounded-2xl p-6 shadow-md border border-border mb-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-foreground">{order.storeName}</h2>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">📍 {order.storeAddress}</p>
            </div>
            {order.status === "Готов к забору" ? (
              <div className="text-right">
                <Clock className="w-6 h-6 text-primary mx-auto mb-1" />
                <p className="text-xs font-semibold text-primary">Готов</p>
              </div>
            ) : (
              <div className="text-right">
                <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs font-semibold text-green-600">Забран</p>
              </div>
            )}
          </div>

          <div className="py-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Дата и время</p>
            <p className="font-semibold text-foreground">
              {order.date} в {order.time}
            </p>
          </div>

          <div className="py-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-3">Состав заказа</p>
            <ul className="space-y-2">
              {order.items.map((item: string, idx: number) => (
                <li key={idx} className="flex items-center gap-2 text-foreground">
                  <span className="w-1 h-1 rounded-full bg-primary"></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="py-4 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">Сумма заказа</p>
            <p className="text-2xl font-bold text-primary">{order.total} ₸</p>
          </div>
        </div>

        {/* QR Code Section */}
        {order.status === "Готов к забору" && (
          <div className="bg-card rounded-2xl p-6 shadow-md border border-border mb-6 text-center">
            <h3 className="text-lg font-bold text-foreground mb-4">Предъявить QR-код при получении</h3>
            <div className="bg-secondary p-4 rounded-lg inline-block">
              <QRCode
                value={order.qrCode}
                size={200}
                level="H"
                includeMargin={true}
                fgColor="#006c3f"
                bgColor="#fffefc"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-4">ID заказа: {order.qrCode}</p>
          </div>
        )}
      </div>

      <BottomNavigation />
    </main>
  )
}
