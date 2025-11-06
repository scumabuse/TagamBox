"use client"

import { useEffect, useState } from "react"
import { LogOut, Edit2, LogIn } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Header from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const userData = localStorage.getItem("user")
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  const handleEditProfile = () => {
    router.push("/profile/edit")
  }

  if (!mounted) return null

  if (!user) {
    return (
      <main className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center px-4 pb-20">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto mb-4 text-3xl">
              👤
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Войти в аккаунт</h2>
            <p className="text-muted-foreground mb-6">Создайте аккаунт или войдите, чтобы увидеть ваш профиль</p>
            <Link
              href="/login"
              className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:opacity-90 transition"
            >
              <LogIn className="w-4 h-4 inline mr-2" />
              Войти
            </Link>
          </div>
        </div>
        <BottomNavigation />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pb-20">
      <Header />

      <div className="max-w-md mx-auto px-4 py-6 sm:py-8">
        {/* Profile Card */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-md border border-border mb-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-2xl flex-shrink-0">
              {user.name?.[0]?.toUpperCase() || "U"}
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>
              {user.phone && <p className="text-sm text-muted-foreground">{user.phone}</p>}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={handleEditProfile}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-secondary text-foreground rounded-lg font-semibold border border-border hover:bg-muted transition-colors duration-200"
            >
              <Edit2 className="w-5 h-5" />
              Редактировать профиль
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-100 text-red-700 rounded-lg font-semibold border border-red-200 hover:bg-red-200 transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              Выход
            </button>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-md border border-border">
          <h3 className="text-lg font-bold text-foreground mb-4">Информация профиля</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Email</span>
              <span className="text-foreground font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-border">
              <span className="text-muted-foreground">Имя</span>
              <span className="text-foreground font-medium">{user.name}</span>
            </div>
            {user.phone && (
              <div className="flex justify-between items-center py-3">
                <span className="text-muted-foreground">Телефон</span>
                <span className="text-foreground font-medium">{user.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
