import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {
  public roleId;

  constructor() { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');

  }

}
