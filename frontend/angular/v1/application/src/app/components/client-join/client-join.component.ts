import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-client-join',
  templateUrl: './client-join.component.html',
  styleUrls: ['./client-join.component.css']
})
export class ClientJoinComponent implements OnInit {

  clients = [];

  constructor(
    private title: Title
  ) { }

  ngOnInit() {
    this.title.setTitle('Client Join');
  }

}
