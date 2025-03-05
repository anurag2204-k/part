"use client"

import type React from "react"

import { createClient } from "@supabase/supabase-js"
import { createContext, useContext, useEffect, useState } from "react"
import type { Database } from "@/lib/database.types"
import { useToast } from "@/components/ui/use-toast"

type SupabaseContext = {
  supabase: ReturnType<typeof createClient<Database>> | null
  user: any | null
  loading: boolean
  sendMessage: (chatId: string, content: string) => Promise<void>
  subscribeToMessages: (chatId: string, callback: (message: any) => void) => void
}

const SupabaseContext = createContext<SupabaseContext>({
  supabase: null,
  user: null,
  loading: true,
  sendMessage: async () => {},
  subscribeToMessages: () => {},
})

export const useSupabase = () => useContext(SupabaseContext)

export const SupabaseProvider = ({ children }: { children: React.ReactNode }) => {
  const [supabase, setSupabase] = useState<ReturnType<typeof createClient<Database>> | null>(null)
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

    const supabaseClient = createClient<Database>(supabaseUrl, supabaseKey)
    setSupabase(supabaseClient)

    // For demo purposes, we'll set a mock user
    setUser({
      id: "1",
      name: "Periskope User",
      avatar: "/placeholder.svg?height=40&width=40",
    })

    setLoading(false)
  }, [])

  const sendMessage = async (chatId: string, content: string) => {
    if (!supabase || !user) return

    const { data, error } = await supabase
      .from("messages")
      .insert({
        chat_id: chatId,
        user_id: user.id,
        content: content,
      })
      .select()

    if (error) {
      console.error("Error sending message:", error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      })
    }

    return
  }

  const subscribeToMessages = (chatId: string, callback: (message: any) => void) => {
    if (!supabase) return

    const subscription = supabase
      .channel(`public:messages:chat_id=eq.${chatId}`)
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, (payload) => {
        callback(payload.new)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }

  return (
    <SupabaseContext.Provider value={{ supabase, user, loading, sendMessage, subscribeToMessages }}>
      {children}
    </SupabaseContext.Provider>
  )
}

