import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import {cn} from "@/shared/lib/utils";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  )
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px] gap-2",
        className
      )}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
      <TabsPrimitive.Trigger
          data-slot="tabs-trigger"
          className={cn(
              "inline-flex h-full flex-1 items-center justify-center gap-2",
              "rounded-lg px-4 py-2.5",
              "text-sm font-medium whitespace-nowrap",
              "transition-all duration-200",
              "text-gray hover:text-gray-light",
              "hover:bg-gray-semi",
              "data-[state=active]:bg-gray-semi data-[state=active]:text-gray-lighter",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-50",
              "[&_svg]:size-4 [&_svg]:shrink-0",
              className
          )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
