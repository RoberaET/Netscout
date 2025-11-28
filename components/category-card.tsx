import Link from "next/link"

interface CategoryCardProps {
  name: string
  description: string
  icon: string
}

export function CategoryCard({ name, description, icon }: CategoryCardProps) {
  return (
    <Link
      href={`/category/${encodeURIComponent(name)}`}
      className="group relative overflow-hidden rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-primary"
    >
      <div className="mb-4 w-12 h-12">
        <img src={icon} alt={`${name} icon`} className="w-full h-full object-contain" />
      </div>
      <h3 className="text-lg font-semibold text-card-foreground mb-2">{name}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
      <div className="mt-4 inline-flex items-center text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
        Browse
        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  )
}
