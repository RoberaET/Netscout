"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { use } from "react"
import products from "@/data/products.json"
import { filterByCategory } from "@/lib/filter-products"
import { ProductCard } from "@/components/product-card"
import { CategoryFilters } from "@/components/category-filters"

export default function CategoryPage({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const { name } = use(params)
  const decodedName = decodeURIComponent(name)
  const [filters, setFilters] = useState<{
    subcategory?: string
    series?: string
    switchType?: string
    ports?: number
    downlinkRate?: string
    poe?: boolean
    uplink?: string
    iStack?: boolean
  }>({})

  const categoryProducts = useMemo(() => {
    return filterByCategory(products.products, decodedName, filters)
  }, [decodedName, filters])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center font-bold">
                E
              </div>
              <span className="font-semibold text-card-foreground">EKit</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm">
          <Link href="/" className="text-primary hover:underline">
            Home
          </Link>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground font-medium">{decodedName}</span>
        </div>

        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-2">{decodedName}</h1>
          <p className="text-muted-foreground">
            {categoryProducts.length} product{categoryProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <CategoryFilters category={decodedName} products={products.products} onFiltersChange={setFilters} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {categoryProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No products match your filters</p>
                <button onClick={() => setFilters({})} className="text-primary hover:underline text-sm font-medium">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2025 EKit Product Finder. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
