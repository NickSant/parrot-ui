import { MessagesRequest, MessagesResponse } from "@/proto/parrot";
import { MessageServiceClient } from "@/proto/parrot.client";
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"

const apiUrl = import.meta.env.VITE_API_URL as string
const transport = new GrpcWebFetchTransport({
  baseUrl: apiUrl,
  timeout: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
})

let abortController: AbortController;

export const getLiveMessages = (req: MessagesRequest, callback: (res: MessagesResponse) => void) => {
  abortController = new AbortController()
  const client = new MessageServiceClient(transport)
  const res = client.getMessagesByConversationId(req, { abort: abortController.signal }).responses

  const removeListener = res.onMessage((res) => {
    console.log('chat', res)
    callback(res)
  })

  return {
    removeListener,
    abort: () => abortController.abort()
  }
}