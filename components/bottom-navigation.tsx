"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Package, User } from "lucide-react"

export default function BottomNavigation() {
  const pathname = usePathname()

  const navItems = [
    { href: "/", label: "Главная", icon: Home },
    { href: "/orders", label: "Заказы", icon: Package },
    { href: "/profile", label: "Профиль", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-card border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 sm:h-20">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-1 transition-colors duration-200 ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
