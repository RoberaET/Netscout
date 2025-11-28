import Link from "next/link"
import { SearchInput } from "@/components/search-input"
import { CategoryCard } from "@/components/category-card"

export default function Home() {
  const categories = [
    {
      name: "SME Network",
      description: "Switches, routers, and access points for enterprise networks",
      icon: "/icons/sme-network.svg",
    },
    {
      name: "MiniFTTO",
      description: "Fiber-to-the-office OLT/ONU and distribution solutions",
      icon: "/icons/miniftto.svg",
    },
    {
      name: "Storage",
      description: "NAS, SAN, and backup storage systems",
      icon: "/icons/storage.svg",
    },
    {
      name: "IdeaHub",
      description: "Interactive displays and collaboration tools",
      icon: "/icons/ideahub.svg",
    },
  ]

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

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Find Your Perfect Network Solution
          </h1>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Search and filter enterprise networking, storage, and collaboration products
          </p>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-12">
            <SearchInput />
          </div>
        </div>

        {/* Categories Grid */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.name}
                name={category.name}
                description={category.description}
                icon={category.icon}
              />
            ))}
          </div>
        </div>
      </section>

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
