"use client";

import { TrendingUp, TrendingDown, Users, Image, Video, Music, Zap, Calendar } from "lucide-react"
import { Pie, PieChart, Bar, BarChart, Line, LineChart, Area, AreaChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"

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

function GenerationTypePieChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Generation Types</CardTitle>
        <CardDescription>Distribution by content type</CardDescription>
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
              data={generationTypeData} 
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
          Images leading with 63% share <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total generations: {generationTypeData.reduce((sum, item) => sum + item.count, 0)}
        </div>
      </CardFooter>
    </Card>
  )
}

function MonthlyTrendsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Trends</CardTitle>
        <CardDescription>Generation activity over the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart data={monthlyData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="images" fill="var(--color-images)" radius={4} />
            <Bar dataKey="videos" fill="var(--color-videos)" radius={4} />
            <Bar dataKey="audio" fill="var(--color-audio)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
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

export default function AnalyticsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-xs">
            <Calendar className="mr-1 h-3 w-3" />
            Last 30 days
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Generations"
          value="1,968"
          change="+12.5%"
          icon={Zap}
          trend="up"
        />
        <StatsCard
          title="Active Users"
          value="342"
          change="+8.2%"
          icon={Users}
          trend="up"
        />
        <StatsCard
          title="Images Created"
          value="1,247"
          change="+15.3%"
          icon={Image}
          trend="up"
        />
        <StatsCard
          title="Videos Generated"
          value="432"
          change="-2.1%"
          icon={Video}
          trend="down"
        />
      </div>

      {/* Main Charts */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="models">Models</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <MonthlyTrendsChart />
            </div>
            <div className="col-span-3">
              <GenerationTypePieChart />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-4">
              <DailyUsageChart />
            </div>
            <div className="col-span-3">
              <ModelUsageChart />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-1">
            <MonthlyTrendsChart />
            <DailyUsageChart />
          </div>
        </TabsContent>

        <TabsContent value="models" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <ModelUsageChart />
            <Card>
              <CardHeader>
                <CardTitle>Model Performance</CardTitle>
                <CardDescription>Average generation time by provider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
                    <span className="text-sm">GPT-4 Vision</span>
                  </div>
                  <span className="text-sm font-medium">2.3s avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-chart-2 rounded-full"></div>
                    <span className="text-sm">Replicate</span>
                  </div>
                  <span className="text-sm font-medium">4.7s avg</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-chart-3 rounded-full"></div>
                    <span className="text-sm">Fal AI</span>
                  </div>
                  <span className="text-sm font-medium">3.1s avg</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
} 