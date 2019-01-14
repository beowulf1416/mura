import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import { Message, MessageType } from '../classes/message';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  public notes = new Subject<Message>();

  constructor() {
  }

  error(text: string) {
    console.log('NotificationService::add()', 'ERROR', text);
    this.notes.next({ type: MessageType.INFO, text: text });
  }

  info(text: string) {
  }
}
