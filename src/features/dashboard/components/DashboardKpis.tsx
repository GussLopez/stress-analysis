'use client'

import { useQuery } from "@tanstack/react-query"

interface KpisData {
  avg_anger: number;
  avg_anxiety: number;
  avg_comments: number;
  avg_karma: number;
  avg_negative_emotions: number;
  avg_positive_emotions: number;
  avg_sadness: number;
  avg_sentiment: number;
  non_stress_posts: number;
  stress_percentage: number;
  stress_posts: number;
  total_posts: number;
}

export default function DashboardKpis() {
  const { data, isLoading, error } = useQuery<KpisData>({
    queryKey: ["dashboard-kpis"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard/kpis");

      if (!res.ok) throw Error("Error fetching");

      return res.json();
    },
    retry: 1
  })

  return (
    <div className="grid grid-cols-4 ">
      <div className="p-4 rounded-md shadow-xs border border-muted">
        hello
      </div>
    </div>
  )
}
