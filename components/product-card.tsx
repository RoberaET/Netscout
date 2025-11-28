"use client"

import { useState } from "react"
import Image from "next/image"
import type { Product } from "@/lib/filter-products"
import { ProductDetailModal } from "./product-detail-modal"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowDetails(true)}
        className="group relative overflow-hidden rounded-lg border border-border bg-card p-4 transition-all hover:shadow-lg hover:border-primary text-left w-full"
      >
        <div className="relative mb-4 aspect-video overflow-hidden rounded-md bg-muted">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <h3 className="font-semibold text-card-foreground text-sm line-clamp-2">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">{product.subcategory}</p>

        <div className="mt-3 flex gap-2 flex-wrap">
          <div className="inline-flex items-center gap-1 rounded bg-muted px-2 py-1">
            <svg className="h-3 w-3 text-muted-foreground" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xs font-medium text-muted-foreground">{product.ports}</span>
          </div>

          {product.poe && (
            <div className="inline-flex items-center gap-1 rounded bg-green-100/50 dark:bg-green-900/30 px-2 py-1">
              <span className="h-2 w-2 rounded-full bg-green-600" />
              <span className="text-xs font-medium text-green-700 dark:text-green-300">POE</span>
            </div>
          )}

          <div className="inline-flex items-center gap-1 rounded bg-muted px-2 py-1">
            <span className="text-xs font-medium text-muted-foreground">{product.uplink}</span>
          </div>
        </div>
      </button>

      {showDetails && <ProductDetailModal product={product} onClose={() => setShowDetails(false)} />}
    </>
  )
}
