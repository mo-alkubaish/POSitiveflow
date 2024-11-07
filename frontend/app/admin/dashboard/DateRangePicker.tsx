"use client"

import * as React from "react"
import {  format } from "date-fns"
import { CalendarIcon, ChevronRight, ChevronLeft } from "lucide-react"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

export function DatePickerWithRange({
    date,
    setDate,
    className,
  }: {
    date: DateRange | undefined,
    setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>,
  } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              "bg-black text-white border-[#f4f4f5]",
              !date && "text-white/60"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-white text-black border-[#f4f4f5]" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            className="rounded-md border-[#f4f4f5]"
            classNames={{
              months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
              month: "space-y-4",
              caption: "flex justify-center pt-1 relative items-center text-black",
              caption_label: "text-sm font-medium",
              nav: "space-x-1 flex items-center",
              nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100 text-black",
              nav_button_previous: "absolute left-1 text-black",
              nav_button_next: "absolute right-1 text-black",
              table: "w-full border-collapse space-y-1",
              head_row: "flex",
              head_cell: "text-black rounded-md w-9 font-normal text-[0.8rem]",
              row: "flex w-full mt-2",
              cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-[#f4f4f5] first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
              day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100 text-black hover:bg-[#f4f4f5] rounded-md",
              day_selected: "bg-black text-white hover:bg-black hover:text-black focus:bg-black focus:text-white",
              day_outside: "text-black/50 opacity-50",
              day_disabled: "text-black/50 opacity-50",
              day_range_middle: "aria-selected:bg-[#f4f4f5] aria-selected:text-black",
              day_hidden: "invisible",
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
