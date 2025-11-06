"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function SignupPage() {
  const router = useRouter()
  const [step, setStep] = useState<"info" | "card" | "success">("info")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInfoSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Пароли не совпадают")
      return
    }
    setStep("card")
  }

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email, name }))
      setStep("success")
      setTimeout(() => router.push("/"), 2000)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-md mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <ArrowLeft className="w-6 h-6 hover:opacity-70 transition" />
          </Link>
          <h1 className="text-xl font-bold text-foreground">Создать аккаунт</h1>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          {step === "info" && (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-2">Присоединяйтесь к TAGAM</h2>
                <p className="text-muted-foreground">Создайте аккаунт, чтобы бронировать товары</p>
              </div>

              <form onSubmit={handleInfoSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Полное имя</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Иван Иванов"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="ваш@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Пароль</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="••••••••"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Подтвердить пароль</label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:opacity-90 transition mt-6"
                >
                  Продолжить
                </button>
              </form>

              <p className="text-center text-muted-foreground mt-6">
                Уже есть аккаунт?{" "}
                <Link href="/login" className="text-primary font-semibold hover:underline">
                  Войти
                </Link>
              </p>
            </>
          )}

          {step === "card" && (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">Способ оплаты</h2>
                <p className="text-muted-foreground">Добавьте карту для бронирований (тестовый режим)</p>
              </div>

              <form onSubmit={handleCardSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Номер карты</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    className="w-full px-4 py-3 rounded-lg bg-secondary border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Срок действия</label>
                    <input
                      type="text"
                      placeholder="ММ/ГГ"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border placeholder-muted-foreground text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep("info")}
                    className="flex-1 bg-secondary text-foreground py-3 rounded-lg font-semibold border border-border hover:bg-muted transition"
                  >
                    Назад
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    {isLoading ? "Создание..." : "Создать аккаунт"}
                  </button>
                </div>
              </form>
            </>
          )}

          {step === "success" && (
            <div className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-foreground mb-2">Аккаунт создан!</h2>
              <p className="text-muted-foreground mb-6">Добро пожаловать в TAGAM, {name}</p>
              <p className="text-sm text-muted-foreground">Переход на главную...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
