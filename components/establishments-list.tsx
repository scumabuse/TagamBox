"use client"

import Link from "next/link"
import EstablishmentCard from "./establishment-card"
import { establishments } from "@/lib/mock-data"

interface EstablishmentsListProps {
  searchQuery: string
}

export default function EstablishmentsList({ searchQuery }: EstablishmentsListProps) {
  const filtered = establishments.filter((est) => est.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="max-w-md mx-auto space-y-4 py-4">
      {filtered.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">Заведения не найдены</p>
        </div>
      ) : (
        filtered.map((establishment) => (
          <Link key={establishment.id} href={`/store/${establishment.id}`} className="block">
            <EstablishmentCard establishment={establishment} />
          </Link>
        ))
      )}
    </div>
  )
}
