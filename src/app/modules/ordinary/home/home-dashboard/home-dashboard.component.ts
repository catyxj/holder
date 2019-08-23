import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home-dashboard',
  templateUrl: './home-dashboard.component.html',
  styleUrls: ['./home-dashboard.component.css']
})
export class HomeDashboardComponent implements OnInit {
  public roleId;
  public reminds = [];
  public notice = [];

  constructor(private router: Router) { }

  ngOnInit() {
    this.roleId = localStorage.getItem('roleId');

    this.getRemind();
  }

  getRemind() {
    this.reminds = [
      {
        date: '2018-2-13 12:12:12',
        name: 'XXXXX锅炉运行周报',
        type: 1,
        read: false
      },
      {
        date: '2018-2-13 12:12:12',
        name: 'XXXXX锅炉运行周报',
        type: 2,
        read: true
      }
    ];
  }



}
