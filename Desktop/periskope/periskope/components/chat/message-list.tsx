import { formatDate } from "@/lib/utils"
import Image from "next/image"

interface MessageListProps {
  messages: any[]
  currentUserId: string
}

export default function MessageList({ messages, currentUserId }: MessageListProps) {
  if (!messages || messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500 text-sm">No messages yet</p>
      </div>
    )
  }

  // Group messages by date
  const groupedMessages: { [key: string]: any[] } = {}

  messages.forEach((message) => {
    const date = new Date(message.created_at).toLocaleDateString()
    if (!groupedMessages[date]) {
      groupedMessages[date] = []
    }
    groupedMessages[date].push(message)
  })

  return (
    <div className="space-y-4">
      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
        <div key={date} className="space-y-2">
          <div className="flex items-center justify-center">
            <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full">{formatDate(date)}</div>
          </div>

          {dateMessages.map((message) => {
            const isCurrentUser = message.user_id === currentUserId

            return (
              <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                <div className="flex items-start max-w-[70%]">
                  {!isCurrentUser && (
                    <div className="mr-2 mt-1">
                      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                        <Image
                          src={message.sender?.avatar || "/placeholder.svg?height=32&width=32"}
                          alt={message.sender?.name || "User"}
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                    </div>
                  )}

                  <div
                    className={`rounded-lg px-3 py-2 ${
                      isCurrentUser ? "bg-green-100 text-green-900" : "bg-white text-gray-800"
                    }`}
                  >
                    {!isCurrentUser && (
                      <div className="text-xs text-gray-500 mb-1">
                        {message.sender?.name || "User"}
                        {message.sender?.phone && (
                          <span className="ml-1 text-xs text-gray-400">{message.sender.phone}</span>
                        )}
                      </div>
                    )}

                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>

                    <div className="text-right">
                      <span className="text-xs text-gray-500">
                        {new Date(message.created_at).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

