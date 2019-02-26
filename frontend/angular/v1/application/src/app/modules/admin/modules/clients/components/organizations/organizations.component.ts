import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  refresh() {
    console.log('OrganizationsComponent::refresh()');
  }

  organization_add() {
    console.log('OrganizationsComponent::organization_add()');
  }
}
