// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "messages.proto" (package "parrot.proto", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { MessageService } from "./messages";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { MessageResponse } from "./messages";
import type { MessageRequest } from "./messages";
import type { ServerStreamingCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service parrot.proto.MessageService
 */
export interface IMessageServiceClient {
    /**
     * @generated from protobuf rpc: ReceiveMessages(parrot.proto.MessageRequest) returns (stream parrot.proto.MessageResponse);
     */
    receiveMessages(input: MessageRequest, options?: RpcOptions): ServerStreamingCall<MessageRequest, MessageResponse>;
}
/**
 * @generated from protobuf service parrot.proto.MessageService
 */
export class MessageServiceClient implements IMessageServiceClient, ServiceInfo {
    typeName = MessageService.typeName;
    methods = MessageService.methods;
    options = MessageService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: ReceiveMessages(parrot.proto.MessageRequest) returns (stream parrot.proto.MessageResponse);
     */
    receiveMessages(input: MessageRequest, options?: RpcOptions): ServerStreamingCall<MessageRequest, MessageResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<MessageRequest, MessageResponse>("serverStreaming", this._transport, method, opt, input);
    }
}
