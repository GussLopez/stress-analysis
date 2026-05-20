'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/shared/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/src/shared/components/ui/chart"
import { useQuery } from "@tanstack/react-query"
import { motion } from "motion/react"
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  LabelList,
} from "recharts"

const chartConfig = {
  stress_percentage: {
    label: "Porcentaje de Estrés",
    color: "hsl(var(--chart-1))",
  },
}

const COLORS = [
  "hsl(221, 83%, 53%)",
  "hsl(262, 83%, 58%)",
  "hsl(199, 89%, 48%)",
  "hsl(173, 80%, 40%)",
  "hsl(142, 71%, 45%)",
  "hsl(47, 96%, 53%)",
  "hsl(25, 95%, 53%)",
  "hsl(0, 84%, 60%)",
]

export default function DashboardBarChart() {
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["dashboard-barchart"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/charts/bar")
      if (!res.ok) throw new Error("Error fetching")
      return res.json()
    },
  })
  const sortedData = [...data].sort((a: { stress_percentage: number }, b: { stress_percentage: number }) => b.stress_percentage - a.stress_percentage)

  return (
    <motion.div
      initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: .3, ease: 'easeIn', delay: .6 }}
    >
      <Card className="w-full shadow-xs border border-muted ring-0">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Porcentaje de Estrés por Subreddit</CardTitle>
          <CardDescription>Distribución del nivel de estrés en diferentes comunidades</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-100 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />

                <XAxis
                  type="number"
                  domain={[0, 100]}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                  tickFormatter={(value) => `${value}%`}
                />

                <YAxis
                  type="category"
                  dataKey="subreddit"
                  width={130}
                  tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />

                <ChartTooltip
                  cursor={{ fill: 'hsl(var(--muted)/0.3)' }}
                  content={
                    <ChartTooltipContent
                      formatter={(value) => [`${Number(value).toFixed(1)}%`, " Estrés"]}
                    />
                  }
                />

                <Bar
                  dataKey="stress_percentage"
                  radius={[0, 6, 6, 0]}
                  maxBarSize={40}
                >
                  {sortedData.map((_: unknown, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                  <LabelList
                    dataKey="stress_percentage"
                    position="right"
                    formatter={(value) => `${Number(value).toFixed(1)}%`}
                    fill="hsl(var(--muted-foreground))"
                    fontSize={11}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
