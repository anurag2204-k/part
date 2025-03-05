"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import {
  Search,
  Star,
  Bell,
  MoreHorizontal,
  Paperclip,
  Smile,
  Mic,
  Send,
  ImageIcon,
  FileText,
  MapPin,
  Phone,
  Video,
  ChevronDown,
  ChevronUp,
  Edit,
  Copy,
  Trash,
  MessageSquare,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import MessageList from "./message-list"
import { formatPhoneNumber } from "@/lib/utils"
import { useSupabase } from "@/components/providers/supabase-provider"

interface ChatAreaProps {
  chat: any
  onSendMessage: (message: string) => Promise<void>
}

export default function ChatArea({ chat, onSendMessage }: ChatAreaProps) {
  const [message, setMessage] = useState("")
  const [isWhatsappMenuOpen, setIsWhatsappMenuOpen] = useState(false)
  const { toast } = useToast()
  const messageInputRef = useRef<HTMLInputElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useSupabase()

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chat])

  const handleSend = async () => {
    if (message.trim()) {
      await onSendMessage(message)
      setMessage("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleButtonClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `The ${action} action is not implemented in this demo`,
    })
  }

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Select a chat to start messaging</p>
      </div>
    )
  }

  return (
    <main className="flex-1 flex flex-col h-full">
      {/* Chat Header */}
      <header className="px-4 py-2 border-b flex items-center justify-between bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex flex-col">
            <h2 className="text-sm font-medium">{chat.title}</h2>
            <p className="text-xs text-gray-500 truncate max-w-md">
              {chat.subtitle || formatPhoneNumber(chat.phone_number || "")}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => handleButtonClick("search")} className="p-1 hover:bg-gray-100 rounded-full">
            <Search className="w-4 h-4" />
          </button>
          <button onClick={() => handleButtonClick("star")} className="p-1 hover:bg-gray-100 rounded-full">
            <Star className="w-4 h-4" />
          </button>
          <button onClick={() => handleButtonClick("notifications")} className="p-1 hover:bg-gray-100 rounded-full">
            <Bell className="w-4 h-4" />
          </button>
          <button onClick={() => handleButtonClick("more")} className="p-1 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
        <MessageList messages={chat.messages} currentUserId={user?.id} />
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <footer className="p-3 border-t bg-white">
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center space-x-2 border rounded-lg px-3 py-2">
            <Smile className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => handleButtonClick("emoji")} />
            <input
              ref={messageInputRef}
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message..."
              className="flex-1 outline-none text-sm"
            />
            <Paperclip className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => handleButtonClick("attach")} />
            <Mic className="w-5 h-5 text-gray-400 cursor-pointer" onClick={() => handleButtonClick("voice")} />
          </div>
          <button onClick={handleSend} className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600">
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* WhatsApp Menu */}
        <div className="relative mt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setIsWhatsappMenuOpen(!isWhatsappMenuOpen)}
                className="flex items-center space-x-1 text-xs text-green-600 px-2 py-1 rounded hover:bg-gray-100"
              >
                <span>WhatsApp</span>
                {isWhatsappMenuOpen ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </button>
              <div className="h-4 border-r border-gray-300"></div>
              <button
                onClick={() => handleButtonClick("private note")}
                className="flex items-center space-x-1 text-xs text-gray-500 px-2 py-1 rounded hover:bg-gray-100"
              >
                <span>Private Note</span>
              </button>
            </div>
            <div className="text-xs text-gray-500">
              <span className="font-medium">Periskope</span>
            </div>
          </div>

          {isWhatsappMenuOpen && (
            <div className="absolute left-0 top-8 bg-white border rounded-md shadow-lg p-2 z-10 w-64">
              <div className="grid grid-cols-4 gap-2">
                {[
                  { icon: <ImageIcon className="w-4 h-4" />, label: "Image" },
                  { icon: <FileText className="w-4 h-4" />, label: "Document" },
                  { icon: <MapPin className="w-4 h-4" />, label: "Location" },
                  { icon: <Phone className="w-4 h-4" />, label: "Call" },
                  { icon: <Video className="w-4 h-4" />, label: "Video" },
                  { icon: <MessageSquare className="w-4 h-4" />, label: "Template" },
                  { icon: <Edit className="w-4 h-4" />, label: "Edit" },
                  { icon: <Copy className="w-4 h-4" />, label: "Copy" },
                  { icon: <Trash className="w-4 h-4" />, label: "Delete" },
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      handleButtonClick(item.label.toLowerCase())
                      setIsWhatsappMenuOpen(false)
                    }}
                    className="flex flex-col items-center justify-center p-2 hover:bg-gray-100 rounded"
                  >
                    {item.icon}
                    <span className="text-xs mt-1">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </footer>
    </main>
  )
}

