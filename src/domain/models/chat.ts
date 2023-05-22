import { Flags } from "./flags"

export interface Chat {
  id: string
  person: {
    id: string
    avatarUrl: string
    name: string
    number: string
  },
  conversationId: string
  status: string
  tags: Flags[]
}