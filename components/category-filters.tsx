"use client"

import { useState, useCallback } from "react"
import type { Product } from "@/lib/filter-products"
import {
  getPortOptions,
  getUplinkTypes,
  getSubcategories,
  getSeries,
  getSwitchTypes,
  getDownlinkRates,
} from "@/lib/filter-products"

interface CategoryFiltersProps {
  category: string
  products: Product[]
  onFiltersChange: (filters: {
    subcategory?: string
    series?: string
    switchType?: string
    ports?: number
    downlinkRate?: string
    poe?: boolean
    uplink?: string
    iStack?: boolean
  }) => void
}

export function CategoryFilters({ category, products, onFiltersChange }: CategoryFiltersProps) {
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | undefined>()
  const [selectedSeries, setSelectedSeries] = useState<string | undefined>()
  const [selectedSwitchType, setSelectedSwitchType] = useState<string | undefined>()
  const [selectedPorts, setSelectedPorts] = useState<number | undefined>()
  const [selectedDownlinkRate, setSelectedDownlinkRate] = useState<string | undefined>()
  const [selectedPoe, setSelectedPoe] = useState<boolean | undefined>()
  const [selectedUplink, setSelectedUplink] = useState<string | undefined>()
  const [selectedIStack, setSelectedIStack] = useState<boolean | undefined>()

  // Filter products based on current selections to generate dynamic options
  const filteredProducts = products.filter((p) => {
    if (p.category !== category) return false
    if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false
    if (selectedSeries && p.series !== selectedSeries) return false
    return true
  })

  // Subcategories are always based on the main category
  const subcategories = getSubcategories(products, category)

  // Series options depend on the selected subcategory
  const seriesOptions = getSeries(
    products.filter((p) => {
      if (p.category !== category) return false
      if (selectedSubcategory && p.subcategory !== selectedSubcategory) return false
      return true
    }),
    category,
  )

  // Attribute options depend on subcategory AND series
  const switchTypeOptions = getSwitchTypes(filteredProducts, category)
  const portOptions = getPortOptions(filteredProducts, category)
  const downlinkRateOptions = getDownlinkRates(filteredProducts, category)
  const uplinkTypes = getUplinkTypes(filteredProducts, category)

  const handleFiltersChange = useCallback(
    (
      subcategory?: string,
      series?: string,
      switchType?: string,
      ports?: number,
      downlinkRate?: string,
      poe?: boolean,
      uplink?: string,
      iStack?: boolean,
    ) => {
      // If subcategory changes, reset everything else
      if (subcategory !== selectedSubcategory) {
        setSelectedSubcategory(subcategory)
        setSelectedSeries(undefined)
        setSelectedSwitchType(undefined)
        setSelectedPorts(undefined)
        setSelectedDownlinkRate(undefined)
        setSelectedPoe(undefined)
        setSelectedUplink(undefined)
        setSelectedIStack(undefined)
        onFiltersChange({ subcategory })
        return
      }

      // If series changes, reset attributes
      if (series !== selectedSeries) {
        setSelectedSeries(series)
        setSelectedSwitchType(undefined)
        setSelectedPorts(undefined)
        setSelectedDownlinkRate(undefined)
        setSelectedPoe(undefined)
        setSelectedUplink(undefined)
        setSelectedIStack(undefined)
        onFiltersChange({ subcategory, series })
        return
      }

      setSelectedSubcategory(subcategory)
      setSelectedSeries(series)
      setSelectedSwitchType(switchType)
      setSelectedPorts(ports)
      setSelectedDownlinkRate(downlinkRate)
      setSelectedPoe(poe)
      setSelectedUplink(uplink)
      setSelectedIStack(iStack)
      onFiltersChange({ subcategory, series, switchType, ports, downlinkRate, poe, uplink, iStack })
    },
    [onFiltersChange, selectedSubcategory, selectedSeries],
  )

  const resetFilters = () => {
    handleFiltersChange(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined)
  }

  const hasActiveFilters =
    selectedSubcategory !== undefined ||
    selectedSeries !== undefined ||
    selectedSwitchType !== undefined ||
    selectedPorts !== undefined ||
    selectedDownlinkRate !== undefined ||
    selectedPoe !== undefined ||
    selectedUplink !== undefined ||
    selectedIStack !== undefined

  return (
    <div className="space-y-6 p-4 rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-card-foreground">Filters</h3>
        {hasActiveFilters && (
          <button onClick={resetFilters} className="text-xs text-primary hover:underline">
            Reset
          </button>
        )}
      </div>

      {/* Product Category */}
      {subcategories.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Product Category</label>
          <div className="flex flex-wrap gap-2">
            {subcategories.map((sub) => (
              <button
                key={sub}
                onClick={() =>
                  handleFiltersChange(
                    selectedSubcategory === sub ? undefined : sub,
                    selectedSeries,
                    selectedSwitchType,
                    selectedPorts,
                    selectedDownlinkRate,
                    selectedPoe,
                    selectedUplink,
                    selectedIStack,
                  )
                }
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  selectedSubcategory === sub
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Series */}
      {selectedSubcategory && seriesOptions.length > 0 && (
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">Series</label>
          <div className="flex flex-wrap gap-2">
            {seriesOptions.map((series) => (
              <button
                key={series}
                onClick={() =>
                  handleFiltersChange(
                    selectedSubcategory,
                    selectedSeries === series ? undefined : series,
                    selectedSwitchType,
                    selectedPorts,
                    selectedDownlinkRate,
                    selectedPoe,
                    selectedUplink,
                    selectedIStack,
                  )
                }
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  selectedSeries === series
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                {series}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attributes Section */}
      {selectedSubcategory && (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground border-b border-border pb-2">Attribute</h4>

          {/* Switch Type */}
          {switchTypeOptions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Switch Type</label>
              <div className="flex flex-wrap gap-2">
                {switchTypeOptions.map((type) => (
                  <button
                    key={type}
                    onClick={() =>
                      handleFiltersChange(
                        selectedSubcategory,
                        selectedSeries,
                        selectedSwitchType === type ? undefined : type,
                        selectedPorts,
                        selectedDownlinkRate,
                        selectedPoe,
                        selectedUplink,
                        selectedIStack,
                      )
                    }
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                      selectedSwitchType === type
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* POE Filter */}
          {products.some((p) => p.category === category && p.poe) && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">PoE</label>
              <button
                onClick={() =>
                  handleFiltersChange(
                    selectedSubcategory,
                    selectedSeries,
                    selectedSwitchType,
                    selectedPorts,
                    selectedDownlinkRate,
                    selectedPoe === true ? undefined : true,
                    selectedUplink,
                    selectedIStack,
                  )
                }
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  selectedPoe === true
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                PoE Supported
              </button>
            </div>
          )}

          {/* Number of Downlink Ports */}
          {portOptions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Number of Downlink Ports
              </label>
              <div className="flex flex-wrap gap-2">
                {portOptions.map((port) => (
                  <button
                    key={port}
                    onClick={() =>
                      handleFiltersChange(
                        selectedSubcategory,
                        selectedSeries,
                        selectedSwitchType,
                        selectedPorts === port ? undefined : port,
                        selectedDownlinkRate,
                        selectedPoe,
                        selectedUplink,
                        selectedIStack,
                      )
                    }
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                      selectedPorts === port
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {port}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Rate of Downlink Port */}
          {downlinkRateOptions.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Rate of Downlink Port</label>
              <div className="flex flex-wrap gap-2">
                {downlinkRateOptions.map((rate) => (
                  <button
                    key={rate}
                    onClick={() =>
                      handleFiltersChange(
                        selectedSubcategory,
                        selectedSeries,
                        selectedSwitchType,
                        selectedPorts,
                        selectedDownlinkRate === rate ? undefined : rate,
                        selectedPoe,
                        selectedUplink,
                        selectedIStack,
                      )
                    }
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                      selectedDownlinkRate === rate
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {rate}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Uplink Type */}
          {uplinkTypes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">Uplink Type</label>
              <div className="flex flex-wrap gap-2">
                {uplinkTypes.map((uplink) => (
                  <button
                    key={uplink}
                    onClick={() =>
                      handleFiltersChange(
                        selectedSubcategory,
                        selectedSeries,
                        selectedSwitchType,
                        selectedPorts,
                        selectedDownlinkRate,
                        selectedPoe,
                        selectedUplink === uplink ? undefined : uplink,
                        selectedIStack,
                      )
                    }
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                      selectedUplink === uplink
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-border"
                    }`}
                  >
                    {uplink}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* iStack */}
          {products.some((p) => p.category === category && p.iStack) && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">iStack</label>
              <button
                onClick={() =>
                  handleFiltersChange(
                    selectedSubcategory,
                    selectedSeries,
                    selectedSwitchType,
                    selectedPorts,
                    selectedDownlinkRate,
                    selectedPoe,
                    selectedUplink,
                    selectedIStack === true ? undefined : true,
                  )
                }
                className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                  selectedIStack === true
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-border"
                }`}
              >
                iStack Supported
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
