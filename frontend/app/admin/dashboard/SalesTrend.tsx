"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
 
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
 


interface DataTrend {
    name: string;
    sold: number;
    revenue: number;
}
interface SalesTrendProps {

    products: DataTrend[];
  
}
const chartConfig = {
  sold: {
    label: "Units Sold",
    color: "#2563eb",
  },
  sevenue: {
    label: "Revenue in SAR",
    color: "#60a5fa",
  }
  
} satisfies ChartConfig

const SalesTrend: React.FC<SalesTrendProps> = ({ products }) => {
  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
    <BarChart accessibilityLayer data={products}>
      <CartesianGrid vertical={false} />
      <XAxis
        dataKey="name"
        tickLine={false}
        tickMargin={10}
        axisLine={false}
        tickFormatter={(value) => value}
      />
      <ChartTooltip content={<ChartTooltipContent />} />
      <Bar dataKey="sold" fill="var(--color-sold)" radius={4} />
      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />

    </BarChart>
  </ChartContainer>
  )
}
export default SalesTrend;
