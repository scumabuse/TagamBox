"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save } from "lucide-react"
import Header from "@/components/header"
import BottomNavigation from "@/components/bottom-navigation"

export default function EditProfilePage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  })

  useEffect(() => {
    setMounted(true)
    const userData = localStorage.getItem("user")
    if (userData) {
      const user = JSON.parse(userData)
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      })
    } else {
      router.push("/login")
    }
  }, [router])

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = "Имя обязательно"
      isValid = false
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email обязателен"
      isValid = false
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Неверный формат email"
      isValid = false
    }

    if (formData.phone && !/^\+?[\d\s\-()]+$/.test(formData.phone)) {
      newErrors.phone = "Неверный формат телефона"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSave = () => {
    if (validateForm()) {
      localStorage.setItem("user", JSON.stringify(formData))
      router.push("/profile")
    }
  }

  const handleCancel = () => {
    router.push("/profile")
  }

  if (!mounted) return null

  return (
    <main className="min-h-screen bg-background pb-20">
      <Header />

      <div className="max-w-md mx-auto px-4 py-6 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={handleCancel} className="p-2 hover:bg-muted rounded-lg transition-colors" aria-label="Назад">
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">Редактировать профиль</h1>
        </div>

        {/* Edit Form */}
        <div className="bg-card rounded-2xl p-6 sm:p-8 shadow-md border border-border">
          <div className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                Имя
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.name ? "border-red-500" : "border-border"
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                placeholder="Введите ваше имя"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.email ? "border-red-500" : "border-border"
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                placeholder="Введите ваш email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                Телефон
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-lg border ${
                  errors.phone ? "border-red-500" : "border-border"
                } bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all`}
                placeholder="+7 (___) ___-__-__"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              onClick={handleSave}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-all duration-200"
            >
              <Save className="w-5 h-5" />
              Сохранить
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-3 px-4 bg-background text-foreground rounded-lg font-semibold border-2 border-primary hover:bg-muted transition-all duration-200"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>

      <BottomNavigation />
    </main>
  )
}
