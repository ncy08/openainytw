"use client";

import { TrendingUp, TrendingDown, Users, Image, Video, Music, Zap, Calendar } from "lucide-react"
import { Pie, PieChart, Bar, BarChart, Line, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import React, { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Dummy data for different charts
const generationTypeData = [
  { type: "images", count: 1247, fill: "var(--color-images)" },
  { type: "videos", count: 432, fill: "var(--color-videos)" },
  { type: "audio", count: 289, fill: "var(--color-audio)" },
]

const monthlyData = [
  { month: "Jan", images: 186, videos: 80, audio: 45 },
  { month: "Feb", images: 305, videos: 120, audio: 67 },
  { month: "Mar", images: 237, videos: 95, audio: 52 },
  { month: "Apr", images: 273, videos: 110, audio: 78 },
  { month: "May", images: 209, videos: 87, audio: 41 },
  { month: "Jun", images: 214, videos: 92, audio: 56 },
]

const dailyUsageData = [
  { day: "Mon", usage: 234 },
  { day: "Tue", usage: 345 },
  { day: "Wed", usage: 456 },
  { day: "Thu", usage: 378 },
  { day: "Fri", usage: 512 },
  { day: "Sat", usage: 289 },
  { day: "Sun", usage: 198 },
]

const modelUsageData = [
  { model: "GPT-4 Vision", usage: 45, fill: "var(--color-gpt4)" },
  { model: "Replicate", usage: 32, fill: "var(--color-replicate)" },
  { model: "Fal AI", usage: 23, fill: "var(--color-fal)" },
]

const chartConfig = {
  images: {
    label: "Images",
    color: "hsl(var(--chart-1))",
  },
  videos: {
    label: "Videos", 
    color: "hsl(var(--chart-2))",
  },
  audio: {
    label: "Audio",
    color: "hsl(var(--chart-3))",
  },
  usage: {
    label: "Usage",
    color: "hsl(var(--chart-4))",
  },
  gpt4: {
    label: "GPT-4 Vision",
    color: "hsl(var(--chart-1))",
  },
  replicate: {
    label: "Replicate",
    color: "hsl(var(--chart-2))",
  },
  fal: {
    label: "Fal AI",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

function StatsCard({ title, value, change, icon: Icon, trend }: {
  title: string
  value: string
  change: string
  icon: any
  trend: 'up' | 'down'
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
          {trend === 'up' ? (
            <TrendingUp className="h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="h-3 w-3 text-red-500" />
          )}
          <span className={trend === 'up' ? 'text-green-500' : 'text-red-500'}>
            {change}
          </span>
          <span>from last month</span>
        </div>
      </CardContent>
    </Card>
  )
}

function GenerationTypePieChart({ sizes }: { sizes: { size: string, count: number }[] }) {
  // Pie chart for image size breakdown
  const data = sizes.map((s, i) => ({
    type: s.size || 'unknown',
    count: Number(s.count),
    fill: `var(--chart-${(i % 5) + 1})`,
  }));
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Image Size Distribution</CardTitle>
        <CardDescription>By requested size</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie 
              data={data} 
              dataKey="count" 
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {data.length > 0 ? `${data[0].type} most popular` : 'No data'} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total generations: {data.reduce((sum, item) => sum + item.count, 0)}
        </div>
      </CardFooter>
    </Card>
  )
}

function DailyUsageChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Usage Pattern</CardTitle>
        <CardDescription>Average generations per day of week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart data={dailyUsageData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              dataKey="usage"
              type="natural"
              fill="var(--color-usage)"
              fillOpacity={0.4}
              stroke="var(--color-usage)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Peak usage on Fridays <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Weekend usage drops by 40%
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}

function ModelUsageChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>AI Model Usage</CardTitle>
        <CardDescription>Distribution by AI provider</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie 
              data={modelUsageData} 
              dataKey="usage" 
              nameKey="model"
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          GPT-4 Vision most popular <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Based on last 30 days usage
        </div>
      </CardFooter>
    </Card>
  )
}

function QualityPieChart({ qualities }: { qualities: { quality: string, count: number }[] }) {
  // Pie chart for quality breakdown
  const data = qualities.map((q, i) => ({
    type: q.quality || 'unknown',
    count: Number(q.count),
    fill: `var(--chart-${(i % 5) + 1})`,
  }));
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Quality Distribution</CardTitle>
        <CardDescription>By requested quality</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie 
              data={data} 
              dataKey="count" 
              nameKey="type"
              innerRadius={60}
              strokeWidth={5}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          {data.length > 0 ? `${data[0].type} most popular` : 'No data'} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total generations: {data.reduce((sum, item) => sum + item.count, 0)}
        </div>
      </CardFooter>
    </Card>
  )
}

export default function AnalyticsPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userId = "user_001";

  useEffect(() => {
    async function fetchAnalytics() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/analytics/images?user_id=${userId}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    }
    fetchAnalytics();
  }, []);

  if (loading) return <div className="p-8 text-lg">Loading analytics…</div>;
  if (error || !data?.success) return <div className="p-8 text-red-500">Error loading analytics.</div>;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">My Analytics</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            <Calendar className="mr-1 h-3 w-3" />
            Last 6 months
          </Badge>
        </div>
      </div>
      <div className="text-muted-foreground text-sm mb-2">User ID: {userId}</div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total GPT-Image-1 Generations"
          value={data.total?.toLocaleString() ?? "0"}
          change={"+0%"}
          icon={Zap}
          trend="up"
        />
        <StatsCard
          title="Average Duration (ms)"
          value={Math.round(data.avgDuration).toLocaleString()}
          change={"-"}
          icon={Image}
          trend="up"
        />
        <StatsCard
          title="Most Popular Size"
          value={data.sizes?.[0]?.size || "-"}
          change={"-"}
          icon={Image}
          trend="up"
        />
        <StatsCard
          title="Most Popular Quality"
          value={data.qualities?.[0]?.quality || "-"}
          change={"-"}
          icon={Image}
          trend="up"
        />
      </div>

      {/* Main Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="quality">Quality</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-3">
              <GenerationTypePieChart sizes={data.sizes} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            <QualityPieChart qualities={data.qualities} />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 