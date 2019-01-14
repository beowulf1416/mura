import { Component, OnInit } from '@angular/core';


import { NotificationService } from 'src/app/services/notification.service';
import { Message } from 'src/app/classes/message';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications = Array<string>();

  constructor(
    private service: NotificationService
  ) {
    this.service.notes.subscribe((m: Message) => {
      this.notifications.push(m.text);
    });
  }

  ngOnInit() {
  }

}
