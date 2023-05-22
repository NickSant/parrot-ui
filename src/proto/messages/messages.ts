// @generated by protobuf-ts 2.9.0
// @generated from protobuf file "messages.proto" (package "parrot.proto", syntax proto3)
// tslint:disable
import { ServiceType } from "@protobuf-ts/runtime-rpc";
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message parrot.proto.MessageRequest
 */
export interface MessageRequest {
    /**
     * @generated from protobuf field: string Id = 1 [json_name = "Id"];
     */
    id: string;
}
/**
 * @generated from protobuf message parrot.proto.MessageResponse
 */
export interface MessageResponse {
    /**
     * @generated from protobuf field: repeated parrot.proto.Message Messages = 1 [json_name = "Messages"];
     */
    messages: Message[];
}
/**
 * @generated from protobuf message parrot.proto.Message
 */
export interface Message {
    /**
     * @generated from protobuf field: string Role = 1 [json_name = "Role"];
     */
    role: string;
    /**
     * @generated from protobuf field: string Content = 2 [json_name = "Content"];
     */
    content: string;
}
// @generated message type with reflection information, may provide speed optimized methods
class MessageRequest$Type extends MessageType<MessageRequest> {
    constructor() {
        super("parrot.proto.MessageRequest", [
            { no: 1, name: "Id", kind: "scalar", jsonName: "Id", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<MessageRequest>): MessageRequest {
        const message = { id: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MessageRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MessageRequest): MessageRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string Id = 1 [json_name = "Id"];*/ 1:
                    message.id = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MessageRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string Id = 1 [json_name = "Id"]; */
        if (message.id !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parrot.proto.MessageRequest
 */
export const MessageRequest = new MessageRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MessageResponse$Type extends MessageType<MessageResponse> {
    constructor() {
        super("parrot.proto.MessageResponse", [
            { no: 1, name: "Messages", kind: "message", jsonName: "Messages", repeat: 1 /*RepeatType.PACKED*/, T: () => Message }
        ]);
    }
    create(value?: PartialMessage<MessageResponse>): MessageResponse {
        const message = { messages: [] };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<MessageResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MessageResponse): MessageResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* repeated parrot.proto.Message Messages = 1 [json_name = "Messages"];*/ 1:
                    message.messages.push(Message.internalBinaryRead(reader, reader.uint32(), options));
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: MessageResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* repeated parrot.proto.Message Messages = 1 [json_name = "Messages"]; */
        for (let i = 0; i < message.messages.length; i++)
            Message.internalBinaryWrite(message.messages[i], writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parrot.proto.MessageResponse
 */
export const MessageResponse = new MessageResponse$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Message$Type extends MessageType<Message> {
    constructor() {
        super("parrot.proto.Message", [
            { no: 1, name: "Role", kind: "scalar", jsonName: "Role", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "Content", kind: "scalar", jsonName: "Content", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<Message>): Message {
        const message = { role: "", content: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Message>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Message): Message {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string Role = 1 [json_name = "Role"];*/ 1:
                    message.role = reader.string();
                    break;
                case /* string Content = 2 [json_name = "Content"];*/ 2:
                    message.content = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Message, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string Role = 1 [json_name = "Role"]; */
        if (message.role !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.role);
        /* string Content = 2 [json_name = "Content"]; */
        if (message.content !== "")
            writer.tag(2, WireType.LengthDelimited).string(message.content);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message parrot.proto.Message
 */
export const Message = new Message$Type();
/**
 * @generated ServiceType for protobuf service parrot.proto.MessageService
 */
export const MessageService = new ServiceType("parrot.proto.MessageService", [
    { name: "ReceiveMessages", serverStreaming: true, options: {}, I: MessageRequest, O: MessageResponse }
]);