"use client"

import * as React from "react"
import { Bell } from "lucide-react"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

// Types
export interface NotificationItem {
  id: string
  username: string
  avatarUrl?: string
  type: "comment" | "like" | "follow"
  content: string
  createdAt: Date
  isRead?: boolean
}

interface NotificationPopoverProps {
  notifications: NotificationItem[]
  unreadCount?: number
  onNotificationClick?: (notification: NotificationItem) => void
  className?: string
}

// Helper untuk format tipe notifikasi
function getNotificationLabel(type: NotificationItem["type"]): string {
  switch (type) {
    case "comment":
      return "Komentar"
    case "like":
      return "Menyukai"
    case "follow":
      return "Mengikuti"
    default:
      return ""
  }
}

// Komponen untuk single notification item
function NotificationItemCard({
  notification,
  onClick,
}: {
  notification: NotificationItem
  onClick?: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 w-full p-3 rounded-lg transition-colors",
        "hover:bg-white/5 text-left",
        !notification.isRead && "bg-white/5"
      )}
    >
      {/* Avatar dengan gradient border */}
      <div className="relative shrink-0">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-500 p-[2px]" />
        <Avatar className="relative h-10 w-10 border-2 border-[#1a1a1a]">
          <AvatarImage src={notification.avatarUrl} alt={notification.username} />
          <AvatarFallback className="bg-neutral-700 text-white text-sm">
            {notification.username.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm">
          {notification.username}
        </p>
        <p className="text-neutral-400 text-sm">
          <span className="text-neutral-500">
            {getNotificationLabel(notification.type)} :{" "}
          </span>
          <span className="text-white">{notification.content}</span>
        </p>
      </div>
    </button>
  )
}

export function NotificationPopover({
  notifications,
  unreadCount = 0,
  onNotificationClick,
  className,
}: NotificationPopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "relative p-2 rounded-full transition-colors hover:bg-white/10",
            className
          )}
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6 text-white" />
          
          {/* Badge untuk unread count */}
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "relative w-80 bg-[#1a1a1a] border-none p-0 rounded-2xl shadow-xl",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        )}
        align="end"
        sideOffset={12}
      >
        {/* Arrow - Segitiga di kanan atas */}
        <div
          className="absolute -top-2 right-6 w-0 h-0 
            border-l-[10px] border-l-transparent 
            border-r-[10px] border-r-transparent 
            border-b-[10px] border-b-[#1a1a1a]"
          aria-hidden="true"
        />

        {/* Header */}
        <div className="px-4 py-3 border-b border-white/10">
          <h3 className="text-white font-semibold">Notification</h3>
        </div>

        {/* Notification List */}
        <div className="max-h-[400px] overflow-y-auto p-2 space-y-1">
          {notifications.length === 0 ? (
            <div className="py-8 text-center text-neutral-500 text-sm">
              Tidak ada notifikasi
            </div>
          ) : (
            notifications.map((notification) => (
              <NotificationItemCard
                key={notification.id}
                notification={notification}
                onClick={() => onNotificationClick?.(notification)}
              />
            ))
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
