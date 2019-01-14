export enum MessageType {
    INFO = 'message.info',
    ERROR = 'message.error'
}

export interface Message {
    type: MessageType;
    text: string;
}
