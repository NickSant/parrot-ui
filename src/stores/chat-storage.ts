import { Chat } from "@/domain/models/chat";
import { Flags } from "@/domain/models/flags";
import { create } from "zustand";

type Store = {
  localConversations: Chat[]
  activeConversation?: Chat
  setConversation: (chat: Chat) => void 
  resetConversation: () => void
  pushConversation: (chat: Chat) => void
  deleteConversation: (id: string) => void
}

export const useChat = create<Store>((set) => ({
  localConversations: [],
  activeConversation: undefined,
  setConversation: (chat: Chat) => set(() => ({ activeConversation: chat })),
  resetConversation: () => set(() => ({activeConversation: undefined})),
  pushConversation: (chat: Chat) =>
    set(state => ({ localConversations: [...state.localConversations, chat ]})),
  deleteConversation: (id: string) =>
    set(state => {
      if(state.activeConversation?.id === id) state.resetConversation()

      return ({ localConversations: state.localConversations.filter(item => item.id !== id)})
    })
}))