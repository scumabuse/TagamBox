"use client"

import type React from "react"

import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }))
      router.push("/")
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
          <h1 className="text-xl font-bold text-foreground">Вход</h1>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="max-w-md w-full">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">Добро пожаловать</h2>
            <p className="text-muted-foreground">Войдите в ваш аккаунт TAGAM</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
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

            {/* Password */}
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

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-bold text-lg hover:opacity-90 transition disabled:opacity-50 mt-6"
            >
              {isLoading ? "Вход..." : "Вход"}
            </button>
          </form>

          {/* Sign Up Link */}
          <p className="text-center text-muted-foreground mt-6">
            Нет аккаунта?{" "}
            <Link href="/signup" className="text-primary font-semibold hover:underline">
              Зарегистрируйтесь
            </Link>
          </p>
        </div>
      </div>
    </main>
  )
}
