"use client"

import { useEffect } from "react"
import Image from "next/image"
import type { Product } from "@/lib/filter-products"

interface ProductDetailModalProps {
  product: Product
  onClose: () => void
}

export function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-lg border border-border shadow-lg max-w-6xl w-full max-h-[90vh] flex flex-col md:flex-row overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column: Image */}
        <div className="relative w-full md:w-1/3 bg-muted/30 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-border">
          <div className="relative w-full aspect-square mb-4">
            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-contain" />
          </div>
          {product.datasheetUrl && (
            <a
              href={product.datasheetUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-lg bg-primary text-primary-foreground py-2 px-4 font-medium text-center transition-colors hover:opacity-90"
            >
              Download Datasheet
            </a>
          )}
        </div>

        {/* Right Column: Details & Specs */}
        <div className="flex-1 flex flex-col min-h-0">
          <div className="p-6 flex-1 overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="mb-1 text-sm text-muted-foreground">{product.category}</div>
                <h2 className="text-2xl font-bold text-card-foreground">{product.name}</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 hover:bg-muted transition-colors -mr-2 -mt-2"
              >
                <svg className="h-5 w-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mb-8">
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Subcategory</span>
                <span className="font-medium text-card-foreground">{product.subcategory}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Ports</span>
                <span className="font-medium text-card-foreground">{product.ports}</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span className="text-sm text-muted-foreground">POE Support</span>
                <span className="font-medium">
                  {product.poe ? (
                    <span className="text-green-600 dark:text-green-400">Yes</span>
                  ) : (
                    <span className="text-muted-foreground">No</span>
                  )}
                </span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-border/50">
                <span className="text-sm text-muted-foreground">Uplink</span>
                <span className="font-medium text-card-foreground">{product.uplink}</span>
              </div>
            </div>

            {product.specifications && (
              <div>
                <h3 className="text-lg font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:items-start sm:justify-between py-2 border-b border-border/50 text-sm gap-1">
                      <span className="text-muted-foreground font-medium sm:w-1/2 pr-2">
                        {key}
                      </span>
                      <span className="text-card-foreground sm:text-right sm:w-1/2 break-words">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-border bg-card">
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-primary text-primary-foreground py-2 font-medium transition-colors hover:opacity-90"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
