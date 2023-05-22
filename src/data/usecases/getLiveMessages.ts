import { MessageRequest, MessageResponse } from "@/proto/messages/messages"
import { MessageServiceClient } from "@/proto/messages/messages.client"
import { GrpcWebFetchTransport } from "@protobuf-ts/grpcweb-transport"

const apiUrl = import.meta.env.VITE_API_URL as string
const transport = new GrpcWebFetchTransport({
  baseUrl: apiUrl,
  timeout: new Date(new Date().getTime() + 24 * 60 * 60 * 1000)
})

let abortController: AbortController;

export const getLiveMessages = (req: MessageRequest, callback: (res: MessageResponse) => void) => {
  abortController = new AbortController()
  const client = new MessageServiceClient(transport)
  const res = client.receiveMessages(req, { abort: abortController.signal }).responses

  const removeListener = res.onMessage((res) => callback(res))

  return {
    removeListener,
    abort: () => abortController.abort()
  }
}