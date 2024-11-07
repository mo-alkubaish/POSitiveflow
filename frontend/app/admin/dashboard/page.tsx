'use client'

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DateRange } from "react-day-picker"
import { motion } from 'framer-motion';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Legend, Tooltip } from "recharts"
import { DatePickerWithRange } from "../../components/DateRangePicker"

// This would typically be in a separate file
const generateMockApiResponse = (startDate: Date, endDate: Date) => {
  // Example logic to generate different values based on the date range
  const daysDifference = Math.abs(endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

  return {
    totalSales: { value: Math.round(5423 + daysDifference * 10), change: 16 },
    totalOrders: { value: Math.round(1893 + daysDifference * 5), change: -1 },
    averageOrderValue: { value: Math.round(12.63 + daysDifference * 0.1), change: 8 },
    topSellingProducts: [
      { name: "Basbousa", unitsSold: Math.round(300 + daysDifference), revenue: Math.round(1800 + daysDifference * 10) },
      { name: "Maamoul", unitsSold: Math.round(250 + daysDifference), revenue: Math.round(1250 + daysDifference * 10) },
      { name: "Knafeh", unitsSold: Math.round(200 + daysDifference), revenue: Math.round(1000 + daysDifference * 10) },
      { name: "Qatayef", unitsSold: Math.round(190 + daysDifference), revenue: Math.round(725 + daysDifference * 10) },
      { name: "Fatayer", unitsSold: Math.round(160 + daysDifference), revenue: Math.round(250 + daysDifference * 10) },
    ],
    inventorySummary: [
      { product: "Basbousa", stock: Math.round(300 + daysDifference), status: "In Stock", lastUpdated: "01/12/2024" },
      { product: "Maamoul", stock: Math.round(23 + daysDifference), status: "Low Stock", lastUpdated: "01/11/2024" },
      { product: "Knafeh", stock: Math.round(0 + daysDifference), status: "Out of Stock", lastUpdated: "08/12/2023" },
    ],
    recentActivities: [
      { user: "Sara", action: "added new pricing for Manaeesh", timeAgo: `${Math.round(2 + daysDifference)} hours ago` },
      { user: "Ali", action: "completed restocking for Qatayef", timeAgo: `${Math.round(5 + daysDifference)} hours ago` },
    ],
    customerFeedback: [
      { feedback: "The packaging is great, and the food arrived hot!", rating: 5 },
      { feedback: "Order was delayed by 30 minutes, but everything tasted good.", rating: 4 },
    ],
  };
};

const tableVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const today = new Date()

export default function Component() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(today.getFullYear(), today.getMonth(), 1),
    to: today,
  })
  const mockApiResponse = generateMockApiResponse(date.from, date.to)

  const [data, setData] = useState(mockApiResponse)
  // const [loading, setLoading] = useState(false)



  // if (loading) {
  //   return <div className="flex justify-center items-center h-screen">Loading...</div>
  // }

  // if (!data) {
  //   return <div className="flex justify-center items-center h-screen">Error loading data</div>
  // }

  return (
    <motion.div
    className="container mx-auto p-6"
    initial="initial"
    animate="animate"
    exit="exit"
    variants={tableVariants}
    transition={{ duration: 0.3, ease: "easeOut" }}
  >
    <div className="p-4 space-y-4 text-black m-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Sales and Inventory Reports</h1>
        <DatePickerWithRange  date={date} setDate={setDate}  maxDate={today} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.totalSales.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {data.totalSales.change > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className={data.totalSales.change > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(data.totalSales.change)}%
              </span>{" "}
              this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalOrders.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {data.totalOrders.change > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className={data.totalOrders.change > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(data.totalOrders.change)}%
              </span>{" "}
              this month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${data.averageOrderValue.value}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {data.averageOrderValue.change > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-red-500" />
              )}
              <span className={data.averageOrderValue.change > 0 ? "text-green-500" : "text-red-500"}>
                {Math.abs(data.averageOrderValue.change)}%
              </span>{" "}
              this month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data.topSellingProducts}>
                <XAxis dataKey="name" />
                <YAxis yAxisId="left" orientation="left" label={{ value: 'Units Sold', angle: -90, position: 'insideLeft' }} />
                <YAxis yAxisId="right" orientation="right" label={{ value: 'Revenue', angle: -90, position: 'insideRight' }} />
                <Tooltip />
                <Legend />
                <Bar yAxisId="left" dataKey="unitsSold" fill="rgba(0, 0, 0, 0.7)" />
                <Bar yAxisId="right" dataKey="revenue" fill="rgba(34, 139, 34, 0.7)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Units Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.topSellingProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.unitsSold}</TableCell>
                    <TableCell>${product.revenue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.inventorySummary.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={
                          item.status === "In Stock"
                            ? "bg-green-100 text-green-800"
                            : item.status === "Low Stock"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="bg-white ">
            <CardHeader>
              <CardTitle>Recent Activities</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>{activity.user[0]}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.timeAgo}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-white">
            <CardHeader>
              <CardTitle>Customer Feedback</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.customerFeedback.map((feedback, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{feedback.feedback}</p>
                    <p className="text-xs text-muted-foreground">Overall Rating: {feedback.rating}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
    </motion.div>
  )
}