"use client"

import { useState, useEffect } from "react"
import Sidebar from "@/components/sidebar/sidebar"
import ChatArea from "@/components/chat/chat-area"
import { mockChats } from "@/lib/mock-data"
import { useSupabase } from "@/components/providers/supabase-provider"

export default function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState(mockChats[0])
  const [chats, setChats] = useState(mockChats)
  const { sendMessage, subscribeToMessages } = useSupabase()

  useEffect(() => {
    if (selectedChat) {
      const unsubscribe = subscribeToMessages(selectedChat.id, (newMessage) => {
        setSelectedChat((prevChat) => ({
          ...prevChat,
          messages: [...prevChat.messages, newMessage],
        }))
      })

      return () => {
        if (unsubscribe) unsubscribe()
      }
    }
  }, [selectedChat, subscribeToMessages])

  const handleChatSelect = (chatId: string) => {
    const chat = chats.find((c) => c.id === chatId)
    if (chat) {
      setSelectedChat(chat)
    }
  }

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || !selectedChat) return

    await sendMessage(selectedChat.id, message)

    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, { content: message, timestamp: new Date().toISOString() }],
      last_message: message,
      last_message_time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setSelectedChat(updatedChat)
    setChats((prevChats) => prevChats.map((chat) => (chat.id === selectedChat.id ? updatedChat : chat)))
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar chats={chats} onChatSelect={handleChatSelect} selectedChatId={selectedChat?.id} />
      <ChatArea chat={selectedChat} onSendMessage={handleSendMessage} />
    </div>
  )
}

