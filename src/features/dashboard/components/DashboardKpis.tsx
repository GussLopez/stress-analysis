'use client'

import { useQuery } from "@tanstack/react-query"
import { Angry, Frown, Spotlight } from "lucide-react";
import { FaRegFaceGrimace } from "react-icons/fa6";
import { IoShareSocial } from "react-icons/io5";

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
    <div className="grid grid-cols-5 gap-5 pt-4">
      <div className="p-4 rounded-md shadow-xs border border-muted group">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-100 p-1 rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Spotlight className="size-5.5" />
          </div>
          <span>Procentaje de Estrés</span>
        </div>

        <p className="mt-3 text-2xl font-medium">{data?.stress_percentage} %</p>
      </div>
      <div className="p-4 rounded-md shadow-xs border border-muted group">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-100 p-1 rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Angry className="size-5.5" />
          </div>
          <span>Promedio de Ira</span>
        </div>

        <p className="mt-3 text-2xl font-medium">
          {data?.avg_anger} <span className="text-xs font-normal text-muted-foreground">prom.</span>
        </p>
      </div>
      <div className="p-4 rounded-md shadow-xs border border-muted group">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-100 p-1 rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <FaRegFaceGrimace className="size-5.5" />
          </div>
          <span>Promedio de Ansiedad</span>
        </div>

        <p className="mt-3 text-2xl font-medium">
          {data?.avg_anxiety} <span className="text-xs font-normal text-muted-foreground">prom.</span>
        </p>
      </div>
      <div className="p-4 rounded-md shadow-xs border border-muted group">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-100 p-1 rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Frown className="size-5.5" />
          </div>
          <span>Promedio de Tristesa</span>
        </div>
        <p className="mt-3 text-2xl font-medium">
          {data?.avg_sadness} <span className="text-xs font-normal text-muted-foreground">prom.</span>
        </p>
      </div>
      <div className="p-4 rounded-md shadow-xs border border-muted group">
        <div className="flex items-center gap-2">
          <div className="bg-neutral-100 p-1 rounded-md group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <IoShareSocial className="size-5.5" />
          </div>
          <span>Publicaciones totales</span>
        </div>
        <p className="mt-3 text-2xl font-medium">
          {data?.total_posts} <span className="text-xs font-normal text-muted-foreground">posts</span>
        </p>
      </div>

    </div>
  )
}
