"use client"

import { useState } from "react"
import { Search, RefreshCw, HelpCircle, Filter, Star, Save, Plus } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import ChatItem from "./chat-item"

interface SidebarProps {
  chats: any[]
  onChatSelect: (chatId: string) => void
  selectedChatId: string
}

export default function Sidebar({ chats, onChatSelect, selectedChatId }: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const { toast } = useToast()

  const filteredChats = chats.filter(
    (chat) =>
      chat.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.subtitle?.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleButtonClick = (action: string) => {
    toast({
      title: "Action triggered",
      description: `The ${action} action is not implemented in this demo`,
    })
  }

  return (
    <aside className="w-[350px] border-r flex flex-col h-full bg-white">
      {/* Header */}
      <header className="p-2 border-b flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
            <span className="text-xs">P</span>
          </div>
          <span className="text-sm font-medium">chats</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => handleButtonClick("refresh")} className="p-1 hover:bg-gray-100 rounded-full">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button onClick={() => handleButtonClick("help")} className="p-1 hover:bg-gray-100 rounded-full">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Filter and Search */}
      <div className="p-2 border-b">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleButtonClick("custom filter")}
              className="flex items-center space-x-1 text-sm text-green-600 px-2 py-1 rounded hover:bg-gray-100"
            >
              <Filter className="w-4 h-4" />
              <span>Custom filter</span>
            </button>
            <button
              onClick={() => handleButtonClick("save")}
              className="text-sm text-gray-500 px-2 py-1 rounded hover:bg-gray-100"
            >
              <Save className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-2 py-1 text-sm border rounded-md w-32 focus:outline-none focus:ring-1 focus:ring-green-500"
              />
            </div>
            <div className="ml-2 flex items-center space-x-1">
              <span className="text-xs text-gray-500">Filtered</span>
              <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-xs text-green-600">7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-xs">5 / 6 phones</span>
          </div>
          <button
            onClick={() => handleButtonClick("add phone")}
            className="flex items-center space-x-1 text-xs text-gray-500 hover:text-gray-700"
          >
            <Plus className="w-3 h-3" />
            <span>Add phone</span>
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isSelected={chat.id === selectedChatId}
            onClick={() => onChatSelect(chat.id)}
          />
        ))}
      </div>
    </aside>
  )
}

