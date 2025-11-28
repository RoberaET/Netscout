"use client"

import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { useMemo } from "react"
import { Suspense } from "react"
import products from "@/data/products.json"
import { parseSearchQuery, filterProducts } from "@/lib/filter-products"
import { ProductCard } from "@/components/product-card"
import { SearchInput } from "@/components/search-input"

function SearchResults() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const router = useRouter()

  const results = useMemo(() => {
    if (!query.trim()) {
      return []
    }
    const criteria = parseSearchQuery(query)
    return filterProducts(products.products, criteria)
  }, [query])

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
        {/* Search Bar */}
        <div className="mb-12 max-w-2xl">
          <SearchInput />
        </div>

        {/* Results Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Search Results</h1>
          {query && (
            <p className="text-muted-foreground">
              {results.length} result{results.length !== 1 ? "s" : ""} for{" "}
              <span className="font-semibold text-foreground">"{query}"</span>
            </p>
          )}
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-12">
            <svg
              className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-muted-foreground mb-2">No products found</p>
            <p className="text-sm text-muted-foreground mb-4">
              Try searching for "24 port switch", "poe", or specific product names
            </p>
            <Link href="/" className="text-primary hover:underline text-sm font-medium">
              Browse categories instead
            </Link>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Enter a search query to find products</p>
            <Link href="/" className="text-primary hover:underline text-sm font-medium">
              Browse categories
            </Link>
          </div>
        )}
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

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchResults />
    </Suspense>
  )
}
