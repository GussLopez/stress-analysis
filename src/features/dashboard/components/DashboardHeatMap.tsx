'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/src/shared/components/ui/tooltip"
import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react"

interface CorrelationData {
  x: string
  y: string
  value: number
}

function getColor(value: number): string {
  if (value >= 0.5) return "bg-red-600 text-white"
  if (value >= 0.3) return "bg-red-500 text-white"
  if (value >= 0.1) return "bg-orange-400 text-white"
  if (value > 0) return "bg-yellow-300 text-gray-800"
  if (value === 0) return "bg-gray-200 text-gray-600"
  if (value > -0.1) return "bg-sky-200 text-gray-800"
  if (value > -0.3) return "bg-sky-400 text-white"
  if (value > -0.5) return "bg-blue-500 text-white"
  return "bg-blue-700 text-white"
}

function getColorIntensity(value: number): string {
  const absValue = Math.abs(value)
  if (absValue >= 0.5) return value > 0 ? "#dc2626" : "#1d4ed8"
  if (absValue >= 0.3) return value > 0 ? "#ef4444" : "#2563eb"
  if (absValue >= 0.1) return value > 0 ? "#fb923c" : "#38bdf8"
  if (absValue > 0) return value > 0 ? "#fde047" : "#bae6fd"
  return "#e5e7eb"
}

export default function DashboardHeatMap() {
  const { data, isLoading, isError } = useQuery<CorrelationData[]>({
    queryKey: ["dashboard-heatmap"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/charts/heatmap")
      if (!res.ok) throw new Error("Error fetching")
      return res.json()
    },
  })

  const xLabels = [...new Set(data?.map(d => d.x))]
  const yLabels = [...new Set(data?.map(d => d.y))]

  const dataMap = new Map<string, number>()
  data?.forEach(d => {
    dataMap.set(`${d.x}-${d.y}`, d.value)
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: .3, ease: 'easeIn', delay: .7 }}
    >
      <Card className="w-full ring-0 border border-muted shadow-xs">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Mapa de Correlaciones</CardTitle>
          <CardDescription>Relación entre variables emocionales y métricas sociales</CardDescription>
        </CardHeader>
        <CardContent>
          <TooltipProvider>
            <div className="overflow-x-auto">
              <div className="min-w-125">
                <div className="flex">
                  <div className="w-32 shrink-0" />
                  {xLabels.map((label) => (
                    <div
                      key={label}
                      className="flex-1 min-w-17.5 text-center text-xs font-medium text-muted-foreground pb-3 px-1"
                    >
                      {label}
                    </div>
                  ))}
                </div>

                {yLabels.map((yLabel) => (
                  <div key={yLabel} className="flex items-center">
                    <div className="w-32 shrink-0 text-xs font-medium text-foreground pr-3 text-right">
                      {yLabel}
                    </div>

                    {xLabels.map((xLabel) => {
                      const value = dataMap.get(`${xLabel}-${yLabel}`)
                      const hasValue = value !== undefined

                      return (
                        <div key={`${xLabel}-${yLabel}`} className="flex-1 min-w-17.5 p-1">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div
                                className={`
                                aspect-square max-h-14 w-full rounded-lg flex items-center justify-center 
                                text-xs font-semibold transition-all duration-200
                                ${hasValue
                                    ? `${getColor(value)} hover:scale-105 cursor-pointer shadow-xs`
                                    : 'bg-gray-100 text-gray-300'
                                  }
                              `}
                                style={hasValue ? { backgroundColor: getColorIntensity(value) } : undefined}
                              >
                                {hasValue ? value.toFixed(2) : '—'}
                              </div>
                            </TooltipTrigger>
                            {hasValue && (
                              <TooltipContent>
                                <div className="text-sm">
                                  <p className="font-medium">{xLabel} - {yLabel}</p>
                                  <p className="text-muted-foreground">
                                    Correlación: <span className="font-semibold">{value.toFixed(2)}</span>
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {value > 0.3 ? 'Correlación positiva fuerte' :
                                      value > 0.1 ? 'Correlación positiva moderada' :
                                        value > 0 ? 'Correlación positiva débil' :
                                          value === 0 ? 'Sin correlación' :
                                            value > -0.1 ? 'Correlación negativa débil' :
                                              value > -0.3 ? 'Correlación negativa moderada' :
                                                'Correlación negativa fuerte'}
                                  </p>
                                </div>
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </div>
                      )
                    })}
                  </div>
                ))}

                <div className="mt-6 pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">Escala de correlación</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">-1</span>
                    <div className="flex flex-1 h-3 rounded-full overflow-hidden">
                      <div className="flex-1 bg-blue-700" />
                      <div className="flex-1 bg-blue-500" />
                      <div className="flex-1 bg-sky-400" />
                      <div className="flex-1 bg-sky-200" />
                      <div className="flex-1 bg-gray-200" />
                      <div className="flex-1 bg-yellow-300" />
                      <div className="flex-1 bg-orange-400" />
                      <div className="flex-1 bg-red-500" />
                      <div className="flex-1 bg-red-600" />
                    </div>
                    <span className="text-xs text-muted-foreground">+1</span>
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Negativa</span>
                    <span>Sin correlación</span>
                    <span>Positiva</span>
                  </div>
                </div>
              </div>
            </div>
          </TooltipProvider>
        </CardContent>
      </Card>
    </motion.div>
  )
}