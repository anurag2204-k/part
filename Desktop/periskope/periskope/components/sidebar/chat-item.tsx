import { formatDate, formatPhoneNumber } from "@/lib/utils"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ChatItemProps {
  chat: any
  isSelected: boolean
  onClick: () => void
}

export default function ChatItem({ chat, isSelected, onClick }: ChatItemProps) {
  return (
    <div
      className={cn("p-2 border-b hover:bg-gray-50 cursor-pointer", isSelected && "bg-gray-100 hover:bg-gray-100")}
      onClick={onClick}
    >
      <div className="flex items-start space-x-2">
        {/* Avatar */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <Image
              src={chat.avatar || "/placeholder.svg?height=40&width=40"}
              alt={chat.title}
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
          {chat.unread_count > 0 && (
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white">{chat.unread_count}</span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium truncate">{chat.title}</h3>
            <span className="text-xs text-gray-500">{formatDate(chat.last_message_time || new Date())}</span>
          </div>

          <p className="text-xs text-gray-600 truncate">{chat.subtitle || chat.last_message}</p>

          <div className="flex items-center mt-1">
            <span className="text-xs text-gray-500 truncate">{formatPhoneNumber(chat.phone_number || "")}</span>
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="flex items-center mt-1 space-x-1">
        {chat.labels &&
          chat.labels.map((label: string, index: number) => {
            let bgColor = "bg-gray-100"
            let textColor = "text-gray-600"

            if (label === "Demo") bgColor = "bg-gray-100"
            if (label === "Internal") (bgColor = "bg-green-100"), (textColor = "text-green-600")
            if (label === "Signup") (bgColor = "bg-blue-100"), (textColor = "text-blue-600")
            if (label === "Content") (bgColor = "bg-purple-100"), (textColor = "text-purple-600")
            if (label === "Dont Send") (bgColor = "bg-red-100"), (textColor = "text-red-600")

            return (
              <span key={index} className={`text-xs px-1.5 py-0.5 rounded ${bgColor} ${textColor}`}>
                {label}
              </span>
            )
          })}
      </div>
    </div>
  )
}

