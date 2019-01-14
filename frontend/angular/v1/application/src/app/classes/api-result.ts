import { Message } from './message';

export interface ApiResult {
    status: boolean;
    messages: Array<Message>;
    data: any;
}
