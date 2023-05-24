
import { ConversationRequest, ConversationResponse } from "@/proto/parrot";
import { ConversationServiceClient } from "@/proto/parrot.client";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"

const apiUrl = import.meta.env.VITE_API_URL as string
const transport = new GrpcWebFetchTransport({
  baseUrl: apiUrl,
  timeout: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
})

let abortController: AbortController;

export const getLiveConversations = (req: ConversationRequest, callback: (res: ConversationResponse) => void) => {
  abortController = new AbortController()
  const client = new ConversationServiceClient(transport)
  const res = client.getAllConversations(req, { abort: abortController.signal }).responses

  const removeListener = res.onMessage((res) => {
    console.log(res)
    callback(res)
  })

  return {
    removeListener,
    abort: () => abortController.abort()
  }
}