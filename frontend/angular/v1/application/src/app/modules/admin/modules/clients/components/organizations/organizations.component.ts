import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  constructor(
    private title: Title,
    private router: Router
  ) { }

  ngOnInit() {
    this.title.setTitle('Organizations');
  }

  refresh() {
    console.log('OrganizationsComponent::refresh()');
  }

  organization_add() {
    console.log('OrganizationsComponent::organization_add()');
    this.router.navigate([ 'admin', 'clients', 'organizations', 'new' ]);
  }
}
