import { Chat } from "@/domain/models/chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Store = {
  localConversations: Chat[]
  activeConversation?: Chat
  setConversation: (chat: Chat) => void 
  resetConversation: () => void
  pushConversation: (chat: Chat) => void
  deleteConversation: (id: string) => void
  updateLocalConversations: (chat: Chat) => void
}

export const useChat = create(
  persist(
    (set) => ({
      localConversations: [],
      activeConversation: undefined,
      setConversation: (chat: Chat) => set(() => ({ activeConversation: chat })),
      resetConversation: () => set(() => ({ activeConversation: undefined })),
      pushConversation: (chat: Chat) =>
        set((state: Store) => ({ localConversations: [...state.localConversations, chat ]})),
      deleteConversation: (id: string) =>
        set((state: Store) => {
          if(state.activeConversation?.id === id) state.resetConversation()
    
          return ({ localConversations: state.localConversations.filter(item => item.id !== id)})
        }),
      updateLocalConversations: (chat: Chat) => 
        set(state => (
          { 
            localConversations: state.localConversations.map(item => {
              if(item.id === chat.id){
                return chat
              }

              return item
            }),
            activeConversation: state.activeConversation?.id === chat.id 
              ? chat 
              : state.activeConversation 
          }
        ))
    }), 
    {
      name: '@parrot-chat',
      partialize: (state: Store) => ({ localConversations: state.localConversations })
    }
  )
)