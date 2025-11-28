export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  series?: string;
  switchType?: string;
  ports: number;
  downlinkRate?: string;
  poe: boolean;
  uplink: string;
  iStack?: boolean;
  image: string;
  specifications?: Record<string, string | number>;
  datasheetUrl?: string;
}

interface FilterCriteria {
  requiredPorts?: number;
  requirePoe?: boolean;
  subcategory?: string;
  category?: string;
}

export function parseSearchQuery(query: string): FilterCriteria {
  const criteria: FilterCriteria = {};
  const lowerQuery = query.toLowerCase();

  // Check for number (ports)
  const numberMatch = query.match(/\d+/);
  if (numberMatch) {
    criteria.requiredPorts = Number.parseInt(numberMatch[0], 10);
  }

  // Check for POE
  if (lowerQuery.includes("poe")) {
    criteria.requirePoe = true;
  }

  // Check for device types
  if (lowerQuery.includes("switch")) {
    criteria.subcategory = "Switch";
  } else if (lowerQuery.includes("router")) {
    criteria.subcategory = "Router";
  } else if (lowerQuery.includes("ap") || lowerQuery.includes("access point")) {
    criteria.subcategory = "AP";
  } else if (lowerQuery.includes("olt")) {
    criteria.subcategory = "OLT";
  } else if (lowerQuery.includes("onu")) {
    criteria.subcategory = "ONU";
  } else if (lowerQuery.includes("nas")) {
    criteria.subcategory = "NAS";
  } else if (lowerQuery.includes("board")) {
    criteria.subcategory = "Board";
  }

  return criteria;
}

export function scoreProduct(
  product: Product,
  criteria: FilterCriteria
): number {
  let score = 0;

  // Exact port match
  if (criteria.requiredPorts !== undefined) {
    if (product.ports === criteria.requiredPorts) {
      score += 50;
    } else if (Math.abs(product.ports - criteria.requiredPorts) <= 2) {
      score += 25; // Close match
    }
  }

  // POE requirement
  if (criteria.requirePoe && product.poe) {
    score += 40;
  } else if (criteria.requirePoe && !product.poe) {
    return -1; // Disqualify
  }

  // Subcategory match
  if (criteria.subcategory && product.subcategory === criteria.subcategory) {
    score += 30;
  }

  // Category match (weak signal)
  if (criteria.category && product.category === criteria.category) {
    score += 10;
  }

  return score;
}

export function filterProducts(
  products: Product[],
  criteria: FilterCriteria
): Product[] {
  if (Object.keys(criteria).length === 0) {
    return products;
  }

  return products
    .map((product) => ({
      product,
      score: scoreProduct(product, criteria),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ product }) => product);
}

export function filterByCategory(
  products: Product[],
  category: string,
  filters?: {
    subcategory?: string;
    series?: string;
    switchType?: string;
    ports?: number;
    downlinkRate?: string;
    poe?: boolean;
    uplink?: string;
    iStack?: boolean;
  }
): Product[] {
  let filtered = products.filter((p) => p.category === category);

  if (filters) {
    if (filters.subcategory) {
      filtered = filtered.filter((p) => p.subcategory === filters.subcategory);
    }
    if (filters.series) {
      filtered = filtered.filter((p) => p.series === filters.series);
    }
    if (filters.switchType) {
      filtered = filtered.filter((p) => p.switchType === filters.switchType);
    }
    if (filters.ports !== undefined) {
      filtered = filtered.filter((p) => p.ports === filters.ports);
    }
    if (filters.downlinkRate) {
      filtered = filtered.filter(
        (p) => p.downlinkRate === filters.downlinkRate
      );
    }
    if (filters.poe !== undefined) {
      filtered = filtered.filter((p) => p.poe === filters.poe);
    }
    if (filters.uplink !== undefined) {
      filtered = filtered.filter((p) => p.uplink === filters.uplink);
    }
    if (filters.iStack !== undefined) {
      filtered = filtered.filter((p) => p.iStack === filters.iStack);
    }
  }

  return filtered;
}

export function getCategories(products: Product[]): string[] {
  return Array.from(new Set(products.map((p) => p.category))).sort();
}

export function getSubcategories(
  products: Product[],
  category: string
): string[] {
  return Array.from(
    new Set(
      products.filter((p) => p.category === category).map((p) => p.subcategory)
    )
  ).sort();
}

export function getSeries(products: Product[], category: string): string[] {
  return Array.from(
    new Set(
      products
        .filter((p) => p.category === category && p.series)
        .map((p) => p.series as string)
    )
  ).sort();
}

export function getSwitchTypes(
  products: Product[],
  category: string
): string[] {
  return Array.from(
    new Set(
      products
        .filter((p) => p.category === category && p.switchType)
        .map((p) => p.switchType as string)
    )
  ).sort();
}

export function getUplinkTypes(
  products: Product[],
  category: string
): string[] {
  return Array.from(
    new Set(
      products.filter((p) => p.category === category).map((p) => p.uplink)
    )
  ).sort();
}

export function getPortOptions(
  products: Product[],
  category: string
): number[] {
  return Array.from(
    new Set(products.filter((p) => p.category === category).map((p) => p.ports))
  ).sort((a, b) => a - b);
}

export function getDownlinkRates(
  products: Product[],
  category: string
): string[] {
  return Array.from(
    new Set(
      products
        .filter((p) => p.category === category && p.downlinkRate)
        .map((p) => p.downlinkRate as string)
    )
  ).sort();
}
